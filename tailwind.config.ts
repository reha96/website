import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── "A Dictionary of Color Combinations" palette ──
        // Light theme: light glaucous blue + coral red
        glaucous: {
          50:  '#EFF3F7',
          100: '#DFE8EF',
          200: '#BED1DF',
          300: '#9DBACF',
          400: '#7CA3BF',
          500: '#789BB9', // light glaucous blue (primary)
          600: '#5F829E',
          700: '#4B6980',
          800: '#385062',
          900: '#243744',
        },
        coral: {
          50:  '#FDF0EE',
          100: '#FBE1DD',
          200: '#F6C3BB',
          300: '#F1A599',
          400: '#EC8777',
          500: '#E85D4A', // coral red (accent)
          600: '#CC3D2A',
          700: '#A33021',
          800: '#7A2418',
          900: '#52180F',
        },
        // Dark theme: oil green + sulphur yellow
        'oil-green': {
          50:  '#E9EDE5',
          100: '#D3DBCB',
          200: '#A7B797',
          300: '#7B9363',
          400: '#5F7548',
          500: '#4A5D3E', // oil green (dark bg)
          600: '#3A4A31',
          700: '#2B3725',
          800: '#1C2518',
          900: '#0E120C',
        },
        sulphur: {
          50:  '#FDFBE6',
          100: '#FBF7CD',
          200: '#F7EF9B',
          300: '#F3E769',
          400: '#EFDF37',
          500: '#E8D44D', // sulphur yellow (accent)
          600: '#C4B01B',
          700: '#938414',
          800: '#62580D',
          900: '#312C07',
        },
        // Semantic aliases
        primary: {
          light: '#789BB9',    // glaucous blue
          dark: '#4A5D3E',     // oil green
          DEFAULT: '#789BB9',
        },
        accent: {
          light: '#E85D4A',    // coral red
          dark: '#E8D44D',     // sulphur yellow
          DEFAULT: '#E85D4A',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
