import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Package, Users, ShoppingCart, Warehouse } from "lucide-react";

export default function ApiDocs() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentação da API</h1>
          <p className="text-muted-foreground mt-2">
            Referência completa dos endpoints disponíveis no sistema DNCommerce
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sobre a API</CardTitle>
            <CardDescription>
              API REST desenvolvida com tRPC, Node.js e Express
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Tecnologias</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong>tRPC 11</strong>: Framework type-safe para APIs</li>
                <li><strong>Drizzle ORM</strong>: ORM moderno para MySQL</li>
                <li><strong>Zod</strong>: Validação de schemas</li>
                <li><strong>Superjson</strong>: Serialização avançada</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Endpoint Base</h3>
              <code className="bg-muted px-2 py-1 rounded text-sm">/api/trpc</code>
            </div>
          </CardContent>
        </Card>

        {/* Produtos */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Produtos</CardTitle>
                <CardDescription>Gerenciamento do catálogo de produtos</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="produtos-list">
                <AccordionTrigger>
                  <span className="font-mono text-sm">produtos.list</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Lista todos os produtos cadastrados
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs font-semibold mb-2">Exemplo de Resposta:</p>
                      <pre className="text-xs overflow-x-auto">
{`[
  {
    "id": 1,
    "nome": "Shampoo Hidratante",
    "descricao": "Shampoo para cabelos secos",
    "preco": "29.90",
    "categoria": "Cabelos"
  }
]`}
                      </pre>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="produtos-create">
                <AccordionTrigger>
                  <span className="font-mono text-sm">produtos.create</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Cria um novo produto e inicializa seu estoque
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs font-semibold mb-2">Parâmetros:</p>
                      <pre className="text-xs overflow-x-auto">
{`{
  "nome": "string (obrigatório)",
  "descricao": "string (opcional)",
  "preco": "string (formato: 0.00)",
  "categoria": "string (opcional)"
}`}
                      </pre>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="produtos-update">
                <AccordionTrigger>
                  <span className="font-mono text-sm">produtos.update</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Atualiza informações de um produto existente
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs font-semibold mb-2">Parâmetros:</p>
                      <pre className="text-xs overflow-x-auto">
{`{
  "id": number,
  "nome": "string (opcional)",
  "descricao": "string (opcional)",
  "preco": "string (opcional)",
  "categoria": "string (opcional)"
}`}
                      </pre>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="produtos-delete">
                <AccordionTrigger>
                  <span className="font-mono text-sm">produtos.delete</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Remove um produto do catálogo
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs font-semibold mb-2">Parâmetros:</p>
                      <pre className="text-xs overflow-x-auto">
{`{
  "id": number
}`}
                      </pre>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Clientes */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle>Clientes</CardTitle>
                <CardDescription>Gerenciamento de clientes</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="clientes-list">
                <AccordionTrigger>
                  <span className="font-mono text-sm">clientes.list</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Lista todos os clientes cadastrados
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="clientes-create">
                <AccordionTrigger>
                  <span className="font-mono text-sm">clientes.create</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Cadastra um novo cliente
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs font-semibold mb-2">Parâmetros:</p>
                      <pre className="text-xs overflow-x-auto">
{`{
  "nome": "string (obrigatório)",
  "email": "string (obrigatório)",
  "telefone": "string (opcional)",
  "cpf": "string (obrigatório, único)",
  "endereco": "string (opcional)"
}`}
                      </pre>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Pedidos */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>Pedidos</CardTitle>
                <CardDescription>Processamento de pedidos</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="pedidos-create">
                <AccordionTrigger>
                  <span className="font-mono text-sm">pedidos.create</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Cria um novo pedido e atualiza o estoque automaticamente
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs font-semibold mb-2">Parâmetros:</p>
                      <pre className="text-xs overflow-x-auto">
{`{
  "clienteId": number,
  "itens": [
    {
      "produtoId": number,
      "quantidade": number,
      "precoUnitario": "string (formato: 0.00)"
    }
  ]
}`}
                      </pre>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-800">
                        <strong>Nota:</strong> O sistema valida automaticamente se há estoque suficiente antes de criar o pedido.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pedidos-updateStatus">
                <AccordionTrigger>
                  <span className="font-mono text-sm">pedidos.updateStatus</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Atualiza o status de um pedido
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs font-semibold mb-2">Parâmetros:</p>
                      <pre className="text-xs overflow-x-auto">
{`{
  "id": number,
  "status": "pendente" | "processando" | "enviado" | "entregue" | "cancelado"
}`}
                      </pre>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Estoque */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Warehouse className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <CardTitle>Estoque</CardTitle>
                <CardDescription>Controle de inventário</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="estoque-list">
                <AccordionTrigger>
                  <span className="font-mono text-sm">estoque.list</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Lista todas as entradas de estoque com quantidades atuais
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="estoque-update">
                <AccordionTrigger>
                  <span className="font-mono text-sm">estoque.update</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Atualiza a quantidade de um produto em estoque
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs font-semibold mb-2">Parâmetros:</p>
                      <pre className="text-xs overflow-x-auto">
{`{
  "id": number,
  "quantidade": number
}`}
                      </pre>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
