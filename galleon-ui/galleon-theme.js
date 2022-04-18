module.exports = {
  content: ["./src/**/*.{html,js,jsx,,ts,tsx}"],
  theme: {
    colors: {
      "theme-white": "#FFFFFF",
      "theme-navy": "#040728",
      "theme-black": "#07091E",
      "theme-oldlace": "#FDE6C4",
      "theme-champagne": "#FFEED7",
      "theme-background": "#FCF6EE",
      "theme-blue": "#025BEE",
    },
    fontFamily: {
      display: ["Morion"],
      body: ["Wigrum"],
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
