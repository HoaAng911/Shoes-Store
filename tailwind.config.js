/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",  // Đối với các dự án thuần HTML
    "./src/**/*.{js,jsx,ts,tsx}",  // Đối với các dự án React hoặc Vite
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
