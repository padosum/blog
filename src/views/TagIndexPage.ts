/**
 * 태그 인덱스 페이지 — `/tags/`
 *
 * 전체 태그를 tag-chip 클라우드로 표시.
 * note 개수 내림차순 (scan.ts 가 이미 정렬해서 넘김).
 */
import { View, html } from 'rune-ts';
import type { TagInfo } from '../build/scan.ts';

export interface TagIndexPageData {
  tags: TagInfo[];
}

export class TagIndexPage extends View<TagIndexPageData> {
  override template() {
    const { tags } = this.data;

    return html`<main class="shell">
<div class="article-layout">
  <article class="article">
    <header class="article-header">
      <h1 class="article-title">Tags</h1>
      <div class="article-meta">
        <span>TOTAL · <strong>${tags.length}</strong></span>
      </div>
    </header>

    <div class="article-body">
      <div class="tag-cloud">
        ${tags.map(
          (t) =>
            html`<a class="tag-chip" href="/tags/${t.slug}/">
              ${t.raw}<span class="tag-chip-count">&nbsp;${t.noteSlugs.length}</span>
            </a>`,
        )}
      </div>
    </div>
  </article>
</div>
</main>`;
  }
}
