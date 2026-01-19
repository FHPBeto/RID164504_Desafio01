import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { useState } from "react";

interface Attribute {
  name: string;
  type: string;
  isPK?: boolean;
  isFK?: boolean;
  isError?: boolean;
  isMissing?: boolean;
  correction?: string;
}

interface Entity {
  id: string;
  name: string;
  attributes: Attribute[];
  x: number;
  y: number;
}

export default function ERDiagram() {
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [showCorrections, setShowCorrections] = useState(false);

  const entities: Entity[] = [
    {
      id: "aluno",
      name: "Aluno",
      x: 50,
      y: 50,
      attributes: [
        { name: "ra", type: "VARCHAR(15)", isPK: true },
        { name: "nome", type: "VARCHAR(100)" },
        { name: "email", type: "VARCHAR(100)" },
        { name: "telefone", type: "VARCHAR(20)" },
      ],
    },
    {
      id: "livro",
      name: "Livro",
      x: 50,
      y: 350,
      attributes: [
        { name: "isbn", type: "VARCHAR(13)", isPK: true },
        { name: "nome", type: "VARCHAR(150)" },
        { name: "autor", type: "VARCHAR(100)" },
        { name: "paginas", type: "INT" },
      ],
    },
    {
      id: "colaborador",
      name: "Colaborador",
      x: 650,
      y: 200,
      attributes: [
        { name: "cpf", type: "VARCHAR(11)", isPK: true },
        { name: "nome", type: "VARCHAR(100)" },
        { name: "cargo", type: "VARCHAR(50)" },
        { name: "email", type: "VARCHAR(100)" },
      ],
    },
    {
      id: "emprestimo",
      name: "Emprestimo",
      x: 350,
      y: 200,
      attributes: [
        { name: "id", type: "INT", isPK: true },
        { name: "dataEmprestimo", type: "DATE" },
        { name: "dataDevolucao", type: "DATE" },
        { name: "colaboradorCpf", type: "VARCHAR(11)", isFK: true },
        { 
          name: "livroIsbn", 
          type: "VARCHAR(45)", 
          isFK: true, 
          isError: true, 
          correction: "VARCHAR(13)" 
        },
        { 
          name: "alunoRa", 
          type: "VARCHAR(15)", 
          isFK: true, 
          isMissing: true, 
          correction: "Adicionar FK" 
        },
      ],
    },
  ];

  return (
    <div className="relative w-full h-[600px] bg-background border-2 border-black overflow-hidden p-4">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => setShowCorrections(!showCorrections)}
          className={`neobrutalist-button px-4 py-2 flex items-center gap-2 ${
            showCorrections ? "bg-destructive" : "bg-primary"
          }`}
        >
          {showCorrections ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          {showCorrections ? "Ocultar Correções" : "Ver Correções"}
        </button>
      </div>

      {/* Connection Lines (Simplified for demo) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </defs>
        
        {/* Aluno -> Emprestimo */}
        <line x1="250" y1="150" x2="350" y2="250" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
        
        {/* Livro -> Emprestimo */}
        <line x1="250" y1="450" x2="350" y2="350" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
        
        {/* Colaborador -> Emprestimo */}
        <line x1="650" y1="300" x2="550" y2="300" stroke="black" strokeWidth="2" />
      </svg>

      {entities.map((entity) => (
        <motion.div
          key={entity.id}
          className={`absolute w-64 bg-white neobrutalist-card cursor-pointer ${
            selectedEntity === entity.id ? "z-20 ring-4 ring-primary" : "z-10"
          }`}
          style={{ left: entity.x, top: entity.y }}
          onClick={() => setSelectedEntity(entity.id)}
          whileHover={{ scale: 1.02 }}
          drag
          dragConstraints={{ left: 0, right: 800, top: 0, bottom: 500 }}
        >
          <div className="bg-black text-white p-2 font-bold flex justify-between items-center">
            <span>{entity.name}</span>
            {entity.id === "emprestimo" && (
              <span className="bg-destructive text-white text-xs px-1">⚠️ 2 Erros</span>
            )}
          </div>
          <div className="p-2 space-y-1">
            {entity.attributes.map((attr, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center text-sm p-1 ${
                  attr.isMissing && !showCorrections ? "hidden" : ""
                } ${
                  attr.isError && showCorrections ? "bg-red-100" : ""
                } ${
                  attr.isMissing && showCorrections ? "bg-green-100 border border-green-500 border-dashed" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {attr.isPK && <span className="text-primary font-bold text-xs">PK</span>}
                  {attr.isFK && <span className="text-gray-500 font-bold text-xs">FK</span>}
                  <span className={attr.isError && showCorrections ? "line-through decoration-destructive" : ""}>
                    {attr.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-xs ${attr.isError && showCorrections ? "line-through decoration-destructive" : ""}`}>
                    {attr.type}
                  </span>
                  {showCorrections && (attr.isError || attr.isMissing) && (
                    <div className="absolute left-full ml-2 bg-white border-2 border-black p-2 w-48 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-30">
                      <div className="text-xs font-bold mb-1 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" /> Correção:
                      </div>
                      <div className="text-xs text-primary font-bold">
                        {attr.correction}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
