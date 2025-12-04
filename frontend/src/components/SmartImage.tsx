"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { generateImageDescription } from "@/lib/ai-simulation";
import { Sparkles, AlertCircle } from "lucide-react";

interface SmartImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function SmartImage({ src, alt, width, height, className = "", priority = false }: SmartImageProps) {
  const [description, setDescription] = useState<string>(alt || "");
  const [isLoading, setIsLoading] = useState(!alt);
  const [isAIGenerated, setIsAIGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!alt) {
      setIsLoading(true);
      generateImageDescription(src)
        .then((result) => {
          setDescription(result.description);
          setIsAIGenerated(result.isAI);
          setIsLoading(false);
        })
        .catch((err) => {
          setError("Nao foi possivel gerar descricao");
          setDescription("Imagem sem descricao disponivel");
          setIsLoading(false);
        });
    }
  }, [alt, src]);

  return (
    <figure className={`relative ${className}`}>
      {isLoading ? (
        <div
          className="skeleton rounded-lg flex items-center justify-center bg-gray-200"
          style={{ width: "100%", maxWidth: width, height, margin: "0 auto" }}
          role="img"
          aria-label="Carregando descricao da imagem..."
        >
          <div className="flex flex-col items-center justify-center gap-2 text-gray-500 w-full h-full">
            <Sparkles className="w-8 h-8 animate-pulse" aria-hidden="true" />
            <span className="text-sm font-medium text-center">IA analisando imagem...</span>
          </div>
        </div>
      ) : (
        <>
          <Image
            src={src}
            alt={description}
            width={width}
            height={height}
            className={`rounded-lg ${error ? "opacity-75" : ""}`}
            priority={priority}
          />
          
          {isAIGenerated && !error && (
            <div 
              className="absolute top-2 right-2 bg-gov-primary/90 text-white text-xs 
                         px-2 py-1 rounded-full flex items-center gap-1 z-10"
              aria-hidden="true"
            >
              <Sparkles className="w-3 h-3" />
              <span>IA</span>
            </div>
          )}

          {error && (
            <div 
              className="absolute bottom-2 left-2 bg-red-600/90 text-white text-xs 
                         px-2 py-1 rounded-full flex items-center gap-1"
              role="alert"
            >
              <AlertCircle className="w-3 h-3" />
              <span>{error}</span>
            </div>
          )}
        </>
      )}
      
      {!isLoading && description && (
        <figcaption className="mt-3 p-3 bg-blue-50 border-l-4 border-gov-primary rounded-r-lg">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-gov-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <span className="text-xs font-semibold text-gov-primary uppercase tracking-wide">
                Descricao da Imagem
              </span>
              <p className="text-sm text-gray-700 mt-1">
                {description}
              </p>
            </div>
          </div>
        </figcaption>
      )}
    </figure>
  );
}
