import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Package, Users, ShoppingCart, Warehouse } from "lucide-react";

export default function Home() {
  const { data: produtos } = trpc.produtos.list.useQuery();
  const { data: clientes } = trpc.clientes.list.useQuery();
  const { data: pedidos } = trpc.pedidos.list.useQuery();
  const { data: estoque } = trpc.estoque.list.useQuery();

  const stats = [
    {
      title: "Total de Produtos",
      value: produtos?.length || 0,
      icon: Package,
      description: "Produtos cadastrados no sistema",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total de Clientes",
      value: clientes?.length || 0,
      icon: Users,
      description: "Clientes registrados",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total de Pedidos",
      value: pedidos?.length || 0,
      icon: ShoppingCart,
      description: "Pedidos realizados",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Itens em Estoque",
      value: estoque?.reduce((sum, item) => sum + item.quantidade, 0) || 0,
      icon: Warehouse,
      description: "Quantidade total de produtos",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">DNCommerce Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Sistema de gerenciamento de estoque e pedidos de produtos de beleza
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo ao DNCommerce</CardTitle>
              <CardDescription>
                Sistema completo de gerenciamento para sua loja de produtos de beleza
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Funcionalidades Principais:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Gerenciamento completo de produtos (CRUD)</li>
                  <li>Cadastro e controle de clientes</li>
                  <li>Processamento de pedidos com cálculo automático</li>
                  <li>Controle de estoque em tempo real</li>
                  <li>API REST documentada com tRPC</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Navegação Rápida</CardTitle>
              <CardDescription>
                Acesse rapidamente as principais funcionalidades do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <a
                href="/produtos"
                className="block p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Produtos</p>
                    <p className="text-xs text-muted-foreground">
                      Adicionar, editar e remover produtos
                    </p>
                  </div>
                </div>
              </a>
              <a
                href="/pedidos"
                className="block p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Pedidos</p>
                    <p className="text-xs text-muted-foreground">
                      Criar e gerenciar pedidos de clientes
                    </p>
                  </div>
                </div>
              </a>
              <a
                href="/estoque"
                className="block p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Warehouse className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium">Estoque</p>
                    <p className="text-xs text-muted-foreground">
                      Visualizar e atualizar quantidades
                    </p>
                  </div>
                </div>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
