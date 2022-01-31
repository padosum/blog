---
title   : SASS, SCSS mixin과 include 
date    : 2022-01-24 18:12:38 +0900
updated : 2022-01-24 18:13:30 +0900
aliases : 
tags    : ["Sass", "SCSS"] 
---
## Goal
[[SASS|Sass와 SCSS]]에서 `mixin`, `include`에 대해 알아본다.  

## mixin, include란 무엇인가
`mixin`을 사용하면 자주 사용하는 CSS 규칙을 그룹화해서 은 재사용할 수 있다. 
`@mixin`으로 선언해서 포함할 때는 `@include`를 사용하면 된다.  

```scss
@mixin 믹스인이름 () {
  /* 스타일 */
}
```

## 예시 
#### Scss 
```scss
@mixin box-size($w, $h) {
  width: $w;
  height: $h;
}

.box1 {
  @include box-size(100px, 200px);
}
.box2 {
  @include box-size(200px, 400px);
}
```

다음 처럼 기본값을 설정해두면 전달되는 값이 없는 경우에 기본값이 적용된다. 
```scss
@mixin box-size($w: 100, $h: 100) {
  width: $w;
  height: $h;
}

.box1 {
  @include box-size;
}
.box2 {
  @include box-size;
}
```

#### Sass 
믹스인 선언하기 
```
=mt1
  margin-top:5px
```

선언된 믹스인 사용하기
```sass
+믹스인이름
```

## reference
- [https://velog.io/@hey_jude/SASS-1](https://velog.io/@hey_jude/SASS-1)