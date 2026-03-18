/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { mono: ['"JetBrains Mono"','monospace'], sans: ['"Sora"','sans-serif'] },
      colors: {
        calc: {
          bg:      '#111111',
          surface: '#1a1a1a',
          card:    '#222222',
          border:  '#2a2a2a',
          text:    '#f0f0f0',
          muted:   '#666666',
          accent:  '#f97316',
          op:      '#2a2a2a',
          num:     '#1e1e1e',
          eq:      '#f97316',
        }
      },
      boxShadow: {
        'btn': '0 2px 0 rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'btn-press': '0 0 0 rgba(0,0,0,0.4), inset 0 2px 4px rgba(0,0,0,0.4)',
        'display': 'inset 0 2px 12px rgba(0,0,0,0.5)',
      },
      animation: {
        'press': 'press 0.1s ease',
        'result': 'result 0.2s ease',
        'history-in': 'histIn 0.3s ease',
      },
      keyframes: {
        press:   { '0%,100%': { transform:'scale(1)' }, '50%': { transform:'scale(0.95)' } },
        result:  { from: { opacity:'0', transform:'translateY(4px)' }, to: { opacity:'1', transform:'translateY(0)' } },
        histIn:  { from: { opacity:'0', transform:'translateX(20px)' }, to: { opacity:'1', transform:'translateX(0)' } },
      }
    }
  },
  plugins: []
};
