---
title   : DOM
date    : 2021-04-26 11:11:28 +0900
updated : 2021-05-18 12:04:46 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---

**문서 객체 모델(DOM; Document Object Model)**  

## 개요 
- 웹 브라우저가 HTML이나 XML 같은 구조화된 문서를 JavaScript로 제어할 수 있도록 추상화한 객체의 집합 
- HTML을 구성하는 하나하나를 자바스크립트 객체로 보는 모델 

## DOM 스크립트 
- HTML Element를 자바스크립트로 조작하는 것
```javascript
var title = document.getElementById('title');
var titleSpan = title.getElementsByTagName('span');

var title = document.querySelector('#title'); // 이걸 더 많이 사용한다.
// document.querySelectorAll → 여러개 가져올 경우 
```

### CSS 클래스 관련 
```javascript
link.className = 'homepage'; // 클래스 설정하기 

link.classList.add('foo'); // 클래스 추가하기 
link.classList.remove('foo'); // 클래스 제거하기 
link.classList.add('foo', 'bar' 'baz'); // 여러개 추가 
link.classList.remove('foo', 'bar' 'baz'); // 여러개 제거 

link.classList.contains('foo'); // 클래스 소유 여부 
```

### HTML Element 동적 생성 
```javascript
// element 생성
var el = document.createElement('li'); 
el.innerHTML ='<a href='https://google.com'>google</a>';

// 위치 정하기, 부모 엘리먼트에 넣는다. 
var ul = document.querySelector('ul');
ul.appendChild(el);
```

## 이벤트 Event 
- 어떤 것으로 인해 일어나는 사건,, 웹에선 클릭 같은 것 
- 이벤트로 인해 실행되는 함수를 이벤트 핸들러(이벤트 리스너)라고 한다. 
```javascript
element.addEventListener('click', 함수);
```

### 이벤트 객체, 위임 
- 이벤트 핸들러 내부에 `this`는 `addEventListener`를 호출한 객체다. 
- 이벤트 핸들러에 자동으로 들어오는 매개변수가 들어오는데 그게 바로 이벤트 객체다. 	
	- 이벤트 객체에는 많은 정보가 들어있다. 
	- `this` == `이벤트객체.currentTarget`  
	- `이벤트객체.target` 실제로 발생한 곳 
- 이벤트 위임: 상위 엘리먼트에 이벤트 리스너를 등록하고 자식 엘리먼트에 이벤트를 설정할 수 있는 것 

