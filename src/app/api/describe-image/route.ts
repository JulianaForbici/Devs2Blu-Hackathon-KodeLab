import { NextRequest, NextResponse } from "next/server";

const USE_AI = false;

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      description: getImageDescriptionFallback(imageUrl),
      isAI: USE_AI,
      provider: "simulado",
    });
  } catch (error) {
    return NextResponse.json({
      description: "Imagem relacionada a servicos da Prefeitura de Blumenau.",
      isAI: false,
      provider: "fallback",
    });
  }
}

function getImageDescriptionFallback(url: string): string {
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes("hospital") || lowerUrl.includes("saude") || lowerUrl.includes("519494026892")) {
    return "Fachada de unidade de saude com entrada acessivel e sinalizacao visivel.";
  }
  if (lowerUrl.includes("escola") || lowerUrl.includes("educacao") || lowerUrl.includes("524178232363")) {
    return "Sala de aula com estudantes em atividade de aprendizagem.";
  }
  if (lowerUrl.includes("feira") || lowerUrl.includes("mercado") || lowerUrl.includes("488459716781")) {
    return "Feira com barracas coloridas vendendo frutas, legumes e verduras frescos.";
  }
  
  return "Imagem relacionada a servicos da Prefeitura de Blumenau.";
}
