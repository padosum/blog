---
title   : 백준 4253
date    : 2021-09-15 12:34:21 +0900
updated : 2021-09-15 12:34:21 +0900
aliases : ["직각 삼각형 판별하기"]
---
## 문제
주어진 세변의 길이로 삼각형이 직각인지 아닌지 구분하시오. 

## 풀이
```javascript
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
for(let i=0; i<input.length; i++) {
  let [a, b, c] = input[i].split(' ');
  a = Number(a);
  b = Number(b);
  c = Number(c);
  if(a === 0 && b === 0 && c === 0) return;
	
  let tot = a**2 + b**2 + c**2, max;
  let answer = '';
  
  if(a > b) max = a;
  else max = b;

  if(c > max) max = c;
  if(tot-max**2 === max**2) answer = "right";
  else answer = "wrong";
  console.log(answer);
}
```

## 같이 보기
- [[Algorithms-Discriminating-Triangles|삼각형 판별하기]]