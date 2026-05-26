/**
 * 전체 위키 파이프라인 검증.
 *   - 모든 노트를 렌더링
 *   - 렌더 에러 / 깨진 위키 링크 / 통계 수집
 *   - 자주 깨지는 링크 타겟 상위 N개 출력 (오타·이름 변경 후보)
 *
 * 실행: npm run validate:pipeline
 */
import { performance } from 'node:perf_hooks';
import { scanWiki } from './scan.ts';
import { renderNote } from './pipeline.ts';

const catalog = await scanWiki();

interface RenderError {
  slug: string;
  error: string;
}

const stats = {
  totalNotes: catalog.notes.length,
  rendered: 0,
  errors: 0,
  totalBrokenLinks: 0,
  notesWithBrokenLinks: 0,
  totalReferences: 0,
};

const errorList: RenderError[] = [];
const brokenLinkFreq = new Map<string, string[]>(); // broken target → 참조하는 노트 slug 목록

const t0 = performance.now();

for (const note of catalog.notes) {
  try {
    const result = await renderNote(catalog, note);
    stats.rendered++;
    stats.totalReferences += result.references.length;

    if (result.brokenLinks.length > 0) {
      stats.notesWithBrokenLinks++;
      stats.totalBrokenLinks += result.brokenLinks.length;
      for (const broken of result.brokenLinks) {
        const list = brokenLinkFreq.get(broken) ?? [];
        list.push(note.slug);
        brokenLinkFreq.set(broken, list);
      }
    }
  } catch (err) {
    stats.errors++;
    errorList.push({
      slug: note.slug,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

const elapsed = ((performance.now() - t0) / 1000).toFixed(1);

console.log(`\n=== 전체 위키 파이프라인 검증 ===\n`);
console.log(`완료: ${stats.rendered}/${stats.totalNotes} (${elapsed}s)`);
console.log(`  렌더 에러:        ${stats.errors}`);
console.log(`  깨진 링크 가진 노트: ${stats.notesWithBrokenLinks}`);
console.log(`  총 깨진 링크 수:   ${stats.totalBrokenLinks}`);
console.log(`  총 정상 참조 수:   ${stats.totalReferences}`);
console.log(`  유니크 깨진 타겟:  ${brokenLinkFreq.size}`);
console.log(`  평균 렌더 시간:    ${(parseFloat(elapsed) * 1000 / stats.totalNotes).toFixed(1)}ms / note`);

if (errorList.length > 0) {
  console.log(`\n--- 렌더 에러 (상위 10개) ---`);
  for (const e of errorList.slice(0, 10)) {
    console.log(`  ${e.slug}`);
    console.log(`    ${e.error}`);
  }
}

if (brokenLinkFreq.size > 0) {
  const sorted = [...brokenLinkFreq.entries()].sort(
    (a, b) => b[1].length - a[1].length,
  );

  console.log(`\n--- 자주 참조되는 깨진 링크 (상위 20개) ---`);
  console.log(`(이름 변경, 오타, 또는 아직 만들지 않은 노트 후보)`);
  for (const [target, refs] of sorted.slice(0, 20)) {
    const refStr = refs.length === 1 ? refs[0] : `${refs[0]} 외 ${refs.length - 1}개`;
    console.log(`  ${String(refs.length).padStart(3)}×  [[${target}]]`);
    console.log(`         └─ in: ${refStr}`);
  }

  // 단일 참조만 있는 깨진 링크 개수 (대부분 오타)
  const singleRef = sorted.filter(([, refs]) => refs.length === 1).length;
  console.log(`\n  유니크 깨진 타겟 ${brokenLinkFreq.size}개 중 ${singleRef}개는 단일 참조 (오타/한번성 가능성 높음)`);
}

if (stats.errors === 0) {
  console.log(`\n✓ 모든 노트가 에러 없이 렌더됨`);
}
