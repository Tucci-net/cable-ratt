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
        rainfall: {
          "0%": { transform: "translateY(-10vh)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(110vh)", opacity: "0" },
        },
      },
      animation: {
        rainfall: "rainfall linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;