---
title   : 백준 15651 JavaScript 
date    : 2022-04-15 08:22:02 +0900
updated : 2022-04-15 21:05:28 +0900
aliases : 
tags    : 
---
## 문제
[백준 15651](https://www.acmicpc.net/problem/15651)

## 풀이

[[BAEKJOON-15649|백준 15649]], [[BAEKJOON-15650|백준 15650]] 과 유사하다. 이 문제는 중복된 숫자도 허용하기 때문에 중복을 확인하지 않고 순회를 하면서 다음 숫자도 재귀함수를 통해 순회한다.
`console.log`를 매번 호출하면 시간초과가 되어서 전역 변수 `answer`에 문자열을 추가하는 식으로 했다.
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().split(" ");

// 자연수 N, M
const [N, M] = input.map(Number);
const arr = []
let answer = ''

const dfs = (cnt) => {
  // 길이 M까지 순회한 수를 출력
  if (cnt === M) {
    for (let val of arr) {
      answer += `${val} `
    }
    answer += `\n`
    return
  }

  // N까지의 수를 순회 (ex, N=3 -> 1, 2, 3)
  for (let i = 1; i <= N; i++) {
      arr[cnt] = i
      // 다음 수부터 순회
      dfs(cnt+1)
  }
}

dfs(0)
console.log(answer)
```
