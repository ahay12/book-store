import daisyui from "daisyui";

const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    fontFamily: {
      sans: ["Helvetica", "Arial", "sans-serif"],
    },
    screens: {
      "2xl": "1280px",
    },
    extend: {},
  },

  daisyui: {
    themes: [
      {
        light: {
          primary: "#29c6f3",
          secondary: "#f7d060",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
});
