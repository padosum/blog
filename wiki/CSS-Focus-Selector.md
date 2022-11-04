---
title   : CSS focus 요소 다루기
date    : 2022-11-04 23:18:12 +0900
updated : 2022-11-04 23:56:38 +0900
aliases : ["CSS focus 요소 다루기"]
tags: ["CSS"]
draft : false
---

## Goal
특정 요소의 자식 요소가 focus를 받았을 때 스타일 입히는 방법을 알아본다.

input 요소가 focus를 받을 때 border 색상을 변경하고 싶으면 다음과 같이 CSS를 작성하면 된다.  
```css
input:focus {
  border-color: blue;
}
```

나는 좀 다른 경우를 겪게 되었다. HTML 구조가 다음과 같을 때, label에 적힌 텍스트를 `bold` 처리하고 싶었다. 어떻게 해야할까?
```html
<label>
  아이디
  <input type="text">
</label>
```

결합을 위한 연산자를 찾아봤는데 뭐가 제대로 나오지 않았다. 그러다가  `:focus-within`이라는 의사 클래스를 알게되었다. 예전에 문서를 읽다가 이런게 있구나~ 하고 넘어갔었다.

## :focus-within
`:focus-within`을 사용하면 포커스를 받거나 포커스를 받은 요소의 부모 요소를 나타내게 된다.  
내가 하고픈 작업을 하려면 아래와 같이 작성하면 되는 것이었다.
```css
label:focus-within {
  font-weight: bold
}
```

추가로, `:focus-visible` 이라는 것도 있었다. 디자인을 위해 요소 focus시 `outline`을 제거하는 경우가 많은데 접근성에 위배되는 작업이다! 따라서 `:focus-visible`을 사용하면 키보드로 요소를 focus한 경우에만 스타일을 입힐 수 있다. 
이것도 `focus-within`이 그랬던 것처럼 기억못할 수도 있겠지만 나중을 위해 기록해 둔다.

