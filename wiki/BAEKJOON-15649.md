---
title   : 백준 15649 JavaScript 
date    : 2022-04-13 09:57:41 +0900
updated : 2022-04-13 17:20:08 +0900
aliases : 
tags    : 
---
## 문제
[백준 15649](https://www.acmicpc.net/problem/15649)

## 풀이

[[DFS]]를 이용해서 푼다.
길이 N의 `visited` 배열을 만들고, 숫자를 골랐을 때 해당 인덱스에 `true`를 넣는다. `visited` 배열의 전체 길이가 `M`과 같은 경우에 수열을 출력한다.

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split(" ");

// 자연수 N, M
const [N, M] = input.map(Number)

const visited = Array.from({length: N}, (v, i) => 0);
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
      arr[cnt] = i
      // 해당 숫자를 뽑은 뒤 재귀 함수를 실행한다. 
      // 해당 숫자를 제외하고 숫자를 뽑게 된다.
      dfs(cnt+1)
      visited[i] = 0
    }
  }
}
dfs(0)
```
