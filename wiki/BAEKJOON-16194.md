---
title   : 백준 16194 JavaScript 
date    : 2021-11-25 20:38:58 +0900
updated : 2021-11-25 20:44:23 +0900
aliases : 
tags    : 
---
## 문제
[백준 16194](https://www.acmicpc.net/problem/16194)

## 풀이
약간 수정했다. 돈을 최소로 지불해야하기 때문에 배열에서 `Math.min`으로 최솟값을 가져오고 그렇게 되면 배열의 초기값은 0으로 초기화한 상태이기 때문에 항상 0이 나올 수 밖에 없다.  
해당 카드 갯수 `for`문을 돌 때 숫자 갯수와 같은 카드팩의 금액을 넣어준 뒤 이중 `for`문 중 내부에 있는 `for`문의 횟수를 하나 줄였다. 마지막 값이 결국 처음에 넣어준 값이기 때문이다. 

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

const N = Number(input[0]);
const prices = input[1].split(" ").map(v => Number(v));
const DP = new Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  DP[i] = prices[i - 1];
  for (let j = 1; j < i; j++) {
    DP[i] = Math.min(DP[i], DP[i - j] + prices[j - 1]);
  }
}

console.log(DP[N]);
```
