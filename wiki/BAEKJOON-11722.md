---
title   : 백준 11722 JavaScript 
date    : 2022-02-06 09:29:26 +0900
updated : 2022-02-06 09:38:58 +0900
aliases : 
tags    : 
---
## 문제
[백준 11722](https://www.acmicpc.net/problem/11722)

## 풀이 
[[BAEKJOON-11053]]과 거의 같다. 감소하는 수열을 구해야 하므로 내부의 조건문만 변경해주면 된다. 
```css
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map(v => Number(v));
const DP = new Array(N).fill(1);

// 배열 전체 순회
for (let i = 1; i < N; i++) {
  // 이전 숫자들을 순회 
  for (let j = 0; j < i; j++) {
    // 앞에 위치한 숫자보다 작다면 감소하는 수열
    if (A[i] < A[j]) {
      // DP[i]에 인덱스 i까지의 가장 긴 수열 길이가 들어간다. 
      // 이전 인덱스까지의 수열 길이 + 1(이전 인덱스까지 감소하는 수열에 현재 인덱스를 추가한 길이)이
      // 현재 값보다 길다면 넣기
      DP[i] = Math.max(DP[i], DP[j] + 1);
    }
  }
}
console.log(Math.max(...DP));
```
