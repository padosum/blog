/**
 * 데모: 단일 글 페이지를 end-to-end로 생성해 `dist/demo/article.html` 에 쓴다.
 *
 *   scan → 모든 노트 렌더(백링크 그래프 빌드) → 대상 노트 변환
 *        → ArticlePage View → Layout View → doctype + toHtml → 파일 저장
 *
 * 실행: npm run demo:article [slug]
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';

import { scanWiki } from './scan.ts';
import { renderNote } from './pipeline.ts';
import { buildBacklinkGraph } from './graph.ts';
import { ArticlePage } from '../views/ArticlePage.ts';
import { renderPage } from '../views/Layout.ts';

const DIST_DIR = path.join(process.cwd(), 'dist', 'demo');
const PUBLIC_DIR = path.join(process.cwd(), 'src', 'public');

const slug = process.argv[2] ?? 'JavaScript-Iterator';

// ---------- 1. 스캔 ----------
const t0 = performance.now();
const catalog = await scanWiki();
console.log(
  `[1/4] Scan: ${catalog.notes.length} notes, ${catalog.images.length} images, ${catalog.tags.length} tags (${((performance.now() - t0) / 1000).toFixed(1)}s)`,
);

// ---------- 2. 백링크 그래프 ----------
const t1 = performance.now();
const graph = await buildBacklinkGraph(catalog);
console.log(
  `[2/4] Graph: ${graph.stats.totalReferences} refs across ${graph.stats.notesWithBacklinks} target notes (${((performance.now() - t1) / 1000).toFixed(1)}s)`,
);

// ---------- 3. 대상 노트 변환 ----------
const note = catalog.notesBySlug.get(slug);
if (!note) {
  console.error(`✗ Note not found: ${slug}`);
  process.exit(1);
}
const t2 = performance.now();
const result = await renderNote(catalog, note);
const backlinks = graph.get(note.slug);
console.log(
  `[3/4] Render: "${note.title}" — ${result.html.length} chars HTML, ${backlinks.length} backlinks (${(performance.now() - t2).toFixed(0)}ms)`,
);

// ---------- 4. View → Page → 파일 저장 ----------
const t3 = performance.now();
const articleView = new ArticlePage({
  note,
  bodyHtml: result.html,
  backlinks,
  toc: result.toc,
});

const fullHtml = renderPage({
  title: note.title,
  canonicalUrl: note.url,
  body: articleView.toHtml(),
});

await fs.mkdir(DIST_DIR, { recursive: true });
const outFile = path.join(DIST_DIR, 'article.html');
await fs.writeFile(outFile, fullHtml, 'utf8');

// 절대 경로 /styles/... 참조가 작동하도록 CSS 복사
const stylesOut = path.join(process.cwd(), 'dist', 'styles');
await fs.mkdir(stylesOut, { recursive: true });
for (const css of ['tokens.css', 'style.css']) {
  await fs.copyFile(
    path.join(PUBLIC_DIR, 'styles', css),
    path.join(stylesOut, css),
  );
}

console.log(
  `[4/4] Write: ${path.relative(process.cwd(), outFile)} (${(performance.now() - t3).toFixed(0)}ms)`,
);
console.log(`\nTotal: ${((performance.now() - t0) / 1000).toFixed(1)}s`);
console.log(
  `\n브라우저 미리보기: cd dist && python3 -m http.server 8765 → http://localhost:8765/demo/article.html`,
);
