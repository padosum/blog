---
title   : 선택 정렬(selection sort)
date    : 2021-05-05 22:33:53 +0900
updated : 2021-10-02 10:23:39 +0900
aliases :
tags:
---
## 알고리즘의 순서  
1. 주어진 리스트 중 최소값을 찾기 
2. 찾은 최소값을 맨 앞에 위치한 값과 바꾼다. 
3. 맨 처음 위치를 제외한 나머지 리스트를 같은 방법으로 바꾼다.  

## 복잡도
`n(n-1)/2` 번 해야 하는 계산 복잡도가 `O(n²)`인 알고리즘 

## 예제 
- `[13, 5, 11, 7, 23, 15]`를 오름차순으로 정렬하기    

### JavaScript  
```javascript
function solution(arr) {

    for(let i=0; i < arr.length-1; i++) {
        let min_idx = i; 
        for(let j=i+1; j < arr.length; j++) {
            if(arr[j] < arr[min_idx]) {
                min_idx = j; 
            }
        }
        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]]
    }

    return arr;
}

let arr = [13, 5, 11, 7, 23, 15];
console.log(solution(arr));
```


## reference 
- [https://ko.wikipedia.org/wiki/%EC%84%A0%ED%83%9D\_%EC%A0%95%EB%A0%AC](https://ko.wikipedia.org/wiki/%EC%84%A0%ED%83%9D_%EC%A0%95%EB%A0%AC)
