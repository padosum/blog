/**
 * 클라이언트 진입점 — 전역 인터랙션.
 *
 * 무거운 로직(Fuse.js, 검색 인덱스)은 동적 import로 분리해서
 * 첫 사용 직전까지 다운로드하지 않는다.
 */

// ---------- TOC 활성화 ----------

const tocLinks = Array.from(
  document.querySelectorAll<HTMLAnchorElement>('.toc-list a'),
);

if (tocLinks.length > 0) {
  const headingIds = tocLinks
    .map((a) => a.getAttribute('href')?.slice(1))
    .filter(Boolean) as string[];

  const headingEls = headingIds
    .map((id) => document.getElementById(id))
    .filter(Boolean) as HTMLElement[];

  let activeId = '';

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId = entry.target.id;
      }
      for (const a of tocLinks) {
        const href = a.getAttribute('href')?.slice(1);
        a.classList.toggle('active', href === activeId);
      }
    },
    { rootMargin: '0px 0px -70% 0px', threshold: 0 },
  );

  for (const el of headingEls) observer.observe(el);
}

// ---------- 검색 ----------

const searchInput = document.querySelector<HTMLInputElement>('#search-input');

if (searchInput) {
  // 첫 focus 에서만 자동완성 모듈 lazy-load
  searchInput.addEventListener(
    'focus',
    async () => {
      const { initAutocomplete } = await import('./search-autocomplete.ts');
      initAutocomplete(searchInput);
    },
    { once: true },
  );

  // ⌘K / Ctrl+K 로 검색창 포커스
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });
}

// /search/ 페이지면 즉시 본문 검색 모듈 로드
if (location.pathname === '/search/') {
  import('./search-page.ts').then(({ initSearchPage }) => initSearchPage());
}

// ---------- 랜덤 문서 ----------

const randomBtn = document.querySelector<HTMLButtonElement>('#random-article');

if (randomBtn) {
  let urls: string[] | null = null;

  randomBtn.addEventListener('click', async () => {
    if (!urls) {
      randomBtn.disabled = true;
      const res = await fetch('/search-index.json');
      const data: { url: string }[] = await res.json();
      urls = data.map((d) => d.url);
      randomBtn.disabled = false;
    }
    const pick = urls[Math.floor(Math.random() * urls.length)];
    location.href = pick;
  });
}

// ---------- 코드 블록 복사 버튼 ----------

for (const pre of document.querySelectorAll<HTMLPreElement>('.article-body pre')) {
  const code = pre.querySelector('code');
  if (!code) continue;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'code-copy-btn';
  btn.setAttribute('aria-label', '코드 복사');
  btn.textContent = 'Copy';

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.innerText);
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 1200);
    } catch {
      btn.textContent = 'Failed';
      setTimeout(() => (btn.textContent = 'Copy'), 1200);
    }
  });

  pre.appendChild(btn);
}
