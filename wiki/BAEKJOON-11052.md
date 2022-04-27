---
title   : 백준 11052 JavaScript
date    : 2021-11-23 22:57:50 +0900
updated : 2022-04-27 23:43:17 +0900
aliases : 
tags    :
created: 2022-04-27 21:54:45 +0900
---
## 문제
[백준 11052](https://www.acmicpc.net/problem/11052)

## 풀이
카드의 개수 N을 카드팩(P)의 개수로 조합하는 경우를 따져보면
```
N = 1일 때, P1x1 
N = 2일 때, P2x1 또는 P1x2 
N = 3일 때, P3x1 또는 P2x1+P1x1 또는 P1x2 + P1x1
```
위와 같이 조합이 될 때, N 이 4일 때는 
1.  3개를 만드는 조합에 1개 짜리 카드팩 금액을 추가
2. 2개를 만드는 조합에 2개 짜리 카드팩 금액을 추가
3. 1개를 만드는 조합에 3개 짜리 카드팩 금액을 추가
4. 4개 짜리 카드팩 하나를 구매

위와 같이 총 4가지 경우 중 최댓값을 구하면 된다.   
결국 `n`개의 카드를 구매하는 금액의 최댓값은 
- `n-1`개 구매시 금액 최댓값에 1개 짜리 카드팩 1개
- `n-2`개 구매시 금액 최댓값에 2개 짜리 카드팩 1개
...
- `n-n`개 구매시 금액 최댓값에 `n`개 짜리 카드팩 1개 (-> `n`개 짜리 카드팩 1개 구매와 같음)

위와 같이 반복된다. 특정 개수의 금액 최댓값을 반복해서 계산해야 하므로, [[Dynamic-Programming|메모이제이션]]을 이용해 배열에 저장해둔다. 
반복문은 n-1,...0이 아닌 1~n까지의 순으로 반복되게 했다. 순서는 상관없다. 
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

const N = Number(input[0]);
const prices = input[1].split(" ").map(v => Number(v));
const DP = new Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= i; j++) {
    DP[i] = Math.max(DP[i], DP[i - j] + prices[j - 1]);
  }
}

console.log(DP[N]);
```
