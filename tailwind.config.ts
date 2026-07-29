import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "cable-draw": {
          "0%": { strokeDashoffset: "3000", opacity: "0" },
          "8%": { opacity: "0.5" },
          "15%": { opacity: "0.15" },
          "25%": { opacity: "0.9" },
          "40%": { opacity: "0.35" },
          "55%": { opacity: "1" },
          "80%": { strokeDashoffset: "0", opacity: "1" },
          "92%": { opacity: "0.3" },
          "100%": { strokeDashoffset: "0", opacity: "0" },
        },
        "content-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "cable-draw": "cable-draw linear infinite",
        "content-in": "content-in ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;