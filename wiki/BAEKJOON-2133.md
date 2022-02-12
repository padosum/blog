---
title   : 백준 2133 JavaScript 
date    : 2022-02-12 10:15:19 +0900
updated : 2022-02-12 12:15:54 +0900
aliases : 
tags    : 
---
## 문제
[백준 2133](https://www.acmicpc.net/problem/2133)

## 풀이
문제 풀이의 기본 토대는 [[BAEKJOON-11727|백준 11727]]과 비슷하다.  
다만 `3XN`크기의 벽이라는 점 때문에 달라지는 부분이 있다.  
우선 `3XN`을 `2X1`, `1X2` 타일로 채울 때, 가로길이 `N`이 홀수면 벽을 다 채우지 못한다.  
그래서 짝수인 경우를 살펴보도록 한다.  

`N=2`일 때는 다음과 같이 세 가지 모양의 타일로 벽을 채울 수 있다.   `DP[2] = 3`
![[boj_2133_1.jpg]]

`N=4`일 때는 다음과 같이 `DP[2]` 각각의 경우에 다시 `DP[2]` 각각의 경우를 연결할 수 있다. 따라서 `DP[4] = DP[4-2] * 3`이 된다.  
![[boj_2133_2.jpg]]
여기에 더해 문제에 나와있던 힌트를 살펴보면 다음과 같은 모양 2가지도 만들어질 수 있음을 확인할 수 있다.  
![[boj_2133_3.png]]
`DP[4] = DP[4-2] * 3 + 새로운 모양 2가지`  

`N=6`일 때는 우선 벽을 가로 2짜리 타일로 먼저 채우는 경우에는 남는 길이는 `N-2`(4)의 경우에 가로 길이 2를 만드는 경우 3가지를 곱하면 된다.    
![[boj_2133_5.jpg]]
그 다음 벽을 가로 `4`길이로 채우면 남는 자리는 `N-4` 길이다. 이 경우엔 앞서 살펴봤던 `3x4` 모양으로 채울 수 있다.  그러므로 `DP[6-4] * 2`가 된다. 
![[boj_2133_6.jpg]]

그리고 아래와 같이 또 다른 새로운 모양 2개가 추가된다.     
![[boj_2133_3.jpg]]
`DP[6] = DP[6-2] * 3 + DP[6-4] * 2 + 새로운 모양 2가지`

`N=8`일 때는 모양이 이상하지만...다음과 같이 생긴 모양이 2개 추가된다. 
![[boj_2133_4.jpg]]
그리고 앞서 살펴봤던 것처럼 `DP[8] = DP[8-2] * 3 + DP[8-4] * 2 + DP[8-6] * 2 + 새로운 모양 2가지`

결론적으로 `N`이 짝수일 때 새로운 타일이 2개씩 추가된다.  
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const N = Number(require('fs').readFileSync(readFileSyncPath).toString().trim());
const DP = new Array(N+1).fill(0)

DP[0] = 1
DP[2] = 3

for (let i = 4; i <= N; i++) {
  DP[i] = DP[i - 2] * 3
  for (let j = 4; j <= i; j += 2) {
    DP[i] += DP[i-j] * 2
  }
}

console.log(DP[N])
```
