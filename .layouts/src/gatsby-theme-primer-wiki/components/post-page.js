import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from './layout';
import ReferencesBlock from 'gatsby-theme-primer-wiki/src/components/references-block';
import { MDXProvider } from '@mdx-js/react';
import components from 'gatsby-theme-primer-wiki/src/components/mdx-components';
import SEO from 'gatsby-theme-primer-wiki/src/components/seo';
import { Box, Heading, Text, useTheme } from '@primer/components';
import { HEADER_HEIGHT } from 'gatsby-theme-primer-wiki/src/components/header';
import WindowFooter from './window-footer';
import TableOfContents from './table-of-contents';
import TagsBlock from 'gatsby-theme-primer-wiki/src/components/tags-block';
import { getSidebarItems } from 'gatsby-theme-primer-wiki/src/utils/sidebar-items';
import useThemeConfig from 'gatsby-theme-primer-wiki/src/use-theme-config';
import { Giscus } from '@giscus/react';
import LastUpdated from './last-updated';
import WindowTitle from './window-title';

function TagsList({ type = 'normal', title, url, items, depth = 0 }) {
  items = items || [];
  return (
    <li>
      <components.a href={url}>
        {type === 'tag' ? `#${title}` : title}
      </components.a>
      {Array.isArray(items) && items.length > 0 ? (
        <components.ul>
          {items.map((subItem, index) => (
            <TagsList key={subItem.title} depth={depth + 1} {...subItem} />
          ))}
        </components.ul>
      ) : null}
    </li>
  );
}
const Post = ({ data, pageContext, location }) => {
  const post = data.mdx;
  const tagsOutbound = data.tagsOutbound || {
    nodes: [],
  };

  const primerWikiThemeConfig = useThemeConfig();
  const sidebarItems = getSidebarItems(
    pageContext.sidebarItems,
    pageContext.tagsGroups
  );
  const latestPosts = pageContext.latestPosts;
  const {
    tableOfContents,
    frontmatter,
    fields,
    rawBody,
    body,
    inboundReferences,
    outboundReferences,
    excerpt,
  } = post;

  const {
    title,
    lastUpdatedAt,
    lastUpdated,
    gitCreatedAt,
    slug,
    url,
    editUrl,
    shouldShowTitle,
  } = fields;

  const {
    date,
    description,
    imageAlt,
    dateModified,
    tags,
    language,
    seoTitle,
  } = frontmatter;
  const category = tags && tags[0];
  const datePublished = date
    ? new Date(date.split(' ')[0])
    : gitCreatedAt
    ? new Date(gitCreatedAt)
    : null;

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
      : lastUpdatedAt
      ? new Date(lastUpdatedAt)
      : datePublished,
    category,
    imageUrl: frontmatter.image ? frontmatter.image.publicURL : null,
    imageAlt: imageAlt,
    url,
    slug,
    tags: tags || [],
    language,
  };
  const AnchorTag = props => (
    <components.a {...props} references={outboundReferences} />
  );

  const { resolvedColorMode } = useTheme();
  return (
    <Layout pageContext={pageContext} location={location}>
      <SEO post={postSeoData}></SEO>

      <Box
        id="skip-nav"
        display="flex"
        width="100%"
        p={[4, 5, 6, 7]}
        sx={{
          justifyContent: 'center',
          flexDirection: 'row-reverse',
        }}
      >
        {tableOfContents.items ? (
          <Box
            sx={{ width: 220, flex: '0 0 auto', marginLeft: 6 }}
            display={['none', null, 'block']}
            css={{ gridArea: 'table-of-contents', overflow: 'auto' }}
            position="sticky"
            top={HEADER_HEIGHT + 24}
            maxHeight={`calc(100vh - ${HEADER_HEIGHT}px - 24px)`}
          >
            <Box
              bg="bg.window"
              p="2px 0"
              border="2px solid"
              borderColor="#fff8ff #000000 #000000 #fff8ff"
            >
              <Box>
                <Text
                  display="flex"
                  alignItems="center"
                  fontWeight="bold"
                  mb={1}
                  padding="2px 4px 3px 4px"
                  width="100%"
                  bg="bg.tocTitle"
                >
                  <img src={'/mycomputer.png'}></img>&nbsp; On this page
                </Text>
              </Box>
              <Box
                width="98.5%"
                bg="bg.post"
                borderWidth="2px"
                borderStyle="ridge groove groove ridge"
                borderColor="#7f787f #fff8ff #fff8ff #7f787f"
              >
                <TableOfContents items={tableOfContents.items} />
              </Box>
              <WindowFooter count={tableOfContents.items.length}></WindowFooter>
            </Box>
          </Box>
        ) : null}
        <Box
          width="100%"
          lineHeight={1.92}
          mb={4}
          bg="bg.window"
          border="2px solid"
          borderColor="#fff8ff #000000 #000000 #fff8ff"
          p="2px 0"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <WindowTitle title={title}></WindowTitle>
          <Box
            padding="0 10px"
            margin="3px 0 3px 0"
            width="100%"
            fontStyle="color: black"
          >
            <LastUpdated
              created={frontmatter.date}
              lastUpdated={lastUpdatedAt}
            ></LastUpdated>
          </Box>

          <Box
            width="98.5%"
            bg="bg.post"
            borderWidth="2px"
            borderStyle="ridge groove groove ridge"
            borderColor="#7f787f #fff8ff #fff8ff #7f787f"
            p="3"
          >
            {shouldShowTitle && (
              <Box>
                <Box display="flex" sx={{ alignItems: 'center' }}>
                  <Heading as="h1" mr={2}>
                    {title}
                  </Heading>
                </Box>
              </Box>
            )}

            {tableOfContents.items ? (
              <Box
                borderWidth="1px"
                borderStyle="solid"
                borderColor="border.primary"
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
            {
              // slug === "/" &&
              //   primerWikiThemeConfig.shouldShowLatestOnIndex &&
              //   latestPosts.length > 0 && (
              //     <Box>
              //       <components.h2>Recently Updated</components.h2>
              //       <TagPosts
              //         nodes={latestPosts}
              //         shouldShowInstantView={false}
              //       ></TagPosts>
              //     </Box>
              //   )
            }
            {slug === '/' &&
              primerWikiThemeConfig.shouldShowSidebarListOnIndex &&
              sidebarItems.length > 0 &&
              sidebarItems.map(item => {
                return (
                  <Box key={item.title}>
                    <components.h2>{item.title}</components.h2>
                    {item.items.map(child => {
                      return (
                        <components.ul key={child.title}>
                          <TagsList
                            title={child.title}
                            url={child.url}
                            type={child.type}
                            items={child.items}
                          ></TagsList>
                        </components.ul>
                      );
                    })}
                  </Box>
                );
              })}
            <ReferencesBlock references={inboundReferences} />
            {primerWikiThemeConfig.shouldSupportTags && (
              <TagsBlock tags={tags} nodes={tagsOutbound.nodes} />
            )}
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
                resolvedColorMode === 'day' ? 'light' : 'dark_high_contrast'
              }
            />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};
export default Post;
