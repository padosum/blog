# Padosum Wiki — 리팩토링 진행 현황

> 세션 진행 기록. context 초기화 후에도 여기서 상태를 복원할 수 있도록 작성.
> 최종 업데이트: 2026-05-18

---

## 1. 한 줄 요약

Gatsby 제거 → Node 기반 직접 제작 SSG로 완전 전환.  
`tsx` + `unified/remark/rehype` + `rune-ts SSR` 조합으로 정적 HTML 빌드.

---

## 2. 기술 스택 (확정)

| 영역 | 선택 |
|---|---|
| 빌드 런타임 | Node 20+, `tsx` (TypeScript 직접 실행) |
| 마크다운 | `unified` + `remark-parse` + `remark-gfm` + `remark-frontmatter` |
| 위키 링크 | `@flowershow/remark-wiki-link` v3.4.0 |
| HTML 변환 | `remark-rehype` → `rehype-slug` → `rehype-autolink-headings` → `rehype-stringify` |
| 코드 하이라이트 | `rehype-pretty-code` + `shiki` (설치 완료, 파이프라인 미적용) |
| SSR 템플릿 | `rune-ts` v0.9.3 — `View.toHtml()` DOM 폴리필 없이 Node에서 동작 확인 |
| 클라이언트 번들 | `vite` (검색 위젯 등 인터랙션 필요 시) |
| 검색 | `fuse.js` v7.1.0 (설치 완료, 미구현) |
| 패키지 매니저 | `npm` (pnpm은 Volta+corepack 충돌로 롤백) |

---

## 3. 디자인 토큰 (확정)

파일: `src/public/styles/tokens.css`

```
--bg:        #FFFFFF      (흰색 배경)
--ink:       #1A1A1A      (거의 검정)
--accent:    #2E4DF5      (electric blue)
--rule:      #E5E5E5      (회색 선)
--bg-sunken: #F7F7F7      (약간 어두운 배경)
--bg-elev:   #F7F7F7      (elevated surface)
```

- `border-radius: 0` 통일 (모서리 없음)
- 픽셀 오프셋 그림자: `3px 3px 0 var(--ink)` (카드 hover용)
- 폰트: Pretendard (본문) + IBM Plex Mono (라벨/메타)
- 영감: makingsoftware.com 스타일 — white/near-black/electric-blue

---

## 4. URL 구조 (Gatsby와 동일 유지)

| 패턴 | 예시 |
|---|---|
| 홈 | `/` |
| 위키 루트 글 | `/wiki/:slug/` |
| 날짜 디렉토리 글 | `/wiki/2023/08/2023-08-15/` |
| 태그 인덱스 | `/tags/` (빌드만, 네비에서 제거됨) |
| 태그 페이지 | `/tags/:slug/` (빌드만, 네비에서 제거됨) |

- 모든 URL trailing slash 유지
- 태그 슬러그: lodash `kebabCase` (한글 원본 유지)
- 글 슬러그: 파일 경로 그대로 (확장자 제거)

---

## 5. 현재 파일 구조

```
/                         ← 프로젝트 루트
├─ package.json           ← npm, scripts 포함
├─ tsconfig.json
├─ vite.config.ts         ← 클라이언트 번들 설정 (고정 파일명 _assets/)
├─ vercel.json            ← Vercel 배포 설정
├─ MIGRATION.md           ← 초기 계획 (일부 오래됨)
├─ PROGRESS.md            ← 이 파일 (현재 상태)
├─ wiki/                  ← 원본 마크다운 (998개 노트, 178개 이미지)
└─ src/
   ├─ public/
   │  ├─ logo.png         ← 픽셀아트 잔디섬 (1000×1000, git restore)
   │  └─ styles/
   │     ├─ tokens.css    ← CSS 커스텀 프로퍼티 (색상/타이포/스페이싱)
   │     └─ style.css     ← 컴포넌트 스타일 전체
   ├─ client/
   │  ├─ main.ts          ← 전역 인터랙션 (TOC 활성화 IntersectionObserver)
   │  └─ search.ts        ← Fuse.js 검색 위젯 (#search-input / #search-results 필요)
   ├─ build/
   │  ├─ index.ts         ← 전체 빌드 스크립트 (1072 pages, 6.5s)
   │  ├─ scan.ts          ← wiki 스캔 → WikiCatalog (998 notes, 72 tags, 178 images)
   │  ├─ pipeline.ts      ← unified 파이프라인 + rehype-pretty-code + TOC + 백링크
   │  ├─ graph.ts         ← 백링크 그래프 (전체 2254개 참조)
   │  ├─ _demo-article.ts ← 단일 글 페이지 end-to-end 생성 (개발용)
   │  ├─ _demo-index.ts   ← 인덱스 페이지 데모 (개발용)
   │  ├─ _validate-rune.ts
   │  └─ _validate-pipeline.ts
   └─ views/
      ├─ escape.ts        ← raw() 헬퍼 (HTML 이스케이프 bypass)
      ├─ Layout.ts        ← 전체 HTML 래퍼 + _assets/main.js 로드
      ├─ ArticlePage.ts   ← 글 페이지 (헤더 + 본문 + 백링크 + TOC)
      ├─ IndexPage.ts     ← 홈 페이지 (위키 첫 화면)
      ├─ TableOfContents.ts ← TOC aside 컴포넌트
      ├─ TagIndexPage.ts  ← /tags/ 전체 태그 클라우드
      └─ TagPage.ts       ← /tags/:slug/ 태그별 노트 목록
```

---

## 6. 완료된 작업

### 인프라
- [x] Gatsby 완전 제거 (`.layouts/`, 루트 `package.json`, `.gitignore` 등)
- [x] 새 프로젝트 구조 생성 (package.json, tsconfig.json)
- [x] 의존성 설치: unified/remark/rehype/rune-ts/vite/fuse.js 등
- [x] npm 으로 패키지 매니저 확정 (pnpm Volta 충돌 해결 안 되어 롤백)

### 빌드 파이프라인
- [x] `scan.ts`: wiki 스캔 → WikiCatalog (메타/슬러그/태그/이미지 인덱스)
- [x] `pipeline.ts`: unified 마크다운 → HTML 변환
  - remark-parse → remark-frontmatter → remark-gfm → remark-wiki-link
  - → remark-rehype → rehype-slug → rehype-autolink-headings → rehype-stringify
  - 위키 링크 `files[]` + `permalinks{}` + `urlResolver()` 방식 (v3.4.0 API)
  - TOC 수집 (h2~h6, rehype-slug 이후 hast 트리 워크)
  - 백링크 참조 수집 (wikiLink 노드 트리 워크)
- [x] `graph.ts`: 전체 노트 렌더 → 백링크 그래프 빌드 (2254 refs)
- [x] 검증 스크립트 (`validate:pipeline`): 998개 노트 전체 파이프라인 통과 확인

### View 컴포넌트 (rune-ts)
- [x] `Layout.ts`: 전체 페이지 HTML 래퍼
  - sticky 헤더 (로고 + 네비: Index / TIL / Books)
  - 푸터 (copyright + giscus / gtag / AdSense 훅 자리)
  - `renderPage()` 헬퍼 함수
- [x] `ArticlePage.ts`: 글 페이지 레이아웃
  - `article-layout` 2컬럼 그리드 (PC ≥1080px: 본문 + 우측 TOC sticky)
  - 모바일: 단일 컬럼 (TOC가 본문 위에 details로 접힘)
  - article-header (제목 + PUBLISHED/UPDATED 메타)
  - article-body (본문 HTML)
  - backlinks aside (이 노트로 링크된 글 목록)
- [x] `IndexPage.ts`: 홈 페이지 (위키 첫 화면)
  - 다른 글과 동일한 article 구조
  - 제목 "Padosum Wiki" + created/updated + 인삿말 + 최근 노트 목록
- [x] `TableOfContents.ts`: TOC `<details>` 컴포넌트
  - "On this page" 헤딩 + ul.toc-list
  - toc-level-N 클래스로 들여쓰기

### 디자인
- [x] `tokens.css`: 색상/타이포/스페이싱 커스텀 프로퍼티
- [x] `style.css`: 전체 컴포넌트 스타일
  - 헤더 sticky
  - note-list (줄노트 형식, ul/li, 카드 아님)
  - article-body (prose 스타일: 코드블록/인용/리스트/링크)
  - wiki-link 스타일 (점선 밑줄, accent 색)
  - backlinks 섹션
  - TOC (PC sticky, 모바일 details)
  - 반응형 미디어쿼리

### 개발 도구
- [x] `_demo-article.ts`: 단일 글 end-to-end → `dist/demo/article.html`
- [x] `_demo-index.ts`: 인덱스 페이지 → `dist/demo/index.html`
- [x] `npm run demo:article` / `npm run demo:index` 로 빠른 미리보기 가능

### 빌드 완성 (2026-05-18)
- [x] `src/build/index.ts` — 전체 SSG 빌드 (1072 pages, 6.5s)
  - 글 페이지 998개 (`dist/wiki/**/index.html`)
  - 홈 (`dist/index.html`)
  - 태그 인덱스 + 72개 태그 페이지 (`dist/tags/`)
  - `sitemap.xml` (1072 URLs) + `robots.txt`
  - `search-index.json` (998 entries)
  - `src/public/` → `dist/` + wiki 이미지 178개 복사
- [x] `TagPage.ts` — `/tags/:slug/` 노트 목록
- [x] `TagIndexPage.ts` — `/tags/` 전체 태그 클라우드
- [x] `pipeline.ts` — `rehype-pretty-code` (github-dark 테마) 추가
- [x] `src/client/main.ts` — TOC IntersectionObserver
- [x] `src/client/search.ts` — Fuse.js 검색 위젯 (UI 연결 대기)
- [x] `vercel.json` — Vercel 배포 설정 (buildCommand, outputDirectory)

---

## 7. 남은 작업

### 기능
- [ ] **검색 UI 연결** — `src/client/search.ts` 는 완성. Layout에 `#search-input` / `#search-results` 마크업 추가 필요
- [ ] **`.github/workflows/`** CI 워크플로 수정 (현재 Gatsby 기준)

### 보류/미결
- [ ] 다크모드 (미결)
- [ ] 모바일 네비게이션 (현재: 헤더 그대로, 사이드바 없음)
- [ ] sitemap 글 수 vs 마크다운 파일 수 차이 검증 (998 files vs 구 sitemap ~500)

---

## 8. 개발 명령어

```bash
# 단일 글 페이지 미리보기 (빠름, 1-2초)
npm run demo:article [slug]          # 기본값: JavaScript-Iterator

# 인덱스 페이지 미리보기
npm run demo:index

# 미리보기 서버 (dist/ 기준)
cd dist && python3 -m http.server 8765
# → http://localhost:8765/demo/article.html

# 파이프라인 검증 (998개 전체 렌더)
npm run validate:pipeline

# rune-ts SSR 검증
npm run validate:rune
```

---

## 9. 주요 설계 결정 및 이유

| 결정 | 이유 |
|---|---|
| rune-ts View 클래스 (함수 아님) | `data-rune`, `.Layout` 등 class 어트리뷰트가 CSS 셀렉터로 활용 가능 |
| 태그 네비에서 제거, 빌드는 유지 | URL 호환성 보존 + UI 단순화 |
| 글 헤더에서 태그 chips 제거 | UI 단순화, 태그 정보는 태그 페이지에서 |
| note-list: 카드 그리드 → 줄노트 ul/li | stripe.dev / makingsoftware.com 스타일 — 정보 밀도 높이고 심플하게 |
| 홈 = 일반 위키 페이지 형식 | Hero/통계 제거, 모든 페이지 일관성 |
| pnpm → npm 롤백 | Volta + corepack 키 검증 충돌 해결 불가 |
| @flowershow/remark-wiki-link v3.4.0 | v1.2.0 `exitWikiLink` undefined 버그로 업그레이드 |

---

## 10. 알려진 이슈

1. **깨진 위키 링크 21건** — 콘텐츠 자체 오타/누락 (빌더 문제 아님, `wiki-link-broken` class 마킹)
2. **TOC top 값** — sticky 헤더(56px) 반영 최근 수정: `calc(56px + var(--sp-4))`
3. **article-body 안의 note-list hover** — `.article-body a:hover` specificity 충돌, `.article-body ul.note-list a` override로 해결
4. **`src/public/demo/`** — 구 정적 데모 HTML (index.html, post.html) 잔존, 필요 없으면 정리 가능
