---
title   : JavaScript Rest Parameter
date    : 2021-09-29 17:32:55 +0900
updated : 2021-09-29 17:55:36 +0900
tags    : ["JavaScript"]
---

Rest 파라미터(나머지 매개변수)는 매개변수 이름 앞에 `...`을 붙여서 정의한 매개변수를 말한다. 함수에 전달된 인수들의 목록을 배열로 전달받는다.
```javascript
function sum(...args) {
  let sum = 0;
	
  for (let arg of args) {
  	sum += arg;
  }
	
  return sum; 
}

sum(1, 2, 3, 4, 5); // 15
```

Rest 파라미터는 다른 일반 매개변수와 함께 사용 가능하다. 주의할 점은 Rest 파라미터는 단 한번 제일 마지막에 선언할 수 있다.  
```javascript
function direction(first, ...remains) {
   console.log(`출발지: ${first}`);
	
   for (let dest of remains) {
     console.log(`${dest}를 지납니다.`);
   }
}
direction('부산', '광주', '대구', '제주', '호주');
```
