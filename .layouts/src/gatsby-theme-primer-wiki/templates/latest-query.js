import { graphql } from 'gatsby';
import LatestPage from 'gatsby-theme-primer-wiki/src/components/latest-page';

export default LatestPage;

export const query = graphql`
  query EnrichedLatestQuery {
    site {
      pathPrefix
      siteMetadata {
        siteUrl
      }
    }
    allMdx {
      nodes {
        frontmatter {
          title
          draft
          updated
        }
        fields {
          slug
          title
          lastUpdated
          lastUpdatedAt
          gitCreatedAt
        }
      }
    }
  }
`;
