---
title   : 백준 15656 JavaScript 
date    : 2022-04-15 11:39:15 +0900
updated : 2022-04-17 23:44:37 +0900
aliases : 
tags    : 
---
## 문제
[백준 15656](https://www.acmicpc.net/problem/15656)

## 풀이

[[BAEKJOON-15651|백준 15651]] 문제와 유사하다. `N`까지의 숫자를 순회하는 대신 입력된 배열을 순회하는 것으로 변경하면 된다.
`console.log`를 매번 호출하면 시간 초과가 되어서 전역변수 `answer`에 문자열 값을 추가해주는 것으로 변경했다.
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

const dfs = (cnt) => {
  if (cnt === M) {
    for (let i = 0; i < M; i++) {
      answer += `${arr[i]} `
    }
    answer += `\n`
    return
  }

  // 배열의 수를 순회
  for (let i = 1; i <= N; i++) {
      arr[cnt] = num[i-1]
      // 해당 숫자를 뽑은 뒤 재귀 함수를 실행한다. (다음에 뽑을 수를 순회)
      dfs(cnt+1)
  }
}

dfs(0)
console.log(answer)
```
