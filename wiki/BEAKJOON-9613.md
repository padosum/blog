---
title   : 백준 9613 JavaScript 
date    : 2021-11-04 21:39:21 +0900
updated : 2021-11-04 21:40:02 +0900
aliases : 
tags    : 
---
## 문제
[백준 9613](https://www.acmicpc.net/problem/9613)

## 풀이
[[BAEKJOON-2609]] 문제처럼 유클리드 호제법으로 각 행의 모든 조합의 최대공약수를 구해서 더해준다.  
처음에 문제를 잘못 읽어서 첫번째 값이 테스트 케이스의 수인지 모르고 포함했었다. 며칠 전에 어떤 분이 코테 팁으로 문제를 여러 번, 잘~ 읽어야한다고 말해주신 내용이 기억난다. 
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");
let testCase = input[0];

for (let i = 0; i < testCase; i++) {
  let numbers = input[i + 1].split(" ").map(v => Number(v));

  let numCnt = numbers[0];

  let sum = 0;
  for (let i = 1; i < numCnt; i++) {
    for (let j = i + 1; j <= numCnt; j++) {
      sum += getGCD(numbers[i], numbers[j]);
    }
  }
  console.log(sum);
}

// 최대공약수 구하기
function getGCD(a, b) {
  while (b > 0) {
    let tmp = a;
    a = b;
    b = tmp % b;
  }
  return a;
}
```