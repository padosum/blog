---
title   : 백준 11726 JavaScript 
date    : 2021-11-21 19:34:58 +0900
updated : 2021-11-21 19:39:53 +0900
aliases : 
tags    : 
---
## 문제
[백준 11726 - 2xn 타일링](https://www.acmicpc.net/problem/11726)

## 풀이
이 문제도 [[Dynamic-Programming|메모제이션]]을 이용해 풀었다.  
2Xn으로 타일링을 하면 맨 처음 채워지는 타일은 2x1 타일 하나 또는 1x2 타일 두개일 것이다. 그 이후로 타일이 배치되는 경우의 수가 2x1 타일이 처음 나온 경우를 제외해 가로 길이- 1인 경우와 1x2 타일이 처음 나온 경우를 제외해 가로 길이 -2인 경우로 해서 계속 재귀적으로 계산을 할 수 있다.  
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const N = parseInt(require('fs').readFileSync(readFileSyncPath).toString().trim());

const DP = new Array(N + 1).fill(0);
const MOD = 10007;

function tiling(width) {
  if (width <= 1) return 1;

  if (DP[width] !== 0) return DP[width];

  DP[width] = (tiling(width - 2) + tiling(width - 1)) % MOD;

  return DP[width];
}

console.log(tiling(N));
```
