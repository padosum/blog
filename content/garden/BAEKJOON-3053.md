---
title   : 택시 기하학
date    : 2021-09-15 13:26:54 +0900
updated : 2021-09-15 13:26:54 +0900
aliases : ["택시 기하학"]
---
백준 3053번

## 문제
첫째 줄에 반지름 R이 주어진다. R은 10,000보다 작거나 같은 자연수이다. 첫째 줄에는 유클리드 [[기하학]]에서 반지름이 R인 원의 넓이를, 둘째 줄에는 택시 기하학에서 반지름이 R인 원의 넓이를 출력한다.

## 풀이 

```javascript
const input = Number(require('fs').readFileSync('/dev/stdin').toString());

// 반지름 R일 때 원의 넓이
// 유클리드 기하학, R*R*π
// 택시 기하학, R*R*2
let euclid = (radi) => input ** 2 * Math.PI;
let taxi = (radi) => input ** 2 * 2;
console.log(euclid(input).toFixed(6));
console.log(taxi(input).toFixed(6));
```

## reference
- [https://ahdelron.tistory.com/m/41?category=911948](https://ahdelron.tistory.com/m/41?category=911948)