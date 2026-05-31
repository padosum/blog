# Padosum Wiki — 마이그레이션 노트

> Gatsby → 직접 만든 SSG로 리팩토링하면서 합의/결정한 사항 모음.
> 빌더 작성 시 이 문서를 단일 출처로 삼습니다.

## 목표

- 100% 정적 HTML 생성 (SEO/속도 최우선)
- **기존 URL 완전 호환** — Google 색인, 외부 북마크, 공유 링크 보존
- 댓글/광고/분석은 그대로 유지: giscus, Google AdSense, Google gtag
- 배포는 Vercel 유지

---

## 기술 스택

| 영역 | 선택 |
|---|---|
| 마크다운 파이프라인 | `unified` + `remark` + `rehype` |
| Wiki-link 처리 | `@flowershow/remark-wiki-link` |
| 템플릿 엔진 | `rune-ts` (서버 사이드 렌더링 + 필요 시 클라이언트 hydrate) |
| 번들러 | `vite` (클라이언트 인터랙션 ≥ 검색/토글 정도면 사용, 그 미만이면 순수 Node 스크립트로 충분) |
| 폰트 | Pretendard (본문) + IBM Plex Mono (라벨/메타) |

### remark/rehype 플러그인 체인 (확정)

```
unified
  ├─ remark-parse
  ├─ remark-frontmatter            # --- frontmatter ---
  ├─ remark-gfm                    # 테이블, task list, ~~strikethrough~~
  ├─ @flowershow/remark-wiki-link  # [[note]], [[note|alias]], ![[embed]], [[note#heading]]
  ├─ remark-rehype
  ├─ rehype-slug                   # heading id 자동 부여
  ├─ rehype-autolink-headings      # heading 옆 # 앵커 링크
  ├─ rehype-pretty-code            # 코드 하이라이트 (또는 rehype-prism-plus)
  └─ rehype-stringify
```

---

## URL 구조 (확정)

기존 `gatsby-theme-primer-wiki`가 만들던 URL을 1:1로 복제해야 합니다.

| 패턴 | 예시 |
|---|---|
| 홈 | `/` |
| 최근 글 | `/latest/` |
| 태그 인덱스 | `/tags/` |
| 태그 페이지 | `/tags/:slug/` |
| 위키 루트 글 | `/wiki/:slug/` |
| 날짜 디렉토리 글 (TIL 등) | `/wiki/:year/:month/:slug/` |
| 월별 인덱스 글 | `/wiki/:year/:month/:year-month/` |

**모든 URL은 trailing slash로 끝남.**

---

## 슬러그 변환 규칙

### 위키 글 — 파일 경로 그대로

```js
function articleSlug(filePath) {
  // wiki/JavaScript-Iterator.md       → JavaScript-Iterator
  // wiki/2023/08/2023-08-15.md        → 2023/08/2023-08-15
  return filePath.replace(/^wiki\//, '').replace(/\.md$/, '');
}
// 최종 URL: `/wiki/${articleSlug}/`
```

규칙:
- 케이스 보존
- camelCase 분리하지 **않음**
- 확장자만 제거
- 디렉토리 구조 그대로 URL에 반영
- 한글/공백 파일명은 그대로 두고 URL-encode (브라우저/서버가 처리)

### 태그 — lodash `kebabCase`

```js
import { kebabCase } from 'lodash-es';

function tagSlug(tag) {
  const slug = kebabCase(tag);
  // 한글 only 태그는 kebabCase 결과가 빈 문자열 → 원본 그대로 사용
  return slug || tag;
}
// 최종 URL: `/tags/${tagSlug}/`
```

검증된 변환 사례:

| 원본 | 슬러그 |
|---|---|
| `JavaScript` | `java-script` |
| `TypeScript` | `type-script` |
| `MySQL` | `my-sql` |
| `NestJS` | `nest-js` |
| `PostgreSQL` | `postgre-sql` |
| `CI/CD` | `ci-cd` |
| `OOP` | `oop` (모두 대문자는 분리 안 됨) |
| `DOM` | `dom` |
| `TIL` | `til` |
| `글뚜` | `글뚜` (한글은 원본 그대로) |

---

## 호환성 주의사항

### 1. 태그 중복 변형은 그대로 둔다
- `/tags/javascript/` 와 `/tags/java-script/` 둘 다 sitemap에 존재
- `/tags/nodejs/` 와 `/tags/node-js/` 마찬가지
- 글 frontmatter에서 어떤 표기를 썼느냐에 따라 다른 슬러그가 나옴
- **소스를 통일하지 말고 그대로 두는 것이 SEO 호환성에 안전함**

### 2. 빈 태그 페이지
- `/tags//` 가 sitemap에 존재 — frontmatter에 빈 문자열이 들어간 케이스
- 우리 빌더는 **빈 슬러그는 스킵**하고, 동일 URL이 필요하면 빈 결과 페이지 1개만 생성

### 3. 미해결 — sitemap 글 수와 마크다운 파일 수 차이
- `wiki/**/*.md` 는 998개
- sitemap에 노출된 wiki 글은 ~500개
- gatsby-plugin-exclude로 `wiki/template/**` 만 제외 중인데 차이가 너무 큼
- 마이그레이션 직접 영향은 없지만 빌드 후 비교 검증 필요

### 4. 발견된 위키 콘텐츠 자체의 깨진 링크 (21건, 0.93%)
파이프라인 검증 결과 (`npm run validate:pipeline`) 에서 발견. 빌더 문제 아님, 콘텐츠 자체 누락/오타:

- **명확한 오타 1건**: [wiki-index.md](wiki/wiki-index.md) 의 `[[Https-redirect-in-Safai]]` → `Safari` (s 누락)
- **아직 안 만든 노트**: `[[코딩인터뷰 완전분석]]`, `[[프로그래머의 뇌]]`, `[[Clean Code]]`, `[[Vite]]`, `[[React-Context]]`, `[[Chrome-Devtools-Tips]]`, `[[HOC]]`, `[[XML]]`, `[[splice]]` 등
- **BAEKJOON 문제 누락**: `[[BAEKJOON-2004]]`, `[[BAEKJOON-2089]]`

빌더는 이들을 `class="wiki-link-broken"` 로 마킹해서 출력함. CSS에서 시각적 표시 가능.

---

## 클린업 (마이그레이션 빌더 작성 전)

- [x] ~~`[[*.png]]` → `![[...]]` 일괄 치환~~ — **불필요로 확인됨**.
  초기 grep 패턴이 `![[image.png]]` 안의 `[[image.png]]` 도 매치해서 155건을 오탐했음.
  실제 검증: `![[*.img]]` 155건 / `[[*.img]]` (no `!`) 0건. 모든 이미지 참조가 정상적인 Obsidian embed 형식임.
- [x] [JavaScript-Property-Attributes.md:18](wiki/JavaScript-Property-Attributes.md:18) 의 `[[..]]` (ECMAScript 내부 슬롯) — **백틱으로 감싸진 인라인 코드 확인됨, 안전**.

→ **모든 사전 클린업 작업이 불필요한 것으로 확인됨. 빌더 구현으로 바로 진행 가능.**

---

## 디자인 톤 (확정)

상세 토큰은 [design/tokens.css](design/tokens.css) 참조.

- **베이스**: `#FAF9F5` Claude-ish 따뜻한 오프화이트
- **잉크**: `#1A1A1A` 검정
- **액센트**: `#2D7A4E` deep forest green (단일 액센트, 절제 사용)
- **모서리**: `border-radius: 0` 통일
- **그림자**: 옵셋만 있는 픽셀 그림자 (`4px 4px 0 #1A1A1A`)
- **호버**: `translate(-3px, -3px)` + 그림자 등장 (게임 UI 느낌)
- **글 목록**: 카드 그리드가 아닌 줄노트 형식 ul/li (좌: 카테고리 / 중: 제목 / 우: 날짜)
- **타이포**: Pretendard(본문 16px) + IBM Plex Mono(라벨/메타/헤딩 포인트)
- **한글 가독성**: line-height 1.7~1.85, letter-spacing 약간 음수

---

## 빌드 파이프라인 단계

1. **1차 스캔 (인덱싱)**
   - `wiki/**/*.md` 메타데이터 카탈로그 (slug, title, tags, aliases, date, updated)
   - `wiki/**/*.{png,jpg,gif,svg}` 이미지 카탈로그 (`wiki/`, `wiki/Attachments/` 둘 다)
2. **2차 패스 (변환)**
   - 각 마크다운 → unified 파이프라인 → HTML
   - `remark-wiki-link` 의 `permalinks` 옵션에 1차 스캔 결과 주입
   - 변환 중 위키 링크 정보를 수집해서 백링크 그래프 빌드
3. **페이지 생성**
   - 글 페이지: `rune-ts` View로 렌더링 (사이드바, 본문, TOC, 백링크)
   - 태그 페이지, `/tags/`, `/latest/`, `/`, `sitemap.xml`, `robots.txt`
4. **정적 자산 복사** → Vercel 배포

---

## 결정 보류

- [x] **`rune-ts` SSR 안전성 — 검증 완료**.
  - `View.toHtml(): string` 이 Node에서 DOM 폴리필 없이 동작 확인
  - subView, html 헬퍼, 한글 문자열 모두 정상
  - 부산물: rune-ts가 자동으로 `data-rune` 속성과 className에 View 클래스명을 prepend함 (hydration 지원용). CSS 셀렉터를 짤 때 참고.
  - 검증 스크립트: [src/build/_validate-rune.ts](src/build/_validate-rune.ts), 실행: `npm run validate:rune`
- [x] **검색 — Fuse.js 결정**. 빌드 타임 JSON 인덱스 + 클라이언트에서 lazy-load.
  - 인덱스 키 1차안: `title`, `tags`, `aliases`, 첫 200자 excerpt
  - 본문 전체 인덱싱 여부는 인덱스 크기 보고 결정
- [ ] 모바일 반응형 수준 — **A. 미니멀** (사이드바 자동 숨김, 메뉴 그대로) **추천**
- [ ] 다크모드 도입 여부
