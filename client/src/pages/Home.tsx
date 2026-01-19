import ERDiagram from "@/components/ERDiagram";
import { Check, Database, FileText, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <header className="border-b-4 border-black bg-accent p-8 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: "url('/images/hero-bg.png')", backgroundSize: "cover" }}></div>
        
        <div className="container relative z-10">
          <div className="inline-block bg-black text-white px-4 py-1 font-bold mb-4 uppercase tracking-wider">
            Relatório Técnico
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Análise de Modelo<br />
            <span className="text-primary">Banco de Dados</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl font-mono mb-8 border-l-4 border-primary pl-4">
            Diagnóstico completo do esquema relacional para o sistema de biblioteca universitária.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="neobrutalist-card bg-white p-4 flex items-center gap-3">
              <div className="bg-green-500 w-3 h-3 rounded-full"></div>
              <span className="font-bold">Status: 80% Correto</span>
            </div>
            <div className="neobrutalist-card bg-white p-4 flex items-center gap-3">
              <div className="bg-destructive w-3 h-3 rounded-full animate-pulse"></div>
              <span className="font-bold">2 Correções Pendentes</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-12 space-y-24">
        
        {/* Interactive Diagram Section */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-black text-white p-3">
              <Search className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold">Diagrama Interativo</h2>
          </div>
          
          <p className="mb-6 text-lg">
            Visualize o modelo atual e clique em <span className="bg-primary text-white px-2 font-bold">Ver Correções</span> para identificar os problemas encontrados na tabela <span className="font-mono bg-gray-200 px-1">Emprestimo</span>.
          </p>

          <ERDiagram />
        </section>

        {/* Analysis Details */}
        <section className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-black text-white p-3">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-bold">Pontos Corretos</h2>
            </div>
            
            <div className="space-y-6">
              <div className="neobrutalist-card bg-white p-6 border-l-8 border-l-green-500">
                <h3 className="text-xl font-bold mb-2">Tabela Aluno</h3>
                <p className="font-mono text-sm text-gray-600">PK: ra (VARCHAR 15)</p>
                <p className="mt-2">Estrutura perfeita com todos os atributos necessários para identificação e contato.</p>
              </div>

              <div className="neobrutalist-card bg-white p-6 border-l-8 border-l-green-500">
                <h3 className="text-xl font-bold mb-2">Tabela Livro</h3>
                <p className="font-mono text-sm text-gray-600">PK: isbn (VARCHAR 13)</p>
                <p className="mt-2">ISBN corretamente definido como chave primária e tipagem adequada.</p>
              </div>

              <div className="neobrutalist-card bg-white p-6 border-l-8 border-l-green-500">
                <h3 className="text-xl font-bold mb-2">Tabela Colaborador</h3>
                <p className="font-mono text-sm text-gray-600">PK: cpf (VARCHAR 11)</p>
                <p className="mt-2">Dados do funcionário bem estruturados com CPF como identificador único.</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-destructive text-white p-3">
                <FileText className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-bold">Correções Necessárias</h2>
            </div>

            <div className="space-y-6">
              <div className="neobrutalist-card bg-red-50 p-6 border-l-8 border-l-destructive">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">1. Falta Relacionamento</h3>
                  <span className="bg-destructive text-white text-xs px-2 py-1 font-bold uppercase">Crítico</span>
                </div>
                <p className="mb-4">A tabela <span className="font-mono font-bold">Emprestimo</span> não possui vínculo com o aluno.</p>
                <div className="bg-white border-2 border-black p-4 font-mono text-sm">
                  <p className="text-green-600 font-bold">+ alunoRa VARCHAR(15)</p>
                  <p className="text-gray-500 italic">-- Adicionar como Foreign Key</p>
                </div>
              </div>

              <div className="neobrutalist-card bg-yellow-50 p-6 border-l-8 border-l-yellow-500">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">2. Inconsistência de Tipo</h3>
                  <span className="bg-yellow-500 text-black text-xs px-2 py-1 font-bold uppercase">Atenção</span>
                </div>
                <p className="mb-4">O campo <span className="font-mono font-bold">livroIsbn</span> tem tamanho diferente da origem.</p>
                <div className="bg-white border-2 border-black p-4 font-mono text-sm">
                  <p className="text-red-500 line-through">livroIsbn VARCHAR(45)</p>
                  <p className="text-green-600 font-bold">livroIsbn VARCHAR(13)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="bg-black text-white p-8 md:p-12 neobrutalist-card">
          <div className="flex items-center gap-4 mb-8">
            <Database className="w-12 h-12 text-primary" />
            <h2 className="text-4xl font-bold">Próximos Passos no Workbench</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-2 border-white/20 p-6 hover:bg-white/10 transition-colors">
              <span className="text-6xl font-black text-white/10 absolute -mt-10 -ml-4">1</span>
              <h3 className="text-xl font-bold mb-4 relative z-10">Adicionar Coluna</h3>
              <p className="text-gray-300">
                Na tabela Emprestimo, adicione a coluna <code className="bg-white/20 px-1">alunoRa</code> com tipo VARCHAR(15).
              </p>
            </div>

            <div className="border-2 border-white/20 p-6 hover:bg-white/10 transition-colors">
              <span className="text-6xl font-black text-white/10 absolute -mt-10 -ml-4">2</span>
              <h3 className="text-xl font-bold mb-4 relative z-10">Ajustar Tipo</h3>
              <p className="text-gray-300">
                Corrija <code className="bg-white/20 px-1">livroIsbn</code> para VARCHAR(13) para bater com a tabela Livro.
              </p>
            </div>

            <div className="border-2 border-white/20 p-6 hover:bg-white/10 transition-colors">
              <span className="text-6xl font-black text-white/10 absolute -mt-10 -ml-4">3</span>
              <h3 className="text-xl font-bold mb-4 relative z-10">Criar Vínculos</h3>
              <p className="text-gray-300">
                Use a ferramenta de relacionamento 1:N para conectar as tabelas visualmente.
              </p>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-accent border-t-4 border-black py-12 mt-12">
        <div className="container text-center">
          <p className="font-mono text-sm">
            Análise gerada automaticamente por <span className="font-bold">Manus AI</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
