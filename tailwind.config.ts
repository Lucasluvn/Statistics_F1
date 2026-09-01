import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Fundo em cinza quase preto profundo, pedido no briefing.
        carbon: "#0B0C0E",
        surface: "#17181C",
        "surface-alt": "#121316",
        edge: "#262830",

        // Texto
        ink: "#F4F5F7",
        "ink-muted": "#9BA0AC",
        "ink-faint": "#6B6E77",

        // Acentos: vermelho corrida (ações/alertas) e verde-água elétrico (métricas positivas)
        "racing-red": "#FF1E3C",
        "electric-teal": "#00E5C7",
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
