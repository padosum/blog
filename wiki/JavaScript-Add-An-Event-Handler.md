---
title   : JavaScript 이벤트 핸들러 등록하는 방법 
date    : 2021-10-05 21:09:15 +0900
updated : 2022-05-23 22:28:02 +0900
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
[[DOM]] 노드 객체에 이벤트 핸들러 프로퍼티가 있다. 이벤트를 발생시킬 객체인 **이벤트 타깃(event target)** 에 프로퍼티의 키는 이벤트 핸들러 어트리뷰트 방식 처럼 [이벤트 종류(타입)](https://developer.mozilla.org/ko/docs/Web/Events#%EA%B0%80%EC%9E%A5_%EC%9D%BC%EB%B0%98%EC%A0%81%EC%9D%B8_%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC)에 접두사 `on`을 붙인다.  그리고 이벤트 핸들러를 지정한다.

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

### addEventListener()를 사용할 때 this의 값
`addEventListener()` 메서드에 전달되는 함수 내부에서 [[JavaScript-this|this]]의 값은 이벤트가 연결된 노드나 개체에 대한 참조가 된다.

이벤트 흐름의 일부로 이벤트가 호출되면 `this` 값은 이벤트 핸들러가 등록된 노드나 개체의 값이 된다. 즉 아래와 같이 `<body>`에 `click` 이벤트를 등록해뒀다면 `<div>`나 `<body>`중 어떤 것을 등록해도 `this`값은 항상 `<body>`를 가리킨다.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
    <style>
      body {
        border: 1px solid green;
      }

      div {
        margin: 10px;
        border: 1px solid blue;
      }
    </style>
  </head>
  <body>
    <div>Click Me</div>
    <script>
      document.body.addEventListener("click", function (e) {
        console.log(this); // <body>
      });
    </script>
  </body>
</html>
```

**여기서 주의할 점은 메서드에 전달한 함수가 [[JavaScript-Arrow-Function|화살표 함수]]라면 this는 window 객체를 가리킨다.**  상위 스코프의 `this`를 참조하는 것이다.
```javascript
document.body.addEventListener("click", () => {
  console.log(this); // window
});
```

`event.currentTarget` 속성을 사용하면 `this` 속성이 제공하는 것과 동일하게 이벤트 핸들러가 등록된 노드에 대한 참조를 얻을 수 있다.
```javascript
document.body.addEventListener("click", function (e) {
	console.log(e.currentTarget); // <body>
});
```

`event.target` 속성을 사용하면 이벤트가 발생한 가장 안쪽의 요소인 타깃(target) 요소에 접근할 수 있다.
- `event.target`은 실제 이벤트가 시작된 '타깃' 요소로서 버블링이 진행되어도 변하지 않는다.
아래 코드에서 `<div>` 요소를 클릭하면 `e.target`은 `<div>`가 되고, `<div>` 대신 `<body>`가 클릭되면 `<body>`가 된다. 결국 이 경우엔 `e.target`, `this`, `e.currentTarget`이 모두 `<body>`인 것
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
    <style>
      body {
        border: 1px solid green;
      }

      div {
        margin: 10px;
        border: 1px solid blue;
      }
    </style>
  </head>
  <body>
    <div>Click Me</div>
    <script>
      document.body.addEventListener("click", function (e) {
        console.log(this, e.target);
      });
    </script>
  </body>
</html>

```
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

## reference
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
- 안재우 역, 코디 린들리 저, 《DOM을 깨우치다》, O'Reilly, 2013년