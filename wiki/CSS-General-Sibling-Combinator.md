---
title   : CSS 일반 형제 선택자
date    : 2022-11-04 00:02:44 +0900
updated : 2022-11-04 00:10:52 +0900
aliases : ["CSS 일반 형제 선택자"]
tags: ["CSS"]
draft : false
---

## 일반 형제 결합자
**일반 형제 결합자**는 두 선택자 사이에 위치하고, 두 선택자의 부모 요소가 같고, 뒤쪽 선택자의 요소가 뒤에 위치하는 경우에 사용한다.
```css
img ~ p {
  color: blue;
}
```
`img` 뒤쪽의 `p` 만 선택한다.

이렇게 문서만 읽으면 잘 와닿지 않는 경우가 많았다. 나의 경우엔 어떤 클래스를 가진 요소가 여러 개 있는 경우에 사용했다.
예를 들어, HTML 코드가 다음과 같은 경우에 두 번째에 위치한 `.padosum`을 선택하고 싶을 수 있다!
```html
<div class="padosum">
</div>
<div class="yj">
</div>
<div class="padosum">
</div>
<div class="stanley">
</div>
```

그럴 때 일반 형제 결합자를 사용하면 된다.
```css
.padosum ~ .padosum {
  background-color: chocolate;
}
```

## reference
- [mdn web docs - 일반 형제 결합자](https://developer.mozilla.org/ko/docs/Web/CSS/General_sibling_combinator)
- [https://jsfiddle.net/4o7cp3zs/1/](https://jsfiddle.net/4o7cp3zs/1/)
