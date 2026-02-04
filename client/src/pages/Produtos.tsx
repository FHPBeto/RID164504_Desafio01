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
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Package, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ProdutoForm = {
  nome: string;
  descricao: string;
  preco: string;
  categoria: string;
};

export default function Produtos() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ProdutoForm>({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
  });

  const utils = trpc.useUtils();
  const { data: produtos, isLoading } = trpc.produtos.list.useQuery();

  const createMutation = trpc.produtos.create.useMutation({
    onSuccess: () => {
      toast.success("Produto criado com sucesso!");
      utils.produtos.list.invalidate();
      utils.estoque.list.invalidate();
      setIsCreateOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Erro ao criar produto: ${error.message}`);
    },
  });

  const updateMutation = trpc.produtos.update.useMutation({
    onSuccess: () => {
      toast.success("Produto atualizado com sucesso!");
      utils.produtos.list.invalidate();
      setIsEditOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar produto: ${error.message}`);
    },
  });

  const deleteMutation = trpc.produtos.delete.useMutation({
    onSuccess: () => {
      toast.success("Produto removido com sucesso!");
      utils.produtos.list.invalidate();
      utils.estoque.list.invalidate();
    },
    onError: (error) => {
      toast.error(`Erro ao remover produto: ${error.message}`);
    },
  });

  const resetForm = () => {
    setFormData({
      nome: "",
      descricao: "",
      preco: "",
      categoria: "",
    });
    setEditingId(null);
  };

  const handleCreate = () => {
    if (!formData.nome || !formData.preco) {
      toast.error("Nome e preço são obrigatórios");
      return;
    }

    // Validate price format
    if (!/^\d+\.\d{2}$/.test(formData.preco)) {
      toast.error("Preço deve estar no formato 0.00 (ex: 29.90)");
      return;
    }

    createMutation.mutate(formData);
  };

  const handleEdit = (produto: any) => {
    setEditingId(produto.id);
    setFormData({
      nome: produto.nome,
      descricao: produto.descricao || "",
      preco: produto.preco,
      categoria: produto.categoria || "",
    });
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (!editingId) return;

    if (!formData.nome && !formData.preco) {
      toast.error("Informe pelo menos um campo para atualizar");
      return;
    }

    // Validate price format if provided
    if (formData.preco && !/^\d+\.\d{2}$/.test(formData.preco)) {
      toast.error("Preço deve estar no formato 0.00 (ex: 29.90)");
      return;
    }

    const updateData: any = { id: editingId };
    if (formData.nome) updateData.nome = formData.nome;
    if (formData.descricao) updateData.descricao = formData.descricao;
    if (formData.preco) updateData.preco = formData.preco;
    if (formData.categoria) updateData.categoria = formData.categoria;

    updateMutation.mutate(updateData);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja remover este produto?")) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie o catálogo de produtos de beleza
            </p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Produtos</CardTitle>
            <CardDescription>
              {produtos?.length || 0} produtos cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Carregando produtos...
              </div>
            ) : produtos && produtos.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtos.map((produto) => (
                    <TableRow key={produto.id}>
                      <TableCell className="font-medium">{produto.id}</TableCell>
                      <TableCell>{produto.nome}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {produto.descricao || "-"}
                      </TableCell>
                      <TableCell>R$ {produto.preco}</TableCell>
                      <TableCell>{produto.categoria || "-"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(produto)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(produto.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">Nenhum produto cadastrado</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Comece adicionando seu primeiro produto ao catálogo
                </p>
                <Button onClick={() => setIsCreateOpen(true)} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Produto
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Produto</DialogTitle>
              <DialogDescription>
                Adicione um novo produto ao catálogo
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  placeholder="Ex: Shampoo Hidratante"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  placeholder="Descrição detalhada do produto"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preco">Preço * (formato: 0.00)</Label>
                <Input
                  id="preco"
                  value={formData.preco}
                  onChange={(e) =>
                    setFormData({ ...formData, preco: e.target.value })
                  }
                  placeholder="29.90"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Input
                  id="categoria"
                  value={formData.categoria}
                  onChange={(e) =>
                    setFormData({ ...formData, categoria: e.target.value })
                  }
                  placeholder="Ex: Cabelos"
                />
              </div>
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
                {createMutation.isPending ? "Criando..." : "Criar Produto"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Produto</DialogTitle>
              <DialogDescription>
                Atualize as informações do produto
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nome">Nome</Label>
                <Input
                  id="edit-nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-descricao">Descrição</Label>
                <Textarea
                  id="edit-descricao"
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-preco">Preço (formato: 0.00)</Label>
                <Input
                  id="edit-preco"
                  value={formData.preco}
                  onChange={(e) =>
                    setFormData({ ...formData, preco: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-categoria">Categoria</Label>
                <Input
                  id="edit-categoria"
                  value={formData.categoria}
                  onChange={(e) =>
                    setFormData({ ...formData, categoria: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditOpen(false);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
