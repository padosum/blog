---
title   : 백준 11054 JavaScript
date    : 2022-02-10 12:55:26 +0900
updated : 2022-02-10 13:07:54 +0900
aliases : 
tags    : 
---
## 문제
[백준 11054](https://www.acmicpc.net/problem/11054)

## 풀이
[[BAEKJOON-11053|백준 11053]], [[BAEKJOON-11722|백준 11722]]와 비슷하게 풀어가면 된다.    
두 문제는 `DP`라는 배열에 인덱스에 해당하는 수까지 증가하거나 감소하는 수열의 길이를 넣는다.

여기서 바이토닉 부분 수열을 구하려면 아래 그림을 살펴보자.  
인덱스 7의 값 5를 기준으로 해당 인덱스까지 증가하는 수열의 길이를 구할 수 있을 것이고 주어진 배열을 거꾸로 순회해서 증가하는 수열을 구할 수 있을 것이다.  그럼 바이토닉 부분 수열이 된다. 이 값들 중 최댓값을 구하면 된다.  
![[boj_11054.jpg]]

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(v => Number(v));
const DP = new Array(N + 1).fill(1);
const R_DP = new Array(N + 1).fill(1);

// 증가하는 수열 
for (let i = 1; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j]) {
      DP[i] = Math.max(DP[i], DP[j] + 1);
    }
  }
}

// 뒤에서부터 해당 인덱스 까지 증가하는 수열 구하기
for (let i = N; i >= 0; i--) {
  for (let j = N - 1; j > i; j--) {
    if (arr[i] > arr[j]) {
      R_DP[i] = Math.max(R_DP[i], R_DP[j] + 1);
    }
  }
}

// 해당 인덱스까지 증가하다가 인덱스 이후로 감소하는 수열의 길이
const bitonic = DP.map((v, i) => DP[i] + R_DP[i] - 1);
console.log(Math.max(...bitonic)); // 가장 긴 수열의 길이 
```
