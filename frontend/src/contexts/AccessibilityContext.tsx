"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ContrastMode = "normal" | "high-contrast-yellow" | "high-contrast-blue" | "high-contrast-dark";
type ReadingMode = "normal" | "simple";

interface AccessibilityContextType {
  fontScale: number;
  setFontScale: (scale: number) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  contrastMode: ContrastMode;
  setContrastMode: (mode: ContrastMode) => void;
  readingMode: ReadingMode;
  setReadingMode: (mode: ReadingMode) => void;
  toggleReadingMode: () => void;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const FONT_SCALE_MIN = 0.875;
const FONT_SCALE_MAX = 2;
const FONT_SCALE_STEP = 0.125;

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontScale, setFontScaleState] = useState(1);
  const [contrastMode, setContrastModeState] = useState<ContrastMode>("normal");
  const [readingMode, setReadingModeState] = useState<ReadingMode>("normal");
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const savedScale = localStorage.getItem("accessibility-font-scale");
    const savedContrast = localStorage.getItem("accessibility-contrast-mode") as ContrastMode;
    const savedReading = localStorage.getItem("accessibility-reading-mode") as ReadingMode;

    if (savedScale) setFontScaleState(parseFloat(savedScale));
    if (savedContrast) setContrastModeState(savedContrast);
    if (savedReading) setReadingModeState(savedReading);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", fontScale.toString());
    localStorage.setItem("accessibility-font-scale", fontScale.toString());
  }, [fontScale]);

  useEffect(() => {
    document.body.classList.remove("high-contrast-yellow", "high-contrast-blue", "high-contrast-dark");
    if (contrastMode !== "normal") {
      document.body.classList.add(contrastMode);
    }
    localStorage.setItem("accessibility-contrast-mode", contrastMode);
  }, [contrastMode]);

  useEffect(() => {
    document.body.classList.remove("reading-mode-simple");
    if (readingMode === "simple") {
      document.body.classList.add("reading-mode-simple");
    }
    localStorage.setItem("accessibility-reading-mode", readingMode);
  }, [readingMode]);

  const setFontScale = (scale: number) => {
    const clamped = Math.min(Math.max(scale, FONT_SCALE_MIN), FONT_SCALE_MAX);
    setFontScaleState(clamped);
    announceToScreenReader(`Tamanho da fonte ajustado para ${Math.round(clamped * 100)}%`);
  };

  const increaseFontSize = () => {
    if (fontScale < FONT_SCALE_MAX) {
      setFontScale(fontScale + FONT_SCALE_STEP);
    }
  };

  const decreaseFontSize = () => {
    if (fontScale > FONT_SCALE_MIN) {
      setFontScale(fontScale - FONT_SCALE_STEP);
    }
  };

  const resetFontSize = () => {
    setFontScale(1);
  };

  const setContrastMode = (mode: ContrastMode) => {
    setContrastModeState(mode);
    const modeNames: Record<ContrastMode, string> = {
      normal: "Normal",
      "high-contrast-yellow": "Alto Contraste Amarelo",
      "high-contrast-blue": "Alto Contraste Azul",
      "high-contrast-dark": "Alto Contraste Escuro",
    };
    announceToScreenReader(`Modo de contraste alterado para ${modeNames[mode]}`);
  };

  const setReadingMode = (mode: ReadingMode) => {
    setReadingModeState(mode);
    announceToScreenReader(mode === "simple" ? "Modo leitura simplificada ativado" : "Modo leitura normal ativado");
  };

  const toggleReadingMode = () => {
    setReadingMode(readingMode === "normal" ? "simple" : "normal");
  };

  const announceToScreenReader = (message: string) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(""), 1000);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontScale,
        setFontScale,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        contrastMode,
        setContrastMode,
        readingMode,
        setReadingMode,
        toggleReadingMode,
        announceToScreenReader,
      }}
    >
      {children}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}
