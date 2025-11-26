/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
        "./constants.ts"
    ],
    safelist: [
        'text-white',
        'text-cyan-400', 'text-purple-400', 'text-fuchsia-400',
        'bg-cyan-500', 'bg-purple-500', 'bg-fuchsia-500',
        'bg-cyan-500/20', 'bg-purple-500/20', 'bg-fuchsia-500/20',
        'border-cyan-500', 'border-purple-500', 'border-fuchsia-500',
        'border-cyan-500/50', 'border-purple-500/50', 'border-fuchsia-500/50',
        'from-cyan-400', 'from-purple-400', 'from-fuchsia-400',
        'to-cyan-500', 'to-purple-500', 'to-fuchsia-500',
        'from-cyan-500/20', 'from-purple-500/20', 'from-fuchsia-500/20',
        'from-cyan-600', 'from-purple-600', 'from-fuchsia-600',
        'hover:shadow-cyan-500/50', 'hover:shadow-purple-500/50', 'hover:shadow-fuchsia-500/50',
        'bg-white/5', 'bg-white/10', 'border-white/10'
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
