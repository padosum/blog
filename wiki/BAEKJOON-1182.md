---
title   : 백준 1182 JavaScript 
date    : 2022-04-22 23:51:48 +0900
updated : 2022-04-22 23:53:11 +0900
aliases : ["백준 1182번 부분수열의 합"] 
tags    : 
---
## 문제
[백준 1182](https://www.acmicpc.net/problem/1182)

## 풀이
[[DFS]]
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

const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let cnt = 0;

const dfs = (idx, sum) => {
  if (idx >= N) {
    return;
  }

  sum = sum + arr[idx];

  if (sum === S) {
    cnt = cnt + 1;
  }

  dfs(idx + 1, sum); //현재 값을 포함한 부분 수열
  dfs(idx + 1, sum - arr[idx]); // 현재 값을 포함하지 않은 부분 수열
};

dfs(0, 0);
console.log(cnt);
``` 
