module.exports = {
  content: ['./apps/crystalize/src/**/*.{html,js}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        'screen-50': '50vw',
      },
      animation: {
        blur: 'blur 20s ease-in-out infinite',
        unblur: 'unblur 20s ease-in-out',
      },
      keyframes: {
        blur: {
          '0%': {
            filter: 'blur(0px)',
          },
          '100%': {
            filter: 'blur(50px)',
          },
        },
        unblur: {
          '0%': {
            filter: 'blur(50px)',
          },
          '100%': {
            filter: 'blur(0px)',
          },
        },
      },
    },
    fontFamily: {
      body: ['"Source Serif Pro"', 'serif'],
    },
  },
  variants: {
    extend: {},
  },
};
