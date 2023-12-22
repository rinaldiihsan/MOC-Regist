/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        handphone: '375px',
        tablet: '768px',
        laptop: '1024px',
        desktop: '1920px',
      },
      colors: {
        primaryWhite: '#fffefb',
        secondaryWhite: '#f5f4f1',
        primaryBlack: '#1d1c1c',
        primaryOrange: '#f9a826',
        secondaryOrange: '#f48c06',
      },
    },
  },
  plugins: [],
};
