// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "media"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
    },
  },
  plugins: [require("tailwindcss-animate")],
  // Optimize for production
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;
