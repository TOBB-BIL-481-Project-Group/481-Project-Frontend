/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        lightGreen: "#79D92E",
        red: "#F03434",
        lightBlue: "#10B8CF",
        black: "#000000",
        purple: "#5302FF",
        blue: "#0085FF",
        gray: "#D8D8D8",
        yellow: "#FFE710",
        checkboxGray: "#DFDFDF",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
};
