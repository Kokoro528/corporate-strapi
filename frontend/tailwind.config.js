const { blue } = require('tailwindcss/colors')
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: "jit", // see https://tailwindcss.com/docs/just-in-time-mode
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  darkMode: false, // or "media" or "class"
  theme: {
    fontFamily: {
      'sans': ['"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', '"WenQuanYi Micro Hei"', '"Helvetica Neue"', 'Arial']
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {

      inset: {
        '2/1': '200%',
        '3/2': '150%'
      },
      typography: {
        DEFAULT: {
          css: {
            // color: '#333',
            // maxWidth: '80ch',

            textAlign: 'justify',
            whiteSpace: 'pre-wrap',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            // figcaption: {
            //   textAlign: "center"
            // },
            p: {
              '&::before': {
                content: '  ',
                backgroundColor: '#FFBA10',
              }
            },

          },

        },
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "2rem",
        },
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  variants: {
    extend: {},
  },
  theme: {


    extend: {
      colors: {
        // primary: colors.indigo,
        ...colors,
        tongyuan: {
          100: "RGB(218,233,247, 92)",
          'blue': "RGB(27,112, 182, 100)",
          'lightblue': "rgba(27, 112, 189, 1)",
        },
        primary: {
          900: "RGB(43.0,25.0,76.0)",
          800: "RGB(41.0,47.0,98.0)",
          700: "RGB(39.0,69.0,121.0)",
          // 600: "RGB(43.0,93.0,151.0)",
          600: "RGB(43, 134, 216)",
          500: "RGB(62.0,111.0,184.0)",
          400: "RGB(102.0,132.0,211.0)",
          300: "RGB(147.0,152.0,229.0)",
          200: "RGB(179.0,173.0,239.0)",
          100: "rgba(230, 240, 248, 1)",
          // 100: "RGB(198.0,193.0,244.0)",
          50: "RGB(217.0,213.0,248.0)",
        },

      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shiftup: {
          '0%': {
            transform: 'translateY(100%)'
          },
          '100%': {
            transform: 'translateY(0%)'
          },
        },
        fadeIn: {
          'from': {
            opacity: "0.5",
          },
          'to': {
            opacity: "1"
          }
        }
      },

      backgroundImage: theme => ({
        // 'hero-pattern': "url('/img/hero-pattern.svg')",
        // 'footer-texture': "url('/img/footer-texture.png')",
        'grid': "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'><path d='M0 .5H31.5V32'/></svg>\")",
        'stripe-1': "url('/svg/gumi88pure.svg')",
        'stripe-2': "url('/svg/gumi95.svg')",
        'page-default': "url('/svg/default-page.svg')",
        '404': "url('/svg/404.svg')",
        'case-header': "url('/svg/case-header.svg')"

      })
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("flowbite/plugin"), plugin(function ({ addUtilities }) {
      addUtilities({
        '.content-auto': {
          'content-visibility': 'auto',
        },
        '.content-hidden': {
          'content-visibility': 'hidden',
        },
        '.content-visible': {
          'content-visibility': 'visible',
        },
        '.writing-vertical-lr': {
          'writing-mode': 'vertical-lr'
        },
        '.writing-lr': {
          'writing-mode': 'lr'
        },
        '.counter': {
          'counter-reset': 'section',
          '> li': {
            'counter-increment': 'section',
            'display': 'flex',
            'position': 'relative',
            '@apply rounded-md border-solid shadow-md m-4 p-3 bg-white': true,
            'min-height': '8rem',
            'z-index': '-10'
          },
          '> li::before': {
            'width': '50%',
            'position': 'absolute',
            'top': 0,
            'bottom': 0,
            'font-size': '4rem',
            'content': 'counter(section, decimal-leading-zero)',
            '@apply text-[#F4F7F9]': true,
            'z-index': '-20'
          }

        },

      })
    })
  ],
  content: [
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/flowbite/**/*.js"
  ]
}
