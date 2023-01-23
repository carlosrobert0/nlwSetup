/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
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
      fontFamily: {
        regular: 'Inter_400Regular',
        semibold: 'Inter_600SemiBold',
        bold: 'Inter_700Bold',
        extrabold: 'Inter_800ExtraBold',
      },
    },
  },
  plugins: [],
}