---
title   : 백준 2212 JavaScript 
date    : 2022-04-22 23:20:41 +0900
updated : 2022-04-22 23:57:19 +0900
aliases : ["백준 2212번 센서"] 
tags    : 
---
## 문제
[백준 2212](https://www.acmicpc.net/problem/2212)

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

// N개의 센서
// 센서들이 수집한 자료를 분석할 최대 K개의 집중국
const N = Number(input[0]);
const K = Number(input[1]);

// 센서가 적어도 하나의 집중국과 통신이 가능해야함
// 집중국의 수신 가능 영역 => 고속도로 상 연결된 구간
// 각 집중국의 수신 가능 영역의 길이의 합 최소화 => 구해야할 것!

const sensors = input[2].split(" ").map(Number);
sensors.sort((a, b) => a - b);

// 각 센서 사이의 거리 구하기 (집중국이 수신해야할 영역)
const diff = [];
for (let i = 1; i < N; i++) {
  diff.push(sensors[i] - sensors[i - 1]);
}

// 센서 사이 거리가 먼 경우 그 사이는 집중국이 수신하지 않는 것이
// 영역 길이를 최소화할 수 있다.
// 따라서 집중국 개수보다 -1개 작은 만큼 수신하지 않을 수 있음
// 각 센서 사이 거리 배열을 오름차순으로 정렬해서
// 집중국 개수(K) - 1까지의 거리를 합하면 최소 길이가 된다.
// 오름차순이기 때문에 마지막 거리는 가장 긴 거리이고, 그 부분을 수신하지 않으면 된다.
// 따라서 나머지 부분의 합은 집중국이 수신하는 영역의 길이 합 최소값이다.
diff.sort((a, b) => a - b);
let minLen = 0;
for (let i = 0; i < diff.length - (K - 1); i++) {
  minLen += diff[i];
}
console.log(minLen);

// https://velog.io/@jkh9615/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%B0%B1%EC%A4%80-11000-%EA%B0%95%EC%9D%98%EC%8B%A4-%EB%B0%B0%EC%A0%95-Java-wskzqzk6
```
