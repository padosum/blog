# Padosum Wiki

> 최연정의 개인 위키. Obsidian으로 작성하고 직접 만든 SSG로 정적 사이트를 빌드해 [padosum.dev](https://padosum.dev) 에 배포합니다.

## 구조

```
.
├── wiki/                # 콘텐츠 (마크다운 + 이미지)
├── src/
│   ├── build/           # SSG 빌드 스크립트 (Node, tsx 실행)
│   ├── views/           # rune-ts 서버 사이드 View 컴포넌트
│   ├── client/          # 브라우저 코드 (Vite 빌드)
│   └── public/          # 정적 자산 (CSS, 폰트)
├── dist/                # 빌드 출력 (gitignore)
├── MIGRATION.md         # 마이그레이션/디자인 결정 단일 출처
└── .github/workflows/   # Vercel 배포
```

## 개발

```bash
npm install
npm run dev      # SSG watch + Vite dev server (concurrently)
npm run build    # 정적 사이트 빌드 (dist/)
npm run preview  # 빌드 결과 미리보기
```

Node 20 이상 권장.

## 기술 스택

- **마크다운 파이프라인**: unified + remark + rehype + [@flowershow/remark-wiki-link](https://github.com/flowershow/remark-wiki-link)
- **템플릿**: [rune-ts](https://github.com/marpple/rune) — 서버 사이드 View 렌더링
- **클라이언트 번들**: Vite (검색, 모바일 메뉴 등 인터랙션)
- **검색**: [Fuse.js](https://github.com/krisk/fuse) — 빌드 타임 인덱스 + 클라이언트 fuzzy 검색
- **코드 하이라이트**: Shiki via rehype-pretty-code
- **배포**: Vercel

자세한 결정 사항과 슬러그 규칙은 [MIGRATION.md](./MIGRATION.md) 참조.

## 라이선스

- 코드: MIT
- 콘텐츠 (`wiki/`): CC BY-NC 4.0
