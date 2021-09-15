---
title   : 최솟값 찾기
date    : 2021-04-25 08:34:57 +0900
updated : 2021-04-25 08:35:08 +0900
aliases : ["최솟값 찾기"]
---
## 문제 
- 입력받은 수들 중 가장 작은 값 찾기  

## 풀이 

```javascript
function solution(a, b, c){
	let answer;
	
	if(a<b) answer=a;
	else answer=b;
	
	if(c<answer) answer=c; 
	return answer;
}

console.log(solution(2, 5, 1));

// 세 수를 배열로 받았을 경우 
function solution(arr){         
	let answer, min=Number.MAX_SAFE_INTEGER;
	for(let i=1; i<arr.length; i++){
		if(arr[i]<min) min=arr[i];
	}
	answer=min;
	return answer;

}

let arr=[5, 7, 1, 3, 2, 9, 11];
console.log(solution(arr));
```

### 처음 시도했던 방법 
- 그냥 `if`문을 엄청 때려박았었다. 하지만 문제를 **분해**하면 더 간편한 것이었다. 우선 a와 b를 비교한 뒤에 나온 값과 다시 c를 비교하는 것. 두 가지로 분해가 가능했다. 

### 다른 풀이 
- 위의 풀이는 `Math.min()` 함수를 사용하지 않고 풀이하는 방법이다. 해당 함수를 사용하면 매우 간단하다.  
```javascript
function solution(a, b, c){
	let answer = Math.min(a, b, c); 
	return answer;
}
console.log(solution(2, 5, 1));

// 배열을 받았을 때 
function solution(arr) {
	let answer = Math.min(...arr)
	return answer; 
}
let arr = [9, 3, 7, 11, 2, 15, 17]
console.log(solution(arr));
```
- 배열을 받았을 때는 [[전개 구문]]을 이용한다. 
