const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/aalto/blog/.cache/dev-404-page.js"))),
  "component---src-components-posts-post-template-index-js": hot(preferDefault(require("/Users/aalto/blog/src/components/Posts/PostTemplate/index.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/aalto/blog/src/pages/404.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/aalto/blog/src/pages/index.js")))
}

