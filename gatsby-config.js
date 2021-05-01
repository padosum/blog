module.exports = {
  siteMetadata: {
    title: "🧑‍💻 LESS",
    description: "wiki",
    author: "padosum",
    twitter: '',
    siteUrl: `https://padosum.dev/`, // For sitemap & RSS feed
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
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Noto Sans KR`],
        display: "swap"
      }
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: 'https://padosum.dev',
        sitemap: 'https://padosum.dev/sitemap.xml',
        policy: [{userAgent: '*', allow: '/'}]
      }
    }
  ],
}
