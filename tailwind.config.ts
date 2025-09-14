// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "media"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ⚠️ ¡Elimina completamente la sección "colors" aquí!
      // En Tailwind v4, los colores se definen en @theme en el CSS.
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;