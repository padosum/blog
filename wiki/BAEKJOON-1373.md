---
title   : 백준 1373 JavaScript 
date    : 2021-11-04 22:47:59 +0900
updated : 2021-11-04 22:49:17 +0900
aliases : 
tags    : 
---
## 문제
[백준 1373](https://www.acmicpc.net/problem/1373)

## 풀이
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncPath).toString().trim();
input = input.split("").map(v => Number(v)).reverse();
let result = '';
let sum = 0;
let factor = 0;
input.forEach(v => {
  if (factor === 3) {
    result += sum.toString();
    sum = 0;
    factor = 0;
  }
  sum += Number(v * (2 ** factor));
  factor++;
});
result += sum;

console.log(result.split("").reverse().join(""));
```
