import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users,
  clientes, InsertCliente,
  produtos, InsertProduto,
  estoque, InsertEstoque,
  pedidos, InsertPedido,
  itensPedido, InsertItemPedido
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ===== DNCommerce Query Helpers =====

// --- Clientes ---
export async function createCliente(cliente: InsertCliente) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(clientes).values(cliente);
  return result;
}

export async function getAllClientes() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(clientes);
}

export async function getClienteById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(clientes).where(eq(clientes.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateCliente(id: number, data: Partial<InsertCliente>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(clientes).set(data).where(eq(clientes.id, id));
}

export async function deleteCliente(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.delete(clientes).where(eq(clientes.id, id));
}

// --- Produtos ---
export async function createProduto(produto: InsertProduto) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(produtos).values(produto);
  
  // Get the last inserted product by matching all fields
  const inserted = await db.select().from(produtos)
    .where(eq(produtos.nome, produto.nome))
    .orderBy(desc(produtos.id))
    .limit(1);
  
  return inserted[0];
}

export async function getAllProdutos() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(produtos);
}

export async function getProdutoById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(produtos).where(eq(produtos.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateProduto(id: number, data: Partial<InsertProduto>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(produtos).set(data).where(eq(produtos.id, id));
}

export async function deleteProduto(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.delete(produtos).where(eq(produtos.id, id));
}

// --- Estoque ---
export async function createEstoque(item: InsertEstoque) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(estoque).values(item);
  return result;
}

export async function getEstoqueByProdutoId(produtoId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(estoque).where(eq(estoque.produtoId, produtoId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateEstoque(id: number, quantidade: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(estoque).set({ quantidade }).where(eq(estoque.id, id));
}

export async function getAllEstoque() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(estoque);
}

// --- Pedidos ---
export async function createPedido(pedido: InsertPedido) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(pedidos).values(pedido);
  
  // Get the last inserted pedido
  const inserted = await db.select().from(pedidos)
    .where(eq(pedidos.clienteId, pedido.clienteId))
    .orderBy(desc(pedidos.id))
    .limit(1);
  
  return inserted[0];
}

export async function getAllPedidos() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(pedidos);
}

export async function getPedidoById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(pedidos).where(eq(pedidos.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updatePedido(id: number, data: Partial<InsertPedido>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(pedidos).set(data).where(eq(pedidos.id, id));
}

// --- Itens do Pedido ---
export async function createItemPedido(item: InsertItemPedido) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(itensPedido).values(item);
  return result;
}

export async function getItensByPedidoId(pedidoId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(itensPedido).where(eq(itensPedido.pedidoId, pedidoId));
}
