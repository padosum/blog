---
title   : 백준 2231 JavaScript
date    : 2022-04-19 23:25:28 +0900
updated : 2022-04-19 23:42:32 +0900
---
## 문제
[백준 2231](https://www.acmicpc.net/problem/2231)

## 풀이

[[Brute-Force-Search-Algorithm|완전 탐색]] 알고리즘으로 푼다.
어떤 자연수 `N`의 분해합은 `N`보다 크다. 그러니 `N`의 생성자는 `N`보다 작을 것.
```
N < 분해합 
245 < 245 + 2 + 4 + 5 (256)
```
여기서 256의 생성자는 245이니 생성자는 `N`보다 작다.
따라서 `N`까지 수의 분해합을 반복문을 통해 계속 계산해서 처음으로 분해합이 `N`일 때 반복문을 멈추면 된다. `N`까지 수 중에 나오지 않으면 `0`을 출력한다.

```javascript
const readFileSyncPath = '/dev/stdin';

// 자연수 N
const N = Number(require('fs').readFileSync(readFileSyncPath).toString().trim())

// 256 (= 245 + 2 + 4 + 5)
// 245는 256의 생성자
// 자연수 N의 생성자 구하기
let constructor = 0
for (let i = 1; i <= N; i++) {
  let sum = i
    .toString()
    .split('')
    .map(Number)
    .reduce((prev, curr) => {
      return prev + curr
    }, i)

  if (sum === N) {
    constructor = i
    break
  }
}
console.log(constructor)

```
