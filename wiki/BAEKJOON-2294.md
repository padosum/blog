---
title   : 백준 2294 JavaScript 
date    : 2022-04-28 23:35:39 +0900
updated : 2022-04-29 20:53:16 +0900
aliases : ["백준 2294번 동전 2"]
tags    : 
---
## 문제
[백준 2294](https://www.acmicpc.net/problem/2294)

## 풀이
[[BAEKJOON-1699|백준 1699 제곱수의 합]] 문제 풀이와 정말 유사하다.

동전의 개수를 최소로 해서 합 k를 만드려면 어떻게 해야할까? 
예제를 살펴보자.
```
3 15
1
5
12
```

15를 동전 1, 5, 12를 조합해서 만든다. 여기서 동전의 값은 정해져 있다. 따라서 다음 3종류의 경우가 나온다.
```
15 = 숫자 14 + 1
15 = 숫자 10 + 5
15 = 숫자 3 + 12
```
위 식을 "동전의 최소 개수"라는 문제에 집중하면 다음과 같이 바꿀 수 있다. 아래 세 가지 중 제일 최소 값을 구하면 되겠다.
```
15를 만드는 동전의 최소 개수 = 14를 만드는 동전의 최소 개수 + 1(숫자 1을 더하니깐)
15를 만드는 동전의 최소 개수 = 10을 만드는 동전의 최소 개수 + 1(숫자 5를 더하니깐)
15를 만드는 동전의 최소 개수 = 3을 만드는 동전의 최소 개수 + 1(숫자 12를 더하니깐)
```

**어떤 값을 만드는 최소 개수는 그 이전에 있는 값들을 활용**해서 확인해볼 수 있는 것이다. 즉 [[Dynamic-Programming|다이나믹 프로그래밍]]으로 해결해볼 수 있겠다.
그렇다면 `DP`라는 배열을 만들고 배열에 들어가는 값이 배열 인덱스 숫자를 만드는 최소 동전 개수라고 생각해보자.
```javascript
DP[1] = 합 1을 만드는 최소 개수
DP[2] = 합 2를 만드는 최소 개수
DP[3] = 합 3을 만드는 최소 개수
// ...
```
문제에서 동전 조합으로 합을 만들 수 없는 경우에 `-1`을 출력해야 한다고 했다. 어떻게 확인할 수 있을까? 예를 들어 15를 만드는 최소 동전 개수는 `DP[15]`에 들어갈 것이다. 이 값을 절대 나올 수 없을 엄청 큰 수로 초기화 해 두면 나중에 확인할 수 있을 것이다.
```javascript
const DP = Array.from({ length: k + 1 }).fill(Number.MAX_SAFE_INTEGER)
```

그리고 0을 만드는 동전 개수는 없으니 0으로 초기화 한다.
```javascript
DP[0] = 0
```

그리고 동전 값 마다 반복을 한다. 아래 식을 보면 이전에 사용했던 배열 인덱스를 활용해서 서로 비교하고 최소인 값을 배열에 넣는 방식이다.
```javascript
동전 값 반복 
1일 때
DP[1] = min(DP[1], DP[1-1] + 1) // DP[1]과 DP[0] + 1을 비교
DP[2] = min(DP[2], DP[2-1] + 1) // DP[2]과 DP[1] + 1을 비교
DP[3] = min(DP[2], DP[3-1] + 1) // DP[3]과 DP[2] + 1을 비교
DP[4] = min(DP[2], DP[4-1] + 1) // ...
DP[5] = min(DP[5], DP[5-1] + 1) // ...
DP[6] = min(DP[6], DP[6-1] + 1)
DP[7] = min(DP[7], DP[7-1] + 1)
DP[8] = min(DP[8], DP[8-1] + 1)
DP[9] = min(DP[9], DP[9-1] + 1)
DP[10] = min(DP[10], DP[10-1] + 1)
DP[11] = min(DP[11], DP[11-1] + 1)
DP[12] = min(DP[12], DP[12-1] + 1)
DP[13] = min(DP[13], DP[13-1] + 1)
DP[14] = min(DP[14], DP[14-1] + 1)
DP[15] = min(DP[15], DP[15-1] + 1)

5일 때
DP[5] = min(DP[5], DP[5-5] + 1)
DP[6] = min(DP[6], DP[6-5] + 1)
DP[7] = min(DP[7], DP[7-5] + 1)
DP[8] = min(DP[8], DP[8-5] + 1)
DP[9] = min(DP[9], DP[9-5] + 1)
DP[10] = min(DP[10], DP[10-5] + 1)
DP[11] = min(DP[11], DP[11-5] + 1)
DP[12] = min(DP[12], DP[12-5] + 1)
DP[13] = min(DP[13], DP[13-5] + 1)
DP[14] = min(DP[14], DP[14-5] + 1)
DP[15] = min(DP[15], DP[15-5] + 1)

12일 때
DP[12] = min(DP[12], DP[12-12] + 1)
DP[13] = min(DP[13], DP[13-12] + 1)
// 생략
```

이렇게 반복문을 다 돌고 나면 `DP`라는 배열에 주어진 숫자로 해당 인덱스의 숫자를 만들 수 있는 최소 동전 개수들이 업데이트 되었을 것이다.
업데이트 되지 않았다면 초기값 그대로 일테니 `if`문을 사용해서 `-1`이 출력되도록 확인해준다.
```javascript
if (DP[k] === Number.MAX_SAFE_INTEGER) {
  console.log(-1)
} else {
  console.log(DP[k])
}
```

전체 코드는 다음과 같다.
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

// n가지 종류의 동전, 동전들을 사용해서 가치의 합이 k가 되도록,
// -> 동전의 개수는 최소로
const [n, k] = input[0].split(' ').map(Number)
const coins = []
for (let i = 1; i <= n; i++) {
  coins.push(Number(input[i]))
}

// 동전의 개수를 최소로하려면 어떻게 해야할까..?
// DP라는 배열의 해당 인덱스 값을 만들 수 있는 동전들의 최소 갯수가 들어간다고 생각해보자.
// 예제 동전: 1, 3, 5 / 합:15
// 예를 들어 DP[15]에는 동전들을 합해서 15가 되는 동전의 최소 갯수가 들어가는 것
// 최소 개수 어떻게 구할까..?
// 1, 3, 5로 15를 만드는 방법은 다음
// 15-5(10)을 만드는 동전 최소 개수 + 1
// 15-3(12)을 만드는 동전 최소 개수 + 1
// 15-1(14)를 만드는 동전 최소 개수 + 1
// 따라서 아래와 같음
// DP[15] = DP[10] + 1
// DP[15] = DP[12] + 1
// DP[15] = DP[14] + 1
// 위 3가지 경우 중 최솟값일 것

const DP = Array.from({ length: k + 1 }).fill(Number.MAX_SAFE_INTEGER)

DP[0] = 0

for (let i = 0; i < n; i++) {
  for (let j = coins[i]; j <= k; j++) {
    DP[j] = Math.min(DP[j], DP[j - coins[i]] + 1)
  }
}

if (DP[k] === Number.MAX_SAFE_INTEGER) {
  console.log(-1)
} else {
  console.log(DP[k])
}
```