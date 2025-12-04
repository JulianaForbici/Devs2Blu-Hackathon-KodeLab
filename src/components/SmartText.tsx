"use client";

import { useState } from "react";
import { simplifyText } from "@/lib/ai-simulation";
import { Sparkles, FileText, Bot } from "lucide-react";

interface SmartTextProps {
  children: string;
  className?: string;
}

export function SmartText({ children, className = "" }: SmartTextProps) {
  const [isSimplified, setIsSimplified] = useState(false);
  const [simplifiedText, setSimplifiedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRealAI, setIsRealAI] = useState(false);

  const handleSimplify = async () => {
    if (isSimplified) {
      setIsSimplified(false);
      return;
    }

    setIsLoading(true);
    try {
      const result = await simplifyText(children);
      setSimplifiedText(result.simplified);
      setIsRealAI(result.isAI);
      setIsSimplified(true);
    } catch (error) {
      console.error("Erro ao simplificar texto:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button
          onClick={handleSimplify}
          disabled={isLoading}
          className="btn-secondary text-sm flex items-center gap-2"
          aria-pressed={isSimplified}
          aria-label={isSimplified ? "Ver texto original" : "Simplificar texto com inteligencia artificial"}
        >
          {isLoading ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" aria-hidden="true" />
              Simplificando...
            </>
          ) : isSimplified ? (
            <>
              <FileText className="w-4 h-4" aria-hidden="true" />
              Ver Original
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Simplificar com IA
            </>
          )}
        </button>
      </div>

      <div
        className={`prose prose-lg max-w-none transition-all duration-300 
                    ${isSimplified ? "bg-green-50 p-4 rounded-lg border border-green-200" : ""}`}
        aria-live="polite"
      >
        {isSimplified && (
          <div className="flex items-center gap-2 text-green-700 font-medium mb-3 pb-3 border-b border-green-200">
            {isRealAI ? (
              <>
                <Bot className="w-5 h-5" aria-hidden="true" />
                Texto Simplificado por IA Real (GPT)
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" aria-hidden="true" />
                Texto Simplificado
              </>
            )}
          </div>
        )}
        <p className="text-gray-800 leading-relaxed">
          {isSimplified ? simplifiedText : children}
        </p>
      </div>
    </div>
  );
}
