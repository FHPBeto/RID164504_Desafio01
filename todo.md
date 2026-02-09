# DNCommerce - TODO List

## Etapa 01: Modelagem de Dados
- [x] Definir entidades (produtos, clientes, vendas, pedidos, estoque)
- [x] Criar diagrama ER
- [x] Implementar schema no Drizzle

## Etapa 02: Definir Rotas da API
- [x] Definir endpoints para produtos (CRUD)
- [x] Definir endpoints para clientes (CRUD)
- [x] Definir endpoints para pedidos (CRUD)
- [x] Definir endpoints para estoque (consulta e atualização)

## Etapa 03: Desenvolvimento do Sistema
- [x] Implementar helpers de banco de dados (server/db.ts)
- [x] Implementar rotas tRPC (server/routers.ts)

## Etapa 04: Implementação da API
- [x] Testar endpoints com tRPC client
- [x] Validar códigos de status HTTP

## Etapa 05: Integração e Testes
- [x] Criar testes unitários (vitest)
- [x] Documentar exemplos de uso

## Etapa 06: Documentação e Entrega
- [x] Criar README.md com diagrama ER
- [x] Adicionar instruções de instalação e uso
- [ ] Preparar para entrega no GitHub

## Etapa 07: Desenvolvimento do Frontend
- [x] Criar layout do dashboard com navegação lateral
- [x] Implementar página de gerenciamento de produtos
- [x] Implementar página de gerenciamento de clientes
- [x] Implementar página de gerenciamento de pedidos
- [x] Implementar página de controle de estoque
- [x] Implementar página de documentação da API
- [x] Testar todas as funcionalidades no navegador

## Etapa 08: Site de Documentação Inventor
- [x] Criar estrutura de navegação por etapas
- [x] Implementar páginas de conteúdo do guia
- [x] Adicionar barra de progresso
- [x] Implementar busca e índice lateral
- [x] Testar navegação e responsividade

## Etapa 09: Guia Visual Inventor 2025
- [x] Criar guia visual com screenshots das configurações
- [x] Documentar cada aba do Application Options
- [x] Adicionar anotações nas imagens
- [ ] Integrar ao site de documentação

## Etapa 10: Melhorias no Site de Documentação Inventor
- [x] Implementar funcionalidade de busca em todas as 10 partes do guia
- [x] Criar página /visual-guide com tabelas e checklists do guia visual
- [x] Adicionar modo claro/escuro com toggle

## Etapa 11: Sistema de Biblioteca - Backend (Node.js API)
- [ ] Criar novo projeto Node.js + Express
- [ ] Configurar banco de dados para livros
- [ ] Implementar rota GET /livros (listar todos)
- [ ] Implementar rota GET /livros/:id (buscar por ID)
- [ ] Implementar rota POST /livros (criar livro)
- [ ] Implementar rota PUT /livros/:id (atualizar livro)
- [ ] Implementar rota DELETE /livros/:id (deletar livro)
- [ ] Testar rotas com Insomnia/Postman

## Etapa 12: Sistema de Biblioteca - Frontend (React)
- [ ] Clonar/adaptar projeto React fornecido
- [ ] Configurar Vite + React Router
- [ ] Criar service para consumir API
- [ ] Implementar views de listagem de livros
- [ ] Implementar formulário de cadastro/edição
- [ ] Implementar funcionalidade de exclusão
- [ ] Testar integração completa

## Etapa 13: Deploy Sistema de Biblioteca
- [ ] Subir código no GitHub com nomenclatura correta (RID)
- [ ] Fazer deploy do front-end no Netlify
- [ ] Configurar variáveis de ambiente
- [ ] Testar aplicação em produção
