/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#50C3C5",
      secondary: "#58595B",
      third: "#231F20",
      error: "#f43f5e",
      disabled: "#E6E6E6",
    },
    screens: {
      sssm: '360px',
      ssm: "375px",
      sm: "414px",
      xsm: "540px",
      md: "640px",
      lg: "768px",
      xl: "1024px",
      "2xl": "1280px",
      "3xl": "1536px",
      "4xl": "1792px",
    },
    extend: {},
  },
  plugins: [],
};
