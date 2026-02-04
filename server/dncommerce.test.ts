import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";

function createTestContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("DNCommerce API", () => {
  const ctx = createTestContext();
  const caller = appRouter.createCaller(ctx);

  describe("Clientes", () => {
    it("should create a new cliente", async () => {
      const timestamp = Date.now();
      const result = await caller.clientes.create({
        nome: "João Silva",
        email: `joao${timestamp}@example.com`,
        cpf: `${timestamp}`.substring(0, 11),
        telefone: "11999999999",
        endereco: "Rua Teste, 123",
      });

      expect(result.success).toBe(true);
      expect(result.message).toBe("Cliente criado com sucesso");
    });

    it("should list all clientes", async () => {
      const clientes = await caller.clientes.list();
      expect(Array.isArray(clientes)).toBe(true);
      expect(clientes.length).toBeGreaterThan(0);
    });

    it("should get cliente by id", async () => {
      const clientes = await caller.clientes.list();
      const firstCliente = clientes[0];
      
      if (firstCliente) {
        const cliente = await caller.clientes.getById({ id: firstCliente.id });
        expect(cliente).toBeDefined();
        expect(cliente.id).toBe(firstCliente.id);
      }
    });

    it("should update a cliente", async () => {
      const clientes = await caller.clientes.list();
      const firstCliente = clientes[0];
      
      if (firstCliente) {
        const result = await caller.clientes.update({
          id: firstCliente.id,
          telefone: "11888888888",
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe("Produtos", () => {
    it("should create a new produto", async () => {
      const result = await caller.produtos.create({
        nome: "Shampoo Hidratante",
        descricao: "Shampoo para cabelos secos",
        preco: "29.90",
        categoria: "Cabelos",
      });

      expect(result.success).toBe(true);
      expect(result.message).toBe("Produto criado com sucesso");
      expect(result.id).toBeDefined();
    });

    it("should list all produtos", async () => {
      const produtos = await caller.produtos.list();
      expect(Array.isArray(produtos)).toBe(true);
      expect(produtos.length).toBeGreaterThan(0);
    });

    it("should get produto by id", async () => {
      const produtos = await caller.produtos.list();
      const firstProduto = produtos[0];
      
      if (firstProduto) {
        const produto = await caller.produtos.getById({ id: firstProduto.id });
        expect(produto).toBeDefined();
        expect(produto.id).toBe(firstProduto.id);
      }
    });

    it("should update a produto", async () => {
      const produtos = await caller.produtos.list();
      const firstProduto = produtos[0];
      
      if (firstProduto) {
        const result = await caller.produtos.update({
          id: firstProduto.id,
          preco: "34.90",
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe("Estoque", () => {
    it("should list all estoque", async () => {
      const estoque = await caller.estoque.list();
      expect(Array.isArray(estoque)).toBe(true);
    });

    it("should get estoque by produto id", async () => {
      // Create a new product to ensure it has stock entry
      const produtoResult = await caller.produtos.create({
        nome: "Produto Teste Estoque",
        descricao: "Teste",
        preco: "10.00",
        categoria: "Teste",
      });
      
      const estoqueItem = await caller.estoque.getByProdutoId({ 
        produtoId: produtoResult.id 
      });
      expect(estoqueItem).toBeDefined();
      expect(estoqueItem.produtoId).toBe(produtoResult.id);
    });

    it("should update estoque quantity", async () => {
      // Create a new product to ensure it has stock entry
      const produtoResult = await caller.produtos.create({
        nome: "Produto Teste Update Estoque",
        descricao: "Teste",
        preco: "10.00",
        categoria: "Teste",
      });
      
      const estoqueItem = await caller.estoque.getByProdutoId({ 
        produtoId: produtoResult.id 
      });
      
      if (estoqueItem) {
        const result = await caller.estoque.update({
          id: estoqueItem.id,
          quantidade: 100,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe("Pedidos", () => {
    it("should create a new pedido", async () => {
      const clientes = await caller.clientes.list();
      
      // Create a fresh product with stock for this test
      const produtoResult = await caller.produtos.create({
        nome: "Produto Teste Pedido",
        descricao: "Produto para teste",
        preco: "29.90",
        categoria: "Teste",
      });
      
      const produtoId = produtoResult.id;
      
      // Update stock to have enough quantity
      const estoque = await caller.estoque.list();
      const estoqueItem = estoque.find(e => e.produtoId === produtoId);
      
      if (estoqueItem) {
        await caller.estoque.update({
          id: estoqueItem.id,
          quantidade: 100,
        });
      }
      
      if (clientes.length > 0) {
        const cliente = clientes[0];
        
        const result = await caller.pedidos.create({
          clienteId: cliente.id,
          itens: [
            {
              produtoId: produtoId,
              quantidade: 2,
              precoUnitario: "29.90",
            },
          ],
        });

        expect(result.success).toBe(true);
        expect(result.pedidoId).toBeDefined();
        expect(result.valorTotal).toBe("59.80");
      }
    });

    it("should list all pedidos", async () => {
      const pedidos = await caller.pedidos.list();
      expect(Array.isArray(pedidos)).toBe(true);
    });

    it("should get pedido by id with itens", async () => {
      const pedidos = await caller.pedidos.list();
      const firstPedido = pedidos[0];
      
      if (firstPedido) {
        const pedido = await caller.pedidos.getById({ id: firstPedido.id });
        expect(pedido).toBeDefined();
        expect(pedido.id).toBe(firstPedido.id);
        expect(pedido.itens).toBeDefined();
        expect(Array.isArray(pedido.itens)).toBe(true);
      }
    });

    it("should update pedido status", async () => {
      const pedidos = await caller.pedidos.list();
      const firstPedido = pedidos[0];
      
      if (firstPedido) {
        const result = await caller.pedidos.updateStatus({
          id: firstPedido.id,
          status: "processando",
        });
        expect(result.success).toBe(true);
      }
    });

    it("should fail when creating pedido with insufficient stock", async () => {
      const clientes = await caller.clientes.list();
      
      // Create a product with zero stock
      const produtoResult = await caller.produtos.create({
        nome: "Produto Sem Estoque",
        descricao: "Teste",
        preco: "29.90",
        categoria: "Teste",
      });
      
      if (clientes.length > 0) {
        const cliente = clientes[0];
        
        await expect(
          caller.pedidos.create({
            clienteId: cliente.id,
            itens: [
              {
                produtoId: produtoResult.id,
                quantidade: 10, // More than available (0)
                precoUnitario: "29.90",
              },
            ],
          })
        ).rejects.toThrow();
      }
    });
  });
});
