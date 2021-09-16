---
title   : 거품 정렬(bubble sort) 
date    : 2021-05-05 22:34:09 +0900
updated : 2021-08-02 16:47:08 +0900
aliases : 
tags: ["Algorithm"]
---
- 정렬 알고리즘 중 하나인 거품 정렬은 원소의 이동이 거품이 수면으로 올라가는 듯한 모습과 비슷해서 붙여진 이름이다. 
- 두 개의 인접한 자료 값을 비교하며 위치를 교환하는 방식으로 정렬하는 방법 

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

// while 사용 
function solution(arr) {
  let answer
  let isSwap = true

  while(isSwap) {
    isSwap = false
    for(let i=0; i<arr.length-1; i++) {
      if(arr[i] > arr[i+1]) {
        [arr[i], arr[i+1]] = [arr[i+1], arr[i]]
        isSwap = true
      }
    }
  }
  answer = arr

  return answer;
}
let arr1 = [4, 30, 49, 11 ,5]
console.log(solution(arr1))
```


## reference
- [https://ko.wikipedia.org/wiki/%EA%B1%B0%ED%92%88_%EC%A0%95%EB%A0%AC](https://ko.wikipedia.org/wiki/%EA%B1%B0%ED%92%88_%EC%A0%95%EB%A0%AC)
