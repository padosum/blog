---
title   : 백준 15650 JavaScript 
date    : 2022-04-14 10:08:04 +0900
updated : 2022-04-14 21:46:17 +0900
aliases : 
tags    : 
---
## 문제
[백준 15650](https://www.acmicpc.net/problem/15650)

## 풀이

[[BAEKJOON-15649|백준 15649]]와 유사하게 [[DFS]]로 풀면된다.
오름차순으로 수를 뽑아야하는데, 이건 더 작은 수를 뽑지 않도록 인덱스 값을 1씩 증가시키는 방법을 사용한다.

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
  // 시작값은 1씩 증가시킨다, 이전 수(작은 수)를 뽑지 않기 위해 (오름차순 수열을 만들기 위해)
  for (let i = at; i <= N; i++) {
      arr[cnt] = i
      // 다음 수부터 순회
      dfs(i+1, cnt+1)
  }
}

dfs(1, 0)
```
