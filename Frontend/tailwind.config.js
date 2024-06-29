const autoprefixer = require('autoprefixer');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      transitionDuration: {
        '3000': '3000ms',
      },
      transitionDelay: {
        '2000' : "2000ms",
        '3000' : "3000ms",
      },
      boxShadow: {
        card: "0px 35px -120px -150px",
      },
      screens: {
        xs: '320px',
        sm: '425px',
        md: '768px',
        lg: '976px',
        xlg: '1024px',
        xl: '1440px',
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/Default_Library_1.jpg')",
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none'
        }
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
};

