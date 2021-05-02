---
title   : JavaScript Expression
date    : 2021-05-02 11:33:32 +0900
updated : 2021-05-02 11:33:46 +0900
aliases : ["자바스크립트 표현식"]
private : false
hidden  : false
showReferences : true
---
## 값 
- 값은 표현식이 평가되어 생성된 결과 
	- 평가: 식을 해석해 값을 생성하거나 참조하는 것  
- 모든 값은 [[데이터 타입]]을 가진다.  -> 비트의 나열 


## 리터럴
- literal 
- 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용해 값을 생성하는 표기법(notation)
```javascript
3 // 숫자 리터럴 3  
```
- 숫자 리터럴 3을 코드에 기입하면 자바스크립트 엔진은 이를 평가해 숫자 값 3을 생성하는 것 
- 리터럴은 자바스크립트 엔진이 코드가 실행되는 시점인 런타임에 평가해서 값을 생성한다.  

## 표현식  
- 값으로 평가될 수 있는 문(statement)
- 표현식이 평가되면 새로운 값을 생성하거나 기존 값을 참조한다.  
- 리터럴은 값을 생성하므로 그 자체로 표현식이다.  
- 리터럴, 식별자(변수, 함수 이름 등), 연산자, 함수 호출 등의 조합으로 이뤄질 수 있다.  
```javascript
// 리터럴 표현식
10
"Hello World"

// 식별자 표현식 
sum
person.name
arr[1]

// 연산자 표현식
10 + 20 
sum == 10 
```

### 호출 표현식(invocation expression)
- 함수나 메서드를 호출(또는 실행)하는 문법 
```javascript
add()
perseon.sayHi()
```
- 값을 반환하기 위해 `return` 문을 사용하면 그 값이 호출 표현식의 값이 된다.  
	- 반환하지 않는다면 함수 표현식의 값은 `undefined`
- 모든 호출 표현식은 한 쌍의 괄호와 괄호 앞에 오는 표현식인데 그 표현식이 프로퍼티 접근 표현식(`.`)이라면 호출 표현식은 **메서드**가 된다. 


## 문 
- 문(statement)은 프로그램을 구성하는 기본 단위, 최소 실행 단위  
	- 문의 집합(문을 작성하고 순서에 맞게 나열하는 것) → 프로그램 
- 표현식이 어떤 값을 생성하기 위해 평가(evaluated)되는 것이라면 문은 어떤 일을 하기 위해 실행(executed)되는 것 
- 문은 여러 토큰(token)으로 구성
	- 토큰: 문법적으로 나눌 수 없는 코드의 기본 요소 
		- 키워드, 식별자, 연산자, 리터럴, 세미콜론 등  
- 선언문, 할당문, 조건문, 반복문 등  


## 세미콜론에 대하여  
- 세미콜론은 문의 종료를 나타냄  
- 문을 중괄호로 묶은 코드 블록(`{...}`) 뒤에는 세미콜론을 붙이지 않는다.  → 자체 종결성을 갖기 때문  
- 세미콜론은 생략 가능하다. 
	- 자바스크립트 엔진이 소스코드를 해석할 때 문의 끝이라고 예측되는 지점에 세미콜론을 자동으로 붙여준다. → 세미콜론 자동 삽입 기능(ASI)
- 붙여야 한다는 주장과 붙이지 말아야 한다는 주장이 팽팽하다.  
- ESLint 같은 정적 분석 도구에서도 사용을 기본으로 설정하고 있고 TC39도 사용을 권장하는 분위기... 
	- [https://bakyeono.net/post/2018-01-19-javascript-use-semicolon-or-not.html](https://bakyeono.net/post/2018-01-19-javascript-use-semicolon-or-not.html)

## 표현식인 문과 표현식이 아닌 문  
- 표현식인 문은 값으로 평가될 수 있는 문  
	- 변수 선언문은 값으로 평가될 수 없다.  
	- 할당문은 평가될 수 있다.  
- 구별하는 가장 간단하고 명료한 방법은 변수에 할당해보는 것  


## 참고 
- [자바스크립트 완벽 가이드](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788966261796&orderClick=LAG&Kc=)
- [프론트엔드 개발자를 위한 자바스크립트 프로그래밍](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788966260768&orderClick=LAG&Kc=) 
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)

