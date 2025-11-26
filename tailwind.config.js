/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
        "./constants.ts"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                orbitron: ['Orbitron', 'sans-serif'],
                gotham: ['Gotham', 'sans-serif'],
                rajdhani: ['Rajdhani', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
