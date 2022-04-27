---
title   : 백준 1992 JavaScript 
date    : 2022-04-27 17:15:18 +0900
updated : 2022-04-27 17:21:26 +0900
aliases : ["백준 1992번 쿼드트리"]
tags    : 
created: 2022-04-27 17:20:26 +0900
---
## 문제
[백준 1992](https://www.acmicpc.net/problem/1992)

## 풀이
[[BAEKJOON-1780|백준 1780번 종이의 개수]] 문제 풀이와 상당히 유사하다. 
예제의 출력결과에 괄호가 뒤섞여 있어서 당황스러웠지만 차근차근히 그려보니 9개로 나누는 대신 4개로 나눈다는 것 빼고 거의 똑같았다.
![[boj_1992.jpg]]
배열의 길이가 2의 제곱수이므로 이중 for문을 이용해서 4개로 영역을 나눠 재귀 함수를 실행시킨다. 다른 점은 변수 하나를 선언하고 거기에 결과값을 계속 이어붙이면 된다. 괄호의 경우는 4개 영역으로 나눌 때 추가되므로 이중 `for`문이 시작되기 전과 후에 추가해주면 된다.

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

const N = Number(input[0])
const video = []
for (let i = 1; i <= N; i++) {
  video.push(input[i].split('').map(Number))
}

const checkSameNumber = (arr) => {
  let flag = true
  const first = arr[0][0]
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (first !== arr[i][j]) {
        flag = false
        break
      }
    }
  }
  return flag
}

const solve = (arr) => {
  let number = ''
  if (arr.length === 1 || checkSameNumber(arr)) {
    return arr[0][0]
  }

  if (arr.length >= 2) {
    number += '('
    const div = arr.length / 2
    for (let i = 0; i < arr.length; i += div) {
      for (let j = 0; j < arr.length; j += div) {
        let section = arr.slice(i, i + div).map((a) => a.slice(j, j + div))
        number += solve(section)
      }
    }
    number += ')'
  }
  return number
}

console.log(solve(video))
```
