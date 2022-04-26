---
title   : 백준 1780 JavaScript 
date    : 2022-04-26 19:19:47 +0900
updated : 2022-04-26 19:22:14 +0900
aliases : ["백준 1780번 종이의 개수"]
tags    : 
---
## 문제
[백준 1780](https://www.acmicpc.net/problem/1780)

## 풀이
이 문제는 문제에 나와있는 조건과 같이 전체 배열이 같은 숫자로 이뤄져 있지 않다면 9개로 쪼갠다음 그 배열도 확인하고 또 같은 숫자가 아니면 다시 9개로 쪼개는 방식으로 해결하면 된다. **분할 정복**이다.
먼저 나 같은 경우엔 예제의 결과 코드가 이해가 되지 않았는데 다음 그림처럼 이해하면 된다.

1. 주어진 예제의 배열은 모두 같은 숫자가 아니니 9조각으로 나눈다.
2. 상단의 6조각은 각 조각이 모두 같은 숫자니 카운트가 1씩 되고, 아래쪽 조각들은 다시 한 번 더 9조각으로 나눈다.
![[boj_1780.PNG]]
'나눠서 하면 되겠구나!' 했는데 2차원 배열을 어떻게 쪼개냐는 고민이 생겼다. 검색을 하고 여러 시도를 해본 결과 9x9 배열은 다음과 같이 나눌 수 있었다. 2중 `for`문을 이용해 해당 코드를 구현할 수 있었다.
```javascript
const paper = [...] // 예제로 주어진 9x9 배열
			   
let section = paper.slice(0, 3).map((i) => i.slice(0, 3))
let section2 = paper.slice(0, 3).map((i) => i.slice(3, 6))
let section3 = paper.slice(0, 3).map((i) => i.slice(6, 9))
let section4 = paper.slice(3, 6).map((i) => i.slice(0, 3))
let section5 = paper.slice(3, 6).map((i) => i.slice(3, 6))
let section6 = paper.slice(3, 6).map((i) => i.slice(6, 9))
let section7 = paper.slice(6, 9).map((i) => i.slice(0, 3))
let section8 = paper.slice(6, 9).map((i) => i.slice(3, 6))
let section9 = paper.slice(6, 9).map((i) => i.slice(6, 9))
```

그리고 최종적인 답은 배열 하나에 저장하였다.  
재귀 함수를 통해 배열의 원소가 하나라면 바로 해당 숫자의 카운트를 증가시켰고, 배열이 모두 같은 숫자 또한 해당 숫자의 카운트를 증가시킨다. 두 경우 다 더이상 재귀함수를 실행하지 않도록 `return` 한다. 
그 외의 경우는 배열을 분할해서 또 각각 재귀 함수를 실행시킨다. (배열의 같은 숫자 여부를 확인한다.)
```javascript
const readFileSyncPath = require('path')
  .basename(__filename)
  .replace(/js$/, 'txt')

// const readFileSyncPath = '/dev/stdin';

const input = require('fs')
  .readFileSync(readFileSyncPath)
  .toString()
  .trim()
  .split('\n')

// NxN 크기의 행렬
// 각 칸은 -1, 0, 1중 하나가 저장
// 1.종이가 모두 같은 수라면 종이를 그대로 사용
// 2.아니라면, 종이를 같은 크기의 종이 9개로 자르고, 각각 잘린 종이에 대해 1을 반복
// -1로만 채워진 종이 개수
// 0으로만 채워진 종이 개수
// 1로만 채워진 종이 개수 구하기

const N = Number(input[0])
const paper = []
for (let i = 1; i <= N; i++) {
  paper.push(input[i].split(' ').map(Number))
}

const checkSameNumber = (paper) => {
  let flag = true
  let num = paper[0][0]
  for (let i = 0; i < paper.length; i++) {
    for (let j = 0; j < paper.length; j++) {
      if (num !== paper[i][j]) {
        flag = false
        return
      }
    }
  }
  return flag
}

// -1로 채워진 종이 수, 0으로 채워진 종이 수, 1로 채워진 종이 수
const answer = [0, 0, 0]

const solve = (paper) => {

  // 1개로 이뤄진 경우 
  if (paper.length === 1) {
    answer[paper[0][0] + 1] = answer[paper[0][0] + 1] + 1
    return
  }

  // 모든 원소의 값이 같은 경우
  if (checkSameNumber(paper)) {
    answer[paper[0][0] + 1] = answer[paper[0][0] + 1] + 1
    return
  }


  // 배열 분할하기
  if (paper.length >= 3) {
    const div = paper.length / 3
    for (let i = 0; i < paper.length; i += div) {
      for (let j = 0; j < paper.length; j += div) {
        let section = paper.slice(i, i + div).map((a) => a.slice(j, j + div))
        solve(section)
      }
    }
  }
}

solve(paper)
answer.forEach((val) => console.log(val))
``` 
