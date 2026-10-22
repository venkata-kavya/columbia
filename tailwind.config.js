/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17352F',
        pine: '#193B34',
        paper: '#FAF7F0',
        sand: '#F2EEE5',
        clay: '#C4A889',
        moss: '#879187',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 20px 80px rgba(13, 34, 31, 0.12)',
      },
      keyframes: {
        'slow-drift': {
          '0%, 100%': { transform: 'scale(1.015) translate3d(0, 0, 0)' },
          '50%': { transform: 'scale(1.04) translate3d(0, -1%, 0)' },
        },
      },
      animation: {
        'slow-drift': 'slow-drift 24s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
