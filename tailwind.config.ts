import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2ff',
          100: '#b3d7ff',
          200: '#80bfff',
          300: '#4da6ff',
          400: '#1a8dff',
          500: '#0066cc',
          600: '#0052a3',
          700: '#003d7a',
          800: '#002951',
          900: '#001529',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}

export default config
