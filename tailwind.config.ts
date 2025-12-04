import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gov: {
          primary: "#1e3a5f",
          secondary: "#2c5282",
          accent: "#3182ce",
          dark: "#0d1b2a",
          light: "#e2e8f0",
        },
        highContrast: {
          yellow: {
            bg: "#000000",
            text: "#ffff00",
            link: "#00ffff",
            border: "#ffffff",
          },
          blue: {
            bg: "#00008b",
            text: "#ffffff",
            link: "#00ffff",
            border: "#ffffff",
          },
          dark: {
            bg: "#000000",
            text: "#ffffff",
            link: "#00ff00",
            border: "#ffffff",
          },
        },
        accessibility: {
          focus: "#ff6b00",
          error: "#dc2626",
          warning: "#f59e0b",
          success: "#16a34a",
          info: "#0ea5e9",
        },
      },
      fontFamily: {
        accessible: ["'Atkinson Hyperlegible'", "Arial", "sans-serif"],
        readable: ["'Open Dyslexic'", "'Comic Sans MS'", "sans-serif"],
        system: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      fontSize: {
        "accessible-sm": ["1rem", { lineHeight: "1.75" }],
        "accessible-base": ["1.125rem", { lineHeight: "1.875" }],
        "accessible-lg": ["1.25rem", { lineHeight: "2" }],
        "accessible-xl": ["1.5rem", { lineHeight: "2.25" }],
        "accessible-2xl": ["1.875rem", { lineHeight: "2.5" }],
        "accessible-3xl": ["2.25rem", { lineHeight: "2.75" }],
      },
      spacing: {
        "touch-target": "44px",
        "touch-target-lg": "48px",
      },
      borderWidth: {
        "3": "3px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "skeleton": "skeleton 1.5s ease-in-out infinite",
      },
      keyframes: {
        skeleton: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
