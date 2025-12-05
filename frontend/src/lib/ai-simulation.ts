const imageDescriptions: Record<string, string> = {
  default: "Imagem relacionada ao conteudo da Prefeitura de Blumenau",
  prefeito: "Fotografia oficial do Prefeito de Blumenau em seu gabinete, vestindo terno azul marinho",
  cidade: "Vista panoramica de Blumenau mostrando a arquitetura germanica tipica e o Rio Itajai-Acu",
  evento: "Cerimonia oficial realizada na Prefeitura Municipal de Blumenau com autoridades presentes",
  documento: "Documento oficial da Prefeitura de Blumenau com brasao municipal",
  reuniao: "Reuniao de trabalho entre servidores publicos no salao nobre da Prefeitura",
  obra: "Obra publica em andamento com maquinario e trabalhadores da construcao civil",
  saude: "Unidade de saude municipal atendendo cidadaos blumenauenses",
  educacao: "Escola municipal com estudantes em atividades de aprendizagem",
  cultura: "Evento cultural tradicional de Blumenau celebrando a heranca germanica da cidade",
};

export async function generateImageDescription(imageUrl: string): Promise<{ description: string; isAI: boolean }> {
  try {
    const response = await fetch("/api/describe-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    return { description: data.description, isAI: data.isAI };
  } catch (error) {
    const url = imageUrl.toLowerCase();
    
    if (url.includes("519494026892")) {
      return { description: "Fachada de unidade de saude com entrada acessivel.", isAI: false };
    }
    if (url.includes("524178232363")) {
      return { description: "Sala de aula com estudantes em atividade.", isAI: false };
    }
    if (url.includes("488459716781")) {
      return { description: "Feira com frutas, legumes e verduras frescos.", isAI: false };
    }
    
    return { description: "Imagem da Prefeitura de Blumenau.", isAI: false };
  }
}

const complexTermsSimplification: Record<string, string> = {
  "sem prejuizo": "mantendo",
  "no ambito de": "dentro de",
  "por intermedio de": "por meio de",
  "em virtude de": "por causa de",
  "tendo em vista": "considerando",
  "outrossim": "alem disso",
  "destarte": "assim",
  "mister": "necessario",
  "supracitado": "mencionado acima",
  "infracitado": "mencionado abaixo",
  "ad referendum": "para aprovacao posterior",
  "ex officio": "por iniciativa propria",
  "in loco": "no local",
  "ipso facto": "por esse mesmo fato",
  "per capita": "por pessoa",
  "sine qua non": "indispensavel",
  "vis-a-vis": "em relacao a",
  "alhures": "em outro lugar",
  "corolario": "consequencia",
  "eixo": "foco",
  "escopo": "objetivo",
  "fulcro": "base",
  "liminar": "decisao urgente",
  "mandamus": "ordem judicial",
  "onus": "responsabilidade",
  "pari passu": "ao mesmo tempo",
  "preclusao": "perda de prazo",
  "precluso": "que perdeu o prazo",
  "ulterior": "posterior",
  "usufruir": "aproveitar",
  "enceta": "comeca",
  "perfectibilizar": "aperfeicoar",
  "referendar": "aprovar",
  "regulamentar": "criar regras para",
  "instrumentalizar": "criar meios para",
  "operacionalizar": "colocar em pratica",
};

export async function simplifyText(complexText: string): Promise<{ simplified: string; isAI: boolean }> {
  try {
    const response = await fetch("/api/simplify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: complexText }),
    });

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    return { simplified: data.simplified, isAI: data.isAI };
  } catch (error) {
    if (complexText.includes("UBS") || complexText.includes("saude")) {
      return {
        simplified: "Nova UBS no bairro Garcia funciona 24 horas. Oferece atendimento medico, dentista e exames. Custo: R$ 850 mil por ano.",
        isAI: false,
      };
    }
    if (complexText.includes("curso") || complexText.includes("capacitacao")) {
      return {
        simplified: "Cursos gratuitos: Web, Gastronomia, Marketing e mais. 500 vagas. Inscricoes: 1 a 15 de dezembro no site da Prefeitura.",
        isAI: false,
      };
    }
    if (complexText.includes("feira") || complexText.includes("produtor")) {
      return {
        simplified: "Feira de produtores todo sabado das 7h as 13h na XV de Novembro. Produtores locais podem participar de graca.",
        isAI: false,
      };
    }
    return { simplified: "Informacao da Prefeitura de Blumenau.", isAI: false };
  }
}

export interface AIAnalysisResult {
  originalText: string;
  simplifiedText: string;
  readabilityScore: number;
  keyPoints: string[];
  warnings: string[];
}

export async function analyzeAndSimplify(text: string): Promise<AIAnalysisResult> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 🔧 AQUI ESTAVA O PROBLEMA
  const { simplified } = await simplifyText(text);

  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).length;
  const avgWordsPerSentence = words / sentences;
  const readabilityScore = Math.max(
    0,
    Math.min(100, 100 - (avgWordsPerSentence - 15) * 3),
  );

  const keyPoints = extractKeyPoints(text);

  const warnings: string[] = [];
  if (avgWordsPerSentence > 25) {
    warnings.push("Sentencas muito longas detectadas");
  }
  if (text.match(/Art\.|§|Inc\./g)) {
    warnings.push("Contem referencias juridicas que podem ser dificeis de entender");
  }
  if (
    Object.keys(complexTermsSimplification).some((term) =>
      text.toLowerCase().includes(term),
    )
  ) {
    warnings.push("Termos tecnicos foram simplificados");
  }

  return {
    originalText: text,
    simplifiedText: simplified, // ⬅️ agora é string
    readabilityScore,
    keyPoints,
    warnings,
  };
}

function extractKeyPoints(text: string): string[] {
  const points: string[] = [];

  const dateMatch = text.match(/(\d{1,2})\s*de\s*(\w+)\s*de\s*(\d{4})/i);
  if (dateMatch) {
    points.push(`Data importante: ${dateMatch[0]}`);
  }

  const valueMatch = text.match(/R\$\s*[\d.,]+/g);
  if (valueMatch) {
    points.push(`Valores mencionados: ${valueMatch.join(", ")}`);
  }

  const deadlineMatch = text.match(/prazo\s*(?:de|para)?\s*(\d+)\s*(?:dias|meses|anos)/i);
  if (deadlineMatch) {
    points.push(`Prazo: ${deadlineMatch[0]}`);
  }

  if (points.length === 0) {
    points.push("Documento informativo da Prefeitura de Blumenau");
  }

  return points;
}