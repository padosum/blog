---
title   : 백준 15652 JavaScripit 
date    : 2022-04-15 10:46:02 +0900
updated : 2022-04-15 21:05:18 +0900
aliases : 
tags    : 
---
## 문제
[백준 15652](https://www.acmicpc.net/problem/15652)

## 풀이
[[BAEKJOON-15649|백준 15649]], [[BAEKJOON-15650|백준 15650]], [[BAEKJOON-15651|백준 15651]]과 유사하다.
이번엔 중복도 되면서 비내림차순 수열이어야 한다.
첫 순회시에 1부터 순회하고 재귀함수를 벗어나면 그 다음수가 될 수 있도록 1을 더해준다.
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().split(" ");

// 자연수 N, M
const [N, M] = input.map(Number);
const arr = []

const dfs = (at, cnt) => {
  let answer = ''
  // 길이 M까지 순회한 수를 출력
  if (cnt === M) {
    for (let val of arr) {
      answer += `${val} `
    }
    console.log(answer)
    return
  }
  // N까지의 수를 순회
  for (let i = at; i <= N; i++) {
      arr[cnt] = i
      // 다음 수부터 순회
      dfs(at, cnt+1)
      at = at+1 // 이전 값 다음 수를 하기 위해 +1
  }
}

dfs(1, 0)
```