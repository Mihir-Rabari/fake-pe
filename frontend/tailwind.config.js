/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fakepe: {
          primary: '#2ECB70',      // Supabase Green
          background: '#0E0E0E',   // Dark Background
          surface: '#1A1A1A',      // Card Gray
          border: '#2A2A2A',       // Divider
          accent: '#00FFAE',       // Neon Mint
          success: '#3EE68E',      // Lighter Green
          text: {
            primary: '#FFFFFF',    // White
            secondary: '#A3A3A3',  // Gray
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
