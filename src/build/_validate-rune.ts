/**
 * rune-ts SSR 검증 hello-world.
 *
 * 검증 목표:
 *   1. Node 환경에서 View.toHtml() 이 DOM 의존성 없이 동작하는가?
 *   2. 데이터 바인딩, subView, html 헬퍼가 모두 정상 작동하는가?
 *
 * 실행: npm run validate:rune
 */
import { View, html } from 'rune-ts';

interface Note {
  title: string;
  tags: string[];
}

class TagChipView extends View<{ name: string }> {
  override template() {
    return html`<span class="tag-chip">${this.data.name}</span>`;
  }
}

class NoteCardView extends View<Note> {
  private tagViews = this.data.tags.map((name) => new TagChipView({ name }));

  override template() {
    return html`
      <article class="note">
        <h2>${this.data.title}</h2>
        <div class="tags">
          ${this.tagViews}
        </div>
      </article>
    `;
  }
}

const view = new NoteCardView({
  title: '자바스크립트 이터레이터',
  tags: ['JavaScript', 'ECMAScript', 'Iterator'],
});

const htmlString = view.toHtml();

console.log('--- toHtml() output ---');
console.log(htmlString);
console.log('--- assertions ---');

const checks = [
  ['contains title', htmlString.includes('자바스크립트 이터레이터')],
  ['contains tag JavaScript', htmlString.includes('JavaScript')],
  ['contains tag Iterator', htmlString.includes('Iterator')],
  ['html structure', htmlString.includes('<article')],
  // rune-ts는 className 에 View 클래스명을 자동 prepend ("TagChipView tag-chip")
  ['sub-view rendered', /class="TagChipView[^"]*tag-chip[^"]*"/.test(htmlString)],
  // hydration 위한 data-rune 속성도 자동 부여
  ['hydration metadata', htmlString.includes('data-rune="NoteCardView"')],
] as const;

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`  ${ok ? '✓' : '✗'} ${name}`);
  if (!ok) failed++;
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}

console.log('\n✓ rune-ts SSR is safe to use in Node.js');
