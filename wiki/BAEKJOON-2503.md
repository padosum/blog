---
title   : 백준 2503 JavaScript 
date    : 2022-04-22 23:49:38 +0900
updated : 2022-04-22 23:50:34 +0900
aliases : ["백준 2503번 숫자 야구"] 
tags    : 
---
## 문제
[백준 2503](https://www.acmicpc.net/problem/2503)

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

const N = input[0];

// 1~9 숫자 사용 여부 확인
const used = Array.from({ length: 9 }).fill(false);
let cnt = 0;

const check = (x, y, z) => {
  const curr = [x, y, z];

  for (let i = 0; i < N; i++) {
    const [num, strike, ball] = input[i + 1].split(" ").map(Number);
    let strikeCnt = 0;
    let ballCnt = 0;
    // 가능성 있는 숫자 찾기
    for (let j = 0; j < 3; j++) {
      // 민혁이 말한 숫자와 현재 숫자의 자리와 값이 일치하면 스트라이크 + 1
      if (curr[j] === Number(num.toString().split("")[j])) {
        strikeCnt = strikeCnt + 1;
      } else if (used[Number(num.toString().split("")[j])]) {
        // 자리가 일치하지 않지만 다른 자리에 들어간 숫자라면 ball + 1
        ballCnt = ballCnt + 1;
      }
    }

    // 스트라이크 카운트와 볼 카운트가 일치하지 않으면 가능성 x
    if (strikeCnt !== strike || ballCnt !== ball) {
      return false;
    }
  }
  return true;
};

// 첫 번째 자리수
for (let i = 1; i <= 9; i++) {
  used[i] = true;

  // 두 번째 자리수
  for (let j = 1; j <= 9; j++) {
    if (i === j) {
      // 같은 수라면 넘어감 (서로 다른 세자리 수)
      continue;
    }

    used[j] = true;

    // 세 번째 자리수
    for (let k = 1; k <= 9; k++) {
      if (j === k || i === k) {
        // 2번째 자리수와 마찬가지로 중복되는 수 x
        continue;
      }

      used[k] = true;
      if (check(i, j, k)) {
        // 가능성 있는 수 카운트
        cnt = cnt + 1;
      }
      used[k] = false;
    }
    used[j] = false;
  }
  used[i] = false;
}
console.log(cnt);
``` 
