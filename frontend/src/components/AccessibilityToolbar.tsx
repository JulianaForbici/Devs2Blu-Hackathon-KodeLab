"use client";

import { useAccessibility } from "@/contexts/AccessibilityContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  Minus,
  Plus,
  RotateCcw,
  Sun,
  Moon,
  Eye,
  BookOpen,
  Settings,
  Accessibility,
  Contrast,
  ChevronDown,
} from "lucide-react";

type ContrastMode = "normal" | "high-contrast-yellow" | "high-contrast-blue" | "high-contrast-dark";

const contrastOptions: { value: ContrastMode; label: string; description: string }[] = [
  { value: "normal", label: "Normal", description: "Cores padrao do site" },
  { value: "high-contrast-yellow", label: "Amarelo/Preto", description: "Texto amarelo em fundo preto" },
  { value: "high-contrast-blue", label: "Branco/Azul", description: "Texto branco em fundo azul escuro" },
  { value: "high-contrast-dark", label: "Alto Contraste", description: "Texto branco em fundo preto" },
];

function ToolbarButton({
  onClick,
  disabled,
  ariaLabel,
  tooltip,
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel: string;
  tooltip: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className="min-h-[44px] min-w-[44px] p-2 rounded-lg bg-white/10 hover:bg-white/20 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200 flex items-center justify-center
                       focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gov-primary"
          >
            {children}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gov-dark text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg z-50"
            sideOffset={5}
          >
            {tooltip}
            <Tooltip.Arrow className="fill-gov-dark" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export function AccessibilityToolbar() {
  const {
    fontScale,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    contrastMode,
    setContrastMode,
    readingMode,
    toggleReadingMode,
  } = useAccessibility();

  const fontPercentage = Math.round(fontScale * 100);

  return (
    <nav
      aria-label="Barra de ferramentas de acessibilidade"
      className="bg-gov-primary text-white py-2 px-4 sticky top-0 z-50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Accessibility className="w-6 h-6" aria-hidden="true" />
          <span className="font-bold text-lg hidden sm:inline">Acessibilidade</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div
            role="group"
            aria-label="Controle de tamanho de fonte"
            className="flex items-center gap-1 bg-white/5 rounded-lg p-1"
          >
            <ToolbarButton
              onClick={decreaseFontSize}
              disabled={fontScale <= 0.875}
              ariaLabel="Diminuir tamanho da fonte"
              tooltip="Diminuir fonte (A-)"
            >
              <Minus className="w-5 h-5" aria-hidden="true" />
            </ToolbarButton>

            <span
              aria-live="polite"
              className="min-w-[60px] text-center font-mono text-sm px-2"
            >
              {fontPercentage}%
            </span>

            <ToolbarButton
              onClick={increaseFontSize}
              disabled={fontScale >= 2}
              ariaLabel="Aumentar tamanho da fonte"
              tooltip="Aumentar fonte (A+)"
            >
              <Plus className="w-5 h-5" aria-hidden="true" />
            </ToolbarButton>

            <ToolbarButton
              onClick={resetFontSize}
              ariaLabel="Restaurar tamanho padrao da fonte"
              tooltip="Restaurar tamanho"
            >
              <RotateCcw className="w-5 h-5" aria-hidden="true" />
            </ToolbarButton>
          </div>

          <div className="h-8 w-px bg-white/20 hidden sm:block" aria-hidden="true" />

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                aria-label="Selecionar modo de contraste"
                className="min-h-[44px] px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 
                           transition-colors duration-200 flex items-center gap-2
                           focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gov-primary"
              >
                <Contrast className="w-5 h-5" aria-hidden="true" />
                <span className="hidden sm:inline text-sm">Contraste</span>
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="bg-white rounded-xl shadow-2xl p-2 min-w-[220px] z-50"
                sideOffset={5}
              >
                <DropdownMenu.Label className="px-3 py-2 text-sm font-bold text-gov-primary">
                  Modo de Contraste
                </DropdownMenu.Label>
                <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
                
                {contrastOptions.map((option) => (
                  <DropdownMenu.Item
                    key={option.value}
                    className={`px-3 py-2 rounded-lg cursor-pointer outline-none
                               flex items-center gap-3 min-h-[44px]
                               ${contrastMode === option.value 
                                 ? "bg-gov-primary text-white" 
                                 : "hover:bg-gov-light text-gov-dark"}`}
                    onSelect={() => setContrastMode(option.value)}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className={`text-xs ${contrastMode === option.value ? "text-white/80" : "text-gray-500"}`}>
                        {option.description}
                      </div>
                    </div>
                    {contrastMode === option.value && (
                      <Eye className="w-5 h-5" aria-hidden="true" />
                    )}
                  </DropdownMenu.Item>
                ))}

                <DropdownMenu.Arrow className="fill-white" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <ToolbarButton
            onClick={toggleReadingMode}
            ariaLabel={readingMode === "simple" 
              ? "Desativar modo de leitura simplificada" 
              : "Ativar modo de leitura simplificada"}
            tooltip={readingMode === "simple" ? "Modo Normal" : "Leitura Simplificada"}
          >
            <BookOpen 
              className={`w-5 h-5 ${readingMode === "simple" ? "text-yellow-300" : ""}`} 
              aria-hidden="true" 
            />
          </ToolbarButton>
        </div>
      </div>
    </nav>
  );
}
