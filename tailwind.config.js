/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#00003F',
          darker: '#000028',
          blue: '#009DF6',
          'blue-hover': '#008be0',
          'blue-light': '#EBF7FF',
          'blue-subtle': '#F0F9FF',
          border: '#D9E2EC',
          surface: '#F8FAFC',
        }
      },
      fontFamily: {
        // Site-wide sans-serif system (Calibri-style). `font-serif` is intentionally
        // mapped to the same stack so existing heading classes render sans-serif.
        sans: ['Calibri', 'Carlito', '"Segoe UI"', 'system-ui', '-apple-system', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        serif: ['Calibri', 'Carlito', '"Segoe UI"', 'system-ui', '-apple-system', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(0, 0, 63, 0.06), 0 1px 4px -1px rgba(0, 0, 63, 0.04)',
        'card-hover': '0 12px 24px -6px rgba(0, 0, 63, 0.12), 0 4px 8px -2px rgba(0, 0, 63, 0.06)',
        'lift': '0 20px 30px -10px rgba(0, 157, 246, 0.15)',
      }
    },
  },
  plugins: [],
}
