---
title   : 백준 1700 JavaScript  
date    : 2022-04-22 22:29:52 +0900
updated : 2022-04-22 23:57:05 +0900
aliases : ["백준 1700번 멀티탭 스케줄링"] 
tags    : 
---
## 문제
[백준 1700](https://www.acmicpc.net/problem/1700)

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

const [N, K] = input[0].split(" ").map(Number);
const useList = input[1].split(" ").map(Number);
const plug = Array.from({ length: N }).fill(0);

let cnt = 0;
useList.forEach((item, i) => {
  const emptyPlug = plug.findIndex((p) => p === 0);
  const usedItem = plug.findIndex((p) => p === item);

  // 현재 플러그에 꼽혀있는 경우 (사용중이므로 패스)
  if (usedItem !== -1) {
    return;
  }
  // 빈 플러그가 있다면 사용하기
  if (emptyPlug !== -1) {
    plug[emptyPlug] = item;
  } else {
    let max = Number.MIN_SAFE_INTEGER;
    let next;
    let never = false;
    let neverNext;
    plug.forEach((p, pi) => {
      // 앞으로 사용할 물건 목록에서 플러그에 꽂힌 것이 있는지 확인한다.
      const found = useList.findIndex((u, idx) => {
        return idx > i && u === p;
      });

      // 플러그에 꽂힌 물건을 앞으로 사용하지 않는 경우
      if (found === -1) {
        neverNext = pi;
        never = true;
      }

      // 사용되는 것 중 가장 큰 인덱스(가장 나중에 사용하는 물건)
      if (max < found) {
        max = found;
        next = pi;
      }
    });

    if (never) {
      // 앞으로 사용하지 않는 경우가 있다면 그것으로 교체
      plug[neverNext] = item;
      cnt++;
    } else {
      plug[next] = item;
      cnt++;
    }
  }
});

console.log(cnt);
``` 
