const path = require('path')
const pathPrefix = '/'
const siteMetadata = {
  title: 'Padosum Blog / Wiki',
  shortName: 'Padosum Wiki',
  description: '최연정의 개인 위키입니다.',
  imageUrl: '/padosum_wiki.png',
  siteUrl: 'https://padosum.dev',
  fbAppId: '',
}
module.exports = {
  siteMetadata,
  pathPrefix,
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-notifications`,
      options: {
        sound: `Glass`,
        toast: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/..`,
        ignore: [`**/\.*/**/*`, 'wiki/template'],
      },
    },
    {
      resolve: 'gatsby-theme-primer-wiki',
      options: {
        icon: './static/logo.png',
        contentMaxWidth: 1440,
        defaultIndexLatestPostCount: 15,
        shouldShowLatestOnIndex: true,
        sidebarComponents: ['latest'],
        editUrlText: '수정하기',
        lastUpdatedText: '최근 수정',
        nav: [
          {
            title: 'Github',
            url: 'https://github.com/padosum/blog/',
          },
        ],
        editUrl: 'https://github.com/padosum/blog/blob/master/',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.shortName,
        start_url: pathPrefix,
        background_color: `#f7f0eb`,
        display: `standalone`,
        icon: path.resolve(__dirname, './static/logo.png'),
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ['UA-156992915-1'],
      },
    },
    {
      resolve: `gatsby-plugin-exclude`,
      options: { paths: ['/wiki/template/**'] },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `ca-pub-5398000784793847`,
      },
    },
  ],
}
