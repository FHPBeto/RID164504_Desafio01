// Search content index for all 10 sections of the Inventor Guide
export interface SearchResult {
  sectionId: number;
  sectionTitle: string;
  matchedText: string;
  context: string;
}

const sectionContent = [
  {
    id: 1,
    title: "Introdução",
    content: `
      Introdução ao fluxo de trabalho completo para importar, editar e modificar arquivos STL 
      diretamente no Autodesk Inventor, preservando todos os detalhes da malha original.
      Arquivo de Referência: Alestassemredução.stl com 347.852 faces e 17 MB.
      Vantagens: Importação direta sem conversão prévia, ferramentas de edição de malha integradas,
      preservação de todos os detalhes, conversão para sólido paramétrico, interface intuitiva,
      remoção precisa de regiões.
    `
  },
  {
    id: 2,
    title: "Preparação e Importação",
    content: `
      Requisitos do Sistema: RAM mínimo 16 GB (recomendado 32 GB+), Processador Intel i5/Ryzen 5
      (recomendado i7/Ryzen 7+), GPU 2 GB VRAM (recomendado 4 GB dedicada), Inventor 2018+ (recomendado 2023+).
      Configurar o Inventor: Tools → Application Options, aba Hardware, Graphics Performance: Performance,
      Software Graphics: Desmarque. Importar arquivo STL: File → Open, Files of type: STL Files,
      Import as: Mesh Feature, Units: Millimeters, Merge Tolerance: 0.001 mm, Heal Mesh: marque.
    `
  },
  {
    id: 3,
    title: "Visualização e Análise",
    content: `
      Controles de Visualização: Rotacionar (botão do meio + arrastar), Zoom (scroll do mouse),
      Pan (Shift + botão do meio), Fit All (F6). Modos de Visualização: Shaded, Wireframe,
      Shaded with Edges. Verificar qualidade da malha: Mesh Browser, verificar faces, arestas,
      vértices. Identificar problemas: faces invertidas, buracos, arestas soltas.
    `
  },
  {
    id: 4,
    title: "Edição da Malha",
    content: `
      Ferramentas de edição de malha: Mesh Select, Delete Faces, Fill Holes, Smooth Mesh,
      Remesh. Selecionar regiões para remover: usar Mesh Select Tool, selecionar faces,
      deletar com Delete key. Limpar malha: remover faces desnecessárias, preencher buracos,
      suavizar transições. Dicas: trabalhar em zoom, salvar frequentemente, usar Undo se necessário.
    `
  },
  {
    id: 5,
    title: "Conversão para Sólido",
    content: `
      Converter malha para sólido: Mesh to BRep, configurar tolerância, verificar resultado.
      Opções de conversão: Standard, High Quality, Custom. Verificar geometria resultante:
      verificar faces, arestas, verificar volume. Resolver problemas: ajustar tolerância,
      reparar malha antes da conversão, usar ferramentas de reparo.
    `
  },
  {
    id: 6,
    title: "Edição Paramétrica",
    content: `
      Edição paramétrica após conversão: criar sketches, adicionar features, modificar dimensões.
      Ferramentas disponíveis: Extrude, Revolve, Sweep, Loft, Hole, Fillet, Chamfer.
      Criar features: selecionar faces, criar sketch, aplicar operações. Modificar geometria:
      editar sketches, alterar dimensões, adicionar constraints.
    `
  },
  {
    id: 7,
    title: "Salvamento e Exportação",
    content: `
      Salvar arquivo: File → Save As, formato IPT (Inventor Part). Exportar para outros formatos:
      STEP, IGES, Parasolid, STL (otimizado). Configurações de exportação: unidades, tolerância,
      qualidade. Backup: manter cópias, versionar arquivos, documentar alterações.
    `
  },
  {
    id: 8,
    title: "Dicas e Troubleshooting",
    content: `
      Problemas comuns: Inventor lento (reduzir qualidade de visualização, fechar outros programas),
      Malha não converte (reparar malha, ajustar tolerância), Faces faltando (verificar mesh browser,
      preencher buracos). Otimização: trabalhar com cópias, simplificar malha em regiões não críticas,
      usar hardware adequado. Boas práticas: salvar frequentemente, nomear arquivos claramente,
      documentar processo.
    `
  },
  {
    id: 9,
    title: "Alternativas",
    content: `
      Alternativas ao Inventor: Meshmixer (edição de malha gratuita), Fusion 360 (similar ao Inventor),
      Blender (open source, poderoso), FreeCAD (open source CAD). Quando usar cada ferramenta:
      Meshmixer para edição rápida de malha, Fusion 360 para projetos completos, Blender para
      modelagem orgânica, FreeCAD para projetos open source. Comparação de recursos: cada ferramenta
      tem pontos fortes específicos.
    `
  },
  {
    id: 10,
    title: "Recursos Adicionais",
    content: `
      Recursos adicionais: Autodesk Knowledge Network, fóruns da comunidade, tutoriais em vídeo,
      documentação oficial. Links úteis: help.autodesk.com, forums.autodesk.com, YouTube Autodesk,
      Inventor blog. Suporte: Autodesk Support, comunidade de usuários, grupos no LinkedIn,
      Discord/Slack communities. Aprendizado contínuo: cursos online, certificações Autodesk,
      webinars, eventos da comunidade.
    `
  }
];

export function searchInContent(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  sectionContent.forEach((section) => {
    const content = section.content.toLowerCase();
    const contentLines = section.content.split(/[.!?]\s+/);

    // Check if search term exists in this section
    if (content.includes(searchTerm)) {
      // Find matching sentences
      contentLines.forEach((line) => {
        if (line.toLowerCase().includes(searchTerm)) {
          const cleanLine = line.trim();
          if (cleanLine.length > 10) {
            results.push({
              sectionId: section.id,
              sectionTitle: section.title,
              matchedText: cleanLine,
              context: cleanLine.substring(0, 150) + (cleanLine.length > 150 ? "..." : "")
            });
          }
        }
      });
    }
  });

  return results;
}

export function highlightText(text: string, query: string): string {
  if (!query) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-600">$1</mark>');
}
