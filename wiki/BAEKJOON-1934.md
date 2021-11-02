---
title   : 백준 1934 JavaScript 
date    : 2021-11-01 22:30:33 +0900
updated : 2021-11-02 21:46:54 +0900
aliases : 
tags    : 
---
## 문제
[백준 1934](https://www.acmicpc.net/problem/1934)

## 풀이
[[BAEKJOON-2609]]와 마찬가지로 유클리드 호제법을 사용하면된다.  

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");
let testCase = input[0];

for (let i = 0; i < testCase; i++) {
  let numbers = input[i+1].split(" ").map(v => Number(v));
  console.log(getLCM(...numbers));
}

// 최대공약수 구하기
function getGCD(a, b) {
  while (b > 0) {
    let tmp = a;
    a = b;
    b = tmp % b;
  }
  return a;
}

// 최소공배수 구하기
function getLCM(a, b) {
  return a * b / getGCD(a, b);
}
```
