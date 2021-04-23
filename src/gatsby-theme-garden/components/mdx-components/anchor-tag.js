import React from "react";
import { basename } from "path";
import { withPrefix } from "gatsby";
import Tippy from "@tippyjs/react";
import { MDXProvider } from "@mdx-js/react";
import MDXRenderer from "gatsby-theme-garden/src/components/mdx-components/mdx-renderer";
import { LinkToStacked } from "react-stacked-pages-hook";

import "gatsby-theme-garden/src/components/mdx-components/anchor-tag.css";

const innerLinkStyles = `text-link-blue px-1 -mx-1 rounded hover:bg-link-hover-blue focus:bg-link-hover-blue`;

export const AnchorTag = ({
  title,
  href,
  references = [],
  withoutLink,
  withoutPopup,
  ...restProps
}) => {
  // same as in gatsby-transformer-markdown-references/src/compute-inbounds.ts#getRef
  const ref = references.find(
    (x) =>
      withPrefix(x.slug) === withPrefix(href) ||
      x.title === title ||
      (x.aliases || []).some((alias) => alias === title) ||
      basename(x.slug) === title
  );

  let content;
  let popupContent;
  let child;

  if (ref) {
    const nestedComponents = {
      a(props) {
        return <AnchorTag {...props} references={references} withoutLink />;
      },
      p(props) {
        return <span {...props} />;
      },
    };
    content =
      ref.title === ref.displayTitle ? (
        restProps.children
      ) : (
        <MDXProvider components={nestedComponents}>
          <MDXRenderer>{ref.mdx}</MDXRenderer>
        </MDXProvider>
      );
    popupContent = (
      <div id={ref.id} className="popover with-markdown">
        {ref.title === ref.displayTitle ? (
          <React.Fragment>
            <MDXProvider components={nestedComponents}>
              <MDXRenderer>{ref.mdx}</MDXRenderer>
            </MDXProvider>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h5>{ref.displayTitle}</h5>
            <ul>
              <li>
                <MDXProvider components={nestedComponents}>
                  <MDXRenderer>{ref.mdx}</MDXRenderer>
                </MDXProvider>
              </li>
            </ul>
          </React.Fragment>
        )}
        <div className="more-content-blind" />
      </div>
    );
    child = (
      <LinkToStacked {...restProps} to={ref.slug} title={title} className={innerLinkStyles}>
        {content}
      </LinkToStacked>
    );
  } else {
    content = restProps.children;
    popupContent = <div className="popover no-max-width">{href}</div>;
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    child = (
      <a
        {...restProps}
        href={
          !href || (href.indexOf && href.indexOf("#") === 0)
            ? href
            : withPrefix(href)
        }
        title={title}
        className={innerLinkStyles} 
      />
    );
  }

  if (withoutLink) {
    return <span>{content}</span>;
  }

  if (withoutPopup) {
    return child;
  }

  return (
    <Tippy animation="shift-away" content={popupContent} maxWidth="none">
      {child}
    </Tippy>
  );
};