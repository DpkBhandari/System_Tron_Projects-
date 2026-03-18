/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        p1: '#ef4444', p2: '#facc15',
        board: '#1e3a5f', boardDark: '#152b47'
      },
      fontFamily: { display: ['"Orbitron"','sans-serif'], body: ['"Inter"','sans-serif'] },
      animation: {
        drop: 'dropIn 0.35s cubic-bezier(.4,2,.6,1)',
        pulse2: 'pulse2 1s ease-in-out infinite',
        'win-flash': 'winFlash 0.6s ease-in-out infinite alternate'
      },
      keyframes: {
        dropIn: { from: { transform: 'translateY(-400px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        pulse2: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
        winFlash: { from: { filter: 'brightness(1)' }, to: { filter: 'brightness(1.8) drop-shadow(0 0 8px currentColor)' } }
      }
    }
  },
  plugins: []
};
