/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary-foreground": "#2730F4",
        "second-foreground": "#090C64",
        "light-blue": "#EEEFFF",
        "dark-blue": "#091064",
        "bg-primary": "#DDEBFF",
        "bg-secondary": "#2757F4",
        "blue": "#4827F4"

      },
      fontFamily: {
        "days-one": `"Days One", sans-serif`
      }
    },
  },
  plugins: [],
}

