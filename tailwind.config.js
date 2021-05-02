module.exports = {
  purge: [
    './content/garden/*.md',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "link-hover-blue": "var(--link-bg)",
        "link-blue": "var(--link)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
