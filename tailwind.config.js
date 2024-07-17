/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        banglaFont: ["Noto Sans Bengali", "sans-serif"]
      },
    },
  },

  plugins: [require('daisyui'),],
}

