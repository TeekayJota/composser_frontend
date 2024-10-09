// ./tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        Primary: '#FFFFFF',
        Secondary: '#221333',
        Terciary: '#DF3311',
      },
      fontSize: {
        'xs': '.75rem', // 12px
        'sm': '.875rem', // 14px
        'base': '1rem', // 16px
        'lg': '1.125rem', // 18px
        'xl': '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '3.75rem', // 60px
        'custom': '1.35rem', // Tamaño de fuente personalizado
      },
    }
  },
  plugins: [],
}