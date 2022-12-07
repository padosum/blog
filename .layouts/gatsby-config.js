const path = require("path");
const pathPrefix = "/";
const siteMetadata = {
  title: "Personal Wiki by Padosum",
  shortName: "Padosum Wiki",
  description: "최연정의 개인 위키입니다.",
  imageUrl: "/padosum_wiki.png",
  siteUrl: "https://padosum.dev",
  fbAppId: "",
};
module.exports = {
  siteMetadata,
  pathPrefix,
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/..`,
        ignore: [`**/\.*/**/*`],
      },
    },
    {
      resolve: "gatsby-theme-primer-wiki",
      options: {
        icon: "./static/logo.png",
        contentMaxWidth: 1440,
        shouldSupportLatest: true,
        defaultIndexLatestPostCount: 20,
        sidebarComponents: ["latest", "tag"],
        lastUpdatedText: "최근 수정",
        nav: [
          {
            title: "Github",
            url: "https://github.com/padosum/blog/",
          },
        ],
        editUrl: "https://github.com/padosum/blog/blob/master/",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.shortName,
        start_url: pathPrefix,
        background_color: `#f7f0eb`,
        display: `standalone`,
        icon: path.resolve(__dirname, "./static/logo.png"),
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `  {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(filter: {path: {regex: "/^(?!\\/wiki\\/[0-9]{4}).*/"}}) {
            nodes {
              path
            }
          }
        }`,
        serialize: ({ site, allSitePage }) => {
          return allSitePage.nodes.map(node => {
            return {
              url: site.siteMetadata.siteUrl + node.path,
              changefreq: `daily`,
              priority: 0.7,
            };
          });
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteMetadata.siteUrl,
        sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
        policy: [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/wiki/2021/*", "/wiki/2022/*"],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ["UA-156992915-1"],
      },
    },
    {
      resolve: `gatsby-plugin-exclude`,
      options: { paths: ["/wiki/template/**"] },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `ca-pub-5398000784793847`,
      },
    },
  ],
};
