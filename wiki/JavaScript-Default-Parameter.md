---
title   : JavaScript 디폴트 파라미터
date    : 2021-09-29 17:54:21 +0900
updated : 2021-09-29 18:07:52 +0900
tags    : ["JavaScript"]
---

C++, Python 등의 언어에서는 함수의 인자로 기본값을 선언할 수 있다. ES6에서도 디폴트 파라미터가 추가되어 함수를 호출하면서 인자를 전달하지 않으면 기본값이 사용된다. 

다음과 같이 디폴트 파라미터를 설정할 수 있다.  
```javascript
function sum(a = 0, b = 0) {
  return a + b;
}

console.log(sum(1)); // 1
console.log(sum(1, 2)); // 3
console.log(sum()); // 0
```

문자열 뿐만 아니라 다른 타입의 값들도 디폴트 값으로 사용할 수 있다. 하지만 [[JavaScript-Rest-Parameter|Rest 파라미터]]에는 기본값을 지정할 수 없다.  
```javascript
const defaultAvatar = {
  name: 'Anonymous',
  color: 'grey'
}

function logLogin(p=defaultAvatar) {
  console.log(`${p.name}가 로그인했습니다.`);
}

logLogin(); // Anonymous가 로그인했습니다.
```
	