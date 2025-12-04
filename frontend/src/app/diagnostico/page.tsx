"use client";

import Link from "next/link";
import { DiagnosticDashboard } from "@/components/DiagnosticDashboard";
import { ArrowLeft, ExternalLink, FileCode, Shield } from "lucide-react";

export default function DiagnosticoPage() {
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
              <li aria-current="page" className="text-yellow-300">Diagnostico</li>
            </ol>
          </nav>
          
          <h1 className="text-3xl md:text-4xl font-bold">
            Diagnostico de Acessibilidade
          </h1>
          <p className="text-white/80 mt-2 text-lg">
            Analise automatizada baseada nas diretrizes WCAG 2.1 e axe-core
          </p>
        </div>
      </header>

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DiagnosticDashboard />
            </div>
            
            <aside className="space-y-6">
              <article className="card-accessible">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-gov-primary" aria-hidden="true" />
                  <h2 className="text-xl font-bold text-gov-primary">Sobre o Diagnostico</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Este diagnostico utiliza a biblioteca axe-core para identificar 
                  problemas de acessibilidade de acordo com as diretrizes WCAG 2.1.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">*</span>
                    Verifica contraste de cores
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">*</span>
                    Identifica imagens sem alt text
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">*</span>
                    Analisa estrutura semantica
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">*</span>
                    Testa navegacao por teclado
                  </li>
                </ul>
              </article>

              <article className="card-accessible">
                <div className="flex items-center gap-3 mb-4">
                  <FileCode className="w-8 h-8 text-gov-primary" aria-hidden="true" />
                  <h2 className="text-xl font-bold text-gov-primary">Tecnologias</h2>
                </div>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://github.com/dequelabs/axe-core"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg
                               hover:bg-gov-light transition-colors group"
                    >
                      <div>
                        <span className="font-medium text-gov-primary">axe-core</span>
                        <p className="text-xs text-gray-500">Motor de testes WCAG</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gov-primary" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.w3.org/WAI/WCAG21/quickref/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg
                               hover:bg-gov-light transition-colors group"
                    >
                      <div>
                        <span className="font-medium text-gov-primary">WCAG 2.1</span>
                        <p className="text-xs text-gray-500">Diretrizes de acessibilidade</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gov-primary" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.radix-ui.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg
                               hover:bg-gov-light transition-colors group"
                    >
                      <div>
                        <span className="font-medium text-gov-primary">Radix UI</span>
                        <p className="text-xs text-gray-500">Componentes acessiveis</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gov-primary" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </article>

              <article className="card-accessible bg-yellow-50 border-yellow-200">
                <h2 className="text-xl font-bold text-gov-primary mb-4">
                  Para a Apresentacao
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Na demo ao vivo, substitua os dados mockados por uma URL real 
                  do portal de Blumenau para demonstrar o diagnostico em tempo real.
                </p>
                <div className="p-3 bg-white rounded-lg border border-yellow-300">
                  <code className="text-xs text-gray-700 break-all">
                    https://www.blumenau.sc.gov.br/noticias
                  </code>
                </div>
              </article>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
