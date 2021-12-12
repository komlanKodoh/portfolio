module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cover: "rgb(0 0 0 / 95%)",
      },
      screens: {
        "-2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        "-xl": { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        "-lg": { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        "-md": { max: "767px" },
        // => @media (max-width: 767px) { ... }

        "-sm": { max: "639px" },
        // => @media (max-width: 639px) { ... }
      },
      spacing: {
        px: "1px",
        0: "0",
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
        40: "10rem",
        48: "12rem",
        56: "14rem",
        64: "16rem",
        "90p": "90%",
      },
    },
  },
  plugins: ["gatsby-plugin-postcss"],
}
