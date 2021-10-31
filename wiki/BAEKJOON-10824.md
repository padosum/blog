---
title   : 백준 10824 JavaScript 
date    : 2021-10-31 20:38:04 +0900
updated : 2021-10-31 20:39:16 +0900
aliases : 
tags    : 
---
## 문제
[백준 10824](https://www.acmicpc.net/problem/10824)

## 풀이  
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().split(" ");
console.log(parseInt(input[0] + input[1]) + parseInt(input[2] + input[3]));
```
