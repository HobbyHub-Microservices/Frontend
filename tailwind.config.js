/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-accent-1': '#111111',
        'dark-accent-2': '#333333',
        'dark-accent-3': '#444444',
        'dark-accent-5': '#888888'
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
