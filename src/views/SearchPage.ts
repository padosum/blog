/**
 * 검색 결과 페이지 — `/search/?q=...`
 *
 * 정적 셸만 렌더하고, 실제 결과는 클라이언트(`search-page.ts`)가
 * URL 파라미터를 읽어 `#search-page-results` 안에 채운다.
 */
import { View, html } from 'rune-ts';

export interface SearchPageData {}

export class SearchPage extends View<SearchPageData> {
  override template() {
    return html`<main class="shell">
<div class="article-layout">
  <article class="article">
    <header class="article-header">
      <h1 class="article-title" id="search-title">검색</h1>
      <div class="article-meta">
        <span id="search-count"></span>
      </div>
    </header>

    <div class="article-body">
      <div id="search-page-results">
        <p class="search-loading">검색 인덱스 로딩 중...</p>
      </div>
    </div>
  </article>
</div>
</main>`;
  }
}
