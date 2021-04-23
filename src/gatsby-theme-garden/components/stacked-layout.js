import React, { memo } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import {
  useStackedPagesProvider,
  StackedPagesProvider,
} from "react-stacked-pages-hook";
import { dataToNote, dataToSlug } from "gatsby-theme-garden/src/utils/data-to-note";
import Note from "gatsby-theme-garden/src/components/note";
import NoteWrapper from "gatsby-theme-garden/src/components/note-wrapper";
import Header from "gatsby-theme-garden/src/components/header";
import SEO from "gatsby-theme-garden/src/components/seo";
import Utterances from "./Utterances"

import "gatsby-theme-garden/src/components/theme.css";
import "./stacked-layout.css";
import "gatsby-theme-garden/src/components/custom.css";

const Content = ({ windowWidth, scrollContainer, stackedPages, index }) => {
  let theme = 'github-light';
  if (typeof window !== 'undefined') {
    theme = localStorage.getItem('darkMode') == "true" ? 'github-dark' : 'github-light';
  }

  return (
    <div className="layout">
      <SEO title={stackedPages[stackedPages.length - 1].data.title} />
      <Header />
      <div className="note-columns-scrolling-container" ref={scrollContainer}>
        <div
          className="note-columns-container"
          style={{ width: 625 * (stackedPages.length + 1) }}
        >
          {stackedPages.map((page, i) => (
            <NoteWrapper
              key={page.slug}
              i={typeof index !== "undefined" ? index : i}
              slug={page.slug}
              title={page.data.title}
            >
              <Note {...page.data} />
              <Utterances repo='padosum/blog' theme={theme} title={page.data.title}/>
            </NoteWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};
const MemoContent = memo(Content);

const NotesLayout = ({ location, slug, data }) => {
  const windowWidth = useWindowWidth();

  const [state, scrollContainer] = useStackedPagesProvider({
    firstPage: { slug: dataToSlug(data), data },
    location,
    processPageQuery: dataToNote,
    pageWidth: 625,
  });

  let pages = state.stackedPages;
  let activeIndex;
  if (windowWidth <= 800) {
    const activeSlug = Object.keys(state.stackedPageStates).find(
      (slug) => state.stackedPageStates[slug].active
    );
    activeIndex = state.stackedPages.findIndex(
      (page) => page.slug === activeSlug
    );
    if (activeIndex === -1) {
      activeIndex = state.stackedPages.length - 1;
    }

    pages = [state.stackedPages[activeIndex]];
  }

  return (
    <StackedPagesProvider value={state}>
      <MemoContent
        windowWidth={windowWidth}
        scrollContainer={scrollContainer}
        stackedPages={pages}
        index={activeIndex}
      />
    </StackedPagesProvider>
  );
};

export default NotesLayout;