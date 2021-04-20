module.exports = {
  siteMetadata: {
    title: "🧑‍💻 LESS",
    description: "blog & wiki",
    author: "padosum",
    twitter: '',
    siteUrl: `https://padosum.dev/`, // For sitemap & RSS feed
  },
  plugins: [
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-156992915-1",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-theme-networked-thought`,
      options: {
        rootPath: '/',
      },
    },
  ],
}
