---
title   : 백준 6064 JavaScript 
date    : 2022-04-07 22:29:34 +0900
updated : 2022-04-07 23:44:42 +0900
aliases : 
tags    : 
---
## 문제
[백준 6064](https://www.acmicpc.net/problem/6064)

## 풀이

이 문제는 간단하게 생각하면 연도 값을 1씩 더하고 구하려는 해의 값과 비교하면 되는데 그렇게하면 시간초과가 난다.

어떻게 하는지 감이 안와서 검색을 해보니 시간이 초과되지 않도록 연산이 줄어야 하는 것이 문제의 핵심이었다.

카잉 달력의 마지막 해는 문제 예시의 `<10:12>`가 60번째 해인 것처럼 두 수의 최소공배수가 된다.
`x`와 `y`가 최소공배수보다 큰 경우는 유효한 표현이 아니므로 `-1`을 출력한다.
그리고 많은 사람들의 풀이에서 "`x`를 고정시킨다"는 말이 나왔는데 무슨 말인지 도무지 이해가 되지 않았다. 그래서 그냥 막무가내로 나오는 값들을 나열해보자, 눈에 들어왔다.

다음은 카잉 달력의 마지막 해가 `<10:12>`일 때  `<3:9>`은 몇 번째 해를 나타내는지 구하는 과정이다.
![[boj_6064.PNG]]

위 그림에서 첫 열은 년도, 두번째 열은 `x`, 세번째 열은 `y`다. 그럼 다음과 같은 공식(?)이 성립된다.
```
x값은 고정이 되어 있다면 (여기선 3),
년도 값은 M(10)씩 증가된다.
년도 값을 N(12)으로 나눈 나머지가 y와 일치하면, 해당 년도가 정답이다.
```

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");
const T = input[0]

for (let i = 1; i <= T; i++) {
  const [M, N, x, y] = input[i].split(" ").map(Number)

  let year = -1
  let temp_x = x-1
  let temp_y = y-1

  for (let j = temp_x; j < M*N; j+=M) {
    if (j%N === temp_y) {
      year = j + 1
      break
    }
  }
  console.log(year)
}
```
`temp_x`, `temp_y`에 `-1`을 해준 이유는 `x`, `y`가 멸망 년도인 `10`, `12`인 경우엔 반복문에서 멸망 년도 `60`에 `12`를 나누면 최소공배수이니 `if`문(`j%N`의 값)에서 `12`를 확인해야 하는데 `0`이 확인되기 때문이다.
검색해보니 "중국인의 나머지 정리"라는 키워드가 나오는데 나중에 공부를 해봐야겠다.

경우의 수를 조금이라도 더 따져보는 자세를 가져야하는데 몇개 나열해보고 포기하는 내 자신을 발견할 수 있었다. 의지를 갖고 풀어봐야겠다.