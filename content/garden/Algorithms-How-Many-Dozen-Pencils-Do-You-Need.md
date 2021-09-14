---
title   : 연필 몇 다스가 필요한가?
date    : 2021-04-25 08:59:32 +0900
updated : 2021-04-25 08:59:41 +0900
aliases : 
tags: ["Algorithm"]
---
## 문제
- 사람 수(n)을 입력받고 1인당 1자루씩 나눠주려면 총 몇 다스가 필요한지?  

## 풀이 
```javascript
function solution(n){
	let answer;
	answer = Math.ceil(n/12);
	return answer;
}

console.log(solution(178));
```
- `Math.ceil()`은 올림을 처리하는 함수이다. 
	- 나눴을 때 12(1다스)로 딱 나눠지지 않으면 한 다스가 더 있어야 하므로 올림 처리를 해야한다.  

### 🌟 참조 
- `Math.abs()`: 주어진 숫자의 절대값 반환 
- `Math.floor()`: 버림 
- `Math.round()`: 반올림 
- `Math.sign()`: 수의 부호를 반환 
- `Math.trunc()`: 소수부분을 제거하고 정수부분을 반환 







