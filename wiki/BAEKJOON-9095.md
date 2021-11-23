---
title   : 백준 9095 JavaScript 
date    : 2021-11-22 15:08:09 +0900
updated : 2021-11-22 15:08:24 +0900
aliases : 
tags    : 
---
## 문제
[백준 9095](https://www.acmicpc.net/problem/9095)

## 풀이
어떻게 푸는지 감이 잡히지 않아서 다른 사람들이 푼 풀이를 참고했다.   
1, 2, 3을 합해서 숫자를 만드는 조합들을 살펴보면 규칙이 있다.  
```
1 // 1
2 // 1+1, 2
3 // 1+1+1, 1+2, 2+1, 3
4 // [1+3] 1+3
  // [2+2] 1+1+2, 2+2
  // [3+1] 1+1+1+1, 1+2+1, 2+1+1, 3+1
  
5 // [1+4] 1의 경우의 수 + 4 (1, 2, 3의 조합이므로 제외)
  // [2+3] 2의 경우의 수 + 3 
  // [3+2] 3의 경우의 수 + 2 
  // [4+1] 4의 경우의 수 + 1
```
숫자 5를 예로 들면, 1과 4의 조합, 2와 3의 조합, 3과 2의 조합, 4와 1의 조합으로 나타낼 수 있는데 여기서 1+4는 1이 만들어지는 조합의 경우의 수에 각각 4를 더하는 것이다. 하지만 문제는 1, 2, 3의 합으로만 나타내야 하기 때문에 제외해야 한다. 그래서 다음과 같은 식이 나오게 된다.  
`방법의 수(A(n)) =  A(n-1) + A(n-2) + A(n-3)`
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().split("\n");
const T = Number(input[0]);
const num = [];
for (let i = 1; i <= T; i++) {
  num.push(Number(input[i]));
}
const maxNum = Math.max(...num);
const DP = new Array(maxNum + 1).fill(0);

DP[1] = 1;
DP[2] = 2;
DP[3] = 4;

for (let i = 4; i <= maxNum; i++) {
  DP[i] = DP[i - 1] + DP[i - 2] + DP[i - 3];
}

num.forEach(v => {
  console.log(DP[v]);
})
```