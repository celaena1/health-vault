export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        health: {
          dark: '#0f172a',
          card: '#1e293b',
          cyan: '#06b6d4',
          teal: '#14b8a6',
          purple: '#8b5cf6',
          text: '#f8fafc',
          textMuted: '#94a3b8'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
