/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' },
        surface: { DEFAULT: '#1e1e2e', card: '#2a2a3e', hover: '#313145' }
      },
      fontFamily: { display: ['"DM Sans"', 'sans-serif'] },
      animation: { 'slide-in': 'slideIn 0.3s ease', 'fade-in': 'fadeIn 0.2s ease' },
      keyframes: {
        slideIn: { from: { transform: 'translateY(-10px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } }
      }
    }
  },
  plugins: []
};
