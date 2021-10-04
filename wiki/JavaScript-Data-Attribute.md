---
title   : JavaScript data 어트리뷰트 사용하기 
date    : 2021-10-04 13:28:54 +0900
updated : 2021-10-04 13:34:23 +0900
aliases : ["JavaScript data 어트리뷰트 사용하기"]
tags    : ["JavaScript"]
---

`data` 어트리뷰트를 사용하면 사용자 정의 어트리뷰트를 자바스크립트를 통해 사용할 수 있다. 
`data` 어트리뷰트는 이름에 `data-` 접두사를 붙여서 사용한다. 

## data 어트리뷰트 값 가져오기, 할당하기
`HTMLElement.dataset` 프로퍼티를 이용해서 `data` 어트리뷰트 값을 가져오고 할당할 수 있다.   
```html
<body>
  <div id="user" data-id="1234567890">John Doe</div>
  <script>
    const el = document.querySelector('#user');
	
	console.log(el.dataset.id); // 1234567890

	user.dataset.name = 'john';
	console.log(user.dataset.name); // john
  </script>
</body>
```

## reference
- [https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
