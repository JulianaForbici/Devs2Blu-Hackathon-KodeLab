import { NextRequest, NextResponse } from "next/server";

const USE_AI = false;

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      simplified: getFallbackSimplification(text),
      isAI: USE_AI,
      provider: "simulado",
    });
  } catch (error: any) {
    return NextResponse.json({
      simplified: "Informacao da Prefeitura de Blumenau.",
      isAI: false,
      provider: "fallback",
    });
  }
}

function getFallbackSimplification(text: string): string {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes("ubs") || lowerText.includes("saude") || lowerText.includes("unidade basica")) {
    const horario = lowerText.includes("24 horas") ? "24 horas" : "horario comercial";
    const bairro = text.match(/bairro\s+(\w+)/i)?.[1] || "Garcia";
    return `Nova UBS no bairro ${bairro} com atendimento ${horario}. Servicos: consultas medicas, dentista, enfermagem e exames basicos. Atendimento gratuito pelo SUS.`;
  }
  
  if (lowerText.includes("curso") || lowerText.includes("capacitacao") || lowerText.includes("inscri")) {
    const vagas = text.match(/(\d+)\s*vagas/i)?.[1] || "500";
    return `Cursos gratuitos com ${vagas} vagas disponiveis. Areas: tecnologia, gastronomia, marketing e servicos. Inscricoes no site da Prefeitura de Blumenau.`;
  }
  
  if (lowerText.includes("feira") || lowerText.includes("produtor") || lowerText.includes("rural")) {
    return `Feira de produtores locais aos sabados, das 7h as 13h, no centro de Blumenau. Produtos frescos direto do produtor. Entrada gratuita.`;
  }
  
  if (lowerText.includes("decreto") || lowerText.includes("lei") || lowerText.includes("regulament")) {
    return `Nova lei municipal aprovada. Define regras e prazos para servicos publicos. Consulte o Diario Oficial para detalhes completos.`;
  }
  
  if (lowerText.includes("obra") || lowerText.includes("constru") || lowerText.includes("infraestrutura")) {
    return `Obra publica em andamento. Melhorias na infraestrutura da cidade. Previsao de conclusao em breve.`;
  }
  
  if (lowerText.includes("vacina") || lowerText.includes("campanha")) {
    return `Campanha de vacinacao em andamento. Procure a unidade de saude mais proxima com documento de identidade. Gratuito.`;
  }

  const firstSentence = text.split(/[.!?]/)[0]?.trim();
  if (firstSentence && firstSentence.length > 20) {
    const simplified = firstSentence
      .replace(/Art\.?\s*\d+[oº]?\.?/gi, "")
      .replace(/\u00a7\s*\d+[oº]?\.?/g, "")
      .replace(/tendo em vista|em virtude de|no ambito de/gi, "")
      .trim();
    if (simplified.length > 30) {
      return simplified.substring(0, 150) + "...";
    }
  }

  return "Documento oficial da Prefeitura de Blumenau. Consulte a pagina de noticias para mais informacoes sobre este assunto.";
}
