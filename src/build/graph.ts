/**
 * 백링크 그래프 빌더.
 *
 * 모든 노트의 위키 링크 참조를 모아 역방향 인덱스를 만든다:
 *   targetSlug → 이 노트를 참조하는 노트들의 정보
 *
 * 전체 위키를 1회 변환해야 하므로 비용이 있다 (998 노트 = ~1.6s).
 * 빌드 시 1회만 호출.
 */
import type { WikiCatalog } from './scan.ts';
import { renderNote } from './pipeline.ts';

export interface Backlink {
  slug: string;
  title: string;
  url: string;
}

export interface BacklinkGraph {
  /** target slug → 이 노트를 참조하는 노트들 */
  get(slug: string): Backlink[];
  /** target slug 별 백링크 개수 */
  count(slug: string): number;
  /** 전체 통계 */
  stats: {
    totalReferences: number;
    notesWithBacklinks: number;
  };
}

export async function buildBacklinkGraph(
  catalog: WikiCatalog,
): Promise<BacklinkGraph> {
  const backlinks = new Map<string, Backlink[]>();
  let totalReferences = 0;

  for (const note of catalog.notes) {
    const result = await renderNote(catalog, note);
    totalReferences += result.references.length;

    for (const refSlug of result.references) {
      const list = backlinks.get(refSlug) ?? [];
      list.push({
        slug: note.slug,
        title: note.title,
        url: note.url,
      });
      backlinks.set(refSlug, list);
    }
  }

  return {
    get: (slug) => backlinks.get(slug) ?? [],
    count: (slug) => backlinks.get(slug)?.length ?? 0,
    stats: {
      totalReferences,
      notesWithBacklinks: backlinks.size,
    },
  };
}
