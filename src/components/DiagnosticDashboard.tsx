"use client";

import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, CheckCircle, XCircle, Info, RefreshCw, FileText, Image, Type, MousePointer } from "lucide-react";

interface AccessibilityIssue {
  id: string;
  impact: "critical" | "serious" | "moderate" | "minor";
  description: string;
  help: string;
  helpUrl: string;
  nodes: number;
  category: "images" | "contrast" | "forms" | "structure" | "navigation" | "other";
}

interface DiagnosticResult {
  totalIssues: number;
  criticalCount: number;
  seriousCount: number;
  moderateCount: number;
  minorCount: number;
  passedChecks: number;
  issues: AccessibilityIssue[];
  scannedAt: Date;
  pageUrl: string;
}

const mockDiagnosticData: DiagnosticResult = {
  totalIssues: 14,
  criticalCount: 5,
  seriousCount: 4,
  moderateCount: 3,
  minorCount: 2,
  passedChecks: 48,
  scannedAt: new Date(),
  pageUrl: "https://www.blumenau.sc.gov.br",
  issues: [
    {
      id: "image-alt",
      impact: "critical",
      description: "Imagens sem texto alternativo",
      help: "Todas as imagens devem ter um atributo alt descritivo",
      helpUrl: "https://dequeuniversity.com/rules/axe/4.4/image-alt",
      nodes: 8,
      category: "images",
    },
    {
      id: "color-contrast",
      impact: "critical",
      description: "Contraste de cor insuficiente",
      help: "O texto deve ter contraste minimo de 4.5:1 para texto normal",
      helpUrl: "https://dequeuniversity.com/rules/axe/4.4/color-contrast",
      nodes: 12,
      category: "contrast",
    },
    {
      id: "label",
      impact: "critical",
      description: "Campos de formulario sem rotulos",
      help: "Todos os campos de formulario devem ter rotulos descritivos",
      helpUrl: "https://dequeuniversity.com/rules/axe/4.4/label",
      nodes: 4,
      category: "forms",
    },
    {
      id: "link-name",
      impact: "serious",
      description: "Links sem texto acessivel",
      help: "Links devem ter texto discernivel",
      helpUrl: "https://dequeuniversity.com/rules/axe/4.4/link-name",
      nodes: 6,
      category: "navigation",
    },
    {
      id: "heading-order",
      impact: "moderate",
      description: "Ordem de cabecalhos incorreta",
      help: "Os niveis de cabecalho devem seguir ordem logica (h1, h2, h3...)",
      helpUrl: "https://dequeuniversity.com/rules/axe/4.4/heading-order",
      nodes: 3,
      category: "structure",
    },
    {
      id: "button-name",
      impact: "critical",
      description: "Botoes sem nome acessivel",
      help: "Botoes devem ter texto ou atributo aria-label",
      helpUrl: "https://dequeuniversity.com/rules/axe/4.4/button-name",
      nodes: 5,
      category: "forms",
    },
    {
      id: "document-title",
      impact: "serious",
      description: "Pagina sem titulo descritivo",
      help: "Cada pagina deve ter um titulo unico e descritivo",
      helpUrl: "https://dequeuniversity.com/rules/axe/4.4/document-title",
      nodes: 1,
      category: "structure",
    },
    {
      id: "html-lang",
      impact: "serious",
      description: "Idioma da pagina nao definido",
      help: "O elemento html deve ter um atributo lang valido",
      helpUrl: "https://dequeuniversity.com/rules/axe/4.4/html-has-lang",
      nodes: 1,
      category: "structure",
    },
    {
      id: "focus-visible",
      impact: "serious",
      description: "Foco do teclado nao visivel",
      help: "Elementos interativos devem ter indicador de foco visivel",
      helpUrl: "https://dequeuniversity.com/rules/axe/4.4/focus-visible",
      nodes: 15,
      category: "navigation",
    },
    {
      id: "meta-viewport",
      impact: "critical",
      description: "Zoom desabilitado na pagina",
      help: "O viewport nao deve desabilitar zoom do usuario",
      helpUrl: "https://dequeuniversity.com/rules/axe/4.4/meta-viewport",
      nodes: 1,
      category: "other",
    },
  ],
};

const impactConfig = {
  critical: { color: "text-red-600", bg: "bg-red-100", border: "border-red-500", icon: XCircle },
  serious: { color: "text-orange-600", bg: "bg-orange-100", border: "border-orange-500", icon: AlertTriangle },
  moderate: { color: "text-yellow-600", bg: "bg-yellow-100", border: "border-yellow-500", icon: Info },
  minor: { color: "text-blue-600", bg: "bg-blue-100", border: "border-blue-500", icon: Info },
};

const categoryConfig = {
  images: { icon: Image, label: "Imagens" },
  contrast: { icon: Type, label: "Contraste" },
  forms: { icon: FileText, label: "Formularios" },
  structure: { icon: FileText, label: "Estrutura" },
  navigation: { icon: MousePointer, label: "Navegacao" },
  other: { icon: Info, label: "Outros" },
};

export function DiagnosticDashboard() {
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const runDiagnostic = useCallback(async () => {
    setIsScanning(true);
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setResult({
      ...mockDiagnosticData,
      scannedAt: new Date(),
    });
    
    setIsScanning(false);
  }, []);

  useEffect(() => {
    runDiagnostic();
  }, [runDiagnostic]);

  const filteredIssues = selectedCategory
    ? result?.issues.filter((issue) => issue.category === selectedCategory)
    : result?.issues;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const accessibilityScore = result
    ? Math.round((result.passedChecks / (result.passedChecks + result.totalIssues)) * 100)
    : 0;

  return (
    <section aria-labelledby="diagnostic-title" className="card-accessible">
      <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 id="diagnostic-title" className="text-2xl font-bold text-gov-primary">
            Diagnostico de Acessibilidade
          </h2>
          <p className="text-gray-600 mt-1">
            Analise automatica baseada nas diretrizes WCAG 2.1
          </p>
        </div>
        
        <button
          onClick={runDiagnostic}
          disabled={isScanning}
          className="btn-primary flex items-center gap-2"
          aria-label={isScanning ? "Escaneando pagina" : "Escanear novamente"}
        >
          <RefreshCw className={`w-5 h-5 ${isScanning ? "animate-spin" : ""}`} aria-hidden="true" />
          {isScanning ? "Escaneando..." : "Escanear Novamente"}
        </button>
      </header>

      {isScanning ? (
        <div className="flex flex-col items-center justify-center py-12" role="status" aria-live="polite">
          <div className="w-16 h-16 border-4 border-gov-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-lg font-medium text-gov-primary">Analisando acessibilidade da pagina...</p>
          <p className="text-gray-500">Verificando conformidade com WCAG 2.1</p>
        </div>
      ) : result ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <article className="p-4 rounded-xl bg-gradient-to-br from-gov-primary to-gov-secondary text-white">
              <div className="text-sm font-medium opacity-80">Pontuacao Geral</div>
              <div className={`text-4xl font-bold mt-1 ${accessibilityScore >= 60 ? "text-white" : "text-yellow-300"}`}>
                {accessibilityScore}%
              </div>
              <div className="text-sm mt-2 opacity-80">
                {result.passedChecks} verificacoes aprovadas
              </div>
            </article>

            <article className="p-4 rounded-xl bg-red-50 border-2 border-red-200">
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm font-medium">Criticos</span>
              </div>
              <div className="text-3xl font-bold text-red-700 mt-1">{result.criticalCount}</div>
              <div className="text-sm text-red-600 mt-1">Requerem correcao imediata</div>
            </article>

            <article className="p-4 rounded-xl bg-orange-50 border-2 border-orange-200">
              <div className="flex items-center gap-2 text-orange-600">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm font-medium">Serios</span>
              </div>
              <div className="text-3xl font-bold text-orange-700 mt-1">{result.seriousCount}</div>
              <div className="text-sm text-orange-600 mt-1">Impacto significativo</div>
            </article>

            <article className="p-4 rounded-xl bg-yellow-50 border-2 border-yellow-200">
              <div className="flex items-center gap-2 text-yellow-600">
                <Info className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm font-medium">Moderados/Menores</span>
              </div>
              <div className="text-3xl font-bold text-yellow-700 mt-1">
                {result.moderateCount + result.minorCount}
              </div>
              <div className="text-sm text-yellow-600 mt-1">Melhorias recomendadas</div>
            </article>
          </div>

          <div className="mb-6">
            <nav aria-label="Filtrar por categoria">
              <ul className="flex flex-wrap gap-2" role="list">
                <li>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px]
                               ${!selectedCategory 
                                 ? "bg-gov-primary text-white" 
                                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    aria-pressed={!selectedCategory}
                  >
                    Todos ({result.issues.length})
                  </button>
                </li>
                {Object.entries(categoryConfig).map(([key, config]) => {
                  const count = result.issues.filter((i) => i.category === key).length;
                  if (count === 0) return null;
                  const Icon = config.icon;
                  return (
                    <li key={key}>
                      <button
                        onClick={() => setSelectedCategory(key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px]
                                   flex items-center gap-2
                                   ${selectedCategory === key 
                                     ? "bg-gov-primary text-white" 
                                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        aria-pressed={selectedCategory === key}
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                        {config.label} ({count})
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <ul className="space-y-4" role="list" aria-label="Lista de problemas de acessibilidade">
            {filteredIssues?.map((issue) => {
              const config = impactConfig[issue.impact];
              const Icon = config.icon;
              const CategoryIcon = categoryConfig[issue.category].icon;

              return (
                <li
                  key={issue.id}
                  className={`p-4 rounded-xl border-l-4 ${config.border} ${config.bg}`}
                >
                  <div className="flex flex-wrap items-start gap-4">
                    <Icon className={`w-6 h-6 ${config.color} flex-shrink-0 mt-1`} aria-hidden="true" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-xs font-bold uppercase ${config.color}`}>
                          {issue.impact === "critical" && "Critico"}
                          {issue.impact === "serious" && "Serio"}
                          {issue.impact === "moderate" && "Moderado"}
                          {issue.impact === "minor" && "Menor"}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <CategoryIcon className="w-3 h-3" aria-hidden="true" />
                          {categoryConfig[issue.category].label}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-gray-900">{issue.description}</h3>
                      <p className="text-sm text-gray-700 mt-1">{issue.help}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-3">
                        <span className="text-sm font-medium text-gray-600">
                          {issue.nodes} {issue.nodes === 1 ? "elemento afetado" : "elementos afetados"}
                        </span>
                        <a
                          href={issue.helpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gov-accent underline hover:text-gov-primary 
                                     focus:ring-2 focus:ring-gov-primary focus:ring-offset-2 rounded"
                        >
                          Saiba mais sobre esta regra
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <footer className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
            <p>
              Ultima analise: {result.scannedAt.toLocaleString("pt-BR")} | 
              Pagina: {result.pageUrl}
            </p>
          </footer>
        </>
      ) : null}
    </section>
  );
}
