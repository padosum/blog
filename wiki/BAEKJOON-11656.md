---
title   : 백준 11656 JavaScript 
date    : 2021-10-31 21:06:15 +0900
updated : 2021-10-31 21:08:37 +0900
aliases : 
tags    : 
---
## 문제
[백준 11656](https://www.acmicpc.net/problem/11656)

## 풀이
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim();
const s = input.split("");
let suffixes = [];

s.forEach((element, idx) => {
  suffixes[idx] = input.substr(idx);
});

suffixes.sort((a, b) => a.localeCompare(b));

console.log(suffixes.join("\n"));
```
문제는 매우 간단하지만 입력값을 받아올 때 `trim()`을 쓰지 않으면 **"출력 형식이 잘못되었습니다"** 오류가 나온다.  
배열을 알파벳으로 정렬하려면 [[JavaScript-객체로-된-배열-정렬하기|localeCompare]]를 사용하면 된다. 



