/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{css}",
  ],
  theme: {
    extend: {
      colors: {
        kuro: {
          bg: "#E2E8F0",      // Fondo gris azulado claro
          sidebar: "#6D5DD3", // Violeta del sidebar
          primary: "#4D3BB9", // Azul/Violeta oscuro de la card principal
          secondary: "#FF7594", // Rosa de la segunda card
          accent: "#8B7AF0",   // Violeta claro para hovers
          dark: "#1E293B",     // Texto oscuro profundo
        },
        kuromi: {
          pink: "#FF7594",
          purple: "#8B7AF0",
          light: "#F7E8F9",
        },
      },
      borderRadius: {
        'kuro': '2rem',
        'kuro-lg': '2.5rem',
      }
    },
  },
  plugins: [],
};
export default config;