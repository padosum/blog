module.exports = {
  siteMetadata: {
    title: "🧑‍💻 LESS",
    description: "wiki",
    author: "padosum",
    twitter: '',
    siteUrl: `https://padosum.dev/`, // For sitemap & RSS feed
  },
  plugins: [
    {
      resolve: `gatsby-theme-garden`,
      options: {
        rootNote: `/About`,
        contentPath: `${__dirname}/content/garden`,
      },
    },
    "gatsby-plugin-sitemap",
  ],
}
