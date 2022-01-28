---
title   : 백준 2225 JavaScript
date    : 2022-01-28 09:41:44 +0900
updated : 2022-01-28 09:49:56 +0900
aliases : 
tags    : 
---
## 문제
[백준 2225](https://www.acmicpc.net/problem/2225)

## 풀이

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().split(" ");
const N = Number(input[0]);
const K = Number(input[1]);
const MOD = 1000000000;

const DP = new Array(K+1).fill(0).map(() => Array(N+1).fill(0));

// 1개인 경우는 모두 자기 자신 값 하나이므로 1로 초기화
for (let i = 0; i <= N; i++) {
  DP[1][i] = 1;
}

for (let i = 2; i <= K; i++) {
  for (let j = 0; j <= N; j++) {
    if (j === 0) {
      // N이 0인 경우는 전부 1개 (0, 0+0,...)
      DP[i][j] = 1;
    } else {
      // DP[K][N] 의 값은 DP[K][N-1] + DP[K-1][N]의 합과 같음 
      DP[i][j] = (DP[i][j - 1] + DP[i - 1][j]) % MOD;
    }
  }
}

console.log(DP[K][N]);
```

## 생각
- 모르겠어서 [이분](https://amunre21.github.io/boj/3-2225/)의 풀이를 참고했다. - 나도 경우의 수를 따져보고자 직접 풀어서 나열은 했는데 저렇게 표로 하는 방식은 생각하지 못했다. 다음부터는 끝까지 끈기를 가지고 여러 방법을 시도해봐야겠다.
- 저기 나와있는 것처럼 이전 값들의 합을 구하는 것보다 훨씬 간단하다는 생각이 든다. 

