---
title   : JavaScript 모듈화 
date    : 2021-04-23 19:31:22 +0900
updated : 2021-04-23 19:32:23 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
- HTML에서 로드된 JavaScript는 전역 공간에서 순차적으로 실행될 뿐, 모듈이란 개념은 존재하지 않는다. 
- JavaScript에 인위적으로 모듈을 도입하는 **CommonJS**, **AMD(Asynchronous Module Definition)**라는 두 진영이 등장하게 되었다.  

## CommonJS 
```javascript
var someModule = require('someModule');

exports.doSomethingElse = function() {
    return someModule.doSomething() + "bar"; 
}
```
- Node.js의 모듈 패턴은 CommonJS 방식을 따른다.  
- 백엔드, 서버사이드를 위한 방식 


## AMD 
```javascript
define(
	// 이 모듈은 jquery와 underscore 두 모듈에 의존합니다.
	['jquery', 'underscore'],
    
	// 의존 모듈이 로드되면 인자로 모듈들이 전달되며 이 함수가 실행됩니다.
    function ($, \_) {
    
	// 격리된 스코프
    function a(){};
    function b(){};
    function c(){};
    
	// 함수의 리턴 값이 모듈이 exports하는 값이 됩니다.
    return {
    	b: b,
    	c: c
    };
});
```
- 웹 브라우저 환경에 좀 더 적합하게 구현된 방식 

## UMD 
- CommonJS, AMD 방식에 모두 호환되는 모듈을 작성하고 싶은 경우에는 UMD (Universal Module Definition) 방식으로 모듈을 배포 할 수 있다. 

## 참고 
- [https://okky.kr/article/400839](https://okky.kr/article/400839)