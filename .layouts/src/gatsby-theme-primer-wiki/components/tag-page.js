import React from 'react'
import Layout from './layout'
import SEO from 'gatsby-theme-primer-wiki/src/components/seo'
import { Box } from '@primer/components'
import urlJoin from 'url-join'
import TagPosts from 'gatsby-theme-primer-wiki/src/components/tag-posts'
import WindowFooter from './window-footer'
import WindowTitle from './window-title'

const Tag = ({ data, pageContext, location }) => {
  const pathPrefix = data.site.pathPrefix || ''
  const slug = pageContext.slug
  const fullPath = urlJoin(pathPrefix || '/', slug)
  const siteUrl = data.site.siteMetadata.siteUrl
  const fullUrl = urlJoin(siteUrl, fullPath)

  const posts = data.allMdx.nodes.sort((a, b) => {
    const aDate = new Date(a.frontmatter.updated.split(' ')[0] || 0).getTime()
    const bDate = new Date(b.frontmatter.updated.split(' ')[0] || 0).getTime()
    return bDate - aDate
  })
  let firstPublistedAt = null
  let dateModified = null
  if (posts.length > 0) {
    if (posts[posts.length - 1].fields.gitCreatedAt) {
      firstPublistedAt = new Date(posts[posts.length - 1].fields.gitCreatedAt)
    }
    if (posts[0].fields.lastUpdatedAt) {
      dateModified = new Date(posts[0].fields.lastUpdatedAt)
    }
  }
  const tag = pageContext.tag
  const title = `#${tag}`
  const palinBody = posts.map(post => post.fields.title).join(', ')
  const description = `All posts about #${tag}, ${palinBody.slice(0, 256)}`
  const postSeoData = {
    title,
    frontmatterTitle: '',
    description,
    rawBody: palinBody,
    excerpt: description,
    datePublished: firstPublistedAt,
    dateModified: dateModified,
    category: tag,
    imageUrl: null,
    imageAlt: '',
    url: fullUrl,
    slug: slug,
    tags: [tag],
  }
  return (
    <Layout pageContext={pageContext} location={location}>
      <SEO post={postSeoData}></SEO>
      <Box display="flex" justifyContent="center" pt="4">
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          maxWidth="640px"
          bg="bg.window"
          border="2px solid"
          borderColor="#fff8ff #000000 #000000 #fff8ff"
          p="2px 0"
          alignItems="center"
        >
          <WindowTitle title={'#' + tag}></WindowTitle>
          <Box
            width="98.5%"
            bg="bg.post"
            borderWidth="2px"
            borderStyle="ridge groove groove ridge"
            borderColor="#7f787f #fff8ff #fff8ff #7f787f"
            p="3"
            mt="2"
          >
            <TagPosts
              nodes={data.allMdx.nodes}
              tag={tag}
              shouldShowInstantView
            ></TagPosts>
          </Box>
          <WindowFooter count={data.allMdx.nodes.length}></WindowFooter>
        </Box>
      </Box>
    </Layout>
  )
}
export default Tag
