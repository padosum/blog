---
title   : 백준 2447 JavaScript 
date    : 2022-04-27 19:11:22 +0900
updated : 2022-04-27 23:43:17 +0900
aliases : ["백준 2447번 별 찍기 - 10"]
tags    : 
created: 2022-04-27 19:13:01 +0900
---
## 문제
[백준 2447](https://www.acmicpc.net/problem/2447)

## 풀이
아래와 같이 패턴을 확인할 수 있다.
![[boj_2447.jpg]]
패턴을 확인하면 다음 좌표에 공백이 찍히는 것을 확인할 수 있다. 따라서 공백이 찍히는 부분은 `3`으로 나눴을 때 좌표 둘 다 나머지가 1이 남아야 하는 곳이다.
```
1,1
1,4
1,7
4,1
4,7
7,1
7,4
7,7

```

그리고 크게 뻥 뚫린 부분을 확인해보면
```
3,3 3,4 3,5
4,3 4,4 4,5
5,3 5,4 5,5
```
규칙을 발견할 수 있다. `N/3` 부터 `N/3` 만큼 빈 값이 들어가게 되는데 3으로 나눠보면 다 1이다. 

```
3,3(1,1) 3,4(1,1) 3,5(1,1)
4,3(1,1) 4,4(1,1) 4,5(1,1)
5,3(1,1) 5,4(1,1) 5,5(1,1)
```

그러므로 공백이 나오는 조건과 같게 된다. 그래서 나눠서 나머지가 공백이 아닌 값들은 3을 나눠 재귀함수를 호출한다.

따라서 공백을 출력하는 조건을 다음과 같이 설정해주고 그 외에는 재귀 함수를 호출한다. 여기서 `num`의 값이 1이 될때까지 나눠도 공백이 안나오는 경우는 더 이상 나눌 수 없으므로 공백이 아닌 `*`이 찍힌다.
```javascript
if (i % 3 === 1 && j % 3 === 1) {
  answer += " ";
} else {
    if (num === 1) {
      answer += '*'
    } else {
      genPattern(Math.floor(i / 3), Math.floor(j / 3), Math.floor(num / 3))
    }
  }
```

```javascript
const N = Number(require('fs').readFileSync('/dev/stdin').toString());

let answer = "";
const genPattern = (i, j, num) => {
  if (i % 3 === 1 && j % 3 === 1) {
    answer += " ";
  } else {
    if (num === 1) {
      answer += "*";
    } else {
      genPattern(Math.floor(i/3), Math.floor(j/3), Math.floor(num/3))
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    genPattern(i, j, N);
  }
  answer += "\n";
}
console.log(answer);
```
