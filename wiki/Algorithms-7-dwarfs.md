---
title   : 일곱 난쟁이 
date    : 2021-04-25 10:03:23 +0900
updated : 2022-02-14 08:34:17 +0900
aliases : ["일곱 난쟁이"]
---
## 문제
- 아홉명의 키가 주어졌을 때, 합이 100이 되는 7명을 출력 
- 아홉명의 키는 모두 다르고, 가능한 정답이 여러 가지인 경우 아무거나 출력 

## 풀이  
```javascript
function solution(arr) {
    let answer = [];
    let sum = arr.reduce((a, b) => a + b, 0); 
    let garbage = sum - 100; 

    for(let i=0; i<arr.length; i++) {
        for(let j=1; j<arr.length-1; j++) {
            if(arr[i] + arr[j] === garbage) {
                answer = arr.filter(function(e) {
                    return (e !== arr[i]) && (e !== arr[j]);
                })
                break; 
            }
        }
    }
    return answer;
}

arr = [20, 7, 23, 19, 10, 15, 25, 8, 13];
console.log(solution(arr));
```
- 나는 합계를 구할 때 또 `for`문을 사용했는데 풀이를 보니 `reduce` 함수를 확인할 수 있었다.  
- 그리고 이중 for문 부분은 `map`을 사용한 사람도 있었고, array를 반환할 때 `splice`로 제외시키는 경우도 있었다.  
  - `splice`는 뒤에 인덱스를 먼저 지워야 하는 것이 중요한 부분이었다. 나는 그 실수를 방지하기 위해 `filter`를 사용했다.  

## 더 알아보기
- [[splice]]
- [[Higher-Order-Function|reduce]]
- [[Higher-Order-Function|map]]


