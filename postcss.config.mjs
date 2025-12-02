// <CHANGE> Switch from @tailwindcss/postcss to standard Tailwind to fix Vercel build
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
