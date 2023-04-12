/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          950: '#00000076',
          
        },
        extra:{
          400 : '#997af0',
          500 : '#4e0eff'
        }
      },
    },
 
  },
  plugins: [],
};
