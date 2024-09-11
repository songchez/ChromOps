/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: "#242E16",
        navy: "#000080",
        beige: "#9f8473",
      },
    },
  },
  daisyui: {
    themes: ["cmyk", "lofi"],
  },
  plugins: [require("daisyui")],
};
