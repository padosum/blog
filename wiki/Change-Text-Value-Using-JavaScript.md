---
title   : JavaScript 텍스트 변경하기   
date    : 2021-10-04 12:39:14 +0900
updated : 2022-05-18 23:52:09 +0900
aliases : ["JavaScript 텍스트 변경하기"]
tags    : ["JavaScript"]
---
## nodeValue
노드 객체의 `nodeValue` 프로퍼티를 참조하면 노드 객체의 값을 반환한다. 값을 할당하면 텍스트 노드의 값을 변경할 수 있다.  
```javascript
  <body>
    <button>닫기</button>
    <script>
      const button = document.getElementsByTagName("BUTTON")[0];
      const txt = button.childNodes[0].nodeValue;
      console.log(txt); // 닫기 
      button.childNodes[0].nodeValue = "저장";
      console.log(button.childNodes[0].nodeValue); // 저장
    </script>
  </body>
```

## txtContent 
요소 노드의 `textContent` 프로퍼티를 참조하면 내부의 텍스트를 모두 반환하는데 여기서 마크업은 무시된다. 할당도 마찬가지로 무시된다. 
```html
<body>
  <div id="foo">Hello <span>world!</span></div>
</body>
<script>
  console.log(document.getElementById('foo').textContent); // Hello world!
</script>
```

비슷한 프로퍼티로 `innerText`가 있는데, 이 프로퍼티는 CSS에 의해 표시되지 않는 요소( `visibility:hidden;`)의 텍스트는 반환하지 않기 때문에 CSS를 고려하므로 속도가 느려서 사용하지 않는 것이 좋다.  

## Text 노드 생성하기
`createTextNode()`를 사용해서 `Text` 노드를 생성할 수 있다.
```js
const textNode = document.createTextNode('Hello')
```