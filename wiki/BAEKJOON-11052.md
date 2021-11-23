---
title   : 백준 11052 JavaScript
date    : 2021-11-23 22:57:50 +0900
updated : 2021-11-23 22:58:47 +0900
aliases : 
tags    :
---
## 문제
[백준 11052](https://www.acmicpc.net/problem/11052)

## 풀이
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

const N = Number(input[0]);
const prices = input[1].split(" ").map(v => Number(v));
const DP = new Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= i; j++) {
    DP[i] = Math.max(DP[i], DP[i - j] + prices[j - 1])
  }
}

console.log(DP[N]);
```
