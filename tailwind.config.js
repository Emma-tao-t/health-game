/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#fff9ec",
        mint: "#dff7df",
        skysoft: "#dff3ff",
        blush: "#ffdce6",
        lavenderSoft: "#eee6ff",
        ink: "#244047",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(76, 137, 120, 0.18)",
      },
    },
  },
  plugins: [],
};
