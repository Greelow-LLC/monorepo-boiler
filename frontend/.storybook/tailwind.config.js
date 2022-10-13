// module.exports = {
//   content: [
//     "../pages/**/*.{js,ts,jsx,tsx}",
//     "../components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("@tailwindcss/forms")],
// };
const { join } = require("path");

module.exports = {
  presets: [require("../tailwind.config.js")],
  content: [join(__dirname, "../libs/**/*.(js|jsx|ts|tsx)")],
  theme: {},
  plugins: [],
};
