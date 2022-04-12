const { colors } = require(`tailwindcss/defaultTheme`)

module.exports = {
  mode: "jit", // see https://tailwindcss.com/docs/just-in-time-mode
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {
      colors: {
        // primary: colors.indigo,
        primary: {
          // 900: "RGB(41,104,166)",
          // 800: "RGB(55,111,166)",
          // 700: "RGB(69,118,166)",
          // 600: "RGB(83,125,166)",
          // 500: "RGB(97,132,166)",
          // 400: "RGB(110,138,166)",
          // 300: "RGB(124,145,166)",
          // 200: "RGB(138,152,166)",
          // 100: "RGB(152,159,166)",
          // 50: "RGB(166,166,166)",
          // 900: "RGB(41, 104, 166)",
          // 800: "RGB(63, 123, 175)",
          // 700: "RGB(86, 137, 184)",
          // 600: "RGB(118, 152, 193)",
          // 500: "RGB(118, 168, 203)",
          // 400: "RGB(139, 179, 212)",
          // 300: "RGB(160, 189, 221)",
          // 200: "RGB(184, 200, 233)",
          // 100: "RGB(210, 213, 242)",
          // 50: "RGB(240, 240, 244)"
          900: "RGB(43.0,25.0,76.0)",
          800: "RGB(41.0,47.0,98.0)",
          700: "RGB(39.0,69.0,121.0)",
          600: "RGB(43.0,93.0,151.0)",
          500: "RGB(62.0,111.0,184.0)",
          400: "RGB(102.0,132.0,211.0)",
          300: "RGB(147.0,152.0,229.0)",
          200: "RGB(179.0,173.0,239.0)",
          100: "RGB(198.0,193.0,244.0)",
          50: "RGB(217.0,213.0,248.0)",





        }
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
  plugins: [require("@tailwindcss/typography")],
}
