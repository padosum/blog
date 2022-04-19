---
title   : 백준 15657 JavaScript 
date    : 2022-04-15 11:54:51 +0900
updated : 2022-04-19 23:42:46 +0900
aliases : 
tags    : 
---
## 문제
[백준 15657](https://www.acmicpc.net/problem/15657)

## 풀이
[[BAEKJOON-15652|백준 15652]] 문제와 유사하다. `N` 까지 숫자를 순회하는 대신 입력된 배열을 순회하는 것으로 변경해 푼다.

예제 입력 2를 살펴보자.
```
4 2
9 8 7 1
```

조건에 같은 수를 여러 번 골라도 된다고 했고 총 `2` 개 수를 선택하니까 첫 번째 수를 선택한 다음 배열에서 두 번째 수를 고를 땐 전체 수를 대상으로 하면 된다.
```
1을 먼저 고르면,
1, 1
1, 7
1, 8
1, 9
위와 같은 조합으로 고를 수 있다.
```

숫자 하나를 골랐을 때 숫자 전체를 다 탐색하니 [[DFS]]를 이용해 풀면 된다. 대신 M까지의 숫자만 출력 후 리턴해준다.
그리고 조건에 고른 수열은 "비내림차순(오름차순)이어야 한다"고 했으므로 처음에 입력받은 배열을 `sort` 메서드를 이용해 오름차순으로 정렬해준다.

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
  if (cnt === M) { // 뽑는 수 개수와 일치하면 출력
    for (let i = 0; i < M; i++) {
      answer += `${arr[i]} `
    }
    answer += `\n`
    return
  }

  // 배열의 수를 순회
  for (let i = at; i <= N; i++) {
      arr[cnt] = num[i-1]
      // 해당 숫자를 뽑은 뒤 재귀 함수를 실행한다. (다음에 뽑을 수를 순회 = 전체 수)
      dfs(at, cnt+1)
      at = at + 1 // 다음 수부터 뽑기 위해 1 증가
  }
}

dfs(1, 0)
console.log(answer)
```
