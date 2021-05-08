---
title   : JavaScript 단축 평가 
date    : 2021-05-08 12:00:08 +0900
updated : 2021-05-08 12:00:37 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
**단축 평가(short-circuit evaluation)**  
표현식을 평가하는 도중에 평가결과가 확정된 경우 나머지 평가 과정을 생략하는 것 

## 논리 연산자를 이용한 단축평가 
| 단축 평가 표현식    | 평가 결과  |
| ------------------- | ---------- |
| `true || anything`  | `true`     |
| `false || anything` | `anything` |
| `true && anything`  | `anything` |
| `false && anything` | `false`    |

```javascript
let done = true;
let mesage = '';

message = done && '완료'; // done이  ture이면 '완료'를 할당
message = done || '미완료'; // done이 false이면 '미완료'를 할당 
```  

### 단축 평가가 유용한 상황들  
#### 객체를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티 참조하기  
```javascript
let elem = null; 

let val = elem && elem.value; 
```
`elem`이 객체이길 기대하고 프로퍼티를 참조했을 때 `elem`이 `null`이라면 원래는 오류가 남. 단축 평가를 사용하면 `elem`이 `false`가 아니라면 뒤에 오는 참조 값을 얻을 수 있고 `elem`이 `false`라면 `elem`으로 평가된다.  

#### 함수 매개변수에 기본값 설정하기 
```javascript
function getStringLength(str) {
    str = str || '';
	return str.length; 
}

// ES6에서 
function getStringLength(str = '') {
    return str.length; 
}
```
함수에 매개변수를 전달하지 않으면 `undefined`로 전달되어 오류가 발생할 수 있다. 단축 평가로 처리하면 에러를 방지할 수 있다. 

## 옵셔널 체이닝 연산자   
옵셔널 체이닝(optional chaning) 연산자 `?.`은 ES11(ECMAScript2020)에서 도입된 연산자이다. 
객체를 가리키길 기대하는 변수가 `null` 또는 `undefined`인지 확인하고 좌항의 피연산자가 `null` 또는 `undefined`인 경우 `undefined`를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 한다. 단축평가를 사용하지 않고 확인할 수 있게 된 것! 
 
```javascript
let elem = null;

let value = elem?.value; 
console.log(value); // undefined

let str = '';

let length = str?.length; 
console.log(length); // 좌항 피연산자가 false로 평가되지만 null 또는 undefined가 아니기에 
// 우항의 프로퍼티 참조를 이어간다.  
```

## null 병합 연산자 
null 병합(nullish coalescing) 연산자 `??`는 ES11(ECMAScript2020)에서 도입된 연산자이다. 
좌항의 피연산자가 `null` 또는 `undefined`인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다. 

단축 평가를 이용하지 않고 변수에 기본값을 설정할 때 유용하다.  
```javascript
let foo = null ?? 'default';
console.log(foo); // "default"

let foo = '' ?? 'default';
console.log(foo); // 좌항 피연산자가 false로 평가되지만 null 또는 undefined가 아니기에 
// 좌항의 피연산자를 그대로 반환 
```

## 참고자료 
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)