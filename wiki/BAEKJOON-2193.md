---
title   : 백준 2193 JavaScript 
date    : 2022-01-20 09:44:11 +0900
updated : 2022-04-29 20:52:51 +0900
aliases : 
tags    : 
---
## 문제
[백준 2193](https://www.acmicpc.net/problem/2193)

## 풀이 
처음에 풀때 그동안의 [[Dynamic-Programming]] 문제 처럼 하려고 했다.
[[BAEKJOON-10844|백준 10844]] 처럼... 2차원 배열을 선언하고 `N`의 경우는 `N-1`의 마지막 자리의 수가 0일 때의 개수 + 1와 1일 때의 개수의 합으로 해서  `DP[N] = DP[N-1][0] + DP[N-1][1]`, `DP[N][1] = DP[N-1][0]`으로... 하지만 계속 틀렸다.   
지금와서 보니  `N=5`만 확인해봤어도 당연한 것이었다. 

그래서 다른 사람의 풀이를 참고했다.  

이친수의 조건이 다음과 같기 때문에 ,
1. 0으로 시작하지 않는다.
2. 1이 두 번 연속으로 나타나지 않는다.

`N=1`인 경우의 `1` 다음 
`N=2` 이후 부터는 이친수는 `1`로 시작(0으로 시작하지 않는다)하고 `0`이 오게 된다(1이 두 번 연속으로 나타나지 않는다)
결국 이친수는 `10`으로 시작하는 수이다.   

따라서 `N=5`일 때까지 정리를 해보면 
![[boj_2193.jpg]]
다음과 같은 식이 성립된다.
```
DP[N] = DP[N-2] + DP[N-1];
```
그래서 그대로 코드를 작성해보면, "틀렸습니다"가 나오는데 그 이유는 저렇게 식을 진행하다보면 기본 `int` 형의 범위를 넘어가기 때문이다. 
`BigInt`를 사용하면 된다.
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const N = Number(require('fs').readFileSync(readFileSyncPath).toString().trim());

const DP = new Array(N+1).fill(0);

DP[0] = 0;
DP[1] = 1;

for (let i = 2; i <= N; i++) {
  DP[i] = BigInt(DP[i-2]) + BigInt(DP[i-1]);
}

console.log(DP[N].toString());
```

## 다른 풀이
다른 풀이가 하나 더 있다.
나 같은 경우엔 `10`으로 시작한다고 하는 것이 바로 떠오르지 않았는데 앞에서 처음 풀이한 내용으로 충분히 풀 수 있는 내용이었다. 
예를 들어, 4자리 이친수를 구하려면 다음과 같은 식이 성립 가능하다.
```
// 0으로 끝나는 경우 = 3자리 이친수 중 0으로 끝나는 수의 개수 + 3자리 이친수 중 1로 끝나는 수의 개수
// 1으로 끝나는 경우 = 3자리 이친수 중 0으로 끝나는 수의 개수
```
따라서 배열에 저장할 때 다음과 같이 저장해야 한다.
```javascript
// 0으로 끝나는 경우
DP[0][i] = DP[0][i-1] + DP[1][i-1]

// 1로 끝나는 경우
DP[1][i] = DP[0][i-1]
```

그리고 마지막에 0으로 끝나는 경우와 1로 끝나는 경우를 더해준다.
```javascript
console.log(DP[0][N] + DP[1][N])
```

전체 코드는 다음과 같다.
```javascript
const readFileSyncPath = '/dev/stdin';

const input = require('fs')
  .readFileSync(readFileSyncPath)
  .toString()
  .trim()
  .split('\n')

const N = Number(input[0])

// 이친수:
// 0으로 시작하지 않는다.
// 1이 두 번 연속으로 나타나지 않는다.
// 1, 10, 100, 101, 1000, 1001
// 이친수 개수 구하기!
// 1자리 이친수
// 1
// 2자리 이친수
// 10 (1+0)
// 3자리 이친수
// 100(10+0), 101(10+1)
// 4자리 이친수
// 1000(100+0), 1001(100+1), 1010(101+0)

// ex) 4자리의 이친수를 구하려면?
// 0으로 끝나는 경우 = 3자리 이친수 중 0으로 끝나는 수의 개수 + 3자리 이친수 중 1로 끝나는 수의 개수
// 1으로 끝나는 경우 = 3자리 이친수 중 0으로 끝나는 수의 개수

const DP = Array.from({ length: 2 }, () =>
  Array.from({ length: N + 1 }, () => 0)
)

DP[1][1] = 1
DP[0][2] = 1
for (let i = 3; i <= N; i++) {
  DP[0][i] = BigInt(DP[0][i - 1]) + BigInt(DP[1][i - 1])
  DP[1][i] = BigInt(DP[0][i - 1])
}

console.log((DP[0][N] + DP[1][N]).toString())
```