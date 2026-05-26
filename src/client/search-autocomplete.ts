/**
 * 헤더 검색 자동완성 — 제목·태그 매칭만.
 *
 * 인덱스(`/search-index.json`)는 첫 호출 시 한 번만 fetch.
 * Fuse.js 도 이 모듈과 함께 동적 chunk 로 분리됨.
 */
import Fuse from 'fuse.js';

interface TitleEntry {
  slug: string;
  title: string;
  url: string;
  tags: string[];
}

const MAX_RESULTS = 8;

let fusePromise: Promise<Fuse<TitleEntry>> | null = null;

function loadIndex(): Promise<Fuse<TitleEntry>> {
  if (!fusePromise) {
    fusePromise = fetch('/search-index.json')
      .then((r) => r.json() as Promise<TitleEntry[]>)
      .then(
        (data) =>
          new Fuse(data, {
            keys: [
              { name: 'title', weight: 3 },
              { name: 'tags', weight: 1 },
            ],
            threshold: 0.35,
            ignoreLocation: true,
            includeScore: true,
          }),
      );
  }
  return fusePromise;
}

export function initAutocomplete(input: HTMLInputElement): void {
  const results = document.getElementById('search-results');
  if (!results) return;

  let items: HTMLElement[] = [];
  let activeIdx = -1;

  // focus 즉시 인덱스 로드 시작 (다음 입력을 대비)
  void loadIndex();

  const close = (): void => {
    results.hidden = true;
    activeIdx = -1;
  };

  const setActive = (idx: number): void => {
    activeIdx = idx;
    items.forEach((el, i) => el.classList.toggle('active', i === idx));
    if (idx >= 0) items[idx]!.scrollIntoView({ block: 'nearest' });
  };

  const render = (matches: Fuse.FuseResult<TitleEntry>[], q: string): void => {
    const top = matches.slice(0, MAX_RESULTS);
    const titlesHtml = top
      .map(
        ({ item }) => `<a class="search-item" href="${item.url}" role="option">
        <span class="search-item-title">${escapeHtml(item.title)}</span>
        ${item.tags.length ? `<span class="search-item-tags">${escapeHtml(item.tags.slice(0, 3).join(' · '))}</span>` : ''}
      </a>`,
      )
      .join('');

    const fullSearchHtml = `<a class="search-item search-item-full" href="/search/?q=${encodeURIComponent(q)}" role="option">
      <span class="search-item-title">▷ 본문 검색: "${escapeHtml(q)}"</span>
    </a>`;

    results.innerHTML = titlesHtml + fullSearchHtml;
    items = Array.from(results.querySelectorAll<HTMLElement>('.search-item'));
    activeIdx = -1;
    results.hidden = false;
  };

  input.addEventListener('input', async () => {
    const q = input.value.trim();
    if (!q) {
      close();
      return;
    }
    const fuse = await loadIndex();
    render(fuse.search(q), q);
  });

  input.addEventListener('keydown', (e) => {
    if (results.hidden || items.length === 0) {
      if (e.key === 'Enter' && input.value.trim()) {
        // 결과 없어도 본문 검색으로 이동
        e.preventDefault();
        location.href = `/search/?q=${encodeURIComponent(input.value.trim())}`;
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(Math.min(items.length - 1, activeIdx + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(-1, activeIdx - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target =
        activeIdx >= 0
          ? (items[activeIdx] as HTMLAnchorElement)
          : (items[items.length - 1] as HTMLAnchorElement); // 기본: 본문 검색
      location.href = target.href;
    } else if (e.key === 'Escape') {
      close();
      input.blur();
    }
  });

  document.addEventListener('click', (e) => {
    const t = e.target as Node;
    if (!input.contains(t) && !results.contains(t)) close();
  });

  input.addEventListener('focus', () => {
    if (input.value.trim()) input.dispatchEvent(new Event('input'));
  });
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
}
