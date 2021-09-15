---
title   : JavaScript 변수  
date    : 2021-04-28 11:20:52 +0900
updated : 2021-04-28 11:22:04 +0900
aliases : 
tags: ["JavaScript"]
---
## 변수란? 
메모리는 데이터를 저장할 수 있는 메모리 셀의 집합이고 이 메모리 셀 하나의 크기는 1바이트(8비트)이다. 즉 컴퓨터는 메모리 셀의 크기, 1바이트 단위로 데이터를 저장하거나 읽는다.  
각 셀은 고유의 메모리 주소를 갖는데 메모리 공간의 위치를 나타내며 0부터 시작해 메모리의 크기만큼 정수로 표현된다.  

이 메모리에 저장된 데이터를 다시 사용하려면 메모리 주소를 통해 데이터에 접근해야 한다. 그래서 변수를 통해 접근을 하는데 변수는 **하나의 값을 저장하기 위해 확보한 메모리 공간, 또는 그 공간을 식별하기 위해 붙인 이름을 뜻**한다. 

변수는 프로그래밍 언어의 컴파일러 또는 인터프리터에 의해 값이 저장된 메모리 공간의 주소로 치환이 되서 실행된다.  

## 식별자  
- 함수, 프로퍼티, 함수 매개변수의 이름을 말한다.
- 구별해서 식별할 수 있는 고유한 이름이다.  
- 첫 문자는 반드시 글자나 밑줄(`_`), 달러 기호(`$`)  중 하나여야 한다. 

### 네이밍 컨벤션 
```javascript
var calmelCase; // 카멜 케이스 

var snake_case; // 스네이크 케이스

var PascalCase; // 파스칼 케이스 

// 헝가리언 케이스
var typeHungarianCase; // type + identifier 
var el = document.getElementById('id');
```
- 일반적으로 변수나 함수 이름은 카멜 케이스, 생성자 함수, 클래스의 이름은 파스칼 케이스를 사용한다.  


## 변수 선언하기 
- `var`, `let`, `const` 키워드를 사용한다.  

### `var`
```javascript
var i, sum;
var message = 'hello';
```
- `var` 로 변수를 선언한 후 초기 값을 지정하지 않으면 값이 설정될 때까지 `undefined`가 할당된다.  

#### 변수 이름은 어디에 등록되나? 
- 변수 이름을 비롯한 모든 식별자는 [[실행 컨텍스트]]에 등록된다.  
  - 실행 컨텍스트(Execution Context): [[JavaScript-Engine|자바스크립트 엔진]]이 소스코드를 평가하고 실행하기 위해 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역  

## 호이스팅 (Hoiisting)
- hoisting: 끌어올림
```javascript
console.log(message);
var message;
```

- `console.log()` 가 실행되는 시점에 `var message`가 아직 선언되기 전이므로 오류가날 것이라 예상할 수 있는데 `undefined`가 출력된다.  
  - 자바스크립트 엔진이 소스코드를 한 줄씩 실행하기에 앞서 소스코드 평가 과정을 거칠 때 **모든 선언문(변수, 함수  등)을 소스코드에서 찾아서 먼저 실행**한다.
  - 그래서 참조 오류가 나지 않고 출력이되는 것 
- 변수 선언문이 위로 올려진 것처럼 끌어올린다는 의미의 호이스팅이 자바스크립트의 특징이다.  
  - 실제로 끌어올린 것은 아니다.(의미를 이해하기 위해), 먼저 수집하는 것  

## 변수에 값 할당하기 
```javascript
var message = 'hi';
message = 'hello';
```
- 변수에 값을 재할당하면 변수의 값이 변경된다.  
- 하지만 이전에 있던 `hi`가 저장된 메모리 공간을 지우고 거기에 `hello`를 넣는 것이 아니라 새로운 메모리 공간을 확보해 거기에 `hello`를 저장하는 것!
  - 기존에 저장되어 있던 메모리 공간은 어떤 식별자와도 연결되지 않게 된다. → 가비지 콜렉터에 의해 메모리에서 자동 해제된다.  

## reference 
- [프론트엔드 개발자를 위한 자바스크립트 프로그래밍](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788966260768&orderClick=LAG&Kc=) 
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
- [코어 자바스크립트](https://search.kyobobook.co.kr/web/search?vPstrKeyWord=%25EC%25BD%2594%25EC%2596%25B4%2520%25EC%259E%2590%25EB%25B0%2594%25EC%258A%25A4%25ED%2581%25AC%25EB%25A6%25BD%25ED%258A%25B8&orderClick=LAG)