/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable class-based dark mode
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6', // blue-500
          dark: '#2563eb',  // blue-700
        },
        // accent: {
        //   light: '#f43f5e', // rose-500
        //   dark: '#be123c',  // rose-700
        //   alt: '#facc15',   // yellow-400 for alt accent
        // },

        brand: {
          DEFAULT: '#1D84D8', // your main blue
          dark: '#155a96',    // deep hover variant
          light: '#D2E9FA',   // background variant
        },
        accent: {
          DEFAULT: '#FACC15', // sunny yellow
          dark: '#EAB308',
        },
        dark: {
          DEFAULT: '#1E293B', // slate gray
        },
        base: {
          DEFAULT: '#F9FAFB', // soft white
        },
      },
      keyframes: {
        bounce: {
          '0%, 80%, 100%': { transform: 'scale(.95)' },
          '40%': { transform: 'scale(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        bounce: 'bounce 1.8s infinite ease-in-out',
        'bounce-slow': 'bounce 1.8s infinite ease-in-out',
        'bounce-delay-200': 'bounce 1.4s 0.4s infinite ease-in-out',
        'bounce-delay-400': 'bounce 1.4s 0.8s infinite ease-in-out',
        shimmer: 'shimmer 2s infinite'
      },
      perspective: {
        '1000': '1000px',
      }
    },
  },
  plugins: [],
};
