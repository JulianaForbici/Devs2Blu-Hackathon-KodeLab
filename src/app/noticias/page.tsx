"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { SmartText } from "@/components/SmartText";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Tag, 
  Share2, 
  Printer,
  Clock,
  MapPin
} from "lucide-react";

const mockNews = [
  {
    id: 1,
    title: "Prefeitura inaugura nova UBS no bairro Garcia com atendimento 24 horas",
    summary: "Nova unidade de saude amplia atendimento para mais de 15 mil moradores da regiao",
    content: `Art. 1o. Fica inaugurada, sem prejuizo das demais unidades de saude existentes no ambito do municipio, a Unidade Basica de Saude Garcia, tendo em vista a necessidade de ampliacao da rede de atendimento primario a populacao.

§ 1o. A supracitada unidade funcionara em regime de 24 horas, outrossim, disponibilizando servicos de urgencia e emergencia de baixa complexidade.

§ 2o. O escopo dos servicos ofertados engloba atendimento medico, odontologico, de enfermagem, bem como exames laboratoriais basicos, destarte atendendo ao fulcro da politica municipal de saude.

Art. 2o. O onus operacional correra por conta do erario municipal, no montante de R$ 850.000,00 (oitocentos e cinquenta mil reais) anuais, conforme disposto no orcamento vigente.`,
    date: "28 de novembro de 2024",
    author: "Secretaria de Comunicacao",
    category: "Saude",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop",
    readTime: "3 min",
    location: "Bairro Garcia",
  },
  {
    id: 2,
    title: "Inscricoes abertas para cursos gratuitos de capacitacao profissional",
    summary: "Programa oferece mais de 500 vagas em areas de tecnologia, gastronomia e servicos",
    content: `Em virtude da parceria firmada entre a Prefeitura de Blumenau e o SENAC, por intermedio da Secretaria de Desenvolvimento Economico, estao abertas as inscricoes para os cursos de capacitacao profissional do segundo semestre.

Mister se faz ressaltar que as vagas sao limitadas e a selecao ocorrera por ordem de inscricao, tendo em vista a grande demanda observada nas edicoes anteriores do programa.

Os cursos disponiveis sao:
- Desenvolvimento Web (80 vagas)
- Gastronomia Basica (60 vagas)
- Atendimento ao Cliente (100 vagas)
- Marketing Digital (80 vagas)
- Eletricista Predial (50 vagas)

O prazo para inscricao enceta em 1o de dezembro e se encerra em 15 de dezembro de 2024. Os interessados devem perfectibilizar o cadastro no portal oficial da Prefeitura.`,
    date: "27 de novembro de 2024",
    author: "Secretaria de Desenvolvimento Economico",
    category: "Educacao",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop",
    readTime: "4 min",
    location: "Centro",
  },
  {
    id: 3,
    title: "Novo decreto regulamenta feira de produtores locais no centro da cidade",
    summary: "Agricultores familiares terao espaco fixo para comercializacao de produtos organicos",
    content: `Decreto no 15.847/2024

O Prefeito Municipal de Blumenau, no uso de suas atribuicoes legais, e tendo em vista o disposto na Lei Municipal no 8.432/2023, DECRETA:

Art. 1o. Fica regulamentada a Feira de Produtores Locais de Blumenau, a ser realizada semanalmente no Calcadao da XV de Novembro.

Art. 2o. Poderao participar da feira, in loco, os produtores rurais devidamente cadastrados junto a Secretaria de Agricultura, desde que preenchidos os seguintes requisitos sine qua non:
I - Residir no municipio de Blumenau ou cidades limitrofes;
II - Possuir cadastro ativo de produtor rural;
III - Comercializar produtos de producao propria.

Art. 3o. A feira funcionara aos sabados, das 7h as 13h, sendo o local disponibilizado pela Prefeitura sem onus para os participantes.

Art. 4o. Este decreto entra em vigor na data de sua publicacao.`,
    date: "25 de novembro de 2024",
    author: "Gabinete do Prefeito",
    category: "Agricultura",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=500&fit=crop",
    readTime: "5 min",
    location: "XV de Novembro",
  },
];

export default function NoticiasPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-gov-primary text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Navegacao breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="hover:underline flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-yellow-300">Noticias</li>
            </ol>
          </nav>
          
          <h1 className="text-3xl md:text-4xl font-bold">
            Noticias Acessiveis
          </h1>
          <p className="text-white/80 mt-2 text-lg">
            Conteudo da Prefeitura de Blumenau adaptado para todos os cidadaos
          </p>
        </div>
      </header>

      <section aria-label="Lista de noticias" className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8">
            {mockNews.map((news) => (
              <article 
                key={news.id} 
                className="card-accessible"
                aria-labelledby={`news-title-${news.id}`}
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <SmartImage
                      src={news.image}
                      width={400}
                      height={250}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <header>
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                        <span className="bg-gov-primary text-white px-3 py-1 rounded-full flex items-center gap-1">
                          <Tag className="w-3 h-3" aria-hidden="true" />
                          {news.category}
                        </span>
                        <span className="text-gray-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          <time dateTime="2024-11-28">{news.date}</time>
                        </span>
                        <span className="text-gray-500 flex items-center gap-1">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                          {news.readTime} de leitura
                        </span>
                      </div>
                      
                      <h2 
                        id={`news-title-${news.id}`}
                        className="text-2xl font-bold text-gov-primary mb-2"
                      >
                        {news.title}
                      </h2>
                      
                      <p className="text-gray-600 text-lg mb-4">{news.summary}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" aria-hidden="true" />
                          {news.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" aria-hidden="true" />
                          {news.location}
                        </span>
                      </div>
                    </header>
                    
                    <div className="border-t pt-4">
                      <SmartText className="mb-4">
                        {news.content}
                      </SmartText>
                    </div>
                    
                    <footer className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                      <button 
                        className="btn-secondary text-sm flex items-center gap-2"
                        aria-label={`Compartilhar noticia: ${news.title}`}
                      >
                        <Share2 className="w-4 h-4" aria-hidden="true" />
                        Compartilhar
                      </button>
                      <button 
                        className="btn-secondary text-sm flex items-center gap-2"
                        aria-label={`Imprimir noticia: ${news.title}`}
                        onClick={() => window.print()}
                      >
                        <Printer className="w-4 h-4" aria-hidden="true" />
                        Imprimir
                      </button>
                    </footer>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
