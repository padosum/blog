---
title   : 백준 11727 JavaScript 
date    : 2021-11-23 08:35:39 +0900
updated : 2022-01-13 08:52:54 +0900
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
