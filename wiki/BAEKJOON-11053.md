---
title   : 백준 11053 JavaScript 
date    : 2022-01-21 15:13:40 +0900
updated : 2022-01-21 15:14:25 +0900
aliases : 
tags    : 
---
## 문제
[백준 11053](https://www.acmicpc.net/problem/11053)

## 풀이
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().split("\n");
const N = Number(input.splice(0, 1));
const A = input[0].split(" ").map(Number);
const DP = new Array(N + 1).fill(1);

let result = 1;
for (let i = 0; i <= N; i++) {
  let maxVal = A[i];
  for (j = 0; j < i; j++) {
    if (maxVal > A[j]) {
      DP[i] = Math.max(DP[i], DP[j] + 1);
    }
  }
  result = Math.max(result, DP[i])
}

console.log(result);
```
