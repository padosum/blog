import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from './layout'
import ReferencesBlock from './references-block'
import { MDXProvider } from '@mdx-js/react'
import components from './mdx-components'
import SEO from './seo'
import { Box, Heading, Text, useTheme } from '@primer/components'
import { HEADER_HEIGHT } from 'gatsby-theme-primer-wiki/src/components/header'
import Blockquote from 'gatsby-theme-primer-wiki/src/components/blockquote'
import TableOfContents from './table-of-contents'
import TagsBlock from 'gatsby-theme-primer-wiki/src/components/tags-block'
import useThemeConfig from 'gatsby-theme-primer-wiki/src/use-theme-config'
import Giscus from '@giscus/react'
import { useStaticQuery, graphql } from 'gatsby'
import PageHistory from './page-history'
function TagsList({
  type = 'normal',
  title,
  url,
  items,
  depth = 0,
  nodes = [],
}) {
  items = items || []
  const [mdx] = nodes.filter((mdx) => mdx.fields.slug === url)
  const description = mdx?.frontmatter?.description ?? ''
  return (
    <li>
      <components.a href={url}>
        {type === 'tag'
          ? `#${title}`
          : `${title}${description && ` 「${description}」`}`}
      </components.a>
      {Array.isArray(items) && items.length > 0 ? (
        <components.ul>
          {items.map((subItem, index) => (
            <TagsList
              key={subItem.title}
              depth={depth + 1}
              {...subItem}
              nodes={nodes}
            />
          ))}
        </components.ul>
      ) : null}
    </li>
  )
}
const Post = ({ data, pageContext, location }) => {
  const post = data.mdx
  const tagsOutbound = data.tagsOutbound || {
    nodes: [],
  }

  const primerWikiThemeConfig = useThemeConfig()
  const [sidebarItems] = pageContext.sidebarItems
  const {
    tableOfContents,
    frontmatter,
    fields,
    rawBody,
    body,
    inboundReferences,
    outboundReferences,
    excerpt,
  } = post

  const { title, gitCreatedAt, slug, url, editUrl, shouldShowTitle } = fields

  const {
    date,
    description,
    imageAlt,
    dateModified,
    tags,
    language,
    seoTitle,
    updated,
  } = frontmatter

  const lastUpdatedTime = updated?.split('+')[0].trim() || ''

  const category = tags && tags[0]
  const datePublished = date
    ? new Date(date.split(' ')[0])
    : gitCreatedAt
    ? new Date(gitCreatedAt)
    : null

  const postSeoData = {
    title,
    shouldShowTitle,
    description,
    rawBody,
    excerpt,
    datePublished,
    seoTitle,
    dateModified: dateModified
      ? new Date(dateModified)
      : lastUpdatedTime
      ? new Date(lastUpdatedTime.split(' ')[0])
      : datePublished,
    category,
    imageUrl: frontmatter.image ? frontmatter.image.publicURL : null,
    imageAlt: imageAlt,
    url,
    slug,
    tags: tags || [],
    language,
  }

  const postSlug = fields.slug
  const AnchorTag = (props) => (
    <components.a
      {...props}
      references={outboundReferences}
      postSlug={postSlug}
    />
  )

  const allTILData = useStaticQuery(graphql`
    query TILQuery {
      allMdx(
        filter: {
          slug: {
            regex: "/^wiki/20[0-9]{2}/[0-9]{2}/20[0-9]{2}-[0-9]{2}-[0-9]{2}/"
          }
        }
      ) {
        nodes {
          frontmatter {
            description
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `)
  const { resolvedColorMode } = useTheme()
  return (
    <Layout pageContext={pageContext} location={location}>
      <SEO post={postSeoData}></SEO>

      <Box
        id="skip-nav"
        display="flex"
        width="100%"
        lineHeight={1.92}
        p={[4, 5, 6, 7]}
        sx={{
          justifyContent: 'center',
          flexDirection: 'row-reverse',
        }}
      >
        {slug !== '/' && tableOfContents.items ? (
          <Box
            sx={{ width: 220, flex: '0 0 auto', marginLeft: 6 }}
            display={['none', null, 'block']}
            css={{ gridArea: 'table-of-contents', overflow: 'auto' }}
            position="sticky"
            top={HEADER_HEIGHT + 24}
            maxHeight={`calc(100vh - ${HEADER_HEIGHT}px - 24px)`}
          >
            <Text display="inline-block" fontWeight="bold" mb={1}>
              On this page
            </Text>
            <TableOfContents items={tableOfContents.items} />
          </Box>
        ) : null}
        <Box width="100%">
          {shouldShowTitle && (
            <Box>
              <Box display="flex" sx={{ alignItems: 'center' }}>
                <Heading as="h1" mr={2} color="text.secondary">
                  {title}
                </Heading>
              </Box>
            </Box>
          )}
          {slug != '/' && (
            <PageHistory
              editUrl={editUrl}
              created={date}
              lastUpdated={lastUpdatedTime}
            />
          )}
          {description && <Blockquote>{description}</Blockquote>}

          {tableOfContents.items ? (
            <Box
              borderWidth="1px"
              borderStyle="solid"
              borderColor="border.primary"
              borderRadius={2}
              display={['block', null, 'none']}
              mb={5}
            >
              <Box p={3}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontWeight="bold">On this page</Text>
                </Box>
              </Box>
              <Box
                p={3}
                sx={{
                  borderTop: '1px solid',
                  borderColor: 'border.gray',
                }}
              >
                <TableOfContents items={tableOfContents.items} />
              </Box>
            </Box>
          ) : null}
          <MDXProvider components={{ a: AnchorTag }}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
          {slug === '/' &&
            primerWikiThemeConfig.shouldShowLatestOnIndex &&
            sidebarItems.items.length > 0 &&
            sidebarItems.items.map((item) => {
              return (
                <Box key={item.title}>
                  <components.h2>✏️ 최근 변경된 것 </components.h2>
                  <components.a href={item.url}>(전체 목록 보기)</components.a>
                  {item.items.map((child) => {
                    return (
                      <components.ul key={child.title}>
                        <TagsList
                          title={child.title}
                          url={child.url}
                          type={child.type}
                          items={child.items}
                          nodes={allTILData.allMdx.nodes}
                        ></TagsList>
                      </components.ul>
                    )
                  })}
                </Box>
              )
            })}
          <ReferencesBlock references={inboundReferences} />
          {primerWikiThemeConfig.shouldSupportTags && (
            <TagsBlock tags={tags} nodes={tagsOutbound.nodes} />
          )}
          <components.hr></components.hr>
          <Giscus
            repo="padosum/blog"
            repoId="MDEwOlJlcG9zaXRvcnkyMzYzMzcwMzM="
            category="General"
            categoryId="DIC_kwDODhY3ic4B_Fb9"
            mapping="specific"
            term={title}
            reactionsEnabled="1"
            emitMetadata="0"
            theme={
              resolvedColorMode === 'day'
                ? 'light_high_contrast'
                : 'dark_high_contrast'
            }
          />
        </Box>
      </Box>
    </Layout>
  )
}
export default Post
