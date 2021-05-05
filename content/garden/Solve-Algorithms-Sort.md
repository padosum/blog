---
title   : 정렬 알고리즘 문제
date    : 2021-05-05 16:55:41 +0900
updated : 2021-05-05 16:55:50 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
## 문제 1 
- 선택정렬 오름차순 
## 풀이 1
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

