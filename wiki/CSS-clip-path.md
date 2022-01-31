---
title   : CSS clip-path 
date    : 2022-01-30 21:47:37 +0900
updated : 2022-01-30 21:50:46 +0900
aliases : 
tags    : ["CSS"] 
---

자르기 모양을 정의한다. 이때 정의한 모양 외의 나머지 영역은 숨겨진다(잘린다 clipped).

복잡한 모양을 만드는 데 도움을 주는 사이트가 있다. 
[https://bennettfeely.com/clippy/](https://bennettfeely.com/clippy/)


## 예시 
```html
<div class="circle">
  <div class="sky"></div>
</div>
```

```css
.circle {
  position: relative;
  clip-path: circle(50% at 50% 50%);
  width: 180px;
  height: 180px;
}

.sky {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 124px;
  background: #7ddffc;
}
```

### 결과 
![[clip-path.png]]
