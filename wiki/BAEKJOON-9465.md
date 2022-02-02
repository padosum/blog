---
title   : 백준 9465 JavaScript 
date    : 2022-02-02 10:27:43 +0900
updated : 2022-02-02 10:28:33 +0900
aliases : 
tags    : 
---
## 문제
[백준 9465](https://www.acmicpc.net/problem/9465)

## 풀이
최댓값을 구하기 위해 스티커 배열을 순회한다.   
문제 예시에 나와있는 스티커 배열을 확인해보자.    
```
50 10 100 20 40
30 50 70 10 60
```
내가 만약 처음 열에 큰 숫자인 `50`을 선택해서 스티커를 제거했다면, 그 다음 스티커는 어떤걸 제거해야 최댓값을 만들어갈 수 있을까?  
경우의 수는 총 3가지일 것이다.    
1. 아무 스티커도 떼지 않거나
2. 위 줄에 있는 스티커를 떼거나
3. 아래 줄에 있는 스티커를 뗀다.

위 경우의 수를 담을 수 있는 배열을 준비한다.  `N`은 열이다.  
```javascript
DP[N][0] // 스티커를 떼지 않는 경우
DP[N][1] // 위 줄 스티커를 떼는 경우
DP[N][2] // 아래 줄 스티커를 떼는 경우 
```

문제에서 상, 하, 좌, 우의 스티커는 찢어져서 사용할 수 없다고 했으니  
만약 현재 열에서 아무 스티커도 떼지 않는 다면,  이전 열에서는 스티커를 제거하지 않았을 수도 있고, 위 줄의 스티커를 제거했을 수도, 아래 줄에 스티커를 제거했을 수도 있다.
```javascript
DP[N][0] // Math.max(DP[N-1][0], DP[N-1][1], DP[N-1][2])
```
그리고 현재 열에서 위 줄 스티커를 제거한다면,  
이전 열에서는 스티커를 제거하지 않았거나 아래 스티커만 제거되었을 것이다.  
```javascript
DP[N][1] // Math.max(DP[N-1][0], DP[N-1][2]) + 현재 스티커 점수 
```
마찬가지로 현재 열에서 아래 스티커를 제거한다면,  
이전 열에서는 스티커를 제거하지 않았거나 위 스티커만 제거되었을 것이다.  
```javascript
DP[N][1] // Math.max(DP[N-1][0], DP[N-1][1]) + 현재 스티커 점수 
```
위와 같이 스티커 배열을 순회하면 최대 점수가 마지막 배열에 저장이 될 것이다.  

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

const T = Number(input[0]);
input = input.slice(1);

const maxScore = (n, arr1, arr2) => {
  const DP = new Array(n).fill(0).map(() => Array(3).fill(0));

  // 초기값
  DP[0][0] = 0; // 스티커를 떼지 않으면 점수 0
  DP[0][1] = arr1[0]; // 위 줄 1열 스티커 뗀 점수 
  DP[0][2] = arr2[0]; // 아래 줄 1열 스티커 뗀 점수

  // 전체 스티커를 순회한다.
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 3; j++) {
      if (j === 0) {
        // 현재 스티커를 떼지 않은 경우 
        // 이전 열 스티커의 최댓값 
        DP[i][0] = Math.max(DP[i - 1][0], DP[i - 1][1], DP[i - 1][2]);
      } else
        if (j === 1) { // 위 줄 스티커를 떼는 경우 
        // 이전 열 아래 줄 스티커 또는 이전 열에 스티커를 떼지 않은 경우의 합 중 최댓값 
        DP[i][1] = Math.max(DP[i - 1][2], DP[i - 1][0]) + arr1[i]; 
      } else if (j === 2) { // 아래 줄 스티커를 뗀 경우 
        // 이전 열 위 줄 스티커 또는 이전 열에 스티커를 떼지 않은 경우의 합 중 최댓값 
        DP[i][2] = Math.max(DP[i - 1][1], DP[i - 1][0]) + arr2[i];
      }
    }
  }
  return Math.max(...DP[n-1]);
}

for (let i = 0; i < input.length; i=i+3) {
  const N = Number(input[i]); // 열 
  const arr1 = input[i + 1].split(' ').map(Number); // 위 줄
  const arr2 = input[i + 2].split(' ').map(Number); // 아래 줄
  console.log(maxScore(N, arr1, arr2));
}
```

## 생각
스티커를 떼지 않은 경우를 제외해서 더 간단하게 해결할 수 있을 것 같은데 지금 현재 시간을 너무 많이 소비해버렸다. 다음에 머리가 잘 돌아갈 때 다시 확인해보는 것으로...