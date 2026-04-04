/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0b1120', // background_primary
          800: '#0f1f18', // background_secondary
          700: '#152b1e', // surface_card
          border: '#1f3d2a', // border_subtle
        },
        'eco-green': {
          DEFAULT: '#34d974', // accent_green
          lime: '#84cc16', // accent_lime
        },
        amber: {
          DEFAULT: '#f59e0b', // accent_amber
        },
        text: {
          primary: '#f0faf2',
          secondary: '#86efac',
          muted: '#6a9070',
        },
        scan: {
          cyan: '#06b6d4', // highlight_scan
        },
        danger: {
          red: '#ef4444',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'scan-line': 'scan 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'bg-pan': 'bgPan 30s linear infinite',
      },
      keyframes: {
        bgPan: {
          '0%, 100%': { transform: 'scale(1) translateY(0)' },
          '50%': { transform: 'scale(1.05) translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
