import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  FileText, 
  Home, 
  Search,
  Settings,
  Eye,
  Edit,
  Box,
  Save,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const sections = [
  { id: 1, title: "Introdução", icon: Home },
  { id: 2, title: "Preparação e Importação", icon: Download },
  { id: 3, title: "Visualização e Análise", icon: Eye },
  { id: 4, title: "Edição da Malha", icon: Edit },
  { id: 5, title: "Conversão para Sólido", icon: Box },
  { id: 6, title: "Edição Paramétrica", icon: Settings },
  { id: 7, title: "Salvamento e Exportação", icon: Save },
  { id: 8, title: "Dicas e Troubleshooting", icon: AlertCircle },
  { id: 9, title: "Alternativas", icon: FileText },
  { id: 10, title: "Recursos Adicionais", icon: BookOpen },
];

export default function InventorGuide() {
  const [currentSection, setCurrentSection] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const progress = (currentSection / sections.length) * 100;

  const goToNext = () => {
    if (currentSection < sections.length) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Box className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Guia Inventor - Edição de STL
                </h1>
                <p className="text-sm text-gray-600">
                  Autodesk Inventor 2025 | Malhas de Alta Resolução
                </p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progresso: Parte {currentSection} de {sections.length}</span>
              <span>{Math.round(progress)}% concluído</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Índice</CardTitle>
                <CardDescription>Navegue pelas seções</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <nav className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => {
                            setCurrentSection(section.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                            currentSection === section.id
                              ? "bg-blue-600 text-white shadow-md"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm font-medium">
                            {section.id}. {section.title}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </ScrollArea>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                {/* Section Content */}
                {currentSection === 1 && <Section1Intro />}
                {currentSection === 2 && <Section2Preparation />}
                {currentSection === 3 && <Section3Visualization />}
                {currentSection === 4 && <Section4Editing />}
                {currentSection === 5 && <Section5Conversion />}
                {currentSection === 6 && <Section6Parametric />}
                {currentSection === 7 && <Section7Save />}
                {currentSection === 8 && <Section8Tips />}
                {currentSection === 9 && <Section9Alternatives />}
                {currentSection === 10 && <Section10Resources />}

                <Separator className="my-8" />

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between">
                  <Button
                    onClick={goToPrevious}
                    disabled={currentSection === 1}
                    variant="outline"
                    size="lg"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Anterior
                  </Button>

                  <span className="text-sm text-gray-600">
                    Parte {currentSection} de {sections.length}
                  </span>

                  <Button
                    onClick={goToNext}
                    disabled={currentSection === sections.length}
                    size="lg"
                  >
                    Próxima
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}

// Section Components
function Section1Intro() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Introdução</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Este guia apresenta o fluxo de trabalho completo para importar, editar e modificar 
        arquivos STL diretamente no <strong>Autodesk Inventor</strong>, preservando todos os 
        detalhes da malha original.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6 rounded-r-lg">
        <h3 className="text-xl font-semibold text-blue-900 mb-3">
          📦 Arquivo de Referência
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Nome:</strong> Alestassemredução.stl</li>
          <li><strong>Faces:</strong> 347.852 (resolução completa)</li>
          <li><strong>Tamanho:</strong> 17 MB</li>
          <li><strong>Detalhes:</strong> Totalmente preservados</li>
        </ul>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Vantagens de trabalhar com STL no Inventor
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {[
          "Importação direta sem conversão prévia",
          "Ferramentas de edição de malha integradas",
          "Preservação de todos os detalhes",
          "Conversão para sólido paramétrico",
          "Interface intuitiva para seleção",
          "Remoção precisa de regiões"
        ].map((advantage, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              ✓
            </div>
            <span className="text-gray-800">{advantage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section2Preparation() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Parte 1: Preparação e Importação
      </h2>

      <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 my-6 rounded-r-lg">
        <h3 className="text-xl font-semibold text-yellow-900 mb-3">
          ⚙️ Requisitos do Sistema
        </h3>
        <table className="w-full mt-4">
          <thead>
            <tr className="border-b-2 border-yellow-200">
              <th className="text-left py-2 px-4">Componente</th>
              <th className="text-left py-2 px-4">Mínimo</th>
              <th className="text-left py-2 px-4">Recomendado</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b border-yellow-100">
              <td className="py-2 px-4 font-medium">RAM</td>
              <td className="py-2 px-4">16 GB</td>
              <td className="py-2 px-4 font-semibold text-green-700">32 GB+</td>
            </tr>
            <tr className="border-b border-yellow-100">
              <td className="py-2 px-4 font-medium">Processador</td>
              <td className="py-2 px-4">Intel i5 / Ryzen 5</td>
              <td className="py-2 px-4 font-semibold text-green-700">Intel i7 / Ryzen 7+</td>
            </tr>
            <tr className="border-b border-yellow-100">
              <td className="py-2 px-4 font-medium">GPU</td>
              <td className="py-2 px-4">2 GB VRAM</td>
              <td className="py-2 px-4 font-semibold text-green-700">4 GB VRAM dedicada</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Inventor</td>
              <td className="py-2 px-4">2018+</td>
              <td className="py-2 px-4 font-semibold text-green-700">2023+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Passo 1.2: Configurar o Inventor
      </h3>
      <ol className="space-y-4 list-decimal list-inside text-gray-700">
        <li className="pl-2">
          Abra o <strong>Autodesk Inventor</strong>
        </li>
        <li className="pl-2">
          Vá em <code className="bg-gray-100 px-2 py-1 rounded">Tools → Application Options</code>
        </li>
        <li className="pl-2">
          Na aba <strong>Hardware</strong>, configure:
          <ul className="ml-8 mt-2 space-y-2 list-disc">
            <li><strong>Graphics Performance:</strong> Performance (para malhas densas)</li>
            <li><strong>Software Graphics:</strong> Desmarque (use GPU)</li>
          </ul>
        </li>
        <li className="pl-2">
          Clique em <strong>OK</strong>
        </li>
      </ol>

      <div className="bg-blue-50 p-6 rounded-lg mt-6">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Dica</h4>
        <p className="text-gray-700">
          Se o Inventor ficar lento, considere trabalhar em um computador mais potente ou 
          simplificar a malha apenas nas regiões que não precisa editar.
        </p>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Passo 1.3: Importar o Arquivo STL
      </h3>
      <ol className="space-y-4 list-decimal list-inside text-gray-700">
        <li className="pl-2">
          No Inventor, clique em <code className="bg-gray-100 px-2 py-1 rounded">File → Open</code>
        </li>
        <li className="pl-2">
          Na janela de diálogo:
          <ul className="ml-8 mt-2 space-y-2 list-disc">
            <li><strong>Files of type:</strong> STL Files (*.stl)</li>
            <li>Navegue até o arquivo <code>Alestassemredução.stl</code></li>
            <li>Clique em <strong>Open</strong></li>
          </ul>
        </li>
        <li className="pl-2">
          Configure as opções de importação:
          <table className="w-full mt-4 border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-2 px-4 border-b">Opção</th>
                <th className="text-left py-2 px-4 border-b">Configuração</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium">Import as</td>
                <td className="py-2 px-4">Mesh Feature</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium">Units</td>
                <td className="py-2 px-4">Millimeters</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium">Merge Tolerance</td>
                <td className="py-2 px-4">0.001 mm</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-medium">Heal Mesh</td>
                <td className="py-2 px-4">✓ Marque</td>
              </tr>
            </tbody>
          </table>
        </li>
        <li className="pl-2 mt-4">
          Clique em <strong>OK</strong> e aguarde 1-3 minutos
        </li>
      </ol>
    </div>
  );
}

function Section3Visualization() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Parte 2: Visualização e Análise da Malha
      </h2>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
        Controles de Visualização
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {[
          { action: "Rotacionar", key: "Botão do meio + arrastar" },
          { action: "Zoom", key: "Rolar scroll do mouse" },
          { action: "Pan (mover)", key: "Shift + botão do meio + arrastar" },
          { action: "Fit All", key: "Tecla F6" }
        ].map((control, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="font-semibold text-gray-900">{control.action}</div>
            <div className="text-sm text-gray-600 mt-1">
              <code className="bg-gray-200 px-2 py-1 rounded">{control.key}</code>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Modos de Visualização
      </h3>
      <p className="text-gray-700 mb-4">
        No canto superior direito, clique no ícone <strong>View</strong> e escolha:
      </p>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-start gap-3">
          <span className="font-semibold min-w-[180px]">Shaded:</span>
          <span>Sombreado (padrão)</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="font-semibold min-w-[180px]">Shaded with Edges:</span>
          <span>Mostra as arestas da malha (recomendado)</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="font-semibold min-w-[180px]">Wireframe:</span>
          <span>Apenas arestas (útil para ver estrutura interna)</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="font-semibold min-w-[180px]">X-Ray:</span>
          <span>Transparente (para ver sobreposições)</span>
        </li>
      </ul>

      <div className="bg-green-50 p-6 rounded-lg mt-6">
        <h4 className="font-semibold text-green-900 mb-2">✅ Recomendação</h4>
        <p className="text-gray-700">
          Use <strong>Shaded with Edges</strong> para identificar facilmente as regiões a remover.
        </p>
      </div>
    </div>
  );
}

function Section4Editing() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Parte 3: Edição da Malha - Remover Detalhes
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Esta é a parte principal: como remover detalhes indesejados mantendo a geometria principal.
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Método 1: Seleção e Exclusão de Faces
      </h3>

      <div className="bg-purple-50 border-l-4 border-purple-600 p-6 my-6 rounded-r-lg">
        <h4 className="text-lg font-semibold text-purple-900 mb-3">
          Ativar Modo de Edição
        </h4>
        <ol className="space-y-2 text-gray-700 list-decimal list-inside">
          <li>No <strong>Browser</strong>, clique com botão direito na malha</li>
          <li>Selecione <strong>Edit Mesh Feature</strong></li>
          <li>A barra de ferramentas <strong>Mesh</strong> aparecerá</li>
        </ol>
      </div>

      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
        Opções de Seleção
      </h4>

      <div className="space-y-4">
        <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
          <h5 className="font-semibold text-blue-900 mb-2">
            Opção A: Seleção Manual
          </h5>
          <p className="text-gray-700 text-sm mb-2">Para detalhes pequenos</p>
          <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside ml-2">
            <li><code>Ctrl + Clique</code>: Adiciona à seleção</li>
            <li><code>Shift + Clique</code>: Seleciona região entre dois cliques</li>
            <li><strong>Janela de seleção:</strong> Arraste para criar retângulo</li>
          </ul>
        </div>

        <div className="p-5 bg-green-50 rounded-lg border border-green-200">
          <h5 className="font-semibold text-green-900 mb-2">
            Opção B: Seleção por Região
          </h5>
          <p className="text-gray-700 text-sm mb-2">Para áreas maiores</p>
          <p className="text-gray-700 text-sm">
            <code className="bg-gray-100 px-2 py-1 rounded">Mesh → Select → Select by Region</code>
          </p>
          <ul className="space-y-1 text-gray-700 text-sm list-disc list-inside ml-2 mt-2">
            <li><strong>Box:</strong> Caixa retangular</li>
            <li><strong>Lasso:</strong> Desenhe contorno livre</li>
            <li><strong>Plane:</strong> Seleciona tudo de um lado de um plano</li>
          </ul>
        </div>

        <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-200">
          <h5 className="font-semibold text-yellow-900 mb-2">
            Opção C: Seleção por Conectividade
          </h5>
          <p className="text-gray-700 text-sm mb-2">Para ilhas isoladas</p>
          <p className="text-gray-700 text-sm">
            <code className="bg-gray-100 px-2 py-1 rounded">Mesh → Select → Select Connected</code>
          </p>
          <p className="text-gray-700 text-sm mt-2">
            Clique em uma face do detalhe isolado e todas as faces conectadas serão selecionadas.
          </p>
        </div>
      </div>

      <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        Excluir Faces Selecionadas
      </h4>
      <p className="text-gray-700 mb-4">
        Após selecionar as faces indesejadas:
      </p>
      <ul className="space-y-2 text-gray-700 list-disc list-inside">
        <li>Pressione a tecla <code className="bg-gray-100 px-2 py-1 rounded">Delete</code> ou</li>
        <li>Clique em <code className="bg-gray-100 px-2 py-1 rounded">Mesh → Delete Faces</code></li>
      </ul>

      <div className="bg-red-50 p-6 rounded-lg mt-6">
        <h4 className="font-semibold text-red-900 mb-2">⚠️ Importante</h4>
        <p className="text-gray-700">
          Se criar buracos na malha, você precisará preenchê-los usando 
          <code className="bg-gray-100 px-2 py-1 rounded mx-1">Mesh → Fill Holes</code>
        </p>
      </div>
    </div>
  );
}

function Section5Conversion() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Parte 4: Conversão para Sólido Editável
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Depois de remover os detalhes indesejados, você pode converter a malha para um 
        sólido paramétrico do Inventor.
      </p>

      <div className="bg-orange-50 border-l-4 border-orange-600 p-6 my-6 rounded-r-lg">
        <h3 className="text-xl font-semibold text-orange-900 mb-3">
          ✓ Preparar a Malha
        </h3>
        <p className="text-gray-700 mb-3">Antes de converter, certifique-se de que:</p>
        <ul className="space-y-2 text-gray-700 list-disc list-inside">
          <li>A malha não tem buracos</li>
          <li>As normais estão corretas</li>
          <li>A malha está fechada (sem aberturas)</li>
        </ul>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Converter Malha para Superfície
      </h3>
      <ol className="space-y-4 list-decimal list-inside text-gray-700">
        <li className="pl-2">
          Clique com botão direito na malha no <strong>Browser</strong>
        </li>
        <li className="pl-2">
          Selecione <code className="bg-gray-100 px-2 py-1 rounded">Mesh → Convert to Surface</code>
        </li>
        <li className="pl-2">
          Configure as opções:
          <table className="w-full mt-4 border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-2 px-4 border-b">Opção</th>
                <th className="text-left py-2 px-4 border-b">Configuração</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium">Method</td>
                <td className="py-2 px-4">Automatic</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium">Tolerance</td>
                <td className="py-2 px-4">0.1 mm</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium">Simplify</td>
                <td className="py-2 px-4">Desmarque</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-medium">Create Solid</td>
                <td className="py-2 px-4">✓ Marque</td>
              </tr>
            </tbody>
          </table>
        </li>
        <li className="pl-2 mt-4">
          Clique em <strong>OK</strong> e aguarde 5-15 minutos
        </li>
      </ol>

      <div className="bg-blue-50 p-6 rounded-lg mt-6">
        <h4 className="font-semibold text-blue-900 mb-2">⏱️ Tempo de Conversão</h4>
        <p className="text-gray-700">
          Pode levar 5-15 minutos dependendo da complexidade da malha. Seja paciente!
        </p>
      </div>
    </div>
  );
}

function Section6Parametric() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Parte 5: Edição Paramétrica do Sólido
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Agora que você tem um sólido, pode usar todas as ferramentas tradicionais do Inventor!
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
        Operações Comuns
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 border-b">Operação</th>
              <th className="text-left py-3 px-4 border-b">Comando</th>
              <th className="text-left py-3 px-4 border-b">Atalho</th>
              <th className="text-left py-3 px-4 border-b">Descrição</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {[
              { op: "Adicionar furo", cmd: "Hole", key: "H", desc: "Cria furos cilíndricos ou roscados" },
              { op: "Adicionar filete", cmd: "Fillet", key: "F", desc: "Arredonda arestas" },
              { op: "Adicionar chanfro", cmd: "Chamfer", key: "-", desc: "Cria chanfros em arestas" },
              { op: "Extrudar face", cmd: "Extrude", key: "E", desc: "Adiciona ou remove material" },
              { op: "Cortar com plano", cmd: "Split", key: "-", desc: "Divide o sólido" },
              { op: "Espelhar", cmd: "Mirror", key: "-", desc: "Espelha features" }
            ].map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{row.op}</td>
                <td className="py-3 px-4">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">{row.cmd}</code>
                </td>
                <td className="py-3 px-4">
                  <code className="bg-blue-100 px-2 py-1 rounded text-sm font-semibold">{row.key}</code>
                </td>
                <td className="py-3 px-4 text-sm">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Exemplo: Adicionar um Furo
      </h3>
      <ol className="space-y-3 list-decimal list-inside text-gray-700">
        <li className="pl-2">
          Clique na aba <strong>3D Model</strong>
        </li>
        <li className="pl-2">
          Clique em <strong>Hole</strong> (ou pressione <code className="bg-gray-100 px-2 py-1 rounded">H</code>)
        </li>
        <li className="pl-2">
          Clique na face onde deseja o furo
        </li>
        <li className="pl-2">
          Configure:
          <ul className="ml-8 mt-2 space-y-2 list-disc">
            <li><strong>Diameter:</strong> 10 mm (exemplo)</li>
            <li><strong>Termination:</strong> Through All</li>
          </ul>
        </li>
        <li className="pl-2">
          Clique em <strong>OK</strong>
        </li>
      </ol>
    </div>
  );
}

function Section7Save() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Parte 6: Salvamento e Exportação
      </h2>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
        Salvar o Projeto
      </h3>
      <ol className="space-y-3 list-decimal list-inside text-gray-700">
        <li className="pl-2">
          Clique em <code className="bg-gray-100 px-2 py-1 rounded">File → Save</code>
        </li>
        <li className="pl-2">
          Escolha o local e nome: <code className="bg-gray-100 px-2 py-1 rounded">Aleta_Editada.ipt</code>
        </li>
        <li className="pl-2">
          Clique em <strong>Save</strong>
        </li>
      </ol>

      <div className="bg-green-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold text-green-900 mb-2">💾 O que é salvo?</h4>
        <ul className="space-y-2 text-gray-700 list-disc list-inside">
          <li>A malha original (oculta)</li>
          <li>A malha editada</li>
          <li>O sólido convertido (se aplicável)</li>
          <li>Todas as features adicionadas</li>
        </ul>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Exportar para Outros Formatos
      </h3>

      <p className="text-gray-700 mb-4">
        Clique em <code className="bg-gray-100 px-2 py-1 rounded">File → Export → CAD Format</code>
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 border-b">Formato</th>
              <th className="text-left py-3 px-4 border-b">Extensão</th>
              <th className="text-left py-3 px-4 border-b">Uso Recomendado</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {[
              { format: "STEP", ext: ".step, .stp", use: "CAD/CAM universal, CNC" },
              { format: "IGES", ext: ".igs", use: "CAD antigo, compatibilidade" },
              { format: "Parasolid", ext: ".x_t, .x_b", use: "SolidWorks, NX, Solid Edge" },
              { format: "SAT", ext: ".sat", use: "ACIS-based CAD" },
              { format: "STL", ext: ".stl", use: "Impressão 3D (malha editada)" },
              { format: "DWG", ext: ".dwg", use: "AutoCAD (apenas 2D)" }
            ].map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{row.format}</td>
                <td className="py-3 px-4">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">{row.ext}</code>
                </td>
                <td className="py-3 px-4 text-sm">{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Section8Tips() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Parte 7: Dicas e Solução de Problemas
      </h2>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
        Problemas Comuns
      </h3>

      <div className="space-y-6">
        <div className="p-6 bg-red-50 rounded-lg border-l-4 border-red-600">
          <h4 className="text-lg font-semibold text-red-900 mb-2">
            ❌ Problema 1: Inventor trava ao importar STL
          </h4>
          <p className="text-gray-700 mb-3"><strong>Causas possíveis:</strong></p>
          <ul className="space-y-1 text-gray-700 list-disc list-inside ml-4 mb-3">
            <li>RAM insuficiente</li>
            <li>Arquivo STL corrompido</li>
            <li>Placa de vídeo incompatível</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Soluções:</strong></p>
          <ol className="space-y-1 text-gray-700 list-decimal list-inside ml-4">
            <li>Feche outros programas para liberar RAM</li>
            <li>Verifique se o STL está íntegro</li>
            <li>Ative "Use Software Graphics" nas opções</li>
            <li>Simplifique a malha antes de importar</li>
          </ol>
        </div>

        <div className="p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-600">
          <h4 className="text-lg font-semibold text-yellow-900 mb-2">
            ⚠️ Problema 2: Não consigo selecionar faces pequenas
          </h4>
          <p className="text-gray-700 mb-2"><strong>Solução:</strong></p>
          <ol className="space-y-1 text-gray-700 list-decimal list-inside ml-4">
            <li>Dê zoom na região (rolar scroll)</li>
            <li>Use <strong>Shaded with Edges</strong></li>
            <li>Use seleção por janela (arraste retângulo)</li>
            <li>Ajuste sensibilidade em Tools → Application Options</li>
          </ol>
        </div>

        <div className="p-6 bg-orange-50 rounded-lg border-l-4 border-orange-600">
          <h4 className="text-lg font-semibold text-orange-900 mb-2">
            🔧 Problema 3: Conversão para sólido falha
          </h4>
          <p className="text-gray-700 mb-3"><strong>Causas:</strong></p>
          <ul className="space-y-1 text-gray-700 list-disc list-inside ml-4 mb-3">
            <li>Malha com buracos</li>
            <li>Normais invertidas</li>
            <li>Geometria não-manifold</li>
          </ul>
          <p className="text-gray-700 mb-2"><strong>Soluções:</strong></p>
          <ol className="space-y-1 text-gray-700 list-decimal list-inside ml-4">
            <li>Use <code className="bg-gray-100 px-2 py-1 rounded">Mesh → Analyze Mesh</code></li>
            <li>Use <code className="bg-gray-100 px-2 py-1 rounded">Mesh → Repair</code></li>
            <li>Preencha buracos com <code className="bg-gray-100 px-2 py-1 rounded">Fill Holes</code></li>
            <li>Converta apenas uma parte por vez</li>
          </ol>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Dicas para Melhor Resultado
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: "📝", tip: "Trabalhe em etapas", desc: "Remova detalhes aos poucos, salvando versões intermediárias" },
          { icon: "📁", tip: "Use camadas", desc: "Duplique a malha antes de editar para ter backup" },
          { icon: "🏷️", tip: "Nomeie features", desc: "Renomeie operações no Browser para facilitar navegação" },
          { icon: "🎯", tip: "Use vistas ortogonais", desc: "Pressione F5 para alternar entre vistas" },
          { icon: "⌨️", tip: "Atalhos úteis", desc: "Ctrl+Z (desfazer), Ctrl+Y (refazer), F6 (fit all)" },
          { icon: "✂️", tip: "Slice Graphics", desc: "Pressione F7 para cortar visualmente e ver interior" }
        ].map((item, index) => (
          <div key={index} className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-2">{item.icon}</div>
            <h4 className="font-semibold text-gray-900 mb-1">{item.tip}</h4>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section9Alternatives() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Parte 8: Alternativas e Ferramentas Complementares
      </h2>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
        Ferramentas de Preparação de Malha
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 border-b">Software</th>
              <th className="text-left py-3 px-4 border-b">Função Principal</th>
              <th className="text-left py-3 px-4 border-b">Custo</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {[
              { soft: "Meshmixer", func: "Edição de malha, remoção de detalhes, suavização", cost: "Grátis", color: "text-green-700" },
              { soft: "MeshLab", func: "Limpeza, simplificação, análise de malha", cost: "Grátis", color: "text-green-700" },
              { soft: "Netfabb", func: "Reparo de malha, preparação para impressão 3D", cost: "Pago", color: "text-orange-700" },
              { soft: "Geomagic Wrap", func: "Processamento avançado, reverse engineering", cost: "Pago", color: "text-orange-700" }
            ].map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{row.soft}</td>
                <td className="py-3 px-4 text-sm">{row.func}</td>
                <td className="py-3 px-4">
                  <span className={`font-semibold ${row.color}`}>{row.cost}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Workflow Híbrido Recomendado
      </h3>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
        <h4 className="text-lg font-semibold text-purple-900 mb-4">
          🚀 Para malhas muito complexas:
        </h4>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Meshmixer (grátis)</h5>
              <ul className="text-sm text-gray-700 list-disc list-inside ml-2 mt-1">
                <li>Remova detalhes grosseiros</li>
                <li>Simplifique regiões não-críticas</li>
                <li>Exporte STL limpo</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Inventor</h5>
              <ul className="text-sm text-gray-700 list-disc list-inside ml-2 mt-1">
                <li>Importe o STL pré-processado</li>
                <li>Faça ajustes finos</li>
                <li>Converta para sólido</li>
                <li>Adicione features paramétricas</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Vantagem:</strong> Este approach reduz a carga no Inventor e acelera o processo significativamente!
          </p>
        </div>
      </div>
    </div>
  );
}

function Section10Resources() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Parte 9: Recursos Adicionais
      </h2>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
        Tutoriais em Vídeo
      </h3>
      <p className="text-gray-700 mb-4">Procure no YouTube por:</p>
      <ul className="space-y-2 text-gray-700 list-disc list-inside">
        <li>"Inventor mesh editing tutorial"</li>
        <li>"Inventor STL to solid"</li>
        <li>"Inventor mesh feature"</li>
      </ul>

      <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Documentação Oficial
      </h3>
      <div className="space-y-3">
        <a 
          href="https://knowledge.autodesk.com/support/inventor" 
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
        >
          <div className="font-semibold text-blue-900">Autodesk Inventor Help - Mesh Features</div>
          <div className="text-sm text-gray-600 mt-1">knowledge.autodesk.com/support/inventor</div>
        </a>
        <a 
          href="https://help.autodesk.com/view/INVNTOR/" 
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
        >
          <div className="font-semibold text-blue-900">Inventor User's Guide - Working with Mesh</div>
          <div className="text-sm text-gray-600 mt-1">help.autodesk.com/view/INVNTOR/</div>
        </a>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Comunidades e Fóruns
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "Autodesk Community", url: "forums.autodesk.com/inventor", desc: "Fórum oficial com especialistas" },
          { name: "Inventor Ideas", url: "forums.autodesk.com", desc: "Sugira melhorias para o software" },
          { name: "Reddit r/Inventor", url: "reddit.com/r/Inventor", desc: "Comunidade ativa de usuários" },
          { name: "Eng-Tips", url: "eng-tips.com", desc: "Fórum técnico de engenharia" }
        ].map((resource, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-1">{resource.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{resource.desc}</p>
            <code className="text-xs text-blue-600">{resource.url}</code>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border-2 border-green-300 mt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">🎉 Parabéns!</h3>
        <p className="text-lg text-gray-700 mb-4">
          Você completou o guia completo de edição de STL no Autodesk Inventor!
        </p>
        <p className="text-gray-700 mb-6">
          Com este conhecimento, você está pronto para importar, editar e converter malhas 
          complexas mantendo todos os detalhes importantes. Lembre-se de praticar e explorar 
          as ferramentas para dominar completamente o processo.
        </p>
        <div className="bg-white p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">📁 Arquivo de Referência:</h4>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li><strong>Nome:</strong> Alestassemredução.stl</li>
            <li><strong>Faces:</strong> 347.852 (resolução completa)</li>
            <li><strong>Tamanho:</strong> 17 MB</li>
            <li><strong>Status:</strong> Pronto para importação!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
