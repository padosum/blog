---
title   : 
date    : 2022-02-03 12:29:41 +0900
updated : 2022-02-03 12:30:24 +0900
aliases : 
tags    : 
---
## 문제
[백준 2156](https://www.acmicpc.net/problem/2156)

## 풀이
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

const T = Number(input[0]);
let wineGlasses = input.slice(1).map(Number);
const DP = new Array(T+1).fill(0);
DP[1] = wineGlasses[0];
DP[2] = DP[1] + wineGlasses[1];
for (let i = 3; i <= T; i++) {
  // 현재 포도주를 안마시는 경우 or 
  // 이전 포도주를 마시지 않고, 현재 포도주를 마시는 경우 or
  // 이전 포도주를 마시고 현재 포도주를 마시는 경우
  // - 연속 3잔이 될 수 없으므로 전,전,전 포도주를 마시고 이전 포도주를 마신 경우만 해당
  // - 전,전 포도주를 마시고 이전 포도주를 마시면 연속 3잔
  DP[i] = Math.max(DP[i - 1]
    , DP[i - 2] + wineGlasses[i-1]
    , DP[i - 3] + wineGlasses[i-2] + wineGlasses[i-1]);
}

console.log(DP[T]);
```

## 생각
인덱스 값이 헷갈려서 시간을 많이 보냈다. 차근차근 생각을 진득하게 해보자.