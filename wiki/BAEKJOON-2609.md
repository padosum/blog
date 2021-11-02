---
title   : 백준 2609 JavaScript 
date    : 2021-11-01 22:29:54 +0900
updated : 2021-11-02 21:45:35 +0900
aliases : 
tags    : 
---
## 문제  
[백준 2609](https://www.acmicpc.net/problem/2609)

## 풀이
최대공약수와 최소공배수를 구하는 문제이다.  
하지만 학교에서 배운 공식을 사용하면 시간이 오래 걸린다. 더 빠른 방식은 "유클리드 호제법"을 이용하는 것이다.  
유클리드 이름은 [[BAEKJOON-3053]]을 풀 때도 나왔다. 기원전에 이런 여러 알고리즘을 생각해내다니..정말 대단한 사람이다.
유클리드 호제법에 대한 자세한 내용은 [이 블로그](https://st-lab.tistory.com/154)에서 정말 잘 설명이 되어있다.  

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncPath).toString().trim().split(" ");
let numbers = input.map(val => Number(val));

// 최대공약수
function getGCD(a, b) {
  while (b > 0) {
    let tmp = a;
    a = b;
    b = tmp % a;
  }

  return a;
}

let gcd = getGCD(numbers[0], numbers[1]);
console.log(gcd);
console.log(numbers[0] * numbers[1] / gcd);
```

## 같이 보기 
- [[BAEKJOON-1934]]
