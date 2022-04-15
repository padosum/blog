---
title   : 백준 15654 JavaScript 
date    : 2022-04-15 11:05:51 +0900
updated : 2022-04-15 21:05:18 +0900
aliases : 
tags    : 
---
## 문제
[백준 15654](https://www.acmicpc.net/problem/15654)

## 풀이
[[BAEKJOON-15649|백준 15649]] 의 풀이를 조금 변형하면 된다. N까지의 숫자가 아닌 입력받은 배열의 숫자들을 사용하면 된다. 나머지 조건은 똑같다.
사전순으로 증가시키기 위해 입력받은 배열은 [[Higher-Order-Function|sort]]  메서드로 정렬해준다.

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

// 자연수 N, M
const [N, M] = input[0].split(" ").map(Number)
const num = input[1].split(" ").map(Number).sort((a, b) => a-b)
const visited = Array.from({length: N}).fill(0)
const arr = []

const dfs = (cnt) => {
  let answer = ''
  // 모든 숫자가 visited = true이면 숫자 출력
  if (cnt === M) {
    for (let i = 0; i < M; i++) {
      answer += `${arr[i]} `
    }
    console.log(answer)
  }

  // 각 숫자는 중복 없이 골라지니 visited 배열을 선언해서
  // 해당 숫자를 뽑았는지 유무를 저장해둔다.
  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      visited[i] = 1
      arr[cnt] = num[i-1]
      // 해당 숫자를 뽑은 뒤 재귀 함수를 실행한다. 
      // 해당 숫자를 제외하고 숫자를 뽑게 된다.
      dfs(cnt+1)
      visited[i] = 0
    }
  }
}

dfs(0)
```