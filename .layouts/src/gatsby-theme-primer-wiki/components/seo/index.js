import React from "react";
import { Helmet } from "react-helmet";
import GeneralTags from "./general";
import OpenGraphTags from "gatsby-theme-primer-wiki/src/components/seo/open-graph";
import RichSearchTags from "gatsby-theme-primer-wiki/src/components/seo/rich-search.js";
import TwitterTags from "gatsby-theme-primer-wiki/src/components/seo/twitter";
import {
  generatePostData,
  generateSeoData,
} from "gatsby-theme-primer-wiki/src/components/seo/utils";
import useSiteMetadata from "gatsby-theme-primer-wiki/src/use-site";
import useThemeConfig from "gatsby-theme-primer-wiki/src/use-theme-config";
const SEO = ({ post }) => {
  const { siteMetadata, pathPrefix } = useSiteMetadata();
  const themeConfig = useThemeConfig();
  const postData = post ? generatePostData(post) : undefined;

  const seoData = generateSeoData(siteMetadata, postData, {
    pathPrefix,
  });

  const tagList = [
    ...GeneralTags(seoData, siteMetadata),
    ...OpenGraphTags({ seoData, siteMetadata, postData }),
    ...RichSearchTags({ seoData, postData }),
    ...TwitterTags({ seoData, siteMetadata }),
  ];

  const titleTemplate =
    themeConfig.titleTemplate === null
      ? `%s - ${siteMetadata.title}`
      : themeConfig.titleTemplate;
  return (
    <Helmet
      titleTemplate={seoData.seoTitle ? null : titleTemplate}
      htmlAttributes={{
        lang:
          postData && postData.language
            ? postData.language
            : siteMetadata.language || "en",
      }}
    >
      {tagList}
    </Helmet>
  );
};

export default SEO;
