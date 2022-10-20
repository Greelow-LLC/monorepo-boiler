/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '375px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'custom-green': {
          DEFAULT: '#2BB249',
          light: '#a7f3d0',
          dark: '#299d43',
        },
        'white-off': {
          DEFAULT: '#F8F8F8',
        },
        'custom-transparent': {
          DEFAULT: '#00FF00',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  corePlugins: {
    preflight: false,
  },
};
