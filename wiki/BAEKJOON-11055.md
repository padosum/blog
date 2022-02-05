---
title   : 백준 11055 JavaScript 
date    : 2022-02-05 10:40:24 +0900
updated : 2022-02-05 10:41:30 +0900
aliases : 
tags    : 
---
## 문제 
[백준 11055](https://www.acmicpc.net/problem/11055)

## 풀이
[[BAEKJOON-11053|백준 11053]]과 유사하다. 해당 문제가 길이를 구하는 것이었다면 이 문제는 값만 더해주면 된다.  

예시로 나온 수열은 다음과 같다.  
```
1 100 2 50 60 3 5 6 7 8
```

1. 처음 값 `1`은 비교대상이 없으니 그대로 넣어두고 
2. `100`까지 증가하는 수열의 합은 `100` 전에 있는 `1`과의 합 `101`이다.  
3. `2`까지 증가하는 수열의 합은 `1`과의 합 `3`이다. 
4. `50`까지 증가하는 수열의 합은 `1+2+50`
....
위와 같은 식으로 배열을 순회하며 각 인덱스까지의 증가하는 수열의 합을 `DP`라는 별도의 배열에 넣어준다.  
그 후에 배열에 들어가 있는 수열의 합 값 중 최댓값을 구하면 된다.  

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map(v => Number(v));
const DP = new Array(N).fill(0);

DP[0] = A[0];

// 수열의 각 숫자를 순회
for (let i = 1; i < N; i++) {
  // 자신보다 앞에 있는 숫자 중, 
  for (let j = 0; j < i; j++) {
    // 자신보다 작은 수가 있다면
    if (A[i] > A[j]) {
      DP[i] = Math.max(DP[i], DP[j]);
    }
  }
  // 자신과 더하기 
  // 그럼 배열의 각 값은 각 인덱스까지 증가하는 수열의 합이 된다.
  DP[i] += A[i];
}

// 증가하는 부분 수열의 최댓값 
console.log(Math.max(...DP));
```

