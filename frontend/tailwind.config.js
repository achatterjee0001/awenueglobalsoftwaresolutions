/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Customizable theme variables
        brand: {
          dark: '#030712',      // Deep space black
          surface: '#111827',   // Rich dark gray-blue
          card: '#1f2937',      // Card background
          primary: '#6366f1',   // Indigo primary action
          primaryHover: '#4f46e5',
          secondary: '#10b981', // Emerald secondary accent
          secondaryHover: '#059669',
          accent: '#f59e0b',    // Gold warning/accent
          textPrimary: '#f9fafb',
          textSecondary: '#9ca3af',
          border: '#374151'
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
