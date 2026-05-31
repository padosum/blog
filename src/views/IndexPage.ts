/**
 * 홈 페이지 — `/` .
 *
 * 다른 위키 페이지와 동일한 구조 (article header / body) 안에 들어간다.
 * 본문은 짧은 인삿말 + 최근 노트 목록.
 */
import { View, html, type Html } from 'rune-ts';
import type { NoteMeta } from '../build/scan.ts';

export interface IndexPageData {
  /** 정렬된 최근 노트 */
  recentNotes: NoteMeta[];
  /** 사이트 시작일 (YYYY-MM-DD) */
  siteCreated: string;
  /** 사이트 최근 갱신일 (YYYY-MM-DD) */
  siteUpdated: string;
}

export class IndexPage extends View<IndexPageData> {
  override template() {
    const { recentNotes, siteCreated, siteUpdated } = this.data;

    return html`<main class="shell">
<div class="article-layout">

  <article class="article">
    <header class="article-header">
      <div class="index-logo-wrap">
        <img class="index-logo" src="/logo.png" width="80" height="80" alt="Padosum Wiki 로고" />
      </div>
      <h1 class="article-title">Padosum Wiki</h1>
      <div class="article-meta">
        <span>PUBLISHED · <strong>${siteCreated}</strong></span>
        <span>UPDATED · <strong>${siteUpdated}</strong></span>
      </div>
    </header>

    <div class="article-body">
      <p>안녕하세요! 최연정의 개인 위키입니다.</p>

      <h2>최근 노트</h2>
      <ul class="note-list">
        ${recentNotes.map((n) => this.renderItem(n))}
      </ul>
    </div>

    <div class="giscus-wrap">
      <script src="https://giscus.app/client.js"
        data-repo="padosum/blog"
        data-repo-id="MDEwOlJlcG9zaXRvcnkyMzYzMzcwMzM="
        data-category="General"
        data-category-id="DIC_kwDODhY3ic4B_Fb9"
        data-mapping="specific"
        data-term="Padosum Wiki"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light_high_contrast"
        data-lang="ko"
        crossorigin="anonymous"
        async>
      </script>
    </div>
  </article>

</div>
</main>`;
  }

  private renderItem(n: NoteMeta): Html {
    return html`<li class="note-item">
          <a class="note-link" href="${n.url}">
            <span class="note-title">${n.title}</span>
            <span class="note-date">${shortDate(n.updated ?? n.date)}</span>
          </a>
        </li>`;
  }
}

/** ISO/임의 날짜에서 YYYY-MM-DD 만 추출 */
function shortDate(d: string | undefined): string {
  if (!d) return '';
  return d.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? d;
}
