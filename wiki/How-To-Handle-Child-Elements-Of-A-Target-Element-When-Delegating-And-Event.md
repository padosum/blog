---
title   : 이벤트 위임을 사용할 때 타겟 엘리먼트의 자식 엘리먼트를 다루는 방법 
date    : 2022-03-04 12:22:35 +0900
updated : 2022-03-04 13:06:58 +0900
aliases : ["이벤트 위임을 사용할 때 타겟 엘리먼트의 자식 엘리먼트를 다루는 방법"]
tags    : ["JavaScript", "How to", "CSS"]
---
## Goal 
[[Event-Propagation-And-Delegation|이벤트 위임]]을 사용했을 때 이벤트를 캐치하고 싶은 타겟 엘리먼트에 이벤트를 발생시키려 할 때 그 자식 엘리먼트에서 이벤트가 발생되는 문제 해결하기  

다음과 같은 코드가 있었다.    
`<a>` 태그를 나열한 간단한 pagination 요소이다.  페이지를 맨 앞으로 이동시키기 위한 요소는 페이지 숫자 대신 아이콘을 넣기 위해 Fontawesome 아이콘을 추가했다.
```html
<div class="pagination">
  <a class="first page_number">
    <i class="fa-solid fa-angles-left"></i> 
  </a>
  <a class="page_number">1</a>
  <a class="page_number">2</a>
  <!-- .... -->
```

`page_number` class를 가지는 `a` 태그의 개수가 정해지지 않았기 때문에 이벤트 위임을 이용해 다음과 같이 클릭 이벤트 핸들러를 등록하려고 했다.
```javascript
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('page_number')) {
    console.log(e.target)
  }
})
```

![[pointer-events.png]]
하지만 요소의 아이콘을 클릭하면 `.page_number`를 가진 요소가 아닌 안에 존재하는 `i` 태그 (Fontawesome) 요소가 클릭되어 이벤트 캐치가 되지 않는다. 아이콘을 벗어나 없는 부분을 클릭하면 캐치가 된다. 보통 아이콘을 클릭할텐데... 이 경우엔 어떻게 해야할까?  

## `pointer-events`
정말 간단한 해결책이 있었다. CSS의 `pointer-events` 속성을 `none`으로 설정하면 해당 규칙이 설정된 요소에서 `click` 이벤트가 발생하지 않게 된다.    

다음과 같이 css 클래스를 만들어 놓고  
```css
.pointer-none {
  pointer-events: none;
}
```


이벤트를 발생시키고 싶지 않은 자식 요소에 `.pointer-none` 를 추가한다.  
```html
<div class="pagination">
  <a class="first page_number">
    <i class="fa-solid fa-angles-left pointer-none"></i> 
  </a>
  <a class="page_number">1</a>
  <a class="page_number">2</a>
  <!-- .... -->

```

그럼 요소를 클릭할 때 `i` 태그의 클릭 이벤트는 무시되고 처음에 원했던 것처럼 `.page_number` 클릭 이벤트가 캐치된다.  

## reference
- [https://stackoverflow.com/questions/24117369/vanilla-js-event-delegation-dealing-with-child-elements-of-the-target-element](https://stackoverflow.com/questions/24117369/vanilla-js-event-delegation-dealing-with-child-elements-of-the-target-element)
