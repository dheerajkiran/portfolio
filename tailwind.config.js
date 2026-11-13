/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        cyan: {
          glow: 'rgb(var(--color-cyan) / <alpha-value>)',
        },
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        slate: Object.fromEntries([50, 100, 200, 300, 400, 500, 600, 700].map(shade => (
          [shade, `rgb(var(--color-slate-${shade}) / <alpha-value>)`]
        ))),
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgb(var(--color-cyan) / 0.35)',
      },
    },
  },
  plugins: [],
}
