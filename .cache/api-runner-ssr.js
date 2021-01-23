var plugins = [{
      plugin: require('/Users/aalto/blog/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/aalto/blog/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/aalto/blog/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/aalto/blog/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/aalto/blog/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"query":"\n        {\n          site {\n            siteMetadata {\n              title\n              description\n              siteUrl\n              site_url: siteUrl\n            }\n          }\n        }\n      ","feeds":[{"query":"\n            {\n              allMdx(\n                sort: { order: DESC, fields: [frontmatter___date] },\n              ) {\n                edges {\n                  node {\n                    excerpt\n                    html\n                    fields { slug }\n                    frontmatter {\n                      title\n                      date\n                    }\n                  }\n                }\n              }\n            }\n          ","output":"/rss.xml","title":"My blog's RSS Feed"}]},
    },{
      plugin: require('/Users/aalto/blog/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-code-titles","options":{"className":"code-title-custom"}},{"resolve":"gatsby-remark-images","options":{"maxWidth":"768px","backgroundColor":"transparent","linkImagesToOriginal":false}},{"resolve":"gatsby-remark-autolink-headers","options":{"className":"anchor-heading"}},{"resolve":"gatsby-remark-copy-linked-files","options":{"destinationDir":"/Users/aalto/blog/_posts","ignoreFileExtensions":["png","jpg","jpeg","bmp","tiff"]}}]},
    },{
      plugin: require('/Users/aalto/blog/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":""},
    },{
      plugin: require('/Users/aalto/blog/node_modules/gatsby-remark-autolink-headers/gatsby-ssr'),
      options: {"plugins":[],"className":"anchor-heading"},
    },{
      plugin: require('/Users/aalto/blog/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"gatsby-blog-mdx","short_name":"blog","start_url":"/","display":"minimal-ui","icon":"_assets/icon-code.png"},
    },{
      plugin: require('/Users/aalto/blog/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
