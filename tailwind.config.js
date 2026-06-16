/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          dark: '#3D2817',
          medium: '#5C4033',
        },
        gold: '#D4AF37',
        neutral: '#F5F5F5',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Montserrat', 'serif'],
        body: ['Inter', 'Outfit', 'sans-serif'],
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '1.15', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '1.25', fontWeight: '700' }],
        'body': ['16px', { lineHeight: '1.6' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
