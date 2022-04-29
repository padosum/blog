---
title   : 백준 11726 JavaScript 
date    : 2021-11-21 19:34:58 +0900
updated : 2022-04-29 20:52:51 +0900
aliases : 
tags    : 
created: 2022-04-27 21:54:55 +0900
---
## 문제
[백준 11726 - 2xn 타일링](https://www.acmicpc.net/problem/11726)

## 풀이
이 문제도 [[Dynamic-Programming|메모이제이션]]을 이용해 풀었다.  
2Xn으로 타일링을 하면 맨 처음 채워지는 타일은 2x1 타일 하나 또는 1x2 타일일 것이다.  
그 이후로 타일이 배치되는 경우의 수는 
- 2x1 타일이 처음 나온 경우를 제외해 가로 길이- 1인 경우
- 1x2 타일이 처음 나온 경우를 제외해 가로 길이 -2인 경우

로 재귀적으로 계산을 할 수 있다.  
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const N = parseInt(require('fs').readFileSync(readFileSyncPath).toString().trim());

const DP = new Array(N + 1).fill(0);
const MOD = 10007;

const tiling = width => {
  if (width <= 1) return 1;

  if (DP[width] !== 0) return DP[width];

  DP[width] = (tiling(width - 1) + tiling(width - 2)) % MOD;

  return DP[width];
}

console.log(tiling(N));
```

![[boj_11726.png]]

## 다른 풀이
**바텀업** 방식으로도 풀 수 있다.
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

const n = Number(input)

const DP = Array.from({ length: n + 1 }).fill(0)

// n=1
// 2x1 => 1가지

// n=2
// 2x1 2개, 1x2 2개 => 2가지

// n=3
// 2x1이 처음 배치되었다면, (n-1) 직사각형을 채우는 방법 수와 같음
// 1x2이 처음 배치되었다면, (n-2) 직사각형을 채우는 방법 수와 같음

DP[1] = 1
DP[2] = 2
const MOD = 10007
for (let i = 3; i <= n; i++) {
  DP[i] = (DP[i - 1] + DP[i - 2]) % MOD
}

console.log(DP[n])
```