/**
 * 글 페이지 — `/wiki/{slug}/` 의 본문.
 *
 * 구조:
 *   <main.ArticlePage>
 *     <article-layout>
 *       <aside.sidebar>     ← 태그
 *       <article>
 *         <header>           ← 태그 chips, 제목, 메타
 *         <body>             ← pipeline 결과 (raw HTML)
 *         <backlinks>        ← 이 노트로의 백링크
 *       </article>
 *     </article-layout>
 *   </main>
 *
 * 향후: 우측 TOC, 사이드바에 "관련 노트" 등 추가.
 */
import { View, html, type Html } from 'rune-ts';
import type { NoteMeta } from '../build/scan.ts';
import type { TocItem } from '../build/pipeline.ts';
import { TableOfContents } from './TableOfContents.ts';
import { raw } from './escape.ts';

export interface Backlink {
  slug: string;
  title: string;
  url: string;
}

export interface ArticlePageData {
  note: NoteMeta;
  /** unified/remark 파이프라인이 만든 본문 HTML */
  bodyHtml: string;
  /** 이 노트로의 백링크 */
  backlinks: Backlink[];
  /** 본문 헤딩 목록 — TOC 렌더용 */
  toc: TocItem[];
}

/** 헤딩이 2개 이상일 때만 TOC 표시 */
const TOC_MIN_ITEMS = 2;

export class ArticlePage extends View<ArticlePageData> {
  override template() {
    const { note, bodyHtml, backlinks, toc } = this.data;
    const tocView =
      toc.length >= TOC_MIN_ITEMS ? new TableOfContents({ items: toc }) : '';

    return html`<main class="shell">
<div class="article-layout">

  <article class="article">
    ${this.renderArticleHeader()}

    <div class="article-body">
${raw(bodyHtml)}
    </div>

    ${backlinks.length > 0 ? this.renderBacklinks() : ''}

    ${this.renderGiscus()}
  </article>

  ${tocView}

</div>
</main>`;
  }

  private renderArticleHeader(): Html {
    const { note } = this.data;
    const showUpdated = note.updated && note.updated !== note.date;
    const editUrl = `https://github.com/padosum/blog/blob/master/wiki/${note.slug}.md`;

    return html`<header class="article-header">
    <h1 class="article-title">${note.title}</h1>
    <div class="article-meta">
      ${note.date ? html`<span>PUBLISHED · <strong>${note.date}</strong></span>` : ''}
      ${showUpdated ? html`<span>UPDATED · <strong>${note.updated}</strong></span>` : ''}
      <a class="edit-link" href="${editUrl}" target="_blank" rel="noopener">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"/>
        </svg>
        수정하기
      </a>
    </div>
  </header>`;
  }

  private renderGiscus(): Html {
    const { note } = this.data;
    return html`<div class="giscus-wrap">
      <script src="https://giscus.app/client.js"
        data-repo="padosum/blog"
        data-repo-id="MDEwOlJlcG9zaXRvcnkyMzYzMzcwMzM="
        data-category="General"
        data-category-id="DIC_kwDODhY3ic4B_Fb9"
        data-mapping="specific"
        data-term="${note.title}"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light_high_contrast"
        data-lang="ko"
        crossorigin="anonymous"
        async>
      </script>
    </div>`;
  }

  private renderBacklinks(): Html {
    const { backlinks } = this.data;
    return html`<aside class="backlinks" aria-label="backlinks">
      <h2 class="backlinks-title">Backlinks · ${backlinks.length}</h2>
      <div class="backlinks-list">
        ${backlinks.map(
          (b) => html`<a class="backlink" href="${b.url}">
          <span class="backlink-title">${b.title}</span>
        </a>`,
        )}
      </div>
    </aside>`;
  }
}
