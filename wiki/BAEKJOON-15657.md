---
title   : 백준 15657 JavaScript 
date    : 2022-04-15 11:54:51 +0900
updated : 2022-04-15 21:05:18 +0900
aliases : 
tags    : 
---
## 문제
[백준 15657](https://www.acmicpc.net/problem/15657)

## 풀이
[[BAEKJOON-15652|백준 15652]] 문제와 유사하다. `N` 까지 숫자를 순회하는 대신 입력된 배열을 순회하는 것으로 변경해 푼다.

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

// 자연수 N, M
const [N, M] = input[0].split(" ").map(Number)
// 입력받은 배열을 오름차순으로 정렬
const num = input[1].split(" ").map(Number).sort((a, b) => a-b)

const arr = []

let answer = ''

const dfs = (at, cnt) => {
  if (cnt === M) {
    for (let i = 0; i < M; i++) {
      answer += `${arr[i]} `
    }
    answer += `\n`
    return
  }

  // 배열의 수를 순회
  for (let i = at; i <= N; i++) {
      arr[cnt] = num[i-1]
      // 해당 숫자를 뽑은 뒤 재귀 함수를 실행한다. (다음에 뽑을 수를 순회)
      dfs(at, cnt+1)
      at = at + 1 // 다음 수부터 뽑기 위해 1 증가
  }
}

dfs(1, 0)
console.log(answer)
```
