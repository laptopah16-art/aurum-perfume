/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aurum: {
          gold: '#c9a45c',
          goldLight: '#d4b86a',
          goldDark: '#a88a4a',
          dark: '#0a0a0a',
          darker: '#050505',
          surface: '#121212',
          surfaceLight: '#1a1a1a',
          border: '#2a2a2a',
          text: '#f5f0e8',
          textMuted: '#8a7a6a',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

