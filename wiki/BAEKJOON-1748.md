---
title   : 백준 1748번 JavaScript 
date    : 2022-04-12 13:55:48 +0900
updated : 2022-04-12 14:18:53 +0900
aliases : 
tags    : 
---
## 문제
[백준 1748](https://www.acmicpc.net/problem/1748)

## 풀이

정말 간단하게 풀면 그냥 `for`문을 이용해서 숫자를 하나씩 증가시키고 그 자릿수를 (`숫자.toString().length`) 추가해주면 된다.
하지만 이렇게 풀면 시간제한(0.15 초)을 초과할 것이 불보듯 뻔하다.

대신 `for`문을 돌면서 다른 방법으로 각 숫자의 자릿수를 구해야 한다.
먼저 숫자를 `divisor(초기값 10)`으로 나눠 나머지가 있는지 확인한다.
```
예를 들어 1~9사이의 수는 나머지가 자기 자신일테고, 10은 나머지가 0이다.
```

나머지가 `0`이라면 자릿수가 2로 증가한 것이므로 `divisor`에는 10을 곱해주고, 더해줘야할 자릿수(`digit`)에 1을 더한다. 
```
11부터는 `divisor`가 100이니 100이 나오기 전까지는 해당없다.  100이 되면 divisor는 1000이 되고 digit은 4된다.
```
그럼 해당 숫자(`N`)까지 반복하면서 총 자릿수를 구해줄 수 있다. (총 자릿수가 만들어질 새로운 수의 자릿수다)
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim()
const N = Number(input)

let cnt = 0
let digit = 1
let divisor = 10

for (let i = 1; i <= N; i++) {
  if (i % divisor === 0) {
    divisor = divisor * 10
    digit = digit + 1
  }
  cnt = cnt + digit
}

console.log(cnt)
```
