/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#E6F9F9',
          100: '#B3EEF0',
          200: '#80E3E7',
          300: '#4DD8DE',
          400: '#26CDD5',
          500: '#0B6E6E',
          600: '#095C5C',
          700: '#074A4A',
          800: '#053838',
          900: '#032626',
        },
        sand: {
          50: '#FDF8F0',
          100: '#F9EDDA',
          200: '#F4E2C4',
          300: '#EFD7AE',
          400: '#E8C88E',
          500: '#D4A76A',
          600: '#B8893A',
          700: '#9C6B10',
          800: '#7A5208',
          900: '#583A06',
        },
        coral: {
          50: '#FFF0ED',
          100: '#FFD4CB',
          200: '#FFB8A9',
          300: '#FF9C87',
          400: '#FF8065',
          500: '#FF6B45',
          600: '#E54E28',
          700: '#C23515',
          800: '#9F200A',
          900: '#7C1404',
        },
        leaf: {
          500: '#2E7D32',
          600: '#1B5E20',
        },
      },
    },
  },
  plugins: [],
};
