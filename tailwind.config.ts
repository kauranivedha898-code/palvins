import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f4',
          100: '#eef0e9',
          500: '#5E6B4A',
          600: '#4a5539',
          700: '#3a4129',
          900: '#2a3019',
        },
        beige: {
          50: '#fdfbf9',
          100: '#faf6f2',
          200: '#f5efea',
          300: '#f0e8de',
          500: '#E9DFC9',
          600: '#d4c5ac',
        },
        terracotta: {
          50: '#fdf8f6',
          100: '#faf0eb',
          400: '#d9957f',
          500: '#C57B57',
          600: '#b26b48',
          700: '#9a5a3c',
        },
        cream: '#F7F2E8',
        cocoa: '#3A2E28',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
