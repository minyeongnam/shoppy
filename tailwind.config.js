/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/pages/**/*.tsx",
    "./src/component/**/*.tsx",
    "./src/context/**/*.tsx",
    "./src/App.tsx",
    "./src/index.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fca5a5",
      },
    },
    backgroundImage: {
      "mainvisual-01": `url('../public/images/img_mainvisual_01.jpg')`,
      "mainvisual-02": `url('../public/images/img_mainvisual_02.jpg')`,
      "mainvisual-03": `url('../public/images/img_mainvisual_03.jpg')`,
    },
  },
  plugins: [],
};
