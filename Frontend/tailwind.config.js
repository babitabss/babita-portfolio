/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   "#0f172a",   // dark navy background
        secondary: "#1e293b",   // slightly lighter navy
        accent:    "#6366f1",   // indigo highlight color
        text:      "#e2e8f0",   // light text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}