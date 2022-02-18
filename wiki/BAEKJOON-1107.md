---
title   : 백준 1107 JavaScript 
date    : 2022-02-18 14:25:53 +0900
updated : 2022-02-18 14:31:30 +0900
aliases : 
tags    : 
---
## 문제
[백준 1107](https://www.acmicpc.net/problem/1107)

## 풀이
코드를 살펴보기에 앞서 내가 숫자를 봤을 때 어떤식으로 풀어가야할지 생각을 해보자.  
두 가지 방법이 있을 것이다.  
1. 현재 채널이 100번이니 `+`나 `-` 버튼을 이용해서 1 채널씩 이동해서 해당 채널로 가는 방법
2. 숫자버튼을 누르고 `+`나 `-` 버튼을 이용해 1채널씩 이동해 해당 채널로 가는 방법, 이 방법은 숫자버튼을 눌러서 바로 이동하는 경우가 있을 수 있다.   

위 두 방법에서 나오는 버튼 누르는 횟수 중 최솟값을 구하면 된다.  
우선 첫 번째 방법의 경우 이동하려고 하는 채널(`N`)에 100을 뺀 절댓값만 구하면 된다.   

두번째 방법은 [[Brute-Force-Search-Algorithm|완전 탐색]] 알고리즘을 사용해서 가능한 모든 숫자를 다 구해본다. 이동하려고 하는 채널의 범위는 500,000 이하이므로 숫자는 같은 자리수로 최댓값까지 진행했다. (`999999`, 더 큰 수에서 `-` 버튼을 눌러 해당 채널로 이동할 수도 있으므로)
숫자를 1씩 증가시키면서 확인을 하는데, 고장난 버튼이 전혀 없는 숫자로 이루어져 있다면  숫자를 눌러 이동이 가능한 채널일 것이다. 그다음 이동하려는 채널의 값을 빼서 절댓값을 구한다. (`+`, `-` 버튼을 눌러야할 횟수) 여기에 채널을 누르기 위해 입력한 번호 갯수를 더해주면 이동을 위해 버튼을 누른 횟수가 나온다.  
순회를 하면서 최종적인 최솟값을 구해주면 된다.  
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const [N, M, brokens] = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");
let brokenNum = []
if (M > 0) {
  brokenNum =  brokens.split(" ").map(Number)
} 

let min = Math.abs(N - 100)  // 100을 뺀 절댓값

const check = (arr, val) => {
  return arr.includes(val)
}

for (let i = 0; i <= 999999; i++) {
	let flag = false 
	let current = i.toString()
	let length = current.length
	
	for (let j = 0; j < length; j++) {
	  let val = current.charAt(j)
	  // 고장난 버튼이라면 넘기기 
	  if (brokenNum.includes(Number(val))) {
		flag = true
		break
	  }
	}
	
	
	// 해당 숫자에 고장난 버튼이 없으면 
	// 해당 숫자로 바로 이동이 가능 
	if (!flag) {
	
	  // 그동안 최솟값과, 절댓값(이동할 채널 - 현재 채널) + 현재 채널 자릿수(직접 누르는 것이기 때문)
	  min = Math.min(min, Math.abs(N - i) + length)
	}
}

console.log(min)
```
