---
title   : 자료구조 문제
date    : 2021-05-04 19:59:32 +0900
updated : 2021-05-04 22:53:33 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
## 문제 1 
- 올바른 괄호인지 확인  

## 풀이 1
```javascript
function solution(str) {
    let answer = "YES";
    let stack = [];

    for(let x of str) {
        if(x === '(') stack.push(x); 
        else {
            if(stack.length === 0) answer = "NO"; 
            stack.pop(); 
        }
    }

    if(stack.length !== 0) {
            answer = "NO";
    }

    return answer;
}

let q = '(((((((())))))';
console.log(solution(q));
```
- if문을 엄청 넣었었는데 stack에 `)`를 넣는 경우는 처음이라면 잘못된 것이고 빼내야 한다는 간단한 사실을 생각못한게 문제였다.  

## 문제 2 
- 괄호 사이의 문자 제거하기

## 풀이 2 
```javascript
function solution(str) {
    let answer = '';
    let stack = [];

    for(let x of str) {
        if(x === ')') {
            let temp = stack.pop();
            while(temp !== '(') {
                temp = stack.pop();
            }
        } else {
            stack.push(x);
        }
    }

    answer = stack.join('');

    return answer;
}

let str = '(A(BC)D)EF(G(H)(IJ)K)LM(N)';
console.log(solution(str));
```

## 문제 4
- 후위연산식 

## 풀이 4  
```javascript
function solution(postfix) {
    let answer;
    let stack = [];
    let op1, op2; 

    for(let x of postfix) {
        if(!isNaN(x)) stack.push(Number(x))
        else {
            op1 = stack.pop();
            op2 = stack.pop();

            switch(x) {
                case "+":
                    stack.push(op1 + op2);
                    break;
                case "-":
                    stack.push(op2 - op1);
                    break;
                case "*":
                    stack.push(op1 * op2);
                    break;
                case "/":
                    stack.push(op2 / op1);
                    break; 
            }
        }
    }
    answer = stack[0];
    return answer;
}


let postfix = "352+*9-";
console.log(solution(postfix));
```  
- 숫자가 아닌 값이 들어가면 `isNaN()`은 `true`를 반환  
