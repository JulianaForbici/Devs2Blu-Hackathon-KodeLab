import type { Metadata } from "next";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blumenau Inclusiva - Portal Acessivel da Prefeitura",
  description: "Plataforma de acessibilidade digital para os servicos da Prefeitura de Blumenau. Tornando a informacao publica acessivel para todos os cidadaos.",
  keywords: ["Blumenau", "acessibilidade", "prefeitura", "WCAG", "inclusao digital", "governo"],
  authors: [{ name: "SEIDEP - Secretaria de Inclusao de Blumenau" }],
  openGraph: {
    title: "Blumenau Inclusiva",
    description: "Portal Acessivel da Prefeitura de Blumenau",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#1e3a5f" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
      </head>
      <body className="min-h-screen bg-white text-gov-dark antialiased">
        <AccessibilityProvider>
          <a href="#main-content" className="skip-link">
            Pular para o conteudo principal
          </a>
          
          <AccessibilityToolbar />
          
          <div id="main-content">
            {children}
          </div>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
