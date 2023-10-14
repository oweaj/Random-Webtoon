/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      size: { min: "350px", max: "1280px" },
    },
  },
  plugins: [],
};
