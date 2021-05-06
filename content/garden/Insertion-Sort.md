---
title   : 삽입 정렬(insertion sort)
date    : 2021-05-05 22:35:20 +0900
updated : 2021-05-05 22:35:30 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
모든 요소를 앞에서부터 차례대로 이미 정렬된 배열 부분과 비교해 자신의 위치를 찾아 삽입함으로써 정렬을 완성하는 알고리즘  

## 복잡도
- 삽입 정렬 알고리즘의 입력으로 이미 정렬이 끝난 리스트를 넣어주면 `O(n)`의 계산 복잡도로 정렬을 마칠 수 있다.  -> 특별한 경우
- 일반적인 입력인 경우 계산 복잡도는 선택 정렬과 같은 `O(n²)`  


## 예제  
- `[11, 7, 5, 6, 10, 9]`를 오름차순으로 정렬하기   
## JavaScript
```javascript
function solution(arr) {
    let answer = arr;

    for(let i=1; i<arr.length; i++) {
        
        let temp = arr[i];
        let aux = i-1;

        while((aux >= 0) && (arr[aux] > temp)) {
            arr[aux+1] = arr[aux];
            aux--;
        }
        arr[aux+1] = temp;
    }

    return answer;
}

let arr = [11, 7, 5, 6, 10, 9];
console.log(solution(arr));
```