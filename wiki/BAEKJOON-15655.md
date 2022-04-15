---
title   : 백준 15655 JavaScript 
date    : 2022-04-15 11:22:56 +0900
updated : 2022-04-15 21:05:10 +0900
aliases : 
tags    : 
---
## 문제
[백준 15655](https://www.acmicpc.net/problem/15655)

## 풀이
[[BAEKJOON-15650|백준 15650]] 문제와 유사하다. 다른점은 `N`까지의 숫자를 사용하는 것이 아닌 입력받은 배열에서 숫자를 뽑는다는 것이다. `N`까지의 숫자를 사용하는 것처럼 하기 위해 입력받은 배열을 오름차순으로 미리 정렬해두고 시작한다. 
수열이 오름차순이어야 하기 때문에 재귀함수에 1을 증가한 값을 넘긴다. 다음 재귀함수에서 현재 인덱스가 아닌 1증가한 인덱스 (다음 숫자 값)을 사용해야하기 때문이다.
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

// 자연수 N, M
const [N, M] = input[0].split(" ").map(Number)
// 입력받은 배열을 오름차순으로 정렬
const num = input[1].split(" ").map(Number).sort((a, b) => a-b)

const arr = []

const dfs = (at, cnt) => {
  let answer = ''
  if (cnt === M) {
    for (let i = 0; i < M; i++) {
      answer += `${arr[i]} `
    }
    console.log(answer)
  }

  // 배열의 수를 순회
  // 시작 인덱스를 1씩 증가시킨다, 이전 수(작은 수)를 뽑지 않기 위해
  for (let i = at; i <= N; i++) {
      arr[cnt] = num[i-1]
      // 해당 숫자를 뽑은 뒤 재귀 함수를 실행한다. (다음 수를 순회)
      dfs(i+1, cnt+1)
  }
}

dfs(1, 0)
```
