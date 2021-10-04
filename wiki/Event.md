---
title   : 이벤트
date    : 2021-10-04 09:26:33 +0900
updated : 2021-10-04 09:27:23 +0900
aliases : ["이벤트"] 
tags    : ["JavaScript"]
---

## 이벤트 Event 
- 어떤 것으로 인해 일어나는 사건,, 웹에선 클릭 같은 것 
- 이벤트로 인해 실행되는 함수를 이벤트 핸들러(이벤트 리스너)라고 한다. 그래서 이벤트가 발생했을 때 브라우저에게 이벤트 핸들러의 호출을 위임하는 것을 이벤트 핸들러 등록이라고 한다. 
```javascript
element.addEventListener('click', 함수);
```

## 이벤트 타입
[이벤트 타입](https://developer.mozilla.org/ko/docs/Web/Events#%EA%B0%80%EC%9E%A5_%EC%9D%BC%EB%B0%98%EC%A0%81%EC%9D%B8_%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC)  
### 이벤트 객체, 위임 
- 이벤트 핸들러 내부에 `this`는 `addEventListener`를 호출한 객체다. 
- 이벤트 핸들러에 자동으로 들어오는 매개변수가 들어오는데 그게 바로 이벤트 객체다. 	
	- 이벤트 객체에는 많은 정보가 들어있다. 
	- `this` == `이벤트객체.currentTarget`  
	- `이벤트객체.target` 실제로 발생한 곳 
- 이벤트 위임: 상위 엘리먼트에 이벤트 리스너를 등록하고 자식 엘리먼트에 이벤트를 설정할 수 있는 것 
 
