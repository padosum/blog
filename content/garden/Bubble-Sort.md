---
title   : 거품 정렬(bubble sort) 
date    : 2021-05-05 22:34:09 +0900
updated : 2021-05-05 22:34:41 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
거품 정렬은 원소의 이동이 거품이 수면으로 올라가는 듯한 모습과 비슷해서 붙여진 이름이다. 

## 복잡도
복잡도가 `O(n²)`인 알고리즘으로 매우 느리지만 코드가 간단하여 자주 사용된다.  

## 예제  
- `[13, 5, 11, 7, 23, 15]`를 오름차순으로 정렬하기 
### JavaScript  
```javascript
function solution(arr) {
    let answer = arr;

    for(let i=0; i < arr.length-1; i++) {
        for(let j=0; j < arr.length-1-i; j++) {
            if(arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }

    return answer;
}

let arr = [13, 5, 11, 7, 23, 15];
console.log(solution(arr));
```


## 참고
- [https://ko.wikipedia.org/wiki/%EA%B1%B0%ED%92%88_%EC%A0%95%EB%A0%AC](https://ko.wikipedia.org/wiki/%EA%B1%B0%ED%92%88_%EC%A0%95%EB%A0%AC)