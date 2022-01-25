---
title   : 백준 14002 JavaScript 
date    : 2022-01-25 22:17:51 +0900
updated : 2022-01-25 22:18:53 +0900
aliases : 
tags    : 
---
## 문제
[백준 14002](https://www.acmicpc.net/problem/14002)

## 풀이
이 문제는 [[BAEKJOON-11053|백준 11053]]과 유사하다. 
나와있는 예시로 [[BAEKJOON-11053|백준 11053]]을 풀면 다음과 같은 결과의 배열이 나올 것이다.
![[boj_14002_1.jpg]]
만들어진 `DP`  배열을 이용해 역추적하면 해당 수열을 찾을 수 있다. 
예시를 살펴보면,  
최대 길이 `4`를 가진 인덱스는 `5`이다. [[BAEKJOON-11053|백준 11053]] 풀이에 따르면 해당 인덱스에 들어가 있는 값이 길이가 4인 수열의 마지막 값이다. (`A[5]`) 최대 길이 4는 최대 길이 3인 수열에 1을 더한 것이니, `DP`의 값이 `3`인 인덱스를 찾고 그 인덱스에 해당하는 값이 수열의 마지막 값 바로 이전 값이 된다.  
따라서 최대 길이 값을 줄여가면서 해당 인덱스와 일치하는 배열의 숫자를 새로운 배열에 담는다. 그리고 담긴 순서를 역순시키면 최대길이의 증가하는 수열이 나오게 된다.   

풀이 과정을 다음과 같이 확인해볼 수 있다.
![[boj_14002_2.jpg]]
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().split("\n");
const N = Number(input.splice(0, 1));
const A = input[0].split(" ").map(Number);
const DP = new Array(N).fill(1);

for (let i = 0; i < N; i++) {
  let currVal = A[i];      // 현재 값
  for (j = 0; j < i; j++) {
    if (currVal > A[j]) {  // 현재 값이 순회하는 값보다 크면
      DP[i] = Math.max(DP[i], DP[j] + 1);
    }
  }
}

let max = Math.max(...DP);
let sequence = [];
for (let i = N - 1; i >= 0; i--) {
  if (DP[i] === max) {
    sequence.push(A[i]);
    max--;
  }
}

console.log(Math.max(...DP)); // 최대 길이
console.log(sequence.reverse().join(' ')); // 수열
```
