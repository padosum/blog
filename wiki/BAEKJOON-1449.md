---
title   : 백준 1449 JavaScript 
date    : 2022-04-22 21:49:44 +0900
updated : 2022-04-22 23:54:54 +0900
aliases : ["백준 1449번 수리공 항승"] 
tags    : 
---
## 문제
[백준 1449](https://www.acmicpc.net/problem/1449)

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
  .split("\n");

const [N, L] = input[0].split(" ").map(Number);
const cracks = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let cnt = 0;
let cover = 0;
for (let i = 0; i < cracks.length; i++) {
  if (cracks[i] + 0.5 <= cover) {
  } else {
    cnt = cnt + 1;
    cover = cracks[i] + L;
  }
}

console.log(cnt);
```
