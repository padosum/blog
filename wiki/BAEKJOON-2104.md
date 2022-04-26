---
title   : 백준 2104 JavaScript 
date    : 2022-04-26 17:43:37 +0900
updated : 2022-04-26 17:50:39 +0900
aliases : ["백준 2104번 부분배열 고르기"] 
tags    : 
created: 2022-04-26 17:49:38 +0900
---
## 문제
[백준 2104](https://www.acmicpc.net/problem/2104)

## 풀이
[[BAEKJOON-1725|백준 1725번 히스토그램]] 문제와 매우 유사하다. 히스토그램 문제가 높이를 계산했다면 이 문제는 부분배열에서 가장 작은 값과 부분배열의 전체 합을 곱한 것 중 최댓값을 구하는 것이다.
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
const A = input[1].split(' ').map(Number)

const solve = (left, right) => {

  // 문제를 분할했을 때 배열 원소가 하나인 경우
	// 최솟값: 해당 원소 자신
	// 전체합: 해당 원소 자신
  if (left === right) {
    return A[left] * A[right]
  }

  // 중앙을 기준으로 문제를 2가지로 분할하기
  let mid = parseInt((left + right) / 2)
  let ret = Math.max(solve(left, mid), solve(mid + 1, right))

  // 왼쪽과 오른쪽에 모두 포함되는 부분 수열의 경우
  let start = mid
  let end = mid + 1
  let min = Math.min(A[start], A[end]) // 최솟값
  let sum = A[start] + A[end]

  ret = Math.max(ret, sum * min)

  // 부분 배열 늘려가기
  while (left < start || end < right) {
	  // 오른쪽의 원소가 왼쪽의 원소보다 큰 경우
    if (end < right && (start === left || A[start - 1] < A[end + 1])) {
      end = end + 1
      min = Math.min(min, A[end]) // 최솟값과 오른쪽 원소 값 비교(최솟값 구하기)
      sum = sum + A[end] // 현재 합 + 오른쪽 원소 값 
    } else {
      start = start - 1
      min = Math.min(min, A[start]) // 최솟값과 왼쪽 원소 값 비교(최솟값 구하기)
      sum = sum + A[start] // 현재 합 + 왼쪽 원소 값
    }
    ret = Math.max(ret, min * sum) // 최솟값 * 전체합 중 최댓값 구하기
  }
  return ret
}

console.log(solve(0, N - 1))
```
