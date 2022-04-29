---
title   : 백준 11727 JavaScript 
date    : 2021-11-23 08:35:39 +0900
updated : 2022-04-29 20:52:51 +0900
aliases : 
tags    : 
---
## 문제
[백준 11727](https://www.acmicpc.net/problem/11727)

## 풀이
[[BAEKJOON-11726|백준 11726]]과 비슷한 방식으로 풀었다.  
2x2 타일로 채우는 것 또한 1x2 타일을 두 개 채우는 것처럼 n-2의 크기가 남기 때문에 그 부분을 추가해줬다.  
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const N = parseInt(require('fs').readFileSync(readFileSyncPath).toString().trim());

const DP = new Array(N + 1).fill(0);
const MOD = 10007;


const tiling = (width) => {
  if (width <= 1) return 1;

  if (DP[width] !== 0) return DP[width];

  DP[width] = (tiling(width - 2)*2 + tiling(width - 1)) % MOD;

  return DP[width];
}

console.log(tiling(N));
```

## 다른 풀이
[[Dynamic-Programming|바텀업]] 방식으로도 풀 수 있다.
```javascript
const readFileSyncPath = require('path')
  .basename(__filename)
  .replace(/js$/, 'txt')

// const readFileSyncPath = '/dev/stdin';

const input = require('fs')
  .readFileSync(readFileSyncPath)
  .toString()
  .trim()
  .split('\n')

const n = Number(input[0])

// n = 1
// 2x1 => 1가지

// n = 2
// 2x1 2개
// 2x2 1개
// 1x2 2개 => 3가지

// n = 3
// 처음에 2x1로 채운 경우, 2x(n-1) 직사각형을 채우는 방법 수
// 처음에 2x2로 채운 경우, 2x(n-2) 직사각형을 채우는 방법 수
// 처음에 1x2로 채운 경우, 2x(n-2) 직사각형을 채우는 방법 수
const DP = Array.from({ length: n + 1 }).fill(0)

DP[1] = 1
DP[2] = 3

const MOD = 10007
for (let i = 3; i <= n; i++) {
  DP[i] = (DP[i - 1] + DP[i - 2] + DP[i - 2]) % 10007
}
console.log(DP[n])
```