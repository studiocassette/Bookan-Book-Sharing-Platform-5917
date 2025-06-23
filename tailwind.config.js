/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bookan: {
          primary: '#3B82F6',
          secondary: '#10B981',
          accent: '#F59E0B',
          dark: '#1F2937',
          light: '#F9FAFB'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        'mobile': '428px'
      },
      spacing: {
        'safe-bottom': 'max(1.25rem, env(safe-area-inset-bottom))',
        'safe-top': 'max(1.25rem, env(safe-area-inset-top))'
      }
    },
  },
  plugins: [],
}