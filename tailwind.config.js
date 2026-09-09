/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#05070a',
        panel: '#0b0f16',
        line: '#1b2230',
        cyan: {
          glow: '#5eead4',
        },
        accent: '#7dd3fc',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(94, 234, 212, 0.35)',
      },
    },
  },
  plugins: [],
}
