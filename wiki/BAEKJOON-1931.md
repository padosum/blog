---
title   : 백준 1931 JavaScript 
date    : 2022-04-22 22:27:50 +0900
updated : 2022-04-22 23:56:39 +0900
aliases : ["백준 1931번 회의실 배정"] 
tags    : 
---
## 문제
[백준 1931](https://www.acmicpc.net/problem/1931)

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

// 1개의 회의실에 대한
// N개의 회의에 대해 회의실 사용표 만들기
// 각 회의 I, 시작 시간, 종료시간이 주어짐
// 겹치지 않게 하면서 사용할 수 있는 최대 회의 개수 찾기
// 회의는 중단 못한다.
// 한 회의 끝과 동시에 다음 회의 시작 가능
// 회의 시작시간과 끝나는 시간이 같을 수 있음

// 빨리 끝나는 회의를 여러개?
// 회의가 빨리끝나는 순서대로 정렬해서 이전 회의랑 같거나 뒷 시간에 하는 회의수를 카운트

const N = Number(input[0]);
let meetings = [];
for (let i = 1; i <= N; i++) {
  meetings.push(input[i].split(" ").map(Number));
}

// 회의가 끝나는 시간순으로 정렬,
// 만약 끝나는 시간이 같다면 시작이 더 빠른 순으로 정렬
meetings = meetings.sort((a, b) => {
  if (a[1] === b[1]) {
    return a[0] - b[0];
  } else {
    return a[1] - b[1];
  }
});

let prev = 0;
let cnt = 0;
meetings.forEach((meet) => {
  if (meet[0] >= prev) {
    // 이전 회의시간이 끝난경우
    cnt++; // 회의시작
    prev = meet[1];
  }
});
console.log(cnt);
``` 
