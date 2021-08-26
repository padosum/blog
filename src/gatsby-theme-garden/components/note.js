
import React from "react";
import { MDXProvider } from "@mdx-js/react";
import * as components from "gatsby-theme-garden/src/components/mdx-components";
import MDXRenderer from "gatsby-theme-garden/src/components/mdx-components/mdx-renderer";
import ReferencesBlock from "gatsby-theme-garden/src/components/references-block";
import { LinkToStacked } from "react-stacked-pages-hook";

const Note = (data) => {
  const AnchorTag = (props) => (
    <components.a {...props} references={data.outboundReferences} />
  );

  const Title = ({title}) => {
    return <h1>🖋️ {title}</h1>
  }
  return (
    <React.Fragment>
      {data.partOf ? (
        <div>
          Part of{" "}
          <LinkToStacked to={data.partOf.slug}>
            {data.partOf.title}
          </LinkToStacked>
        </div>
      ) : null}
      <Title title={data.title}></Title>
      <MDXProvider components={{ ...components, a: AnchorTag }}>
        <MDXRenderer>{data.mdx}</MDXRenderer>
      </MDXProvider>
      <ReferencesBlock references={data.inboundReferences} />
    </React.Fragment>
  );
};

export default Note;