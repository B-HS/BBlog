/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'fluid' : 'repeat(auto-fit, minmax(395px, 1fr))'
      }
    },
  },
  plugins: [],
};
