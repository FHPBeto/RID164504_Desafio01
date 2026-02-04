import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // DNCommerce Routers
  clientes: router({
    create: publicProcedure
      .input(z.object({
        nome: z.string().min(1),
        email: z.string().email(),
        cpf: z.string().length(11),
        telefone: z.string().optional(),
        endereco: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createCliente(input);
        return { success: true, message: "Cliente criado com sucesso" };
      }),
    list: publicProcedure.query(async () => {
      return await db.getAllClientes();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const cliente = await db.getClienteById(input.id);
        if (!cliente) throw new Error("Cliente não encontrado");
        return cliente;
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        nome: z.string().min(1).optional(),
        email: z.string().email().optional(),
        telefone: z.string().optional(),
        endereco: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateCliente(id, data);
        return { success: true, message: "Cliente atualizado com sucesso" };
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteCliente(input.id);
        return { success: true, message: "Cliente deletado com sucesso" };
      }),
  }),

  produtos: router({
    create: publicProcedure
      .input(z.object({
        nome: z.string().min(1),
        descricao: z.string().optional(),
        preco: z.string(),
        categoria: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const produto = await db.createProduto(input);
        
        if (!produto || !produto.id) {
          throw new Error("Falha ao criar produto");
        }
        
        await db.createEstoque({ produtoId: produto.id, quantidade: 0 });
        return { success: true, message: "Produto criado com sucesso", id: produto.id };
      }),
    list: publicProcedure.query(async () => {
      return await db.getAllProdutos();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const produto = await db.getProdutoById(input.id);
        if (!produto) throw new Error("Produto não encontrado");
        return produto;
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        nome: z.string().min(1).optional(),
        descricao: z.string().optional(),
        preco: z.string().optional(),
        categoria: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateProduto(id, data);
        return { success: true, message: "Produto atualizado com sucesso" };
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteProduto(input.id);
        return { success: true, message: "Produto deletado com sucesso" };
      }),
  }),

  estoque: router({
    list: publicProcedure.query(async () => {
      return await db.getAllEstoque();
    }),
    getByProdutoId: publicProcedure
      .input(z.object({ produtoId: z.number() }))
      .query(async ({ input }) => {
        const item = await db.getEstoqueByProdutoId(input.produtoId);
        if (!item) throw new Error("Estoque não encontrado para este produto");
        return item;
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        quantidade: z.number().min(0),
      }))
      .mutation(async ({ input }) => {
        await db.updateEstoque(input.id, input.quantidade);
        return { success: true, message: "Estoque atualizado com sucesso" };
      }),
  }),

  pedidos: router({
    create: publicProcedure
      .input(z.object({
        clienteId: z.number(),
        itens: z.array(z.object({
          produtoId: z.number(),
          quantidade: z.number().min(1),
          precoUnitario: z.string(),
        })),
      }))
      .mutation(async ({ input }) => {
        let valorTotal = 0;
        for (const item of input.itens) {
          const subtotal = parseFloat(item.precoUnitario) * item.quantidade;
          valorTotal += subtotal;
        }
        const pedido = await db.createPedido({
          clienteId: input.clienteId,
          valorTotal: valorTotal.toFixed(2),
          status: "pendente",
        });
        
        if (!pedido || !pedido.id) {
          throw new Error("Falha ao criar pedido");
        }
        
        const pedidoId = pedido.id;
        for (const item of input.itens) {
          const subtotal = parseFloat(item.precoUnitario) * item.quantidade;
          await db.createItemPedido({
            pedidoId,
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            subtotal: subtotal.toFixed(2),
          });
          const estoqueItem = await db.getEstoqueByProdutoId(item.produtoId);
          if (estoqueItem) {
            const novaQuantidade = estoqueItem.quantidade - item.quantidade;
            if (novaQuantidade < 0) {
              throw new Error(`Estoque insuficiente para o produto ID ${item.produtoId}`);
            }
            await db.updateEstoque(estoqueItem.id, novaQuantidade);
          }
        }
        return { 
          success: true, 
          message: "Pedido criado com sucesso", 
          pedidoId,
          valorTotal: valorTotal.toFixed(2)
        };
      }),
    list: publicProcedure.query(async () => {
      return await db.getAllPedidos();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const pedido = await db.getPedidoById(input.id);
        if (!pedido) throw new Error("Pedido não encontrado");
        const itens = await db.getItensByPedidoId(input.id);
        return { ...pedido, itens };
      }),
    updateStatus: publicProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pendente", "processando", "enviado", "entregue", "cancelado"]),
      }))
      .mutation(async ({ input }) => {
        await db.updatePedido(input.id, { status: input.status });
        return { success: true, message: "Status do pedido atualizado" };
      }),
  }),
});

export type AppRouter = typeof appRouter;
