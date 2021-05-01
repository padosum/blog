module.exports = {
  siteMetadata: {
    title: "🧑‍💻 LESS",
    description: "wiki",
    author: "padosum",
    twitter: '',
  },
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-156992915-1",
      }
    },
    {
      resolve: `gatsby-theme-garden`,
      options: {
        rootNote: `/About`,
        contentPath: `${__dirname}/content/garden`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Noto Sans KR`],
        display: "swap"
      }
    }
  ],
}
