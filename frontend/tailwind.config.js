/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // Dark Moded Selector
  darkMode: "selector",
  // theme
  theme: {
    fontSize: {
      xs: "0.4rem", // Override default 0.75rem
      sm: "0.6rem", // Override default 0.875rem
      base: "1px", // Keep default 1rem
      lg: "1rem", // Override default 1.125rem
      xl: "1.1rem", // Override default 1.25rem
      "2xl": "1.4rem", // Override default 1.5rem
      "3xl": "1.8rem", // Override default 1.875rem
      "4xl": "2rem", // Override default 2.25rem
      "5xl": "2.5rem", // Keep default 3rem
      "6xl": "3rem", // Override default 4rem
    },
    extend: {
      // Font Size
      fontSize: {
        xs: "0.5rem",
        sm: "0.5rem",
        base: "0.5rem",
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
          100: "#E3F0AF",
          200: "#ccd89e",
          300: "#b6c08c",
          400: "#9fa87a",
        },
        primary: {
          100: "#FBF6E9",
          200: "#e2ddd2",
          300: "#c9c5ba",
          400: "#b0aca3",
        },
        secondary: {
          100: "#5DB996",
          200: "#54a787",
          300: "#4a9478",
          400: "#418269",
        },
        third: {
          100: "#118B50",
          200: "#0f7d48",
          300: "#0e6f40",
          400: "#0c6138",
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
  plugins: [],
};
