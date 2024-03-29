/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation : {
        'blink': 'blinker 1s linear infinite',
        'rotation': 'spinner 3s ease-in-out infinite'
      },
      keyframes: {
        blinker: {
          '50%': {'opacity': '0'}
        },
        spinner: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      boxShadow: {
        '3xl': '0 3px 10px rgb(0 0 0 / 0.2)',
        'inDark': '2px -3px 0px rgb(255 255 255 / 0.7)',
        'inLight': '2px -3px 0px rgb(0 0 0 / 0.7)'
      },
      fontFamily: {
        'script': ['League Script', 'cursive']
      },
      colors: {
        'greenc': "#54B862",
        'orangec': "#FF7A00",
        'bluec': "#021639"
      }
    },
  },
  plugins: [],
}