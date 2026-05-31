/**
 * 페이지 공통 셸 — `<html>`, head, header, footer.
 *
 * View root 는 `<html>` 이라 className `"Layout"` 과 `data-rune` 어트리뷰트가
 * 자동으로 거기 붙는다. doctype 은 toHtml() 결과 앞에 prepend.
 */
import { View, html } from 'rune-ts';
import { raw } from './escape.ts';

export interface LayoutData {
  /** <title> 본문 — 사이트 이름 자동 suffix */
  title: string;
  /** meta description */
  description?: string;
  /** canonical URL — 절대 경로 (예: "/wiki/JavaScript-Iterator/") */
  canonicalUrl: string;
  /** 이미 렌더된 본문 HTML */
  body: string;
  /** <head>에 추가로 주입할 raw HTML (preload hint 등) */
  extraHead?: string;
}

const SITE_NAME = 'Padosum Wiki';
const SITE_BASE = 'https://padosum.dev';

export class Layout extends View<LayoutData> {
  override template() {
    const { title, description, canonicalUrl, body, extraHead } = this.data;
    const year = new Date().getFullYear();

    return html`<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title} · ${SITE_NAME}</title>
${description ? html`<meta name="description" content="${description}" />` : ''}
<link rel="canonical" href="${SITE_BASE + canonicalUrl}" />
<link rel="icon" type="image/png" href="/logo.png" />

<link rel="stylesheet" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Noto+Serif+KR:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
<style>@font-face{font-family:'YKompyuta';src:url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/Ycomputer-Regular.woff2') format('woff2');font-weight:normal;font-display:swap;}</style>

<link rel="stylesheet" href="/styles/tokens.css" />
<link rel="stylesheet" href="/styles/style.css" />
<script type="module" src="/_assets/main.js" defer></script>
${extraHead ? raw(extraHead) : ''}
</head>
<body>

<header class="site-header">
  <div class="shell site-header-inner">
    <a href="/" class="logo">
      <img class="logo-mark" src="/logo.png" alt="" aria-hidden="true" width="28" height="28" />
      <span class="logo-text">PADOSUM WIKI</span>
    </a>
    <div class="header-actions">
      <div class="search">
        <input id="search-input" type="search" placeholder="Search... (⌘K)" autocomplete="off" aria-label="검색" />
        <div id="search-results" class="search-dropdown" role="listbox" hidden></div>
      </div>
      <button id="random-article" class="icon-btn icon-btn-wide" type="button" aria-label="랜덤 문서" title="랜덤 문서로 이동">
        <svg class="dog" width="32" height="16" viewBox="0 0 32 16" fill="currentColor" aria-hidden="true">
          <g class="dog-dust" opacity="0.45">
            <ellipse cx="-2" cy="13.4" rx="1.1" ry="0.42"/>
            <ellipse cx="6" cy="13.6" rx="0.9" ry="0.35"/>
            <ellipse cx="14" cy="13.3" rx="1.2" ry="0.45"/>
            <ellipse cx="22" cy="13.7" rx="0.85" ry="0.35"/>
            <ellipse cx="30" cy="13.4" rx="1.05" ry="0.4"/>
            <ellipse cx="38" cy="13.5" rx="0.95" ry="0.38"/>
          </g>
          <g class="dog-body">
            <!-- 꼬리: 등 뒤에서 위로 살짝 휘어 올라감 -->
            <path d="M4.5 6 Q 2.5 3.8, 2 1.5 L 3.2 1.5 Q 3.6 3, 5.5 5.3 Z"/>
            <!-- 몸통 -->
            <rect x="4" y="5" width="19" height="5" rx="1.5"/>
            <!-- 머리 + 주둥이 (한 silhouette: 이마 → stop 꺾임 → 짧은 콧등 → 코끝 → 입선 → 턱 → 목) -->
            <path d="
              M 21 4
              Q 21 3.5, 22 3.5
              L 27.8 3.5
              Q 28.7 3.5, 28.7 4.8
              L 28.7 6
              L 29.7 6.3
              Q 30.4 6.7, 30.3 7.3
              Q 30.2 7.9, 29.5 8
              L 28 8.2
              Q 26.5 8.8, 25 9.2
              L 22 9.5
              Q 21 9.5, 21 8.5
              Z
            "/>
            <!-- 왼쪽 귀 (뒤쪽) -->
            <path d="M22 3.5 L 22 0.8 L 24.2 3.5 Z"/>
            <!-- 오른쪽 귀 (앞쪽) -->
            <path d="M26 3 L 27.3 0.5 L 28.2 3 Z"/>
            <!-- 눈 -->
            <circle cx="26" cy="5.7" r="0.55" fill="var(--bg)"/>
          </g>
          <g class="dog-legs-a">
            <!-- 뒤-왼쪽 다리 + 앞-오른쪽 다리 (대각 보행) -->
            <rect x="5.5" y="9.5" width="1.1" height="3"/>
            <rect x="5" y="12" width="2.1" height="0.9"/>
            <rect x="22" y="9.3" width="1.1" height="3"/>
            <rect x="21.5" y="11.8" width="2.1" height="0.9"/>
          </g>
          <g class="dog-legs-b">
            <!-- 뒤-오른쪽 다리 + 앞-왼쪽 다리 -->
            <rect x="8.5" y="9.5" width="1.1" height="3"/>
            <rect x="8" y="12" width="2.1" height="0.9"/>
            <rect x="19" y="9.3" width="1.1" height="3"/>
            <rect x="18.5" y="11.8" width="2.1" height="0.9"/>
          </g>
        </svg>
      </button>
    </div>
  </div>
</header>

${raw(body)}

<footer class="site-footer">
  <div class="shell site-footer-inner">
    <span>© 2019—${year} · PADOSUM.DEV</span>
    <span>SOURCE ON <a href="https://github.com/padosum/blog">GITHUB</a></span>
  </div>
</footer>

</body>
</html>`;
  }
}

/** Layout View를 doctype 포함한 완전한 HTML 페이지 문자열로 변환 */
export function renderPage(data: LayoutData): string {
  return '<!doctype html>\n' + new Layout(data).toHtml();
}
