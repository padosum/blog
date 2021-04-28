---
title   : 문자열 탐색 문제ㅎ
date    : 2021-04-27 17:05:50 +0900
updated : 2021-04-28 09:51:22 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
## 문제 1
- 팰린드롬(회문): 앞에서 읽는 것과 뒤에서 읽는 것이 같은 문자열  
- 문자열을 입력받고 팰린드롬 여부를 출력 
- 대소문자를 구분하지 않는다. 

## 풀이 1 
```javascript
function solution(str) {
    let answer = "YES";
    let n = str.length; 
    str = str.toUpperCase();

    for(let i = 0; i < Math.floor(n/2); i++) {
        if(str[i] != str[n-i-1])
            answer = "NO"; 
    }

    return answer;
}

console.log(solution('Wow'));
```

## 문제 2 
- 입력된 문자열의 회문 여부를 출력한다.
- **알파벳 외의 문자는 무시**하고 대소문자 구분하지 않는다. 

## 풀이 2 
```javascript
    function solution(str) {
        let answer = "YES";
        str = str.replace(/\W+/g, '').toUpperCase();
        let n = str.length;
        
        for(let i=0; i < Math.floor(n/2); i++) {
            console.log(str[i], str[n-i-1])
            if(str[i] !== str[n-i-1]) {
                answer = "NO"; 
            }
        }
        return answer;
    }
    
    console.log(solution('Madam, I\'m Adam.'));
```  
- `str.toLowerCase().replace(/[^a-z]/g, '')` 
  - 소문자가 아닌 것을 찾아 빈문자열로 변경 
- `str.split('').reverse().join('')`   
  - 뒤집기

## 문제 3
- 문자와 숫자가 섞여 있는 문자열이 주어지면 숫자만 추출해 자연수 만들기  

## 풀이 3 
```javascript
function solution(str) {
    let answer = '';
    // for(let x of str) {
    //     if(!isNaN(x)) answer += x;
    // }
    answer = str.replace(/[^0-9]/g, '');
    return parseInt(answer);
}
console.log(solution('g09gfjg87f8g5gf'));
```

## 문제 4 
- 하나의 문자열 s와 문자 t를 입력받고 s의 각 문자가 문자 t와 떨어진 최소거리를 출력 

## 풀이 4 
```javascript
function solution(str, target) {
    let len = str.length; 
    let answer = Array.from({length: len}, () => 0);
    let finds = []; 
    let pos = str.indexOf(target);

    while(pos !== -1) {
        finds.push(pos);
        pos = str.indexOf(target, pos+1); 
    }
    
    for(let i = 0; i < len; i++) {
        let distance = Number.MAX_SAFE_INTEGER;
        for(let j = 0; j < finds.length; j++) {
            if(distance > Math.abs(finds[j] - i)) {
                distance = Math.abs(finds[j] - i);
            }
        }
        answer[i] = distance; 
    }

    return answer;
}

console.log(solution('teachermode', 'e'));
```

## 문제 5
- 대문자로 된 문자열을 입력받고 같은 문자가 연속으로 반복되는 경우 반복되는 문자 바로 오른쪽에 반복횟수를 표기해서 출력 반복횟수가 1인 경우 생략

## 풀이 5
```javascript
function solution(str) {
    let answer = '';
    let prev = ''; 
    let cnt = 1; 
    for(let x of str) {
        if (x === prev) {
            cnt++; 
        } else {
            answer += (cnt !== 1 ? (cnt + x) : x); 
            cnt = 1;
        }
        prev = x; 
    }

    return answer;
}
console.log(solution('KKHSSSSSSSE')); // 'K2HS7E'
```