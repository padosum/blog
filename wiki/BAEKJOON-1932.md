---
title   : 백준 1932 JavaScript 
date    : 2022-02-04 11:31:05 +0900
updated : 2022-02-04 11:51:19 +0900
aliases : 
tags    : 
---
## 문제
[백준 1932](https://www.acmicpc.net/problem/1932)

## 풀이

우선 코드로 계산을 하려면 배열이 필요할테니, 예시에 있는 정수 삼각형을 배열에 담아보자.    
![[boj_1932_1.jpg]]
[[BAEKJOON-9465|백준 9465 스티커]] 문제와 비슷하다. 최대가 되는 경로를 구하려면 현재 선택하는 숫자는 이전에 선택한 숫자들의 합 중 최대에다가 그 숫자를 더해야할 것이다.  
이전에 선택한 숫자에는 어떤 것이 올 수 있을까?  
아래 그림을 살펴보자.   
![[boj_1932_2.jpg]]
숫자 삼각형의 각 행의 숫자를 선택할 때 왼쪽 대각선 또는 오른쪽 대각선의 수만 가능하다고 했으니 배열에서는, 
- 각 행의 첫 숫자는 그전에 선택한 숫자가 그전 행의 첫번째 숫자여야 선택할 수 있다.
- 각 행의 마지막 숫자는 그전에 선택한 숫자가 그전 행의 마지막 숫자여야 선택할 수 있다. 
- 나머지 숫자들은 그전에 선택한 숫자가 그전 행의 대각선 좌우에 위치한 숫자여야 선택이 가능하다.  
 
위 조건들은 아래와 같이 조건식으로 나타낼 수 있다.
```javascript
if (열 === 0) {
  최댓값 = DP[행 - 1][열] + 현재 선택한 값;
} else if (열 === N - 1) { 
  최댓값 = DP[행 - 1][열 - 1] + 현재 값;
} else { 
  최댓값 = Math.max(DP[행 - 1][열 - 1], DP[행 - 1][열]) + 현재 값;
}
```
배열 전체를 돌면서 해당 숫자를 선택했을 때 최댓값을 구할 수 있다.  
그리고 나온 값들 중 최댓값을 구하면 경로들의 최댓값이 된다.  

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");
const N = Number(input[0]);
const DP = new Array(N).fill(0).map(() => Array(N).fill(0));

// 배열로 가져오기 
for (let i = 0; i < N; i++) {
  const line = input[i + 1].split(" ").map(Number);
  for (let j = 0; j <= i; j++) {
    DP[i][j] = line[j];
  }
}

// 첫 줄을 제외하고 순회
// 순회시 현재 선택하는 값이 최대가 되려면 
// 그동안 선택한 값이 최대여야 한다.
for (let i = 1; i < N; i++) {
  for (let j = 0; j <= i; j++) {
    let max = 0;
    // 각 행의 첫 열의 숫자는 그전에 선택한 값이
    // 이전 행의 첫 숫자
    if (j === 0) {
      max = DP[i - 1][j];
    } else if (j === N - 1) { // 각 행의 마지막 열의 숫자는 그전에 선택한 값이 이전 행의 마지막 숫자 
      max = DP[i - 1][j - 1];
    } else { // 나머지 숫자들은 그 전에 선택한 값이 이전 행의 전 열 또는 같은 열 숫자이다. 
             // 그 중 큰 값을 선택했어야 최댓값이 된다. 
      max = Math.max(DP[i - 1][j - 1], DP[i - 1][j]);
    }
    DP[i][j] = max + DP[i][j];
  }
}
const answer = Math.max(...DP.map((v, i) => Math.max(...v)));
console.log(answer);
```
