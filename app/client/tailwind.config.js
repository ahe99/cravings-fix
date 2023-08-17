/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E9EDC9',
          100: '#CCD5AE',
          200: '#FEFAE0',
          300: '#FAEDCD',
          400: '#D4A373',
        },
        brown: {
          50: '#EDC4B3',
          100: '#E6B8A2',
          200: '#DEAB90',
          300: '#D69F7E',
          400: '#CD9777',
          500: '#C38E70',
          600: '#B07D62',
          700: '#9D6B53',
          800: '#8A5A44',
          900: '#774936',
        },
      },
    },
  },
  plugins: [],
}
