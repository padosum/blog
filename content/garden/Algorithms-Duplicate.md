---
title   : 중복 문자, 중복 단어
date    : 2021-04-25 10:05:07 +0900
updated : 2021-04-25 10:05:19 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
## 문제 1
- 소문자인 하나의 문자열을 입력받고 중복된 문자를 제거해 출력  
- 제거된 문자열의 각 문자는 원래 문자열의 순서를 유지한다.  

## 풀이 1
```javascript
function solution(str) {
    let answer = '';

    for(let x of str) {
        if(answer.indexOf(x) == -1) {
            answer += x; 
        }
    }
    return answer;
}
console.log(solution('dynanana'));
```

## 문제 2
- N개의 문자열이 입력되면 중복된 문자열을 제거하고 출력  
- 출력되는 문자열은 원래의 입력순서를 유지  

## 풀이 2 
```javascript
function solution(arr) {
    let answer = [];
    for(let x in arr) {
        if(!answer.includes(arr[x])) {
            answer.push(arr[x]);
        }
    }
    return answer; 
}

let arr = ['good', 'time', 'good', 'time', 'have a']
console.log(solution(arr));
```
- `filter` 함수를 사용하는 방법도 있다.  
