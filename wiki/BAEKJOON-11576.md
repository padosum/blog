---
title   : 백준 11576 JavaScript 
date    : 2021-11-18 15:13:49 +0900
updated : 2021-11-19 08:03:18 +0900
aliases : 
tags    : 
---
## 문제
[백준 11576](https://www.acmicpc.net/problem/11576)

## 풀이
A진법 수를 10진법으로 변경하고 그 10진법 수를 다시 B진법으로 변경하는 방식으로 풀었다.  
[[BAEKJOON-2745|백준 2745]]와 [[BAEKJOON-11005|백준 11005]]에서 한 풀이를 적절히 사용하면 된다.  

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncPath).toString().split('\n');

let A = parseInt(input[0].split(' ')[0]);
let B = parseInt(input[0].split(' ')[1]);

// A진법 수를 10진법으로 변경 
let aNum = input[2].split(' ');
aNum = aNum.map(v => parseInt(v));
aNum = aNum.reverse();

let decimal = 0;
aNum.forEach((v, i) => {
  decimal += (v * (A ** i));
});

// 10진법을 B진법으로 변경
let result = [];
while (decimal > 0) {
  result.push(decimal % B);
  decimal = parseInt(decimal / B);
}
console.log(result.reverse().join(' '));
```
