/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090a',
        "green-900": "rgba(25, 49, 37, 0.4)",
        "green-800": "#14261d",
        "green-600": "#006d32",
        "green-400": "#26a641",
        "green-200": "#39d353",
        "green-100": "#1cd93c",
      },
      
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))'
      },
    },
  },
  plugins: [],
}
