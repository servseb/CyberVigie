/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#080c14',
          card: '#0d1220',
          cyan: '#00f2fe',
          purple: '#9d4edd',
        }
      }
    },
  },
  plugins: [],
}
