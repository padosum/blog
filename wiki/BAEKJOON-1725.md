---
title   : 백준 1725 JavaScript 
date    : 2022-04-25 21:37:09 +0900
updated : 2022-04-25 22:20:58 +0900
aliases : ["백준 1725번 히스토그램"]
tags    : 
created: 2022-04-25 21:42:14 +0900
---
## 문제
[백준 1725](https://www.acmicpc.net/problem/1725)

## 풀이
다른 사람의 풀이를 봐도 좀처럼 이해가 되지 않아서 [[Algorithmic-Problem-Solving-Strategies|종만북]]을 펼쳐들었다. 풀이 코드는 종만북의 코드를 참고했다.

우선 해당 문제는 2중 `for`문을 사용하면 풀 수 있지만 **시간 제한**이 있었다. 다른 방법이 필요했다. "분할 정복"이 키워드였다.
이 문제에서 직사각형을 그리는 방법은 3가지로 분할할 수 있다.  

![[boj_1725.jpg]]
1. 왼쪽 영역에서 최대 직사각형 넓이 구하기
2. 오른쪽 영역에서 최대 직사각형 넓이 구하기
3. ⭐ 왼쪽 영역과 오른쪽 영역에 걸친 최대 직사각형 넓이 구하기

따라서 3가지 경우 중에 가장 큰 직사각형 넓이를 구하면 된다.

재귀 함수를 사용해서, 그래프가 하나 뿐인 경우엔 해당 높이를 리턴한다.
```javascript
const solve = (left, right) => {
  if (left === right) {
    return heights[left]
  }
  // ...
}
```

그리고 두 영역으로 분할해 재귀 함수를 실행한다.
```javascript
let mid = parseInt((left + right) / 2) // 중앙 인덱스
// 왼쪽, 오른쪽 중 최댓값
let ret = Math.max(solve(left, mid), solve(mid+1, right))
```

왼쪽과 오른쪽 모두에 걸치는 직사각형 중 가장 큰 것을 찾는 방법은 중앙의 그래프를 기준으로 왼쪽 그래프와 오른쪽 그래프 중 더 큰 그래프를 선택하면 된다. 그리고 선택된 그래프와 기준 그래프 중 더 작은 높이로 넓이를 계산한다. 더 높은 높이로 계산하면 직사각형이 아닌 계단식(?) 모양이 되기 때문이다.

위와 같이 선택해서 직사각형의 너비를 확장해간다. 그 중 최댓값을 구한다.
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
  .map(Number)

const N = input[0]
const heights = input.slice(1)

// heights[left]에서 heights[right] 사이에서 만들 수 있는 가장 큰 사각형의 넓이를 반환하는 함수
const solve = (left, right) => {
  if (left === right) {
    return heights[left]
  }

  // 문제를 두 구간으로 분할하기
  let mid = parseInt((left + right) / 2)
  let ret = Math.max(solve(left, mid), solve(mid + 1, right))

  // 왼쪽, 오른쪽 부분에 모두 걸치는 사각형 중 가장 큰 사각형 찾기
  let lo = mid
  let hi = mid + 1
  let height = Math.min(heights[lo], heights[hi]) // 작은 높이로 (작아야 직사각형을 그릴 수 있음)

  // [mid, mid+1] 만 포함하는 너비(2) 사각형의 경우
  ret = Math.max(ret, height * 2)

  // 사각형 확장해가기
  while (left < lo || hi < right) {
    if (hi < right && (lo === left || heights[lo - 1] < heights[hi + 1])) {
      // 왼쪽 그래프의 높이  < 오른쪽 그래프의 높이
      // 또는
      // 왼쪽의 그래프가 가장 왼쪽 끝의 그래프인 경우(오른쪽 그래프를 선택할 수 밖에 없음)
      hi = hi + 1 // 오른쪽 index 증가 (오른쪽 그래프 선택)
      height = Math.min(height, heights[hi]) // 기존 값과 비교해 작은 높이로 (작아야 직사각형을 그릴 수 있음)
    } else {
      lo = lo - 1 // 왼쪽 index 감소 (왼쪽 그래프 선택)
      height = Math.min(height, heights[lo]) // 기존 값과 비교해 작은 높이로 (작아야 직사각형을 그릴 수 있음)
    }

    // 확장한 후 사각형 넓이
    ret = Math.max(ret, height * (hi - lo + 1))
  }
  return ret
}

console.log(solve(0, N - 1))
```
