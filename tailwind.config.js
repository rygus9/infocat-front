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
        lightPurple: '#A272DE',
        gray: '#8D8D8D',
        darkWhite: '#F2F2F2',
        darkGray: '#707070',
        lightGray: '#d1cfcf',
        lightBlack: '#b1b1b1',
        lightPurple: '#A272DE',
      },
      boxShadow: {
        custom: '0 1px 3px 0 rgba(0, 0, 0, 0.16)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
