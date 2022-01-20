---
title   : 백준 2193 JavaScript 
date    : 2022-01-20 09:44:11 +0900
updated : 2022-01-20 12:34:21 +0900
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
