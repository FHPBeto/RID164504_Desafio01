import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Home, Settings, Eye, Palette, Zap } from "lucide-react";
import { Link } from "wouter";

export default function VisualGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Guia Visual de Configuração - Inventor 2025
                </h1>
                <p className="text-sm text-gray-600">
                  Tabelas de referência e checklists de setup
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/inventor-guide">
                <Button variant="outline">
                  Guia Completo
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="application-options" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="application-options">
              <Settings className="w-4 h-4 mr-2" />
              Application Options
            </TabsTrigger>
            <TabsTrigger value="display">
              <Eye className="w-4 h-4 mr-2" />
              Display
            </TabsTrigger>
            <TabsTrigger value="graphics">
              <Palette className="w-4 h-4 mr-2" />
              Graphics
            </TabsTrigger>
            <TabsTrigger value="checklist">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Checklist
            </TabsTrigger>
          </TabsList>

          {/* Application Options Tab */}
          <TabsContent value="application-options" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Options - Configurações Gerais</CardTitle>
                <CardDescription>
                  Configurações recomendadas para trabalhar com malhas STL de alta resolução
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-3 text-left font-semibold">Aba</th>
                        <th className="border p-3 text-left font-semibold">Configuração</th>
                        <th className="border p-3 text-left font-semibold">Valor Recomendado</th>
                        <th className="border p-3 text-left font-semibold">Motivo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-3 font-medium">General</td>
                        <td className="border p-3">Undo File Size</td>
                        <td className="border p-3"><Badge>50 MB</Badge></td>
                        <td className="border p-3">Permite desfazer operações em malhas grandes</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border p-3 font-medium">General</td>
                        <td className="border p-3">Auto-save</td>
                        <td className="border p-3"><Badge variant="outline">Enabled (15 min)</Badge></td>
                        <td className="border p-3">Proteção contra perda de trabalho</td>
                      </tr>
                      <tr>
                        <td className="border p-3 font-medium">Save</td>
                        <td className="border p-3">Compress Files</td>
                        <td className="border p-3"><Badge>Enabled</Badge></td>
                        <td className="border p-3">Reduz tamanho de arquivos com malhas</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border p-3 font-medium">File</td>
                        <td className="border p-3">Default Template</td>
                        <td className="border p-3"><Badge variant="outline">Standard (mm).ipt</Badge></td>
                        <td className="border p-3">Unidades corretas para STL</td>
                      </tr>
                      <tr>
                        <td className="border p-3 font-medium">Sketch</td>
                        <td className="border p-3">Snap to Grid</td>
                        <td className="border p-3"><Badge>Disabled</Badge></td>
                        <td className="border p-3">Maior precisão em malhas orgânicas</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border p-3 font-medium">Part</td>
                        <td className="border p-3">Modeling Tolerance</td>
                        <td className="border p-3"><Badge>0.001 mm</Badge></td>
                        <td className="border p-3">Precisão para conversão de malha</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Display Tab */}
          <TabsContent value="display" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Display Settings - Visualização</CardTitle>
                <CardDescription>
                  Otimizações para melhor visualização de malhas complexas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-3 text-left font-semibold">Configuração</th>
                        <th className="border p-3 text-left font-semibold">Valor Recomendado</th>
                        <th className="border p-3 text-left font-semibold">Descrição</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-3 font-medium">Display Quality</td>
                        <td className="border p-3"><Badge>High</Badge></td>
                        <td className="border p-3">Melhor visualização de detalhes da malha</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border p-3 font-medium">Silhouette Edges</td>
                        <td className="border p-3"><Badge variant="outline">Enabled</Badge></td>
                        <td className="border p-3">Facilita identificação de contornos</td>
                      </tr>
                      <tr>
                        <td className="border p-3 font-medium">Ambient Shadows</td>
                        <td className="border p-3"><Badge>Enabled</Badge></td>
                        <td className="border p-3">Melhora percepção de profundidade</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border p-3 font-medium">Ground Reflection</td>
                        <td className="border p-3"><Badge variant="destructive">Disabled</Badge></td>
                        <td className="border p-3">Economiza recursos de GPU</td>
                      </tr>
                      <tr>
                        <td className="border p-3 font-medium">Perspective View</td>
                        <td className="border p-3"><Badge variant="outline">Enabled</Badge></td>
                        <td className="border p-3">Visualização mais natural</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Graphics Tab */}
          <TabsContent value="graphics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Graphics Settings - Performance</CardTitle>
                <CardDescription>
                  Configurações de GPU e renderização para malhas de alta densidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-3 text-left font-semibold">Configuração</th>
                          <th className="border p-3 text-left font-semibold">Valor Recomendado</th>
                          <th className="border p-3 text-left font-semibold">Impacto</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-3 font-medium">Graphics Mode</td>
                          <td className="border p-3"><Badge>Performance</Badge></td>
                          <td className="border p-3">Ideal para malhas com 300k+ faces</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border p-3 font-medium">Hardware Acceleration</td>
                          <td className="border p-3"><Badge variant="outline">Enabled (GPU)</Badge></td>
                          <td className="border p-3">Usa placa de vídeo para renderização</td>
                        </tr>
                        <tr>
                          <td className="border p-3 font-medium">Software Graphics</td>
                          <td className="border p-3"><Badge variant="destructive">Disabled</Badge></td>
                          <td className="border p-3">Evita uso de CPU para gráficos</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border p-3 font-medium">Ray Tracing</td>
                          <td className="border p-3"><Badge variant="destructive">Disabled</Badge></td>
                          <td className="border p-3">Economiza recursos durante edição</td>
                        </tr>
                        <tr>
                          <td className="border p-3 font-medium">Anti-Aliasing</td>
                          <td className="border p-3"><Badge>4x MSAA</Badge></td>
                          <td className="border p-3">Suaviza bordas sem impacto severo</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border p-3 font-medium">Texture Quality</td>
                          <td className="border p-3"><Badge variant="outline">Medium</Badge></td>
                          <td className="border p-3">Balanceamento performance/qualidade</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 mb-1">Nota Importante</h4>
                        <p className="text-sm text-yellow-800">
                          Após alterar configurações de gráficos, <strong>reinicie o Inventor</strong> para 
                          que as mudanças tenham efeito completo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Checklist Tab */}
          <TabsContent value="checklist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Checklist de Configuração</CardTitle>
                <CardDescription>
                  Siga esta lista para garantir que todas as configurações estão corretas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Pre-Import Checklist */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Circle className="w-5 h-5 text-blue-600" />
                      Antes de Importar o STL
                    </h3>
                    <div className="space-y-3 ml-7">
                      <ChecklistItem text="Verificar tamanho do arquivo STL (< 100 MB recomendado)" />
                      <ChecklistItem text="Confirmar unidades do arquivo (mm, cm, ou inches)" />
                      <ChecklistItem text="Fechar outros projetos pesados no Inventor" />
                      <ChecklistItem text="Verificar espaço em disco disponível (mínimo 5 GB)" />
                      <ChecklistItem text="Salvar trabalho atual antes de importar" />
                    </div>
                  </div>

                  {/* Application Options Checklist */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-green-600" />
                      Application Options
                    </h3>
                    <div className="space-y-3 ml-7">
                      <ChecklistItem text="Tools → Application Options → General → Undo File Size: 50 MB" />
                      <ChecklistItem text="Tools → Application Options → Save → Compress Files: Enabled" />
                      <ChecklistItem text="Tools → Application Options → Part → Modeling Tolerance: 0.001 mm" />
                      <ChecklistItem text="Tools → Application Options → File → Default Template: Standard (mm).ipt" />
                    </div>
                  </div>

                  {/* Graphics Checklist */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Palette className="w-5 h-5 text-purple-600" />
                      Graphics Settings
                    </h3>
                    <div className="space-y-3 ml-7">
                      <ChecklistItem text="Tools → Application Options → Graphics → Mode: Performance" />
                      <ChecklistItem text="Tools → Application Options → Graphics → Hardware Acceleration: Enabled" />
                      <ChecklistItem text="Tools → Application Options → Graphics → Software Graphics: Disabled" />
                      <ChecklistItem text="Tools → Application Options → Graphics → Ray Tracing: Disabled" />
                      <ChecklistItem text="Reiniciar o Inventor após mudanças de gráficos" />
                    </div>
                  </div>

                  {/* Import Settings Checklist */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-orange-600" />
                      Durante a Importação
                    </h3>
                    <div className="space-y-3 ml-7">
                      <ChecklistItem text="File → Open → Files of type: STL Files (*.stl)" />
                      <ChecklistItem text="Import Options → Import as: Mesh Feature" />
                      <ChecklistItem text="Import Options → Template Units: mm (milímetros)" />
                      <ChecklistItem text="Import Options → Embed in Document: Enabled" />
                      <ChecklistItem text="Aguardar carregamento completo (1-3 minutos para malhas grandes)" />
                    </div>
                  </div>

                  {/* Post-Import Checklist */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Eye className="w-5 h-5 text-teal-600" />
                      Após Importação
                    </h3>
                    <div className="space-y-3 ml-7">
                      <ChecklistItem text="Verificar dimensões no Model Browser (devem estar corretas)" />
                      <ChecklistItem text="Salvar arquivo imediatamente (Ctrl+S)" />
                      <ChecklistItem text="Testar rotação e zoom (deve ser fluido)" />
                      <ChecklistItem text="Verificar se a malha aparece no Model Browser como 'MeshFeature1'" />
                      <ChecklistItem text="Fazer backup do arquivo .ipt antes de edições pesadas" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      <span className="text-sm text-gray-700">{text}</span>
    </div>
  );
}
