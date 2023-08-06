const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: {
          100: '#f5edff',
          200: '#e0c8ff',
          300: '#cba3ff',
          400: '#ac6cff',
          500: '#9747FF',
          600: '#8840e6',
          700: '#6a32b3',
          800: '#4c2480',
          900: '#2d154c',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
