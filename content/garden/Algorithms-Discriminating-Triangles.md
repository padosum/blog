---
title   : 삼각형 판별하기
date    : 2021-04-25 08:46:04 +0900
updated : 2021-04-25 08:46:12 +0900
aliases : 
tags: ["Algorithm"]
---
## 문제
- 입력받은 수(세 변의 길이)로 삼각형을 만들 수 있는지 확인 

## 풀이 
```javascript
function solution(a, b, c){
	let answer="YES", max;
	let tot=a+b+c;
	
	if(a>b) max=a;
	else max=b;
	
	if(c>max) max=c;
	
	if(tot-max<=max) answer="NO"; 
	
	return answer;
}

console.log(solution(13, 33, 17));
```
- 우선 [삼각형의 결정조건](https://mathbang.net/92)에 세 변의 길이를 아는 것이라면, **가장 긴 변의 길이가 다른 두 변의 길이의 합보다 크거나 같으면** 삼각형을 그릴 수가 없다.  
	- 그래서 가장 긴 변의 길이를 찾고 나머지 변들의 합과 비교하면 된다. 
	
### 처음 시도했던 방법
- 처음에 `if`마다 `tot` 값을 계산했는데 나중에 풀이를 보니 `tot`값은 처음에 받은 수를 다 합해놓고, `max` 값이 정해진 뒤에 계산하면 되는 간단한 사실을 깨달았다.. 아직 멀었다 정말 

