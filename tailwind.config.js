/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        patrick: ["Patrick Hand SC", "cursive"],
        charmonman: ["Charmonman", "cursive"],
        bungee: ["Bungee", "cursive"],
        montecarlo: ["Monte Carlo", "cursive"],
        pangolin: ["Pangolin", "cursive"],
        mansalva: ["Mansalva", "cursive"],
      },
    },
  },
  plugins: [],
};
