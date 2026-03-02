/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A14',
        dark: '#0A0A14',
        accent: '#7B61FF',
        ghost: '#F0EFF4',
        graphite: '#18181B',
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        drama: ['"Instrument Serif"', 'serif'],
        data: ['"Fira Code"', 'monospace'],
        sans: ['Sora', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(123, 97, 255, 0.5)',
      }
    },
  },
  plugins: [],
}
