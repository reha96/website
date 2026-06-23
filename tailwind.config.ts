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
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Inter Fallback', 'system-ui', 'sans-serif'],
      },
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
        // ── Warm dark theme (Claude-inspired) ──
        charcoal: {
          50:  '#F5F4F1',
          100: '#E8E6DF',
          200: '#D4D2CB',
          300: '#A8A6A0',
          400: '#6E6D68',
          500: '#4A4A46',
          600: '#333330',
          700: '#2E2E2B',
          800: '#242421',
          900: '#1A1A17',
          950: '#12120F',
        },
        // Semantic aliases
        primary: {
          light: '#789BB9',    // glaucous blue
          dark: '#7BA0B5',     // warm blue for dark
          DEFAULT: '#789BB9',
        },
        accent: {
          light: '#E85D4A',    // coral red
          dark: '#E85D4A',     // coral red (same in both themes)
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
