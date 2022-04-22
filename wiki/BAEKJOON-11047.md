---
title   : 백준 11047 JavaScript  
date    : 2022-04-22 21:52:28 +0900
updated : 2022-04-22 23:56:07 +0900
aliases : ["백준 11047번 동전 0"] 
tags    : 
---
## 문제
[백준 11047](https://www.acmicpc.net/problem/11047)

## 풀이
```javascript
const readFileSyncPath = require("path")
  .basename(__filename)
  .replace(/js$/, "txt");

// const readFileSyncPath = '/dev/stdin';

const input = require("fs")
  .readFileSync(readFileSyncPath)
  .toString()
  .trim()
  .split("\n");

// 동전 N 종류로 합 K 만들기
// 필요한 동전 개수의 최솟값
// 최소개수라면 그리디..?
// 합 K보다 작은 단위 중 제일 큰 값으로 나눠 갯수를 구하고
// 남은 돈은 그 남은 돈보다 작은 단위 중 제일 큰 값으로 나누는 것을 반복

const [N, K] = input[0].split(" ").map(Number);
let cnt = 0;
let remain = K;
for (let i = N; i >= 1; i--) {
  const coin = Number(input[i]);

  if (coin <= remain) {
    cnt = cnt + parseInt(remain / coin);
    remain = remain % coin;
  }
}

console.log(cnt);
```
