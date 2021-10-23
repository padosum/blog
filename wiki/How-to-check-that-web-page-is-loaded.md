---
title   : How-to-check-that-web-page-is-loaded
date    : 2021-10-23 19:48:58 +0900
updated : 2021-10-23 19:48:58 +0900
aliases : ["HTML 문서 로드 완료 이벤트", DOMContentLoaded", "웹 페이지가 완전히 로드된 것을 확인하는 방법"]
tags: ["How to", "Web", "JavaScript"]
---

웹 페이지에서 문서가 완전히 로드되었을 때 문서를 조작한다거나 쿠키 값을 가져오는 등의 작업을 하는 경우가 있을 것이다. 이 시점에 접근하기 위해 사용되는 이벤트에 대해 알아보도록 하겠다.   
자바스크립트를 이용해 [[DOM]]을 조작하려는 경우, DOM 생성이 완료한 이후에 스크립트를 실행해야 에러가 발생할 우려가 없을 것이다. 일반적으로 `</body>` 태그 전에 자바스크립트를 삽입하면 렌더링 엔진이 HTML 요소를 파싱해 DOM 생성을 완료한 이후에 자바스크립트가 실행되기 때문에 후술할 이벤트를 이용할 필요는 없을 것이다. 하지만 문서의 `<head>` 영역이나 외부에서 파일이 정의된 경우 이벤트를 이용해 문서 완료 시점을 감지한 후 자바스크립트를 실행해야 한다. 또는 [[브라우저의-렌더링-과정|script 태그의 async/defer 어트리뷰트]]를 이용하는 방법이 있다.  

## DOMContentLoaded 
HTML 문서의 로드와 파싱이 완료되어 DOM 생성이 완료된 직후에 발생한다.   
```javascript
window.addEventListener("DOMContentLoaded", function () {
	
});
```
**`onload` 이벤트 보다 먼저 발생한다.**

## onload
`DOMContentLoaded` 이벤트가 발생한 이후에 문서의 모든 리소스(HTML, image, CSS, font, JavaScript 파일 등)의 로딩이 완료되었을 때 발생하는 이벤트이다.  
**동일한 문서인 경우 하나의 onload만 존재해야 한다.**  
- 중복된 경우 마지막 선언이 실행된다.  
`onload` 이벤트를 사용하는 방법에는 3가지가 있다. 코드의 `script` 부분은 문서의 모든 콘텐츠의 로드가 완료된 시점에 실행할 스크립트를 의미한다.  
### HTML 요소의 속성 방식으로 사용하기
```html
<element onload="script">

<body onload="script">
</body>
```

### JavaScript 속성 방식  
```javascript
object.onload = function () {
  // 문서의 모든 콘텐츠의 로드가 완료된 시점에 실행할 스크립트 내용 
}

window.onload = function () {
  // 문서의 모든 콘텐츠의 로드가 완료된 시점에 실행할 스크립트 내용 
}
```

### JavaScript `addEventListener` 메서드  방식  
```javascript
object.addEventListener("load", script);

window.addEventListener("load", function () {

});
```

## 같이 보기
- [[브라우저의-렌더링-과정|브라우저의 렌더링 과정]]
## reference 
- [문서의 로드시점 - onload, DOMContentLoaded](https://webdir.tistory.com/515)