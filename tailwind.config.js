module.exports = {
  purge: [
    './src/**/*.js',
    './content/garden/*.md',
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
