import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header-gradient': 'linear-gradient(20.78deg,#6e00f8 3.3%,#563ce9 27.67%,#116eee 93.23%)'
      },
      gridTemplateColumns: {
        'card1': 'repeat(1, minmax(0, 500px))',
        'card2': 'repeat(2, minmax(0, 500px))',
        'card3': 'repeat(3, minmax(0, 500px))',
      }
    },
  },
  plugins: [],
}
export default config
