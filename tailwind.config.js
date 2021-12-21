module.exports = {
  content: ['./apps/crystalize/src/**/*.{html,js}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'candy-red': '#D2042D',
        'grinch-green': '#87c519',
      },
      width: {
        'screen-50': '50vw',
        'screen-30': '30vw',
      },
      backgroundImage: {
        background: 'url(./assets/grinch.jpg)',
        candyCane:
          'repeating-linear-gradient(45deg, #fff, #fff 10px, #D2042D 10px, #D2042D 20px)',
      },
      background: {},
    },
    fontFamily: {
      grinched: ['"Grinched 2.0"'],
    },
  },
  variants: {
    extend: {},
  },
};
