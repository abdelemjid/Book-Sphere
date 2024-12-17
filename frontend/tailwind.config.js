/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // Dark Moded Selector
  darkMode: "selector",
  // theme
  theme: {
    extend: {
      // Custom screen
      screens: {
        "sm-hidden": {
          raw: "(max-width: 640px)",
        },
        "md-flex": {
          raw: "(min-width: 768px)",
        },
      },
      // Font Size
      fontSize: {
        xs: "0.5rem",
        sm: "0.7rem",
        base: "0.9rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      // Container Margin Sizes
      container: {
        center: true, // Center the container horizontally
        padding: {
          DEFAULT: "1rem", // Default padding (16px)
          sm: "2rem", // Padding for small screens (32px)
          md: "3rem", // Padding for medium screens (48px)
          lg: "4rem", // Padding for large screens (64px)
          xl: "5rem", // Padding for extra-large screens (80px)
        },
      },

      // Colors
      colors: {
        accent: {
          100: "#ef2d56",
          200: "#f14267",
          300: "#f25778",
          400: "#f46c89",
        },
        primary: {
          100: "#ed7d3a",
          200: "#ef8a4e",
          300: "#f19761",
          400: "#f2a475",
        },
        secondary: {
          100: "#8cd867",
          200: "#98dc76",
          300: "#a3e085",
          400: "#afe495",
        },
        third: {
          100: "#2fbf71",
          200: "#44c57f",
          300: "#59cc8d",
          400: "#6dd29c",
        },
        dark: {
          100: "#030303",
          200: "#0a0a0a",
          300: "#111111",
          400: "#181818",
        },
        light: {
          100: "#efefef",
          200: "#d7d7d7",
          300: "#bfbfbf",
          400: "#a7a7a7",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hidden-sm": {
          "@screen sm-hidden": {
            display: "none",
          },
        },
        ".block-sm": {
          "@screen sm-hidden": {
            display: "block",
          },
        },
        ".flex-md": {
          "@screen md-flex": {
            display: "flex",
          },
        },
      });
    },
  ],
};
