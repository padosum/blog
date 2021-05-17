---
title   : 뷰 액시오스
date    : 2021-05-16 19:53:50 +0900
updated : 2021-05-16 19:53:57 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
뷰에서 권고하는 [[HTTP]] 통신 라이브러리 
- Vue Resource가 원래 Vue.js를 위한 공식 라이브러리였다. → 예전 코드들에서 확인할 수 있음 
- [free fake REST API](https://jsonplaceholder.typicode.com/)  

## this와...
- `axios.get` 호출 후의 `this`와 호출 전 `this`는 다르다. 
	- 호출 전: 컴포넌트, 인스턴스를 가리키는 `this`
	- 호출 후: [[실행 컨텍스트]]가 바뀐다. 


