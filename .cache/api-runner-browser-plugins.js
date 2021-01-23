module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-catch-links/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-code-titles","options":{"className":"code-title-custom"}},{"resolve":"gatsby-remark-images","options":{"maxWidth":"768px","backgroundColor":"transparent","linkImagesToOriginal":false}},{"resolve":"gatsby-remark-autolink-headers","options":{"className":"anchor-heading"}},{"resolve":"gatsby-remark-copy-linked-files","options":{"destinationDir":"/Users/aalto/blog/_posts","ignoreFileExtensions":["png","jpg","jpeg","bmp","tiff"]}}]},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-analytics/gatsby-browser.js'),
      options: {"plugins":[],"trackingId":""},
    },{
      plugin: require('../node_modules/gatsby-remark-autolink-headers/gatsby-browser.js'),
      options: {"plugins":[],"className":"anchor-heading"},
    },{
      plugin: require('../node_modules/gatsby-remark-images/gatsby-browser.js'),
      options: {"plugins":[],"maxWidth":"768px","backgroundColor":"transparent","linkImagesToOriginal":false},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"gatsby-blog-mdx","short_name":"blog","start_url":"/","display":"minimal-ui","icon":"_assets/icon-code.png"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
