/**
 * 마크다운 → HTML 변환 파이프라인.
 *
 * 단계:
 *   remark-parse → remark-frontmatter → remark-gfm
 *   → @flowershow/remark-wiki-link  (v3.4: files + permalinks 방식)
 *   → 위키 링크 참조 수집 (백링크 그래프용)
 *   → remark-rehype
 *   → rehype-slug → rehype-autolink-headings
 *   → rehype-stringify
 *
 * 1차 스캔(scan.ts) 결과에서 `files` 와 `permalinks` 를 빌드해
 * `[[note]]` / `[[note|alias]]` / `[[note#heading]]` / `![[image.png]]` 가
 * 모두 정확한 URL 로 해석되도록 한다.
 */
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import wikiLinkPlugin from '@flowershow/remark-wiki-link';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

import type { WikiCatalog, NoteMeta } from './scan.ts';

export interface TocItem {
  /** heading id (rehype-slug 가 부여) */
  id: string;
  /** heading level (2, 3, 4...) */
  level: number;
  /** heading 텍스트 (anchor 등 내부 요소 제거된 plain text) */
  text: string;
}

export interface PipelineResult {
  /** 최종 HTML (article body) */
  html: string;
  /** 이 노트가 참조하는 다른 노트의 slug 목록 — 백링크 그래프 빌드용 */
  references: string[];
  /** 깨진 위키 링크 — 카탈로그에서 매칭 실패 */
  brokenLinks: string[];
  /** 본문 헤딩 목록 — TOC 렌더용 */
  toc: TocItem[];
}

// ---------------------------------------------------------------------------
// files / permalinks 빌드 (한 번만 만들면 모든 파일에 재사용)
// ---------------------------------------------------------------------------

interface WikiLinkResolverData {
  files: string[];
  permalinks: Record<string, string>;
}

function buildWikiLinkResolver(catalog: WikiCatalog): WikiLinkResolverData {
  const files: string[] = [];
  const permalinks: Record<string, string> = {};

  const add = (key: string, url: string): void => {
    if (key in permalinks) return; // 첫 등록 우선 (충돌 시 정확한 slug 가 이김)
    files.push(key);
    permalinks[key] = url;
  };

  // 노트: 전체 slug + basename + aliases 모두 valid 키로 등록
  for (const note of catalog.notes) {
    const url = `/wiki/${note.slug}/`;
    add(note.slug, url);
    add(path.basename(note.slug), url); // [[2023-08-15]] → 2023/08/2023-08-15
    for (const alias of note.aliases) {
      add(alias, url);
    }
  }

  // 이미지: 파일명을 키로, 실제 자산 경로로
  for (const img of catalog.images) {
    add(img.filename, `/wiki/${img.relPath}`);
  }

  return { files, permalinks };
}

// ---------------------------------------------------------------------------
// 참조 수집 remark 플러그인 (wikiLink 처리 후 트리 워크)
// ---------------------------------------------------------------------------

interface CollectorBag {
  references: Set<string>;
  brokenLinks: Set<string>;
  toc: TocItem[];
}

function collectReferences(bag: CollectorBag, catalog: WikiCatalog) {
  return (tree: unknown) => {
    const walk = (node: any): void => {
      if (node?.type === 'wikiLink') {
        const rawValue: string = node.value ?? '';
        const target = rawValue.split('#')[0] ?? rawValue; // heading 제거
        if (!target) return; // 빈 링크 무시
        // 카탈로그에서 slug 찾기 — exact / basename / alias 순
        const directSlug = catalog.notesBySlug.has(target) ? target : undefined;
        const lookupSlug = catalog.notesByName.get(target.toLowerCase());
        const slug = directSlug ?? lookupSlug;
        if (slug) bag.references.add(slug);
        else if (!isImageOrAsset(target)) bag.brokenLinks.add(target);
      }
      if (node?.children) {
        for (const c of node.children) walk(c);
      }
    };
    walk(tree);
  };
}

const ASSET_EXT = /\.(png|jpe?g|gif|svg|webp|mp4|webm|pdf|mp3|wav)$/i;
function isImageOrAsset(target: string): boolean {
  return ASSET_EXT.test(target);
}

// ---------------------------------------------------------------------------
// TOC 수집 rehype 플러그인 (rehype-slug 후 트리 워크)
// ---------------------------------------------------------------------------

const HEADING_TAG = /^h([2-6])$/; // h1 은 글 제목과 중복되니 제외

function collectToc(bag: CollectorBag) {
  return (tree: unknown) => {
    const walk = (node: any): void => {
      if (node?.type === 'element') {
        const match = HEADING_TAG.exec(node.tagName ?? '');
        if (match && node.properties?.id) {
          bag.toc.push({
            id: String(node.properties.id),
            level: parseInt(match[1] ?? '2', 10),
            text: extractText(node),
          });
        }
      }
      if (node?.children) {
        for (const c of node.children) walk(c);
      }
    };
    walk(tree);
  };
}

function extractText(node: any): string {
  if (node?.type === 'text') return node.value ?? '';
  if (!node?.children) return '';
  return node.children.map(extractText).join('').trim();
}

// ---------------------------------------------------------------------------
// 파이프라인 빌더
// ---------------------------------------------------------------------------

export function createPipeline(catalog: WikiCatalog, bag: CollectorBag) {
  const { files, permalinks } = buildWikiLinkResolver(catalog);

  return unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm)
    .use(wikiLinkPlugin, {
      format: 'regular',
      caseInsensitive: true,
      files,
      permalinks,
      className: 'wiki-link',
      newClassName: 'wiki-link-broken',
      // permalinks 에 매칭 안 되는 케이스 fallback
      urlResolver: ({ filePath, isEmbed, heading }) => {
        if (isEmbed) return `#broken-embed-${filePath}`;
        const anchor = heading ? `#${heading}` : '';
        return `/wiki/${filePath}/${anchor}`;
      },
    })
    .use(() => collectReferences(bag, catalog))
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(() => collectToc(bag)) // rehype-slug 이후, autolink 이전에 수집 (text 가 깨끗함)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { className: ['heading-anchor'] },
    })
    .use(rehypePrettyCode, {
      theme: 'github-light-high-contrast',
      keepBackground: false,
    })
    .use(rehypeStringify);
}

// ---------------------------------------------------------------------------
// 단일 노트 렌더링
// ---------------------------------------------------------------------------

export async function renderNote(
  catalog: WikiCatalog,
  note: NoteMeta,
): Promise<PipelineResult> {
  const bag: CollectorBag = {
    references: new Set(),
    brokenLinks: new Set(),
    toc: [],
  };
  const processor = createPipeline(catalog, bag);
  const file = await processor.process(note.content);

  return {
    html: String(file),
    references: [...bag.references],
    brokenLinks: [...bag.brokenLinks],
    toc: bag.toc,
  };
}

// ---------------------------------------------------------------------------
// CLI sanity check — `npm run render [slug]`
// ---------------------------------------------------------------------------

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const { scanWiki } = await import('./scan.ts');
  const catalog = await scanWiki();

  const slug = process.argv[2] ?? 'JavaScript-Iterator';
  const note = catalog.notesBySlug.get(slug);
  if (!note) {
    console.error(`✗ Note not found: ${slug}`);
    console.error(`  Examples:`);
    for (const s of [...catalog.notesBySlug.keys()].slice(0, 5)) {
      console.error(`    - ${s}`);
    }
    process.exit(1);
  }

  console.log(`Rendering: ${slug}`);
  console.log(`  Title:  ${note.title}`);
  console.log(`  Tags:   ${note.tags.join(', ') || '(none)'}`);
  console.log(`  Length: ${note.content.length} chars\n`);

  const t0 = performance.now();
  const result = await renderNote(catalog, note);
  const elapsed = (performance.now() - t0).toFixed(0);

  console.log(`✓ Rendered in ${elapsed}ms`);
  console.log(`  HTML size:    ${result.html.length} chars`);
  console.log(`  References:   ${result.references.length}`);
  console.log(`  Broken links: ${result.brokenLinks.length}`);

  if (result.references.length > 0) {
    console.log(`\nReferences (first 15):`);
    for (const r of result.references.slice(0, 15)) {
      console.log(`  → ${r}`);
    }
  }
  if (result.brokenLinks.length > 0) {
    console.log(`\nBroken links:`);
    for (const r of result.brokenLinks) {
      console.log(`  ✗ ${r}`);
    }
  }

  console.log(`\n--- HTML output (first 2000 chars) ---`);
  console.log(result.html.slice(0, 2000));
  if (result.html.length > 2000) console.log('...');
}
