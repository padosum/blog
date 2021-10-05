---
title   : JavaScript 이벤트 핸들러 등록하는 방법 
date    : 2021-10-05 21:09:15 +0900
updated : 2021-10-05 21:09:50 +0900
aliases : ["JavaScript 이벤트 핸들러 등록하는 방법"]
tags    : ["JavaScript"] 
---

**이벤트 핸들러**는 이벤트가 발생했을 때 호출하는 함수를 말한다. 어떤 이벤트가 발생했을 때 브라우저에게 이 이벤트 핸들러를 호출해달라고 위임하는 것을 이벤트 핸들러 등록이라고 한다.  
이벤트 핸들러를 등록하는 방법에는 3가지가 있다.  

## 이벤트 핸들러 어트리뷰트 방식
HTML 요소에 이벤트 핸들러 어트리뷰트를 넣어 등록하는 방식이다. 어트리뷰트의 이름은 [이벤트 종류(타입)](https://developer.mozilla.org/ko/docs/Web/Events#%EA%B0%80%EC%9E%A5_%EC%9D%BC%EB%B0%98%EC%A0%81%EC%9D%B8_%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC)에 접두사 `on`을 붙인다.  
```html
<body>
  <button onclick="sayHello('yj')">Click</button>
  <script>
  function sayHello(name) {
    console.log(`🤙 ${name}`);
  }
  </script>
</body>
```

## 이벤트 핸들러 프로퍼티 방식
[[DOM]] 노드 객체에 이벤트 핸들러 프로퍼티가 있다. 이벤트를 발생시킬 객체인 **이벤트 타깃(event target)**에 프로퍼티의 키는 이벤트 핸들러 어트리뷰트 방식 처럼 [이벤트 종류(타입)](https://developer.mozilla.org/ko/docs/Web/Events#%EA%B0%80%EC%9E%A5_%EC%9D%BC%EB%B0%98%EC%A0%81%EC%9D%B8_%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC)에 접두사 `on`을 붙인다.  그리고 이벤트 핸들러를 지정한다.

```html
<body>
  <button>Click</button>
  <script>
    const $button = document.querySelector('button');
	
	$button.onclick = function () {
	  console.log(`clicked`);
	}
  </script>
</body>
```
꼭 이벤트 타깃에 이벤트 핸들러를 바인딩할 필요는 없다. [[Event-Propagation-And-Delegation|이벤트 전파]]를 통해 다른 노드에 바인딩 할 수 있다.  
이벤트 핸들러 어트리뷰트 방식은 이벤트 핸들러 프로퍼티로 변환되므로 동일한 방식이라고 할 수 있지만 **이벤트 핸들러 프로퍼티에는 하나의 이벤트 핸들러만 바인딩 할 수 있는 단점이 있다.**

## addEventListener 메서드 방식  
```javascript
EventTarget.addEventListener('eventType', function [, userCapture]);
```
- 첫 번째 매개변수는 이벤트의 종류를 나타내는 이벤트 타입을 전달 
	- **`on` 접두사를 붙이지 않는다.**
- 두 번째 매개변수에는 이벤트 핸들러 전달 
- 마지막 매개변수에는 이벤트를 캐치할 [[Event-Propagation-And-Delegation|이벤트 전파]] 단계(버블링/캡처링)를 지정 
	- 생략하거나 `false`인 경우 버블링 단계에서 이벤트를 캐치, `true`이면 캡처링 단계에서 이벤트 캐치 

```html
<body>
  <button>Click</button>
  <script>
    const $button = document.querySelector('button');
	
	$button.addEventListener('click', function () {
	  console.log(`clicked`);
	});

    $button.onclick = function () {
	  console.log(`clicked`);
	};
  </script>
</body>
```
**만약 위 코드와 같이 이벤트 핸들러 프로퍼티와 `addEventListener` 메서드가 둘 다 바인딩 된다면 각각의 이벤트 핸들러가 모두 호출된다. **

## 이벤트 핸들러 제거
등록한 이벤트 핸들러를 더 이상 사용하지 않아 제거할 필요가 있을 수 있다. 
`addEventListener`로 등록한 이벤트 핸들러는 `removeEventListener` 메서드를 사용해서 제거할 수 있다. 등록시 사용한 `addEventListener` 메서드의 매개변수와 반드시 일치해야지 삭제된다. 

```html
<body>
  <button>Click</button>
  <script>
    const $button = document.querySelector('button');
	
	const handleClick = () => console.log(`clicked`);
	
	$button.addEventListener('click', handleClick);
	$button.removeEventListener('click', handleClick, true); // 등록할 때와 인수가 다르므로 삭제 x
	$button.removeEventListener('click', handleClick);  // 삭제 ok 
	
	
	// 이벤트 핸들러 프로퍼티로 등록한 경우  
	$button.onclick = handleClick; 
	$button.removeEventListener('click', handleClick); // 제거할 수 없음 
	// 제거하려면 null 할당 
	$button.onclick = null;
  </script>
</body>
```