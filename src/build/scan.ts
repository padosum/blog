/**
 * 1차 스캔 — wiki/ 전체를 한 번 훑고 메타데이터 카탈로그를 만든다.
 *
 * 산출물:
 *   - 노트 메타데이터 (slug, title, tags, aliases, date 등)
 *   - 이미지 인덱스 (파일명 → 상대 경로)
 *   - 태그 카탈로그 (slug → 어떤 노트들이 속하는지)
 *   - 빠른 조회용 Map들 (wiki-link 해석에 사용)
 *
 * 슬러그 규칙은 MIGRATION.md 와 동기화 — 변경 시 두 문서 함께 수정.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { kebabCase } from 'lodash-es';

const WIKI_ROOT = path.join(process.cwd(), 'wiki');

// ---------------------------------------------------------------------------
// 타입 정의
// ---------------------------------------------------------------------------

export interface NoteMeta {
  /** wiki/ 기준 상대 경로에서 확장자만 제거 — URL slug 로도 사용 */
  slug: string;
  /** 절대 파일 경로 */
  absPath: string;
  /** frontmatter title (없으면 파일명) */
  title: string;
  /** frontmatter date (ISO string, 원본 그대로) */
  date?: string;
  /** frontmatter updated */
  updated?: string;
  /** 태그 원본 배열 — 빈 문자열은 제거됨 */
  tags: string[];
  /** alias 배열 — wiki-link permalink 매칭에 사용 */
  aliases: string[];
  /** 마크다운 본문 (frontmatter 제외) */
  content: string;
  /** 최종 URL — `/wiki/{slug}/` */
  url: string;
}

export interface ImageAsset {
  /** wiki/ 기준 상대 경로 (예: "Attachments/foo.png" 또는 "Pasted image 1.png") */
  relPath: string;
  /** 절대 파일 경로 */
  absPath: string;
  /** 파일명만 (예: "foo.png") — wiki-link 해석 시 키로 사용 */
  filename: string;
}

export interface TagInfo {
  /** 원본 태그 (frontmatter에 적힌 그대로) */
  raw: string;
  /** URL slug — lodash kebabCase, 한글이면 원본 그대로 */
  slug: string;
  /** 이 태그가 달린 노트들의 slug */
  noteSlugs: string[];
}

export interface WikiCatalog {
  notes: NoteMeta[];
  images: ImageAsset[];
  /** slug → NoteMeta 빠른 조회 */
  notesBySlug: Map<string, NoteMeta>;
  /** lowercase 키로 alias 또는 파일명 basename → slug 매핑 (wiki-link 해석용) */
  notesByName: Map<string, string>;
  /** lowercase 이미지 파일명 → relPath */
  imagesByName: Map<string, string>;
  /** 태그 카탈로그 — note 개수 내림차순 정렬 */
  tags: TagInfo[];
}

// ---------------------------------------------------------------------------
// Slug 변환 — MIGRATION.md 의 규칙과 동기
// ---------------------------------------------------------------------------

/**
 * 위키 슬러그: 파일 경로 그대로, 확장자만 제거. 케이스 보존.
 *   wiki/JavaScript-Iterator.md  → JavaScript-Iterator
 *   wiki/2023/08/2023-08-15.md   → 2023/08/2023-08-15
 */
export function articleSlug(relMdPath: string): string {
  return relMdPath.replace(/\.md$/, '');
}

/**
 * 태그 슬러그: lodash kebabCase.
 * 한글 only 태그는 kebabCase 결과가 빈 문자열 → 원본 사용 (기존 사이트 호환).
 */
export function tagSlug(tag: string): string {
  const slug = kebabCase(tag);
  return slug || tag;
}

// ---------------------------------------------------------------------------
// 파일 시스템 순회
// ---------------------------------------------------------------------------

async function* walkDir(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // template/ 와 hidden 디렉토리 제외 (.gitignore 정책과 동일)
      if (entry.name === 'template' || entry.name.startsWith('.')) continue;
      yield* walkDir(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

const IMG_EXT = /\.(png|jpe?g|gif|svg|webp)$/i;

// ---------------------------------------------------------------------------
// frontmatter 정규화
// ---------------------------------------------------------------------------

/** string | string[] | unknown → string[] (빈 값 제거) */
function toStringArray(x: unknown): string[] {
  const arr = Array.isArray(x) ? x : typeof x === 'string' ? [x] : [];
  return arr
    .filter((v): v is string => typeof v === 'string')
    .map((v) => v.trim())
    .filter((v) => v.length > 0);
}

/** date 값: Date 객체로 파싱된 것도, 문자열도 받아 ISO 8601 string으로 정규화 */
function normalizeDate(x: unknown): string | undefined {
  if (x instanceof Date) return x.toISOString();
  if (typeof x === 'string' && x.trim()) return x.trim();
  return undefined;
}

// ---------------------------------------------------------------------------
// 메인
// ---------------------------------------------------------------------------

export async function scanWiki(): Promise<WikiCatalog> {
  const notes: NoteMeta[] = [];
  const images: ImageAsset[] = [];

  for await (const absPath of walkDir(WIKI_ROOT)) {
    const relPath = path.relative(WIKI_ROOT, absPath);

    if (absPath.endsWith('.md')) {
      const raw = await fs.readFile(absPath, 'utf8');
      const { data, content } = matter(raw);
      const slug = articleSlug(relPath);

      notes.push({
        slug,
        absPath,
        title:
          typeof data.title === 'string' && data.title.trim()
            ? data.title.trim()
            : path.basename(slug),
        date: normalizeDate(data.date),
        updated: normalizeDate(data.updated),
        tags: toStringArray(data.tags),
        aliases: toStringArray(data.aliases),
        content,
        url: `/wiki/${slug}/`,
      });
    } else if (IMG_EXT.test(absPath)) {
      images.push({
        relPath,
        absPath,
        filename: path.basename(absPath),
      });
    }
  }

  // ---------- 빠른 조회 맵 ----------
  const notesBySlug = new Map<string, NoteMeta>();
  const notesByName = new Map<string, string>();
  for (const note of notes) {
    notesBySlug.set(note.slug, note);
    // basename(slug 의 마지막 segment) 로도 wiki-link 매칭 가능
    notesByName.set(path.basename(note.slug).toLowerCase(), note.slug);
    for (const alias of note.aliases) {
      notesByName.set(alias.toLowerCase(), note.slug);
    }
  }

  const imagesByName = new Map<string, string>();
  for (const img of images) {
    imagesByName.set(img.filename.toLowerCase(), img.relPath);
  }

  // ---------- 태그 카탈로그 ----------
  const tagMap = new Map<string, TagInfo>();
  for (const note of notes) {
    for (const raw of note.tags) {
      const slug = tagSlug(raw);
      if (!slug) continue;
      let entry = tagMap.get(slug);
      if (!entry) {
        entry = { raw, slug, noteSlugs: [] };
        tagMap.set(slug, entry);
      }
      entry.noteSlugs.push(note.slug);
    }
  }

  const tags = [...tagMap.values()].sort(
    (a, b) => b.noteSlugs.length - a.noteSlugs.length,
  );

  return {
    notes,
    images,
    notesBySlug,
    notesByName,
    imagesByName,
    tags,
  };
}

// ---------------------------------------------------------------------------
// CLI 실행 시 통계 출력 (`tsx src/build/scan.ts`)
// ---------------------------------------------------------------------------

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const t0 = performance.now();
  const catalog = await scanWiki();
  const elapsed = (performance.now() - t0).toFixed(0);

  console.log(`✓ Scanned wiki/ in ${elapsed}ms\n`);
  console.log(`  Notes:  ${catalog.notes.length}`);
  console.log(`  Images: ${catalog.images.length}`);
  console.log(`  Tags:   ${catalog.tags.length}`);

  console.log(`\nTop 15 tags:`);
  for (const tag of catalog.tags.slice(0, 15)) {
    const count = String(tag.noteSlugs.length).padStart(4);
    console.log(`  ${count}  ${tag.raw.padEnd(24)} → /tags/${tag.slug}/`);
  }

  console.log(`\nNotes without explicit frontmatter title (fallback to filename):`);
  const noTitle = catalog.notes.filter(
    (n) => n.title === path.basename(n.slug),
  );
  console.log(`  ${noTitle.length} of ${catalog.notes.length} notes`);

  console.log(`\nNotes without any tags:`);
  const noTags = catalog.notes.filter((n) => n.tags.length === 0);
  console.log(`  ${noTags.length} of ${catalog.notes.length} notes`);

  console.log(`\nNotes without date in frontmatter:`);
  const noDate = catalog.notes.filter((n) => !n.date);
  console.log(`  ${noDate.length} of ${catalog.notes.length} notes`);
}
