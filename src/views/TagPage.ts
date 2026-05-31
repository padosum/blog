/**
 * 태그 페이지 — `/tags/:slug/`
 *
 * 특정 태그가 달린 노트 목록. note-list 형식 (줄노트).
 */
import { View, html, type Html } from 'rune-ts';
import type { TagInfo } from '../build/scan.ts';
import type { NoteMeta } from '../build/scan.ts';

export interface TagPageData {
  tag: TagInfo;
  notes: NoteMeta[];
}

export class TagPage extends View<TagPageData> {
  override template() {
    const { tag, notes } = this.data;
    const sorted = [...notes].sort((a, b) => {
      const da = a.updated ?? a.date ?? '';
      const db = b.updated ?? b.date ?? '';
      return db.localeCompare(da);
    });

    return html`<main class="shell">
<div class="article-layout">
  <article class="article">
    <header class="article-header">
      <h1 class="article-title">#${tag.raw}</h1>
      <div class="article-meta">
        <span>NOTES · <strong>${notes.length}</strong></span>
      </div>
    </header>

    <div class="article-body">
      <ul class="note-list">
        ${sorted.map((n) => this.renderItem(n))}
      </ul>
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

function shortDate(d: string | undefined): string {
  if (!d) return '';
  return d.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? d;
}
