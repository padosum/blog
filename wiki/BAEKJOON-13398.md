---
title   : 백준 13398 JavaScript 
date    : 2022-02-11 09:48:29 +0900
updated : 2022-02-11 09:55:19 +0900
aliases : 
tags    : 
---
## 문제
[백준 13398]()

## 풀이
[[BAEKJOON-1912|백준 1912]]와 비슷하게 연속된 숫자의 합에서 최댓값을 구하는 문제다.  
차이점은 **"수열에서 수를 하나 제거할 수 있다"는 것과 "제거하지 않아도 된다는 것"**  
그렇다면 두 가지 경우로 나눌 수 있다.  
1. 수열에서 수를 제거하지 않는 경우 -> `DP[i][0]`에 저장 
2. 수열에서 수를 제거한 경우 -> `DP[i][1]`에 저장

주어진 임의의 수열을 순회하면서,   
1. 수를 제거하지 않는 경우에는  
- 이전 값이 마이너스가 아니면 이전값과 연속해서 더하고  
- 이전 값이 마이너스라면 연속 합은 멈추고 현재 값을 저장한다.  

2. 수를 제거한 경우에는 
- 현재 값을 제거하거나 
- 이전 값까지 합해서 수가 제거된 적이 있는 경우에는 현재 값을 더하면 된다.  

각각의 경우의 최댓값을 배열 `DP`에 저장한 뒤에  
최종적으로 만들어지는 배열(`DP`)에서 최댓값을 구하면 가장 큰 합이 된다.  
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(v => Number(v));
const DP = new Array(N).fill(0).map(() => Array(2).fill(0))

DP[0][0] = DP[0][1] = arr[0];

for (let i = 1; i < N; i++) {
  // 1) 수를 제거하지 않는 경우 
  // - i-1의 값이 마이너스가 아니면, 연속해서 합하기
  // - 마이너스라면 현재 수부터 연속 합이 새로 시작됨 
  DP[i][0] = Math.max(0, DP[i - 1][0]) + arr[i]

  // 2) 수를 제거한 경우
  // - 현재 값이 제거되는 경우 
  // - 이전 값 까지 합에서 수가 제거된 적이 있는 경우엔 현재 값 더하기 
  DP[i][1] = Math.max(DP[i - 1][0], DP[i - 1][1] + arr[i])
}

const maxArr = DP.map((v, i) => Math.max(DP[i][0], DP[i][1]))
console.log(Math.max(...maxArr))
```
