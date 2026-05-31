/**
 * 전체 빌드 스크립트 — dist/ 에 정적 사이트 생성.
 *
 * 단계:
 *   1. wiki/ 스캔 → WikiCatalog
 *   2. 전체 노트 렌더 (HTML + 참조 수집, 단일 패스)
 *   3. 백링크 그래프 빌드
 *   4. 글 페이지 생성  dist/wiki/**\/index.html
 *   5. 홈 페이지       dist/index.html
 *   6. 태그 인덱스     dist/tags/index.html
 *   7. 태그 페이지     dist/tags/:slug/index.html
 *   8. sitemap.xml / robots.txt
 *   9. 정적 자산 복사  src/public/ → dist/
 *  10. 위키 이미지 복사 wiki/**\/*.{png,jpg,...} → dist/wiki/
 */
import path from 'node:path';
import fse from 'fs-extra';
import { performance } from 'node:perf_hooks';

import { scanWiki } from './scan.ts';
import { renderNote } from './pipeline.ts';
import type { NoteMeta, TagInfo } from './scan.ts';
import type { PipelineResult } from './pipeline.ts';

import { ArticlePage } from '../views/ArticlePage.ts';
import { IndexPage } from '../views/IndexPage.ts';
import { TagIndexPage } from '../views/TagIndexPage.ts';
import { TagPage } from '../views/TagPage.ts';
import { SearchPage } from '../views/SearchPage.ts';
import { renderPage } from '../views/Layout.ts';

// ---------------------------------------------------------------------------
// 경로 상수
// ---------------------------------------------------------------------------

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'src', 'public');
const WIKI_ROOT = path.join(ROOT, 'wiki');
const SITE_BASE = 'https://padosum.dev';
const RECENT_COUNT = 30;

const IMG_EXT = /\.(png|jpe?g|gif|svg|webp)$/i;

// ---------------------------------------------------------------------------
// 유틸
// ---------------------------------------------------------------------------

function shortDate(d: string | undefined): string {
  if (!d) return '';
  return d.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? d;
}

/** 본문 검색 인덱스용 — 마크다운/위키링크/HTML 제거하고 순수 텍스트만 */
function stripMarkdown(md: string): string {
  return md
    // 코드 블록(```...```) 통째 제거
    .replace(/```[\s\S]*?```/g, ' ')
    // 인라인 코드는 텍스트만
    .replace(/`([^`]+)`/g, '$1')
    // 이미지 임베드 ![[...]] 제거
    .replace(/!\[\[[^\]]*\]\]/g, ' ')
    // 위키 링크 [[note|alias]] → alias, [[note]] → note
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    // 일반 이미지 ![alt](url) 제거, 링크 [text](url) → text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    // HTML 태그 제거
    .replace(/<[^>]+>/g, ' ')
    // 라인 시작 마커 (# > - * +)
    .replace(/^[#>\-*+]+\s*/gm, '')
    // 강조 마커 (* _ ~)
    .replace(/[*_~]{1,3}/g, '')
    // 공백 정규화
    .replace(/\s+/g, ' ')
    .trim();
}

function log(step: string, msg: string, ms?: number): void {
  const t = ms !== undefined ? ` (${ms < 1000 ? ms.toFixed(0) + 'ms' : (ms / 1000).toFixed(1) + 's'})` : '';
  console.log(`${step} ${msg}${t}`);
}

// ---------------------------------------------------------------------------
// 위키 이미지 복사 (wiki/ → dist/wiki/)
// ---------------------------------------------------------------------------

async function copyWikiImages(): Promise<number> {
  let count = 0;
  const walk = async (dir: string): Promise<void> => {
    const entries = await fse.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith('.')) continue;
        await walk(full);
      } else if (entry.isFile() && IMG_EXT.test(entry.name)) {
        const rel = path.relative(WIKI_ROOT, full);
        const dest = path.join(DIST, 'wiki', rel);
        await fse.copy(full, dest, { overwrite: true });
        count++;
      }
    }
  };
  await walk(WIKI_ROOT);
  return count;
}

// ---------------------------------------------------------------------------
// sitemap.xml
// ---------------------------------------------------------------------------

function buildSitemap(urls: string[]): string {
  const entries = urls
    .map((u) => `  <url><loc>${SITE_BASE}${u}</loc></url>`)
    .join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</urlset>',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// 메인
// ---------------------------------------------------------------------------

const t0 = performance.now();

// 1. 스캔
const t1 = performance.now();
const catalog = await scanWiki();
log('[1/9]', `Scan: ${catalog.notes.length} notes, ${catalog.images.length} images, ${catalog.tags.length} tags`, performance.now() - t1);

// 2. 전체 노트 렌더 (단일 패스 — HTML + 참조 동시 수집)
const t2 = performance.now();
const rendered = new Map<string, PipelineResult>();
for (const note of catalog.notes) {
  rendered.set(note.slug, await renderNote(catalog, note));
}
log('[2/9]', `Render: ${rendered.size} notes`, performance.now() - t2);

// 3. 백링크 그래프 빌드
const t3 = performance.now();
const backlinkMap = new Map<string, Array<{ slug: string; title: string; url: string }>>();
for (const [slug, result] of rendered) {
  const note = catalog.notesBySlug.get(slug)!;
  for (const refSlug of result.references) {
    const list = backlinkMap.get(refSlug) ?? [];
    list.push({ slug, title: note.title, url: note.url });
    backlinkMap.set(refSlug, list);
  }
}
const totalRefs = [...rendered.values()].reduce((s, r) => s + r.references.length, 0);
log('[3/9]', `Backlinks: ${totalRefs} refs → ${backlinkMap.size} targets`, performance.now() - t3);

// dist/ 초기화 — Vite가 만든 _assets/ 와 .vite/ 는 보존 (dev 모드에서 vite build --watch 와 공존)
await fse.ensureDir(DIST);
for (const entry of await fse.readdir(DIST)) {
  if (entry === '_assets' || entry === '.vite') continue;
  await fse.remove(path.join(DIST, entry));
}

// 4. 글 페이지 생성
const t4 = performance.now();
const articleUrls: string[] = [];
for (const note of catalog.notes) {
  const result = rendered.get(note.slug)!;
  const backlinks = backlinkMap.get(note.slug) ?? [];
  const pageHtml = renderPage({
    title: note.title,
    canonicalUrl: note.url,
    body: new ArticlePage({ note, bodyHtml: result.html, backlinks, toc: result.toc }).toHtml(),
  });
  const outPath = path.join(DIST, 'wiki', ...note.slug.split('/'), 'index.html');
  await fse.outputFile(outPath, pageHtml, 'utf8');
  articleUrls.push(note.url);
}
log('[4/9]', `Article pages: ${articleUrls.length}`, performance.now() - t4);

// 5. 홈 페이지
const t5 = performance.now();
const byUpdatedDesc = [...catalog.notes].sort((a, b) => {
  const da = a.updated ?? a.date ?? '';
  const db = b.updated ?? b.date ?? '';
  return db.localeCompare(da);
});
const recentNotes = byUpdatedDesc.slice(0, RECENT_COUNT);
const byDateAsc = [...catalog.notes]
  .filter((n) => n.date)
  .sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));
const siteCreated = shortDate(byDateAsc[0]?.date) || '2019-08-21';
const siteUpdated = shortDate(byUpdatedDesc[0]?.updated ?? byUpdatedDesc[0]?.date);

const indexHtml = renderPage({
  title: 'Padosum Wiki',
  description: '최연정의 개인 위키.',
  canonicalUrl: '/',
  body: new IndexPage({ recentNotes, siteCreated, siteUpdated }).toHtml(),
});
await fse.outputFile(path.join(DIST, 'index.html'), indexHtml, 'utf8');
log('[5/9]', `Home page`, performance.now() - t5);

// 6. 태그 인덱스
const t6 = performance.now();
const tagIndexHtml = renderPage({
  title: 'Tags',
  canonicalUrl: '/tags/',
  body: new TagIndexPage({ tags: catalog.tags }).toHtml(),
});
await fse.outputFile(path.join(DIST, 'tags', 'index.html'), tagIndexHtml, 'utf8');

// 7. 태그 페이지
const tagUrls: string[] = ['/tags/'];
for (const tag of catalog.tags) {
  if (!tag.slug) continue;
  const notes: NoteMeta[] = tag.noteSlugs
    .map((s) => catalog.notesBySlug.get(s))
    .filter((n): n is NoteMeta => n !== undefined);
  const html = renderPage({
    title: `#${tag.raw}`,
    canonicalUrl: `/tags/${tag.slug}/`,
    body: new TagPage({ tag, notes }).toHtml(),
  });
  await fse.outputFile(path.join(DIST, 'tags', tag.slug, 'index.html'), html, 'utf8');
  tagUrls.push(`/tags/${tag.slug}/`);
}
log('[6-7/9]', `Tag pages: ${tagUrls.length} (index + ${tagUrls.length - 1} tags)`, performance.now() - t6);

// 8a. /search/ 페이지 (정적 셸)
const searchHtml = renderPage({
  title: '검색',
  canonicalUrl: '/search/',
  body: new SearchPage({}).toHtml(),
  // 인덱스를 HTML 파싱과 병렬로 다운로드
  extraHead:
    '<link rel="preload" as="fetch" href="/search-full-index.json" crossorigin="anonymous" />',
});
await fse.outputFile(path.join(DIST, 'search', 'index.html'), searchHtml, 'utf8');

// 8b. sitemap.xml + robots.txt + 두 개 검색 인덱스
const t8 = performance.now();
const allUrls = ['/', ...articleUrls, ...tagUrls, '/search/'];
await fse.outputFile(path.join(DIST, 'sitemap.xml'), buildSitemap(allUrls), 'utf8');
await fse.outputFile(
  path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /search/\nSitemap: ${SITE_BASE}/sitemap.xml\n`,
  'utf8',
);

// 자동완성용 — 제목 + 태그만 (가벼움, 모든 페이지 첫 검색 시 lazy-load)
const titleIndex = catalog.notes.map((n) => ({
  slug: n.slug,
  title: n.title,
  url: n.url,
  tags: n.tags,
}));
await fse.outputFile(
  path.join(DIST, 'search-index.json'),
  JSON.stringify(titleIndex),
  'utf8',
);

// 본문 검색용 — body 포함 (/search/ 진입 시만 load)
const fullIndex = catalog.notes.map((n) => ({
  slug: n.slug,
  title: n.title,
  url: n.url,
  tags: n.tags,
  body: stripMarkdown(n.content),
}));
await fse.outputFile(
  path.join(DIST, 'search-full-index.json'),
  JSON.stringify(fullIndex),
  'utf8',
);
const titleBytes = (await fse.stat(path.join(DIST, 'search-index.json'))).size;
const fullBytes = (await fse.stat(path.join(DIST, 'search-full-index.json'))).size;
log(
  '[8/9]',
  `sitemap (${allUrls.length} URLs) + robots + /search/ + index ${(titleBytes / 1024).toFixed(0)}KB / full ${(fullBytes / 1024).toFixed(0)}KB`,
  performance.now() - t8,
);

// 9. 정적 자산 복사
const t9 = performance.now();
await fse.copy(PUBLIC, DIST, {
  overwrite: true,
  filter: (src) => {
    // src/public/demo/ 제외
    const rel = path.relative(PUBLIC, src);
    return !rel.startsWith('demo');
  },
});
const imgCount = await copyWikiImages();
log('[9/9]', `Assets: public/ → dist/ + ${imgCount} wiki images`, performance.now() - t9);

// 완료
const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
console.log(`\n✓ Build complete in ${elapsed}s → dist/ (${allUrls.length} pages)`);
