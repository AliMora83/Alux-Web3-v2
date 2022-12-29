/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ebayDark: "#080a0b",
        primary: "#372948",
        secondary: "#2c2b2b",
        accent: "#e6e2dc",
        accent2: "#fffdf9"
      },
      backgroundImage: {
        "hero-image": "url('/alux_bg.png')",
        "footer-image": "url('/')"
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px"
      }
    }
  },
  plugins: [require("tailwind-scrollbar"), "@tailwindcss/line-clamp"]
};
