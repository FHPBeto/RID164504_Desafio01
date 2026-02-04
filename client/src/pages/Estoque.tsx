import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/lib/trpc";
import { AlertTriangle, Package, Pencil, Warehouse } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Estoque() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [quantidade, setQuantidade] = useState<number>(0);

  const utils = trpc.useUtils();
  const { data: estoque, isLoading } = trpc.estoque.list.useQuery();
  const { data: produtos } = trpc.produtos.list.useQuery();

  const updateMutation = trpc.estoque.update.useMutation({
    onSuccess: () => {
      toast.success("Estoque atualizado com sucesso!");
      utils.estoque.list.invalidate();
      setIsEditOpen(false);
      setEditingId(null);
      setQuantidade(0);
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar estoque: ${error.message}`);
    },
  });

  const handleEdit = (item: any) => {
    setEditingId(item.produtoId);
    setQuantidade(item.quantidade);
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (editingId === null) return;

    if (quantidade < 0) {
      toast.error("Quantidade não pode ser negativa");
      return;
    }

    // Find the estoque item to get its ID
    const estoqueItem = estoque?.find(item => item.produtoId === editingId);
    if (!estoqueItem) {
      toast.error("Item de estoque não encontrado");
      return;
    }

    updateMutation.mutate({
      id: estoqueItem.id,
      quantidade,
    });
  };

  const getProdutoNome = (produtoId: number) => {
    const produto = produtos?.find(p => p.id === produtoId);
    return produto?.nome || `Produto ID: ${produtoId}`;
  };

  const getStockStatus = (quantidade: number) => {
    if (quantidade === 0) {
      return {
        label: "Esgotado",
        color: "text-red-600",
        bgColor: "bg-red-50",
      };
    } else if (quantidade < 10) {
      return {
        label: "Baixo",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
      };
    } else {
      return {
        label: "Normal",
        color: "text-green-600",
        bgColor: "bg-green-50",
      };
    }
  };

  const totalItens = estoque?.reduce((sum, item) => sum + item.quantidade, 0) || 0;
  const produtosEsgotados = estoque?.filter(item => item.quantidade === 0).length || 0;
  const produtosBaixoEstoque = estoque?.filter(item => item.quantidade > 0 && item.quantidade < 10).length || 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Controle de Estoque</h1>
          <p className="text-muted-foreground mt-2">
            Visualize e atualize as quantidades de produtos em estoque
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total em Estoque</CardTitle>
              <Warehouse className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItens}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Unidades disponíveis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos Esgotados</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{produtosEsgotados}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Requer reposição urgente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
              <Package className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{produtosBaixoEstoque}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Menos de 10 unidades
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inventário</CardTitle>
            <CardDescription>
              {estoque?.length || 0} produtos com controle de estoque
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Carregando estoque...
              </div>
            ) : estoque && estoque.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto ID</TableHead>
                    <TableHead>Nome do Produto</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Atualização</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estoque.map((item) => {
                    const status = getStockStatus(item.quantidade);
                    return (
                      <TableRow key={item.produtoId}>
                        <TableCell className="font-medium">{item.produtoId}</TableCell>
                        <TableCell>{getProdutoNome(item.produtoId)}</TableCell>
                        <TableCell className="font-semibold">{item.quantidade}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                            {status.label}
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(item.dataAtualizacao).toLocaleString("pt-BR")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <Warehouse className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">Nenhum item em estoque</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Cadastre produtos para começar o controle de estoque
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Atualizar Estoque</DialogTitle>
              <DialogDescription>
                Ajuste a quantidade disponível do produto
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Produto</Label>
                <Input
                  value={editingId ? getProdutoNome(editingId) : ""}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantidade">Nova Quantidade *</Label>
                <Input
                  id="quantidade"
                  type="number"
                  min="0"
                  value={quantidade}
                  onChange={(e) => setQuantidade(parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">
                  Informe a quantidade total disponível em estoque
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditOpen(false);
                  setEditingId(null);
                  setQuantidade(0);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Salvando..." : "Atualizar Estoque"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
