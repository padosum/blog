---
title   : 백준 1912 JavaScript 
date    : 2022-01-26 10:17:25 +0900
updated : 2022-01-26 10:17:53 +0900
aliases : 
tags    : 
---
## 문제
[백준 1912]()

## 풀이
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(v => Number(v));
const DP = arr;

// 주어진 수열을 순회하고
for (let i = 1; i < N; i++) {
  // 이전의 값이 양수이면서, 이전 값과 현재값을 더했을 때 양수라면 
  // (이전 값이 음수이거나 이전 값과 현재값을 더할 때 음수라면, 
  // 현재까지 합에 마이너스가 되므로 최대값이 아니게 됨)
  if (DP[i - 1] > 0 && (DP[i] + DP[i - 1] > 0)) {
    // 이전 값과 현재값의 합을 현재 인덱스에 저장 (현재까지 연속된 합중 가장 큰 경우를 저장하는 것)
    DP[i] = DP[i] + DP[i - 1];
  }

  console.log(DP);
}
console.log(Math.max(...DP));
```
