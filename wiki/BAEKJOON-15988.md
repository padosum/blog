---
title   : 백준 15988 JavaScript 
date    : 2022-01-29 10:23:25 +0900
updated : 2022-01-29 10:28:11 +0900
aliases : 
tags    : 
---
## 문제
[백준 15988](https://www.acmicpc.net/problem/15988)

## 풀이
[[BAEKJOON-9095|백준 9095]]와 문제가 똑같다. 다른점은 해당 문제는 주어지는 정수 `n`의 크기가 커서 `1,000,000,009`로 나눈 나머지를 출력하면 된다.  
9095번을 처음봤을 때는 다른 사람의 풀이를 참고했는데 다시 푸니 기억이 떠올라서 복습이 되었다. 날짜를 확인해보니 2주가 지나있었다.   

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

const T = Number(input[0]);
const MOD = 1000000009;

const number = [];
for (let i = 0; i < T; i++) {
  number.push(Number(input[i + 1]));
}

// 4를 만드는 조합
// 1 + 3 (1를 만드는 조합의 수 + 3) = 1을 만드는 조합의 수 (4-3) 을 만드는 조합의 수
// 2 + 2 (2를 만드는 조합의 수 + 2) = 2를 만드는 조합의 수 (4-2) 을 만드는 조합의 수 
// 3 + 1 (3을 만드는 조합의 수 + 1) = 3을 만드는 조합의 수 (4-1) 을 만드는 조합의 수 
// -------
// 1 + 2 + 4 = 7

const max = Math.max(...number);
const DP = new Array(max).fill(0);
DP[1] = 1; // 1을 만드는 조합의 수 -> 1
DP[2] = 2; // 2를 만드는 조합의 수 -> 2
DP[3] = 4; // 3을 만드는 조합의 수 -> 1+2, 1+1+1, 2+1, 3

for (let i = 4; i <= max; i++) {
  // N을 만드는 조합의 수 
  // = (N - 1)을 만드는 조합의 수 + (N - 2)를 만드는 조합의 수 + (N - 3)을 만드는 조합의 수
  DP[i] = (DP[i - 1] + DP[i - 2] + DP[i - 3]) % MOD;
}

number.forEach((v, i) => {
  console.log(DP[v]);
});
```
