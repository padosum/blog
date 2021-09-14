---
title   : 문자열 관련 문제
date    : 2021-04-25 10:04:18 +0900
updated : 2021-04-26 15:36:45 +0900
aliases : 
tags: ["Algorithm"]
---
## 문제 1 
- 입력받은 문자열에 `A`가 있다면 `#`으로 변경한다. 

## 풀이 1 
```javascript
function solution(str) {
    let answer;
    answer = str.replace(new RegExp('A', 'g'), '#');
    return answer;
}

console.log(solution('BANANA'));
```  
- 처음에 `replace`를 쓰고 첫 `A`만 바뀌길래 당황했다. 공부해놓고 익숙하지 않으니 바로바로 적용이 되지 않았다.  

## 문제 2
- 하나의 문자열을 입력받고 특정 문자를 입력받는다. 
- 해당 특정 문자가 입력받은 문자열에 몇 개가 있는지 출력  
- 문자열의 길이는 100을 넘지 않음 

## 풀이 2 
```javascript
function solution(str, c) {
    let answer = 0;
    for(let t of str) {
        if(t === c) 
            answer++;
    }
    return answer;
}
console.log(solution('COMPUTERPROGRAMMING', 'R')); // 3 
```
- `split`을 이용해서 갯수를 구할수도 있다.  
  - `let answer = str.split(c).length`  

## 문제 3 
- 하나의 문자열을 입력받아서 해당 문자열에 알파벳 대문자가 몇 개 있는지 출력  
- 문자열의 길이는 100을 넘지 않는다.    

## 풀이 3 
```javascript
function solution(str) {
    let answer = 0;
    for(let x of str) {
        if(x == x.toUpperCase())
            answer++;
    }
    return answer;
}
console.log(solution('BaNaNA')); // 4
```
- ASCII 코드로 하는 방법도 있다.  
```javascript
let num=x.charCodeAt();
if(num>=65 && num<=90) answer++;
// 65 ~ 90 대문자 
// 97 ~ 122 소문자 
```

## 문제 4  
- 하나의 문자열을 입력받아서 모두 대문자로 변경해 문자열을 출력  

## 풀이 4 
```javascript
function solution(str) {
    let answer = '';
    // answer = str.toUpperCase();
    for (let x of str) {
        // if(x === x.toLowerCase()) 
        //     answer += x.toUpperCase(); 
        // else 
        //     answer += x; 
        
        let num = x.charCodeAt(); 
        if (num>= 97 && num <= 122) 
            answer += String.fromCharCode(num - 32);
        else 
            answer += x; 
    }
    return answer;
}
console.log(solution('javascript'));
```

## 문제 5
- 대문자와 소문자가 섞인 문자열을 입력받고 대문자는 소문자로 소문자는 대문자로 변환하여 출력하기  

## 풀이 5  
```javascript
function solution(str) {
    let answer = '';
    for (let x of str) {
        // if(x === x.toLowerCase()) 
        //     answer += x.toUpperCase(); 
        // else 
        //     answer += x.toLowerCase(); 

        let num = x.charCodeAt();
        if (num >= 97 && num <= 122)
            answer += String.fromCharCode(num - 32);
        else
            answer += String.fromCharCode(num + 32);
    }
    return answer;
}
console.log(solution('JavaScript'));
```

## 문제 6
- N개의 문자열이 입력되었을 때 가장 긴 문자열을 출력  
- 각 문자열의 길이는 서로 다르다.  

## 풀이 6  
```javascript
function solution(arr) {
        // let answer;
        // const lengths = arr.map(x => x.length);
        // answer = arr[lengths.indexOf(Math.max(...lengths))];
        // return answer; 

        let answer, max = Number.MIN_SAFE_INTEGER;
        for(let x of arr) {
            if(x.length > max) {
                max = x.length;
                answer = x; 
            }
        } 
        return answer; 
    }
    let strings = ['teacher', 'time', 'student', 'beautiful', 'goodforyou'];
    console.log(solution(strings));
```  
- 알게된 함수를 사용하려하니 생각보다 더 복잡스럽다. 

## 문제 7
- 소문자 문자열이 입력되면 그 문자열 중 가운데 문자를 출력  
- 길이가 짝수일 경우 가운데 2개의 문자를 출력  

## 풀이 7  
```javascript
function solution(str) {
    let answer;
    let mid = Math.floor(str.length / 2); 
        if(str.length % 2 == 0) 
            answer = str.substr(mid - 1, 2);
        else 
            answer = str.substr(mid, 1);

    return answer; 
}

console.log(solution('study')); // u
console.log(solution('good'));  // oo
console.log(solution('peaches')) // c
```

## 더 알아보기 
- [[JavaScript-Regular-Expression]]

