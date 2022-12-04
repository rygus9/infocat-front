module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/layout/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '520px',
      },
      colors: {
        palePurple: '#E8D6FF',
        darkPurPle: '#6416AA',
        gray: '#8D8D8D',
        darkWhite: '#F2F2F2',
        darkGray: '#707070',
        lightGray: '#d1cfcf',
        lightPurple: '#A272DE',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
