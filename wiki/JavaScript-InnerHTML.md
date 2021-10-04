---
title   : JavaScript innerHTML 
date    : 2021-10-04 12:48:21 +0900
updated : 2021-10-04 12:48:43 +0900
aliases : 
tags    : ["JavaScript"]
---
## Element.innerHTML
`innerHTML`은 요소 노드의 마크업을 얻거나 변경할 수 있는 프로퍼티이다. 요소 노드의 `innerHTML` 에 할당한 HTML 문자열은 [[Change-Text-Value-Using-JavaScript|innerText]]와 달리 렌더링 엔진에 의해 파싱되서 **요소 노드의 자식으로 DOM에 반영**된다.  
하지만 사용자로부터 입력받은 데이터를 그대로 할당하면 [크로스 사이트 스크립팅](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%ED%8A%B8_%EA%B0%84_%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8C%85) 공격에 취약하므로 위험하다. 그래서 HTML 새니티제이션을 해주는 라이브러리를 사용하는 것이 좋다.  ([sanitize-html](https://www.npmjs.com/package/sanitize-html) 등...)
```javascript
var el = document.createElement('li'); 
el.innerHTML ='<a href='https://google.com'>google</a>';
```

## Element.insertAdjacentHTML()
`innerHTML` 프로퍼티는 기존의 자식 요소를 다 지우고 새로 할당하기 때문에 비용이 많이 든다. `insertAdjacentHTML`을 사용하면 기존 요소를 제거하지 않고 원하는 위치에 새로운 요소 삽입이 가능하다. 하지만 [크로스 사이트 스크립팅](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%ED%8A%B8_%EA%B0%84_%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8C%85) 공격에 취약하다. 

```javascript
element.insertAdjacentHTML(position, text);
```
`position`에 들어갈 수 있는 것은 다음과 같다.  
- `beforebegin` : element 앞
- `afterbegin`: element 내부 가장 첫 자식 자리
- `beforeend`: element 내부 가장 마지막 자식 자리
- `afterend`: element 뒤


## reference
- [https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML](https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML)