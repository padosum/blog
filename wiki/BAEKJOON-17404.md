---
title   : 백준 17404 JavaScript 
date    : 2022-02-13 09:20:59 +0900
updated : 2022-02-13 13:30:38 +0900
aliases : 
tags    : 
---
## 문제
[백준 17404](https://www.acmicpc.net/problem/17404)


## 풀이
[[BAEKJOON-1149|백준 1149]] 문제와 비슷한데 규칙이 하나 다르다.  
바로 마지막 집의 색상이 첫 번째 집의 색상과 달라야 한다는 것이다.   

따라서 첫 번째 집이 어떤 색일 때 2번째 집부터 `N` 번째 집까지의 최소 비용을 구해놓고,  
첫 번째 집의 색상과 다른 경우 중 최솟값을 구한다. 
 
 첫 번째 집이 빨강, 초록, 파랑일 때 각각의 경우의 최종적인 최솟값을 구하면 된다.  
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt')
// const readFileSyncPath = '/dev/stdin'
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n")

const N = Number(input[0])
const DP = new Array(N).fill(0).map(() => Array(3).fill(0))
let cost = []
let answer = Number.MAX_SAFE_INTEGER
for (let i = 1; i <= N; i++) {
  cost.push(input[i].split(" ").map(Number))
}

// 집 색상 반복 0: red, 1: green, 2: blue
for (let i = 0; i <= 2; i++) {
  for (let j = 0; j <= 2; j++) {
    // 현재 색상을 첫 번째 집 색상으로 고정하기위해
    // 나머지 색상을 큰 값으로 설정해두기 
    if (i === j) {
      DP[0][j] = cost[0][j] 
    } else {
      DP[0][j] = Number.MAX_SAFE_INTEGER
    }
  }

  // 2번째 집부터 첫 번째 색상이 고정되었을 때 값 구하기
  for (let j = 1; j < N; j++) {
    DP[j][0] = Math.min(DP[j - 1][1], DP[j - 1][2]) + cost[j][0]
    DP[j][1] = Math.min(DP[j - 1][0], DP[j - 1][2]) + cost[j][1]
    DP[j][2] = Math.min(DP[j - 1][0], DP[j - 1][1]) + cost[j][2]
  }

  // 마지막 집 비용 색상별로 확인 
  for (let j = 0; j <= 2; j++) {
    if (i === j) continue  // 첫 번째로 고정한 색상과 같은 경우는 건너뛴다.
    answer = Math.min(answer, DP[N-1][j]) // 최솟값을 저장하기
  }
}
console.log(answer)
```
