/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      heading: '"Dirtyline 36daysoftype 2022"',
    },
    fontSize: {
      "2xs": "0.625rem", // 10px
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.75rem", // 28px
      "4xl": "2rem", // 32px
      "5xl": "2.5rem", // 40px
      "6xl": "2.625rem", // 42px
      "7xl": "3rem", // 48px
      "8xl": "3.125rem", // 50px
      "9xl": "3.75rem", // 60px
      "10xl": "4.25rem", // 68px
      "11xl": "5rem", // 80px
      "12xl": "13.125rem", // 210px
    },
    lineHeight: {
      none: "1", // 100%
      0.8: "0.8", // 80%
      0.9: "0.9", // 90%
      1: "1", // 100%
      1.1: "1.1", // 110%
      1.2: "1.2", // 120%
      1.3: "1.3", // 130%
      1.4: "1.4", // 140%
    },
    letterSpacing: {
      normal: "0",
      2: "0.02em",
      4: "0.04em",
      5: "0.05em",
      8: "0.08em",
    },
    extend: {
      keyframes: {
        slideout: {
          "0%": { transform: "translateY(0%)" },
          "99%": { opacity: 1 },
          "100%": {
            transform: "translateY(100%)",
            opacity: 0,
          },
        },
      },
      animation: {
        slideout: "slideout 0.3s ease-in-out 1.5s forwards",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      colors: {
        primary: {
          500: "#F04823",
          700: "#6E2B1C",
        },
        text: {
          900: "#F2EBDE",
        },
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.25rem",
        6.5: "1.625rem",
      },
    },
  },
  plugins: [],
};
