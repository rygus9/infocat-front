module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/layout/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        psPurple: '#a272de',
        psGray: {
          light: '#f2f2f2',
          middle: '#8d8d8d',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
