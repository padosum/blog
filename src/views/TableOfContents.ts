/**
 * 글 페이지의 목차.
 *
 * PC: 본문 우측에 sticky.
 * 모바일: 본문 위에 inline (details 로 접을 수 있음).
 *
 * CSS 가 위치를 책임지고 (article-layout grid + media query), 마크업은 항상 동일.
 */
import { View, html } from 'rune-ts';
import type { TocItem } from '../build/pipeline.ts';

export interface TableOfContentsData {
  items: TocItem[];
}

export class TableOfContents extends View<TableOfContentsData> {
  override template() {
    const { items } = this.data;
    return html`<aside class="toc" aria-label="목차">
  <details class="toc-details" open>
    <summary class="toc-heading">On this page</summary>
    <ul class="toc-list">
      ${items.map(
        (it) =>
          html`<li class="toc-item toc-level-${it.level}"><a href="#${it.id}">${it.text}</a></li>`,
      )}
    </ul>
  </details>
</aside>`;
  }
}
