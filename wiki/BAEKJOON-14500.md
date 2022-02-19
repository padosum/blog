---
title   : 백준 14500 JavaScript 
date    : 2022-02-19 14:47:02 +0900
updated : 2022-02-19 14:47:27 +0900
aliases : 
tags    : 
---
## 문제
[백준 14500](https://www.acmicpc.net/problem/14500)


##  풀이
[[Brute-Force-Search-Algorithm|완전 탐색]] 알고리즘으로 풀었다. 크기 NxM 종이에 해당하는 배열을 순회하면서 테트로미노 각각 만들어지는 경우에 합들 중 최댓값을 구했다.  
이게 경우의 수가 상당하고, 조건문 하나라도 삐끗하면 답을 찾기 힘들다. 내가 그런 경우였다. 그래서 이런식으로 푸는건 시간이 너무 많이 걸리는 것 같다. 검색해보니 [[DFS]]를 사용하는 방법이 있다고 하는데... 추후에 학습해봐야겠다. 
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt')
// const readFileSyncPath = '/dev/stdin'
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n")

const [N, M] = input[0].split(" ").map(Number)
const paper = []

for (let i = 0; i < N; i++) {
  paper[i] = input[i+1].split(" ").map(Number)
}

let sum = 0
// 전체 값을 시작점으로 순회하기
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {

    // 첫 번째 모양, 막대모양
    // 가로막대
    // * * * *
    if (j + 3 < M) {
      sum = Math.max(sum, paper[i][j] + paper[i][j + 1] + paper[i][j + 2] + paper[i][j + 3])  
    }
    // 세로 막대 
    // *
    // *
    // *
    // *
    if (i + 3 < N) {
      sum = Math.max(sum, paper[i][j] + paper[i + 1][j] + paper[i + 2][j] + paper[i + 3][j])
    }

    // 두 번째 모양, 정사각형 모양 
    // * *
    // * *
    if (i + 1 < N && j + 1 < M) {
      sum = Math.max(sum, paper[i][j] + paper[i + 1][j] + paper[i][j + 1] + paper[i + 1][j + 1])
    }

    // 세 번째 모양, L자 모양 
    // * *
    // * 
    // * 
    if (i + 2 < N && j + 1 < M) {
      sum = Math.max(sum, paper[i][j] + paper[i][j + 1] + paper[i + 1][j] + paper[i + 2][j])
    }
    //   *
    //   *
    // * *
    if (i + 2 < N && j - 1 >= 0) {
      sum = Math.max(sum, paper[i][j] + paper[i + 1][j] + paper[i + 2][j] + paper[i + 2][j - 1])  
    }
    // * * * 
    // *
    if (i + 1 < N && j + 2 < M) {
      sum = Math.max(sum, paper[i][j] + paper[i + 1][j] + paper[i][j + 1] + paper[i][j + 2])
    }
    //     *
    // * * *
    if (i + 1 < N && j - 2 >= 0) {
      sum = Math.max(sum, paper[i][j] + paper[i+1][j] + paper[i+1][j-1] + paper[i+1][j-2])
    }
    // * * *
    //     *
    if (i + 1 < N && j + 2 < M) {
      sum = Math.max(sum, paper[i][j] + paper[i][j + 1] + paper[i][j + 2] + paper[i + 1][j + 2])  
    }
    // *
    // * * * 
    if (i + 1 < N && j + 2 < M) {
      sum = Math.max(sum, paper[i][j] + paper[i+1][j] + paper[i+1][j+1] + paper[i+1][j+2])    
    }
    // * *
    //   *
    //   *
    if (i + 2 < N && j + 1 < M) {
      sum = Math.max(sum, paper[i][j] + paper[i][j + 1] + paper[i + 1][j + 1] + paper[i + 2][j + 1])
    }
    // *
    // *
    // * *
    if (i + 2 < N && j + 1 < M) {
      sum = Math.max(sum, paper[i][j] + paper[i+1][j] + paper[i+2][j] + paper[i+2][j+1])
    }
    
    // 네 번째 모양 z(?) 모양 
    // *
    // * *
    //   *
    if ( i + 2 < N && j + 1 < M) {
      sum = Math.max(sum, paper[i][j] + paper[i + 1][j] + paper[i + 1][j + 1] + paper[i + 2][j + 1])  
    }
    //   *
    // * *
    // *
    if (i + 2 < N && j - 1 >= 0) {
      sum = Math.max(sum, paper[i][j] + paper[i + 1][j] + paper[i + 1][j - 1] + paper[i + 2][j - 1])  
    }
    // * *
    //   * *
    if (i + 1 < N && j + 2 < M) {
      sum = Math.max(sum, paper[i][j] + paper[i][j + 1] + paper[i + 1][j + 1] + paper[i + 1][j + 2])
    }
    //   * *
    // * *
    if (i + 1 < N && j + 1 < M && j - 1 >= 0) {
      sum = Math.max(sum, paper[i][j] + paper[i][j + 1] + paper[i + 1][j] + paper[i + 1][j - 1])  
    }

    // 다섯번째 모양, ㅗ 모양
    // * * *
    //   *
    if (i + 1 < N && j + 1 < M && j - 1 >= 0) {
      sum = Math.max(sum, paper[i][j] + paper[i][j + 1] + paper[i][j - 1] + paper[i + 1][j])  
    }
    //   *
    // * * *
    if (i + 1 < N && j - 1 >= 0 && j + 1 < M) {
      sum = Math.max(sum, paper[i][j] + paper[i + 1][j] + paper[i + 1][j - 1] + paper[i + 1][j + 1])  
    }
    //   *
    // * *
    //   *
    if (i + 2 < N && j - 1 >= 0) {
      sum = Math.max(sum, paper[i][j] + paper[i + 1][j] + paper[i + 2][j] + paper[i + 1][j - 1])  
    }
    // *
    // * *
    // * 
    if (i + 2 < N && j + 1 < M) {
      sum = Math.max(sum, paper[i][j] + paper[i + 1][j] + paper[i + 2][j] + paper[i + 1][j + 1])
    }    
  }
}

console.log(sum)
```

