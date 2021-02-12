const colors = require("tailwindcss/colors")

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx,css}", "./gatsby-ssr.js"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        gray: colors.blueGray,
      },
      fontFamily: {
        mono: ["Fira Code", "monospace"],
        sans: ["Public Sans", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
