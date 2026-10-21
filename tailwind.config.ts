import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: "#30070D",
        "wine-950": "#26060d",
        "wine-900": "#30070D",
        "wine-800": "#4a0b17",
        "wine-600": "#7a1a2c",
        crimson: "#8b1a2b",
        gold: "#C9A55C",
        "gold-light": "#E7CF98",
        "gold-deep": "#8a6a22",
        ivory: "#F6EFE2",
        cream: "#FBF6EA",
        sand: "#EADFCB",
        ink: "#1a1411",
        muted: "#5c4a3e",
        line: "#dccfb6",
        success: "#2d5a3c",
        aarsika: {
          "wine-950": "#26060d",
          "wine-900": "#30070D",
          "wine-800": "#4a0b17",
          "wine-600": "#7a1a2c",
          crimson: "#8b1a2b",
          gold: "#C9A55C",
          "gold-light": "#E7CF98",
          "gold-deep": "#8a6a22",
          ivory: "#F6EFE2",
          cream: "#FBF6EA",
          sand: "#EADFCB",
          ink: "#1a1411",
          muted: "#6b5f55",
          line: "#dccfb6",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-jost)", "Jost", "sans-serif"],
      },
      boxShadow: {
        gold: "0 4px 20px -2px rgba(201, 165, 92, 0.25)",
        deep: "0 10px 30px -5px rgba(38, 6, 13, 0.4)",
        soft: "0 10px 25px -5px rgba(26, 20, 17, 0.05)",
      },
      borderRadius: {
        arch: "120px 120px 0 0",
      },
    },
  },
  plugins: [],
};

export default config;
