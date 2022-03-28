module.exports = {
  mod: "jit",
  purge: {
    mode: "all",
    content: ["./src/**/*.js", "./src/**/*.jsx"],
  },
  content: [
    "./src/**/*.{js,jsx}",
    "./node_modules/@themesberg/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@themesberg/flowbite/plugin")],
};
