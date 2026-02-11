/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/renderer/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'pw-white': '#FFFFFF',
        'pw-dark': '#333333',
        'pw-purple': '#9A48D0',
        'pw-green': '#7BC950',
        'pw-lilac': '#B288C0',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
