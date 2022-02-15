---
title   : 백준 3085 JavaScript 
date    : 2022-02-15 10:16:49 +0900
updated : 2022-02-15 10:23:00 +0900
aliases : 
tags    : 
---
## 문제
[백준 3085](https://www.acmicpc.net/problem/3085)

## 풀이
이 문제는 [[Brute-Force-Search-Algorithm|브루트 포스]]로 풀이한다.  
주석에 쓰인 대로 인접한 값이 다른 경우에 각 값을 서로 바꾼 보드를 만든다.  
예를 들어,  
```
CCP
CCP
PPC
```
위 예제에서 1행의 2열 `C`와 `P`는 값이 다르므로 다음과 같이 바꾼다.
```
CPC
CCP
PPC
```
기존의 사탕이 배치된 보드를 순회하면서 보드를 바꾸고, 거기서 같은 색으로 이루어진 가장 긴 연속 부분을 구하고 그 최댓값을 구한다.  
마지막으로 바뀐 경우들 중 최댓값을 구하면 된다.  

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

const N = Number(input[0]);
const candies = []
for (let i = 0; i < N; i++) {
  candies.push(input[i+1].split(''))
}
let max = 0

// 최대 연속 부분(행/열) 길이 구하기 
const getMaxLine = (arr) => {
  let maxCnt = 0

  
  for (let i = 0; i < arr.length; i++){
    let cnt = 1
    let current = arr[i][0]
    // 같은 행에서 연속되는 길이 구하기
    for (let j = 1; j < arr.length; j++) {
      if (arr[i][j] === current) {
        cnt += 1
      } else {
        cnt = 1
      }
      current = arr[i][j]
      maxCnt = Math.max(maxCnt, cnt) // 최댓값 저장
    }
  }

  // 열 최대 연속 확인
  for (let i = 0; i < arr.length; i++) {
    let cnt = 1
    let current = arr[0][i]
    // 같은 열에서 연속되는 길이 구하기
    for (let j = 1; j < arr.length; j++) {
      if (arr[j][i] === current) {
        cnt += 1
      } else {
        cnt = 1
      }

      current = arr[j][i]
      maxCnt = Math.max(maxCnt, cnt) // 최댓값 저장
    }
  }
  return maxCnt
}


for (let i = 0; i < N; i++) {
  // 같은 행에서
  for (let j = 1; j < N; j++) {
    // 다른 열끼리 값 비교 (= 좌우로 인접한 사탕 비교)
    // 인접한 사탕의 색이 다르다면 교체하기
    if (candies[i][j - 1] !== candies[i][j]) {
      let switchedCandies = JSON.parse(JSON.stringify(candies))
      let temp = switchedCandies[i][j - 1]
      switchedCandies[i][j-1] = switchedCandies[i][j]
      switchedCandies[i][j] = temp
      // 교체된 보드에서 가장 긴 연속 부분 구하기
      max = Math.max(max, getMaxLine(switchedCandies))
    }
  }
}

for (let i = 0; i < N; i++) {
  // 같은 열에서 
  for (let j = 1; j < N; j++) {
    // 다른 행끼리 값 비교 (= 상하로 인접한 사탕 비교)
    // 인접한 사탕의 색이 다르다면 교체 
    if (candies[j - 1][i] !== candies[j][i]) {
      let switchedCandies = JSON.parse(JSON.stringify(candies))
      let temp = switchedCandies[j - 1][i]
      switchedCandies[j - 1][i] = switchedCandies[j][i]
      switchedCandies[j][i] = temp
      // 교체된 보드에서 가장 긴 연속 부분 구하기
      max = Math.max(max, getMaxLine(switchedCandies))
    }
  }
}
console.log(max)
```
