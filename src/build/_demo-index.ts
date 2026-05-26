/**
 * 데모: 홈 페이지 (`/`) 를 end-to-end로 생성해 `dist/demo/index.html` 에 쓴다.
 *
 *   scan → 노트 정렬 → IndexPage View → Layout → 파일 저장
 *
 * 실행: npm run demo:index
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';

import { scanWiki } from './scan.ts';
import { IndexPage } from '../views/IndexPage.ts';
import { renderPage } from '../views/Layout.ts';

const DIST_DIR = path.join(process.cwd(), 'dist', 'demo');
const PUBLIC_DIR = path.join(process.cwd(), 'src', 'public');

const RECENT_COUNT = 30;

// ---------- 1. 스캔 ----------
const t0 = performance.now();
const catalog = await scanWiki();
console.log(
  `[1/3] Scan: ${catalog.notes.length} notes (${((performance.now() - t0) / 1000).toFixed(1)}s)`,
);

// ---------- 2. 정렬 + 사이트 날짜 ----------
const t1 = performance.now();
const byUpdatedDesc = [...catalog.notes].sort((a, b) => {
  const da = a.updated ?? a.date ?? '';
  const db = b.updated ?? b.date ?? '';
  return db.localeCompare(da);
});
const recentNotes = byUpdatedDesc.slice(0, RECENT_COUNT);

const shortDate = (d: string | undefined): string =>
  d ? (d.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? d) : '';

const byDateAsc = [...catalog.notes]
  .filter((n) => n.date)
  .sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));
const siteCreated = shortDate(byDateAsc[0]?.date) || '2019-08-21';
const siteUpdated = shortDate(byUpdatedDesc[0]?.updated ?? byUpdatedDesc[0]?.date);

console.log(
  `[2/3] Sort: top ${recentNotes.length} of ${catalog.notes.length}, site ${siteCreated} → ${siteUpdated} (${(performance.now() - t1).toFixed(0)}ms)`,
);

// ---------- 3. View → Layout → 파일 ----------
const t2 = performance.now();
const pageView = new IndexPage({ recentNotes, siteCreated, siteUpdated });

const fullHtml = renderPage({
  title: 'Padosum Wiki',
  description: '최연정의 개인 위키.',
  canonicalUrl: '/',
  body: pageView.toHtml(),
});

await fs.mkdir(DIST_DIR, { recursive: true });
const outFile = path.join(DIST_DIR, 'index.html');
await fs.writeFile(outFile, fullHtml, 'utf8');

// CSS 복사 (절대 경로 /styles/... 가 작동하게)
const stylesOut = path.join(process.cwd(), 'dist', 'styles');
await fs.mkdir(stylesOut, { recursive: true });
for (const css of ['tokens.css', 'style.css']) {
  await fs.copyFile(
    path.join(PUBLIC_DIR, 'styles', css),
    path.join(stylesOut, css),
  );
}

console.log(
  `[3/3] Write: ${path.relative(process.cwd(), outFile)} (${(performance.now() - t2).toFixed(0)}ms)`,
);
console.log(`\nTotal: ${((performance.now() - t0) / 1000).toFixed(1)}s`);
console.log(
  `\n브라우저: http://localhost:8765/demo/index.html`,
);
