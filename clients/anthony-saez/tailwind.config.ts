import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0b0a', coal: '#161615', anthracite: '#222221', graphite: '#33332f',
        bone: '#f1ede6', sand: '#d8cfc0', beige: '#b9a68a', stone: '#8d887e',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { wider2: '0.22em' },
    },
  },
  plugins: [],
}
export default config
