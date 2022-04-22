---
title   : 백준 11000 JavaScript 
date    : 2022-04-22 22:29:00 +0900
updated : 2022-04-22 23:56:51 +0900
aliases : ["백준 11000번 강의실 배정"] 
tags    : 
---
## 문제
[백준 11000](https://www.acmicpc.net/problem/11000)

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

// s시작 ~ t끝, N개의 수업
// 최소의 강의실로 모든 수업 가능하게 해야 한다.

const N = Number(input[0]);
let lectures = [];
for (let i = 1; i <= N; i++) {
  lectures.push(input[i].split(" ").map(Number));
}

const schedules = [];
// 시간대별로 배열에 입력
lectures.forEach((lecture) => {
  schedules.push({ time: lecture[0], start: 1 });
  schedules.push({ time: lecture[1], start: -1 });
});
schedules.sort((a, b) =>
  a.time === b.time ? a.start - b.start : a.time - b.time
);
let cnt = 0;
let answer = 0;
schedules.forEach((schedule) => {
  // 한 강의가 시작되면
  if (schedule.start === 1) {
    cnt++; // 강의실 사용
  } else if (schedule.start === -1) {
    // 한 강의가 종료되면
    cnt--;
  }

  // 최대로 사용되는 강의실 수 확인
  answer = Math.max(answer, cnt);
});
console.log(answer);
// 참고 : https://junghyeonsu.tistory.com/275
// 그리디
// 우선순위 큐
``` 
