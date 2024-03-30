/** @type {import('tailwindcss').Config} */
import form from '@tailwindcss/forms';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    './public/index.html',
  ],
  darkMode: 'class', // or 'media' or false
  theme: {
    screens: {
      sm: '568px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#eb4e20',
        secondary: colors.zinc,
        truegray: colors.neutral,
        warmgray: colors.stone,
        mainColor: '#131216',
        'mainColor-light': '#34323c',
        'mainColor-pink': '#C089E0',
        'mainColor-pink-text': '#ede6f1',
        black: '#282828', // raising black
        vermillion: {
          200: '#FBDCD2',
          DEFAULT: '#EB4E20', // medium vermillion
          600: '#D4461D',
          700: '#BC3E1A',
        },
        forest: {
          200: '#D7E1DD',
          DEFAULT: '#386957', // forest green crayola
          600: '#1F4C3C',
          700: '#133E2E',
        },
        queen: {
          200: '#DFE7EB',
          DEFAULT: '#407090', // queen blue
        },
        gray: {
          100: '#F4F4F4', // cultured gray
          200: '#D6D6D6', // light gray
          300: '#C1C1C1', // silver chalice
          400: '#999898', // spanish gray
          600: '#5E5E5E', // dark gray
        },
      },
      spacing: {
        label: '2.5px',
      },
      borderWidth: {
        3: '3px',
      },
      opacity: {
        65: '.65',
      },
      fontFamily: {
        everett: ['TwkEverett', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: '.65rem',
        xs: '.75rem',
        tiny: '.875rem',
        '3xl': ['2rem', '2.25rem'],
        '6xl': '4rem',
        '7xl': '5rem',
      },
      transitionProperty: {
        ...defaultTheme.transitionProperty,
        width: 'width',
        height: 'height',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(1, 0.22, 1, 10)',
        'out-expo': 'cubic-bezier(10, 1, 0.22,1)',
      },
      maxHeight: {
        '600px': '600px',
      },
      shadow: {
        DEFAULT:
          '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 3px 12px rgba(0, 0, 0, 0.07)',
      },
      keyframes: {
        enterAndFadeInFromTop: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        leaveAndFadeOutToTop: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(-100%)', opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        enterAndFadeInFromTop: 'enterAndFadeInFromTop 0.5s ease-out',
        leaveAndFadeOutToTop: 'leaveAndFadeOutToTop 0.5s ease-out',
        fadeIn: 'fadeIn 0.5s ease-out',
      },
    },
  },
  plugins: [
    form,
    plugin(({ addBase, theme }) => {
      addBase({
        h1: { fontSize: theme('fontSize.2xl') },
        h2: { fontSize: theme('fontSize.xl') },
        h3: { fontSize: theme('fontSize.lg') },
      });
    }),
  ],
};
