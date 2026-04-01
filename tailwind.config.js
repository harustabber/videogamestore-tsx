/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './store/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'kuromi-pink': '#FF66CC',
        'kuromi-dark': '#000000',
        'kuromi-purple': '#4B0082',
        'kuromi-light': '#F8F8F8',
      },
    },
  },
  plugins: [],
};
