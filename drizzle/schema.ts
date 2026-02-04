import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * DNCommerce Tables
 */

// Tabela de Clientes
export const clientes = mysqlTable("clientes", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  cpf: varchar("cpf", { length: 11 }).notNull().unique(),
  telefone: varchar("telefone", { length: 20 }),
  endereco: text("endereco"),
  dataCadastro: timestamp("data_cadastro").defaultNow().notNull(),
});

export type Cliente = typeof clientes.$inferSelect;
export type InsertCliente = typeof clientes.$inferInsert;

// Tabela de Produtos
export const produtos = mysqlTable("produtos", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  descricao: text("descricao"),
  preco: decimal("preco", { precision: 10, scale: 2 }).notNull(),
  categoria: varchar("categoria", { length: 100 }),
  dataCadastro: timestamp("data_cadastro").defaultNow().notNull(),
});

export type Produto = typeof produtos.$inferSelect;
export type InsertProduto = typeof produtos.$inferInsert;

// Tabela de Estoque
export const estoque = mysqlTable("estoque", {
  id: int("id").autoincrement().primaryKey(),
  produtoId: int("produto_id").notNull().references(() => produtos.id),
  quantidade: int("quantidade").notNull().default(0),
  dataAtualizacao: timestamp("data_atualizacao").defaultNow().onUpdateNow().notNull(),
});

export type Estoque = typeof estoque.$inferSelect;
export type InsertEstoque = typeof estoque.$inferInsert;

// Tabela de Pedidos
export const pedidos = mysqlTable("pedidos", {
  id: int("id").autoincrement().primaryKey(),
  clienteId: int("cliente_id").notNull().references(() => clientes.id),
  dataPedido: timestamp("data_pedido").defaultNow().notNull(),
  valorTotal: decimal("valor_total", { precision: 10, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pendente", "processando", "enviado", "entregue", "cancelado"]).default("pendente").notNull(),
});

export type Pedido = typeof pedidos.$inferSelect;
export type InsertPedido = typeof pedidos.$inferInsert;

// Tabela de Itens do Pedido (relação N:N entre Pedidos e Produtos)
export const itensPedido = mysqlTable("itens_pedido", {
  id: int("id").autoincrement().primaryKey(),
  pedidoId: int("pedido_id").notNull().references(() => pedidos.id),
  produtoId: int("produto_id").notNull().references(() => produtos.id),
  quantidade: int("quantidade").notNull(),
  precoUnitario: decimal("preco_unitario", { precision: 10, scale: 2 }).notNull(),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
});

export type ItemPedido = typeof itensPedido.$inferSelect;
export type InsertItemPedido = typeof itensPedido.$inferInsert;