"use client";

import Link from "next/link";
import { 
  FileSearch, 
  Newspaper, 
  Sparkles, 
  Shield, 
  Eye, 
  Users, 
  ArrowRight,
  CheckCircle,
  Accessibility
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Diagnostico Automatico",
    description: "Identifica problemas de acessibilidade em tempo real usando axe-core",
  },
  {
    icon: Sparkles,
    title: "IA para Descricoes",
    description: "Gera automaticamente descricoes para imagens sem texto alternativo",
  },
  {
    icon: Eye,
    title: "Alto Contraste",
    description: "Modos de visualizacao para pessoas com baixa visao",
  },
  {
    icon: Users,
    title: "Leitura Simplificada",
    description: "Simplifica textos juridicos para facil compreensao",
  },
];

const stats = [
  { value: "4.5:1", label: "Contraste Minimo" },
  { value: "44px", label: "Alvo de Toque" },
  { value: "AAA", label: "Nivel WCAG" },
  { value: "100%", label: "Navegavel por Teclado" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-gov-primary via-gov-secondary to-gov-dark text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                <Shield className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm font-medium">SEIDEP - Secretaria de Inclusao</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Blumenau
                <span className="block text-yellow-300">Inclusiva</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Tornando a informacao publica acessivel para 
                <strong className="text-yellow-300"> todos </strong> 
                os cidadaos blumenauenses.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/noticias"
                  className="btn-accessible bg-yellow-400 text-gov-dark hover:bg-yellow-300 
                           flex items-center justify-center gap-2 text-lg font-bold"
                >
                  <Newspaper className="w-5 h-5" aria-hidden="true" />
                  Ver Noticias Acessiveis
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
                
                <Link
                  href="/diagnostico"
                  className="btn-accessible bg-white/10 hover:bg-white/20 border-2 border-white
                           flex items-center justify-center gap-2 text-lg"
                >
                  <FileSearch className="w-5 h-5" aria-hidden="true" />
                  Diagnostico de Acessibilidade
                </Link>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center" aria-hidden="true">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-pulse-slow" />
                <div className="absolute inset-4 bg-yellow-400/30 rounded-full animate-pulse-slow delay-150" />
                <div className="absolute inset-8 bg-white/10 rounded-full flex items-center justify-center">
                  <Accessibility className="w-32 h-32 md:w-40 md:h-40 text-yellow-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gov-light/50">
        <div className="max-w-6xl mx-auto">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6" role="list">
            {stats.map((stat) => (
              <li key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gov-primary">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="features-title" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h2 id="features-title" className="text-3xl md:text-4xl font-bold text-gov-primary mb-4">
              Recursos de Acessibilidade
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tecnologia a servico da inclusao digital
            </p>
          </header>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <li key={feature.title} className="card-accessible text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gov-light rounded-full 
                                flex items-center justify-center">
                    <Icon className="w-8 h-8 text-gov-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gov-primary mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-it-works-title" className="py-16 px-4 bg-gov-dark text-white">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h2 id="how-it-works-title" className="text-3xl md:text-4xl font-bold mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Uma camada inteligente entre voce e o conteudo da Prefeitura
            </p>
          </header>
          
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <li className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-yellow-400 text-gov-dark 
                            rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Captura</h3>
              <p className="text-white/80">
                O sistema acessa o conteudo original do portal da Prefeitura
              </p>
            </li>
            <li className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-yellow-400 text-gov-dark 
                            rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Analisa</h3>
              <p className="text-white/80">
                IA identifica barreiras de acessibilidade e conteudo complexo
              </p>
            </li>
            <li className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-yellow-400 text-gov-dark 
                            rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Adapta</h3>
              <p className="text-white/80">
                Exibe o conteudo corrigido e acessivel para todos os usuarios
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section aria-labelledby="cta-title" className="py-16 px-4 bg-yellow-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="cta-title" className="text-3xl md:text-4xl font-bold text-gov-dark mb-6">
            Pronto para uma Blumenau mais inclusiva?
          </h2>
          <p className="text-xl text-gov-dark/80 mb-8">
            Explore as noticias da Prefeitura com recursos de acessibilidade ativados
          </p>
          <Link
            href="/noticias"
            className="btn-accessible bg-gov-primary text-white hover:bg-gov-dark 
                     inline-flex items-center gap-2 text-lg font-bold"
          >
            Comecar Agora
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className="bg-gov-primary text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Accessibility className="w-8 h-8 text-yellow-300" aria-hidden="true" />
                <span className="text-xl font-bold">Blumenau Inclusiva</span>
              </div>
              <p className="text-white/80">
                Uma iniciativa da SEIDEP para tornar os servicos publicos acessiveis a todos.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Links Uteis</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/noticias" className="text-white/80 hover:text-yellow-300 underline">
                    Noticias Acessiveis
                  </Link>
                </li>
                <li>
                  <Link href="/diagnostico" className="text-white/80 hover:text-yellow-300 underline">
                    Diagnostico
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://www.blumenau.sc.gov.br" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-yellow-300 underline"
                  >
                    Portal Oficial
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Conformidade</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                  WCAG 2.1 Nivel AAA
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                  Lei Brasileira de Inclusao
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                  eMAG 3.1
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/60">
            <p>2024 Prefeitura Municipal de Blumenau. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
