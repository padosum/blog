/**
 * `/search/?q=...` 페이지 — 본문 포함 전체 인덱스로 검색.
 *
 * Layout에 추가된 `<link rel="preload">` 덕분에 JS 파싱과 병렬로
 * 인덱스가 다운로드되어 있다.
 */
import Fuse from 'fuse.js';

interface FullEntry {
  slug: string;
  title: string;
  url: string;
  tags: string[];
  body: string;
}

const MAX_RESULTS = 100;
const SNIPPET_RADIUS = 60;

export async function initSearchPage(): Promise<void> {
  const titleEl = document.getElementById('search-title');
  const countEl = document.getElementById('search-count');
  const resultsEl = document.getElementById('search-page-results');
  if (!titleEl || !countEl || !resultsEl) return;

  const params = new URLSearchParams(location.search);
  const q = (params.get('q') ?? '').trim();

  // 헤더 input 에도 채워주기
  const headerInput = document.querySelector<HTMLInputElement>('#search-input');
  if (headerInput && q) headerInput.value = q;

  if (!q) {
    titleEl.textContent = '검색';
    resultsEl.innerHTML = '<p class="search-empty">검색어를 입력하세요.</p>';
    return;
  }

  titleEl.textContent = `"${q}" 검색 결과`;
  document.title = `"${q}" 검색 · Padosum Wiki`;

  const res = await fetch('/search-full-index.json');
  const data: FullEntry[] = await res.json();

  const fuse = new Fuse(data, {
    keys: [
      { name: 'title', weight: 3 },
      { name: 'tags', weight: 2 },
      { name: 'body', weight: 1 },
    ],
    threshold: 0.4,
    ignoreLocation: true,
    includeMatches: true,
    minMatchCharLength: 2,
  });

  const matches = fuse.search(q);
  countEl.textContent = `${matches.length}건`;

  if (matches.length === 0) {
    resultsEl.innerHTML = '<p class="search-empty">결과 없음</p>';
    return;
  }

  const lowerQ = q.toLowerCase();
  resultsEl.innerHTML = `<ul class="note-list">${matches
    .slice(0, MAX_RESULTS)
    .map(({ item }) => {
      const snippet = makeSnippet(item.body, lowerQ);
      return `<li class="note-item">
        <a class="note-link" href="${item.url}" style="grid-template-columns: minmax(0, 1fr); gap: var(--sp-1);">
          <span class="note-title">${highlight(item.title, lowerQ)}</span>
          ${snippet ? `<span class="search-item-tags">${snippet}</span>` : ''}
        </a>
      </li>`;
    })
    .join('')}</ul>`;
}

/** body 에서 q 첫 등장 주변 ±SNIPPET_RADIUS 자 발췌 + 하이라이트 */
function makeSnippet(body: string, lowerQ: string): string {
  const lower = body.toLowerCase();
  const idx = lower.indexOf(lowerQ);
  if (idx === -1) return '';
  const start = Math.max(0, idx - SNIPPET_RADIUS);
  const end = Math.min(body.length, idx + lowerQ.length + SNIPPET_RADIUS);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < body.length ? '…' : '';
  return prefix + highlight(body.slice(start, end), lowerQ) + suffix;
}

function highlight(text: string, lowerQ: string): string {
  const escaped = escapeHtml(text);
  // 이스케이프된 텍스트에서 다시 매치 (대소문자 무시)
  const re = new RegExp(escapeRegex(lowerQ), 'gi');
  return escaped.replace(re, (m) => `<mark class="search-match">${m}</mark>`);
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
