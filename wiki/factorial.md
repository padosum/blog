---
title   : JavaScript로 팩토리얼 구하기
date    : 2022-11-03 23:30:34 +0900
updated : 2022-11-04 00:10:47 +0900
aliases : ["JavaScript로 팩토리얼 구하기"]
draft : false
---

## for문 사용하기
n! 구하기
```js
const factorial = (num) => {
  let result = 1
  for (let i = 1; i < n + 1; i++) {
    result = result * i
  }
  return result
}
```

## 재귀 함수 이용하기
**종료 조건**이 중요하다. 

```js
const factorial = (num) => {
  if (num <= 1) {
    return 1
  }
  return num * factorial(num - 1)
}
```

for문을 이용하면 N번 곱셈을 해야 한다.  
재귀 호출은 N-1번, 모두  `O(n)`이다.

