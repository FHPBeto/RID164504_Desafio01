CREATE TABLE `clientes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`cpf` varchar(11) NOT NULL,
	`telefone` varchar(20),
	`endereco` text,
	`data_cadastro` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `clientes_id` PRIMARY KEY(`id`),
	CONSTRAINT `clientes_email_unique` UNIQUE(`email`),
	CONSTRAINT `clientes_cpf_unique` UNIQUE(`cpf`)
);
--> statement-breakpoint
CREATE TABLE `estoque` (
	`id` int AUTO_INCREMENT NOT NULL,
	`produto_id` int NOT NULL,
	`quantidade` int NOT NULL DEFAULT 0,
	`data_atualizacao` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `estoque_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `itens_pedido` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pedido_id` int NOT NULL,
	`produto_id` int NOT NULL,
	`quantidade` int NOT NULL,
	`preco_unitario` decimal(10,2) NOT NULL,
	`subtotal` decimal(10,2) NOT NULL,
	CONSTRAINT `itens_pedido_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pedidos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cliente_id` int NOT NULL,
	`data_pedido` timestamp NOT NULL DEFAULT (now()),
	`valor_total` decimal(10,2) NOT NULL,
	`status` enum('pendente','processando','enviado','entregue','cancelado') NOT NULL DEFAULT 'pendente',
	CONSTRAINT `pedidos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `produtos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`descricao` text,
	`preco` decimal(10,2) NOT NULL,
	`categoria` varchar(100),
	`data_cadastro` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `produtos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `estoque` ADD CONSTRAINT `estoque_produto_id_produtos_id_fk` FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `itens_pedido` ADD CONSTRAINT `itens_pedido_pedido_id_pedidos_id_fk` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `itens_pedido` ADD CONSTRAINT `itens_pedido_produto_id_produtos_id_fk` FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pedidos` ADD CONSTRAINT `pedidos_cliente_id_clientes_id_fk` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE no action ON UPDATE no action;