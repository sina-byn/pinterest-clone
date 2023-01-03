/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        'pinterest': '#e60023',
        'neutral': '#e9e9e9'
      }
    },
  },
  plugins: [],
}