/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // 1. We define the custom colors here
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe', // <--- This is used for the blobs
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        surface: '#ffffff',
        background: '#f8fafc',
      },
      // 2. We define the slow animation here
      animation: {
        'pulse-slow': 'pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'float': '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}