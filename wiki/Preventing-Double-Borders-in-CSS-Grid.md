---
title   : CSS Grid에서 이중 Border 삭제하기
date    : 2022-11-03 23:50:40 +0900
updated : 2022-11-04 00:10:55 +0900
aliases : ["CSS Grid에서 이중 Border 삭제하기"]
tags: ["CSS"]
draft : false
---

## Goal
CSS Grid 내부 Item에 border를 줬을 때 이중으로 생기는 문제 해결하기

CSS Grid를 사용했을 때 Item 에 border를 주고 싶어서 다음과 같이 코드를 작성했다.
```html
<ul class="menu">
  <li>메뉴1</li>
  <li>메뉴2</li>
  <!-- ... -->
</ul>
```

```css
.menu > li {
	border: 1px solid var(--color-gray100);
}
```

![[grid-border.png]]

Grid 아이템 각각에 border를 주면 위 화면과 같이 사이에 줄이 이중으로 생기는 것을 확인할 수 있다. 어디서 많이 본 것 같다. `<table>`을 사용했을 때가 떠오른다...

이중으로 생기는 것은 각 아이템이 모두 상하좌우 border가 있기 때문이다!  
그래서 아이템 bottom과 right에 border를 추가한다.
```css
.menu > li {
  border-bottom: 1px solid var(--color-gray100);
  border-right: 1px solid var(--color-gray100);
}
```

그러면 전체 grid에서 left와 top에 border가 없을 것이다. 추가해주자.
```css
.menu {
  border-top: 1px solid var(--color-gray100);
  border-left: 1px solid var(--color-gray100);
}
```


## reference
- [https://stackoverflow.com/questions/47882924/preventing-double-borders-in-css-grid](https://stackoverflow.com/questions/47882924/preventing-double-borders-in-css-grid)