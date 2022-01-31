---
title   : 백준 1149 JavaScript 
date    : 2022-01-30 09:49:17 +0900
updated : 2022-01-30 10:01:37 +0900
aliases : 
tags    : 
---
## 문제
[백준 1149](https://www.acmicpc.net/problem/1149)

## 풀이
주어진 조건에 따르면 `N`번째 집의 색상이 바로 전 집의 색상과 달라야 한다.  
따라서 각 집을 순회하면서 만약 현재 집이 `R`(빨강)이라면 전 집은 `G`(초록)이거나 `B`(파랑)일 것이다. 둘 중의 최소인 값을 구해놓고 배열에 집어넣는다. (비용의 합을 구해서 그 중 최소를 구해야하기 때문) 그 다음 `G`(초록)이면 `R`(빨강) 이거나 `B`(파랑).....  
이런식으로 계속 배열을 순회하면 마지막 배열(여기선 `cost[N-1]`)엔 마지막 집 색상이 `R`, `G`, `B`일 때 각각의 총 비용이 들어가 있다. 거기서 최솟값을 출력하면 된다.  

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

const N = Number(input[0]);
const cost = [];
for (let i = 1; i <= N; i++) {
  cost.push(input[i].split(" ").map(Number));
}

// 각 순서 집의 RGB 값을 순회
for (let i = 1; i < N; i++) {
  for (let j = 0; j < 3; j++) {
    const currVal = cost[i][j]; // 현재 값이 R, G, B중 하나
    if (j === 0) { // 현재 집이 R이라면, 
      // 바로 전 집은 G이거나 B, 더해서 둘 중 최솟값으로 변경 
      cost[i][j] = Math.min(cost[i - 1][1] + currVal, cost[i - 1][2] + currVal);
    } else if (j === 1) { // 현재 집이 G라면 
      // 바로 전 집은 R이거나 B, 더해서 둘 중 최솟값으로 변경 
      cost[i][j] = Math.min(cost[i - 1][0] + currVal, cost[i - 1][2] + currVal);
    } else { // 현재 집이 B라면 
      // 바로 전 집은 R이거나 G, 더해서 둘 중 최솟값으로 변경 
      cost[i][j] = Math.min(cost[i - 1][0] + currVal, cost[i - 1][1] + currVal);
    }
  }
}

// 총비용은 마지막 배열 행 중 최솟값 (계속 더해왔으므로)
console.log(Math.min(...cost[N - 1]));
```
