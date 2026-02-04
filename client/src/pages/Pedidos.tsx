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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/lib/trpc";
import { Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ItemPedido = {
  produtoId: number;
  quantidade: number;
  precoUnitario: string;
};

export default function Pedidos() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [clienteId, setClienteId] = useState<string>("");
  const [itens, setItens] = useState<ItemPedido[]>([]);
  const [currentItem, setCurrentItem] = useState<ItemPedido>({
    produtoId: 0,
    quantidade: 1,
    precoUnitario: "",
  });

  const utils = trpc.useUtils();
  const { data: pedidos, isLoading } = trpc.pedidos.list.useQuery();
  const { data: clientes } = trpc.clientes.list.useQuery();
  const { data: produtos } = trpc.produtos.list.useQuery();

  const createMutation = trpc.pedidos.create.useMutation({
    onSuccess: () => {
      toast.success("Pedido criado com sucesso!");
      utils.pedidos.list.invalidate();
      utils.estoque.list.invalidate();
      setIsCreateOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Erro ao criar pedido: ${error.message}`);
    },
  });

  const updateStatusMutation = trpc.pedidos.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Status atualizado com sucesso!");
      utils.pedidos.list.invalidate();
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar status: ${error.message}`);
    },
  });

  const resetForm = () => {
    setClienteId("");
    setItens([]);
    setCurrentItem({
      produtoId: 0,
      quantidade: 1,
      precoUnitario: "",
    });
  };

  const addItem = () => {
    if (!currentItem.produtoId || !currentItem.quantidade || !currentItem.precoUnitario) {
      toast.error("Preencha todos os campos do item");
      return;
    }

    if (!/^\d+\.\d{2}$/.test(currentItem.precoUnitario)) {
      toast.error("Preço deve estar no formato 0.00");
      return;
    }

    setItens([...itens, currentItem]);
    setCurrentItem({
      produtoId: 0,
      quantidade: 1,
      precoUnitario: "",
    });
  };

  const removeItem = (index: number) => {
    setItens(itens.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    if (!clienteId) {
      toast.error("Selecione um cliente");
      return;
    }

    if (itens.length === 0) {
      toast.error("Adicione pelo menos um item ao pedido");
      return;
    }

    createMutation.mutate({
      clienteId: parseInt(clienteId),
      itens,
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pendente: "bg-yellow-100 text-yellow-800",
      processando: "bg-blue-100 text-blue-800",
      enviado: "bg-purple-100 text-purple-800",
      entregue: "bg-green-100 text-green-800",
      cancelado: "bg-red-100 text-red-800",
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800"}`}>
        {status}
      </span>
    );
  };

  const calculateTotal = () => {
    return itens.reduce((sum, item) => {
      return sum + item.quantidade * parseFloat(item.precoUnitario);
    }, 0).toFixed(2);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie os pedidos realizados pelos clientes
            </p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Pedido
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Pedidos</CardTitle>
            <CardDescription>
              {pedidos?.length || 0} pedidos registrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Carregando pedidos...
              </div>
            ) : pedidos && pedidos.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente ID</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedidos.map((pedido) => (
                    <TableRow key={pedido.id}>
                      <TableCell className="font-medium">{pedido.id}</TableCell>
                      <TableCell>{pedido.clienteId}</TableCell>
                      <TableCell>R$ {pedido.valorTotal}</TableCell>
                      <TableCell>{getStatusBadge(pedido.status)}</TableCell>
                      <TableCell>
                        {new Date(pedido.dataPedido).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Select
                          value={pedido.status}
                          onValueChange={(value) =>
                            updateStatusMutation.mutate({
                              id: pedido.id,
                              status: value as "pendente" | "processando" | "enviado" | "entregue" | "cancelado",
                            })
                          }
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pendente">Pendente</SelectItem>
                            <SelectItem value="processando">Processando</SelectItem>
                            <SelectItem value="enviado">Enviado</SelectItem>
                            <SelectItem value="entregue">Entregue</SelectItem>
                            <SelectItem value="cancelado">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">Nenhum pedido registrado</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Comece criando seu primeiro pedido
                </p>
                <Button onClick={() => setIsCreateOpen(true)} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Pedido
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Novo Pedido</DialogTitle>
              <DialogDescription>
                Crie um novo pedido para um cliente
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente *</Label>
                <Select value={clienteId} onValueChange={setClienteId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientes?.map((cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id.toString()}>
                        {cliente.nome} - {cliente.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold">Adicionar Itens</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label>Produto</Label>
                    <Select
                      value={currentItem.produtoId.toString()}
                      onValueChange={(value) => {
                        const produto = produtos?.find(p => p.id === parseInt(value));
                        setCurrentItem({
                          ...currentItem,
                          produtoId: parseInt(value),
                          precoUnitario: produto?.preco || "",
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {produtos?.map((produto) => (
                          <SelectItem key={produto.id} value={produto.id.toString()}>
                            {produto.nome} - R$ {produto.preco}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Quantidade</Label>
                    <Input
                      type="number"
                      min="1"
                      value={currentItem.quantidade}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          quantidade: parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preço</Label>
                    <Input
                      value={currentItem.precoUnitario}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          precoUnitario: e.target.value,
                        })
                      }
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <Button onClick={addItem} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Item
                </Button>
              </div>

              {itens.length > 0 && (
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold">Itens do Pedido</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Preço Unit.</TableHead>
                        <TableHead>Subtotal</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {itens.map((item, index) => {
                        const produto = produtos?.find(p => p.id === item.produtoId);
                        const subtotal = item.quantidade * parseFloat(item.precoUnitario);
                        return (
                          <TableRow key={index}>
                            <TableCell>{produto?.nome || `ID: ${item.produtoId}`}</TableCell>
                            <TableCell>{item.quantidade}</TableCell>
                            <TableCell>R$ {item.precoUnitario}</TableCell>
                            <TableCell>R$ {subtotal.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(index)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <div className="flex justify-end text-lg font-semibold">
                    Total: R$ {calculateTotal()}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateOpen(false);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreate}
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Criando..." : "Criar Pedido"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
