module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0px 0px 20px black",
      },
      colors: {
        cover: "rgb(0 0 0 / 95%)",
        main: "#0d0d0d"
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

    },
  },
  plugins: ["gatsby-plugin-postcss"],
};
