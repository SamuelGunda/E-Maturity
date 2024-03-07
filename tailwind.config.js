/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.ts",
  ],
  theme: {
    extend: {
      colors:{ 
        ang: {
          main_bg : '#FBFEF9',
          text_main : '',
          text_white : '#FBFEF9',
          border_main : '#3369f3',
          main_btn : '#3369f3',
        }
      }
    },
  },
  plugins: [],
}