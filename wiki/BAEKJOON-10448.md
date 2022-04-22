---
title   : 백준 10448 JavaScript 
date    : 2022-04-22 23:48:41 +0900
updated : 2022-04-22 23:49:36 +0900
aliases : ["백준 10448번 유레카 이론"]
tags    : 
---
## 문제
[백준 10448](https://www.acmicpc.net/problem/10448)

## 풀이
```javascript
const readFileSyncPath = require("path")
  .basename(__filename)
  .replace(/js$/, "txt");

// const readFileSyncPath = '/dev/stdin';

const input = require("fs")
  .readFileSync(readFileSyncPath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const T = input[0];
const number = input.slice(1, input.length);

const max = Math.max(...number);

// 최대값에 해당하는 삼각수를 모두 구하기
const eureka = [];
let current = 0;
let n = 1;
while (current < max) {
  const T = (n * (n + 1)) / 2;
  if (T > max) {
    break;
  }
  eureka.push(T);
  n = n + 1;
  current = T;
}

// 정확히 3개의 삼각수의 합으로 표현할 수 있다면 = 1
// 그렇지 않다면 0
// 반복문을 이용해 3개의 숫자 조합을 모두 확인해서
// K와 일치하는 경우 1 출력
const answer = Array.from({ length: T }).fill(0);
for (let i = 0; i < eureka.length; i++) {
  for (let j = 0; j < eureka.length; j++) {
    for (let k = 0; k < eureka.length; k++) {
      for (let l = 0; l < T; l++) {
        if (eureka[i] + eureka[j] + eureka[k] === number[l]) {
          answer[l] = 1;
          break;
        }
      }
    }
  }
}
answer.forEach((val) => console.log(val));
```
