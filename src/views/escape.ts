/**
 * rune-ts `html` 헬퍼는 string 보간 시 자동 escape 한다.
 * 이 모듈은 rune-ts 에서 부족한 부분만 채운다:
 *   - raw(): 신뢰 가능한 HTML 임베드 (pipeline 결과 등)
 *   - cls(): 조건부 className 조합
 */
import { html, type Html } from 'rune-ts';

/** 신뢰 가능한 HTML 문자열을 rune-ts 템플릿에 그대로 임베드 */
export function raw(htmlStr: string): Html {
  // html.preventEscape 는 UnsafeHtml 을 반환 — 템플릿에서 자동 unwrap
  // 하지만 rune-ts 의 html`...` 결과 타입과 호환되도록 Html 로 감싼다
  return html`${html.preventEscape(htmlStr)}`;
}

/** 조건부 클래스명 조합 — falsy 무시 */
export function cls(
  ...parts: (string | false | null | undefined)[]
): string {
  return parts.filter(Boolean).join(' ');
}
