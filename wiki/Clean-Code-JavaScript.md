---
title   : 클린코드 자바스크립트 
date    : 2022-02-25 21:55:23 +0900
updated : 2023-01-14 09:53:41 +0900
aliases : ["클린코드 자바스크립트"]
tags    : 
---
## Goal
[Udemy 클린코드 자바스크립트](https://www.udemy.com/course/clean-code-js/)를 듣고 학습한 내용 정리하기 


## 변수 다루기
[[JavaScript-Block-Level-Scope]]
### var를 지양하자
- `var`는 함수 스코프
- `let` & `const`는 블록 레벨 스코프 + TDZ 
	- `const`는 재할당 불가능, `let`은 할당 가능

### function scope & block scope
- `var`는 함수 스코프이기 때문에 블록 스코프(if문 등...) 내에서 변경되면 전역 공간에서까지 변경이 된다. 
- `let`과 `const`는 안전하게 블록 스코프이다.

#### [[JavaScript-Object|객체]]에서 "재할당" 의 의미 
```javascript
const person = {
  name: 'jang',
  age: '20'
}

person.name = 'choi'  // 가능, 재할당이 아닌 값만 바뀐 것이라서
```
[[JavaScript-Array|배열]]도 마찬가지로 재할당이 아닌 값을 바꾸는 것은 가능하다.

### 전역 공간 사용 최소화
#### 왜 전역 공간을 사용하면 안될까?
1. 경험에 의해 알 수 있음
2. 누군가 혹은 js 생태계에서 지속적으로 사용하지 말라고 추천하기 때문에
3. 강의 혹은 책에서 권함
4. 회사 혹은 멘토가 권함
5. lint 에서 알려주는 경우

#### 전역 공간이란 ? 최상위 공간
- 브라우저 환경에서 `window`가 최상위
- node.js 환경에서 `global`이 최상위
- 전역 공간에서 변수를 사용하면 파일을 나눠도 코드 구역이 나눠지지 않고 모든 파일에서 사용이 가능하다. 
	- 따라서 어떤 파일에서 사용하는 함수를 다른 파일에서 같은 이름으로 덮어씌워 버리면 ? -> 오류가 생길 수 있다.
	- `var`를 사용하지 않으면 된다.

#### 전역 공간 사용을 최소화하는 방법 
1. 전역 변수 사용하지 않기
2. 지역 변수 사용하기
3. `window`, `global`을 조작하지 않기
4. `const`, `let` 사용하기
5. IIFE, [[JavaScript-Module|Module]], [[JavaScript-Closure|클로저]]를 사용해 스코프 나누기

### 임시변수 제거하기
#### 임시 변수란? 
- 어떤 scope 안에서 전역 변수로 사용되는 것
  - 임시 객체도 함수가 커지면 전역 공간이나 다름없는 상황이 된다.
  - 잘게 함수를 쪼갠다면 문제 없지만 함수가 커졌을 때 임시변수를 만드는 습관이 있다면 같이 일하는 팀원이나 자신이 나중에 유혹을 받을 수 있음...
- 그렇다면 임시변수, 객체는 어떻게 CRUD 할까?
	- 함수에서 바로 반환하기. 임시변수 없이

- 함수가 할 수 없는 추가적인 스펙(기능이나 마케팅) 이 생긴다면?
	- 함수를 수정하기 -> 이 함수를 수정했을 때 꼼꼼히 확인하지 못하면 사용하는 다른 코드에서 많은 영향을 끼침
	- 함수를 추가로 만들기 ->  함수를 한번 더 추상화하기

#### 임시 변수를 제거해야 하는 이유
1. 명령형으로 가득한 로직
2. 어디서 어떻게? 디버깅이 힘들다.
3. 추가적인 코드를 작성하고 싶은 유혹이 들게 만든다. (함수는 하나의 역할만 해야 하는데... )  코드의 유지보수가 어렵다.

#### 명령형에 가까운 코드는 
- 임시 변수가 함수 내부 여러 부분에서 바뀌고 연산이 되면서 반환이 된다.
- 임시변수의 값을 추정하기가 어렵다. -> 임시 변수 사용하지 않기가 중요하다!

#### 임시 변수 제거의 해결책
1. 함수가 하나의 역할만 하도록 나누기
2. 바로 반환하기
3. [[Higher-Order-Function|고차함수]] 사용하기 `map`, `filter`, `reduce`
4. [[Declarative-Programming|선언형 코드 작성하기]]

### 호이스팅 주의하기
#### 호이스팅?
- [[JavaScript-Block-Level-Scope|호이스팅]]은 **런타임 시기에 선언과 할당이 분리된 것**
- 스코프의 동작을 예상하며 코드를 작성하는데 런타임에선 예상대로 동작하지 않는 경우가 있다. 그 현상 중 하나가 바로 호이스팅. 따라서 호이스팅이 일어나면 예측하지 못한 오류가 발생할 수 있다.  

#### 호이스팅으로 인한 실수를 줄이는 방법
1. `var` 사용하지 않고 `let`, `const` 사용하기
2. 함수도 호이스팅되기 때문에 함수 표현식 사용하기,  `const`로 선언하기 

### 타입 검사
`typeof` 연산자는 피연산자를 평가해서 문자열로 반환해준다.

```javascript
typeof '문자열'     // 'string'
typeof true       // 'boolean'
typeof undefined  // 'undefined'
typeof 123        // 'number'
typeof Symbol()   // 'symbol'
```

#### 원시 타입과 객체 타입 
PRIMITIVE vs REFERENCE
reference는 [[JavaScript-Data-Type#typeof|typeof 연산자]]로 확인하기 어렵다.   
```javascript
function myFunction() {}
class MyClass {}

typeof myFunction  // 'function'
typeof MyClass     // 'function'

const str = new String('문자열')
typeof str  // 'object'
typeof null // 'object'
```
그러므로 `typeof`가 항상 내가 원하는 대로 결과를 반환해주지 않는다. (`typeof null`은 프로그래밍 언어 설계상 오류로 인정했음)
자바스크립트는 동적으로 변하는 언어이기 때문에 타입도 동적이다. -> **타입을 다룰 때 주의가 필요**하다. 

#### `instanceof`
[[JavaScript-Prototype]]
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const poco = new Person('poco', 99)
const p = {
  name: 'poco',
  age: 99
}
poco instanceof Person // true 
p instanceof Person // false 
```

```javascript
const arr = []
const func = function() {}

const date = new Date()

arr instanceof Array      // true
func instanceof Function // true
date instanceof Date      // true

// 프로토타입 체인을 타기 때문에 최상위에 있는 Object의 instance 도 된다. 
arr instanceof Object   // true
func instanceof Object // true
date instanceof Object      // true
```

헷갈릴 수 있기 때문에 타입을 검사할 때 주의가 필요한 것 

#### 팁
- 타입 확인에 대해 구글링할 때 
	- "javascript is function"
	- "javascript is array"
	- "javacript is string" 등으로 검색하기
- stackoverflow에서 추천을 많이 받은 답변도 중요하지만 그 의견이 언제 올라온 것인지 확인하는 것도 중요!  

#### 요약
- 자바스크립트라는 언어는 동적인 타입을 가지는 언어이다. -> 타입 검사가 어렵다... 
- 타입 검사 시 확인 방법에 대해 다 외우는 것은 힘들기 때문에 잘 찾아내기(검색 활용)
- Primitive vs Reference 의 차이도 잘 확인
- `typeof`가 무적이 아니다. `instanceof` 사용하는 방법도 있음 

### undefined & null
```javascript
!null  // true 
!!null // false 

null === false // false 
!null === true // true 

// null -> 숫자 연산시 0으로 취급 
null + 123 // 123 
```

```javascript
let varb; // 선언했지만 값은 정의되지 않고 할당 x 

typeof varb // 'undefined'

undefined + 10 // NaN

!undefined // true 

undefined == null // true
undefined === null // false
!undefined === !null // true 
```
`null`값과 `undefined`를 사용할 때 매우 혼란스럽다... 팀에서 개발을 할 때 우리는 비어 있는 값은 `null`로 하자, `undefined`로 하자 등.. 컨벤션이 있는 것이 좋다. 개인적으로도! 

#### `undefined`, `null` 비교 
- `null`은 값이 없다고 명시적으로 표현하는 것  
- `undefined` -> 숫자와 연산하면 `NaN` -> type은 `undefined`
- `null` -> 숫자와 연산하면 `0` -> type은 `object`
- **`undefined`와 `null`은 사용할 때 항상 조심**해야 한다.

### eqeq 줄이기
- eqeq: 동등 연산자 
- `==`를 완벽하게 생각하면 안 된다! 
- `===` strict equality 완벽하게 동등한지 확인이 가능. 엄격한 동등 연산자 
- `==`와 `===`는 큰 차이를 불러온다. 
- `==`을 사용하면 [[JavaScript-Type-Casting|형변환(type casting)]]이 일어난다. 위험하다. 

```javascript
// == 
'1' == 1  // true
1 == true // true 

// === 사용하기 
'1' === 1  // false
1 === true // false 
```

#### 형변환은 꼭 수동으로해서 비교하자! 
```javascript
// ticketNum은 input element 
ticketNum.value == 0 // x 

Number(ticketNum.value) === 0
ticketNum.valueAsNumber === 0 
```
[eslint에 eqeqeq 옵션이 있다.](https://eslint.org/docs/rules/eqeqeq) 

### 형변환 주의하기 
```javascript
// 암묵적 변환 
11 + ' 문자와 결합' // '11 문자와 결합'

!!'문자열' // true
!!''   // false 

parseInt('9.9999', 10) // 9 
// 두번째 파라미터를 지정하지 않으면 10진수가 기본값은 아니다. 
// 그래서 10진수를 원한다면 꼭 지정하는 게 중요 


// 명시적 변환 
String(11 + '문자와 결합')
Boolean('문자열')
Number('11')
```

- 명시적 변환: 사용자가 형변환을 하는 것
- 암묵적 변환: js가 평가하는 것 
- 타입을 변환할 때 명시적으로 해줄 필요가 있다. -> 예측하기 쉬운 코드 

### isNaN
- 사람이 생각하는 숫자는 10진수인데, 컴퓨터는 2진수를 사용한다. 
	- 이 차이 때문에 코드를 작성할 때 실수를 많이 한다. 
	- 소수점을 사용할 때 제일 문제  
	- 이 간극을 채우기 위해 IEEE 754 표준을 통해 해결하려고 한다.
		- 부동소수점 -> 떠돌이 소수점
- 사람과 컴퓨터 생각의 차이의 예로 `isNaN`은 결과가 거꾸로 나온다. 
	- 이 말이 무슨 말이냐하면, 사람의 사고로는 보통 `true`가 나오도록 코드 작성을 한다. `typeof 123 === 'number'` 가 `true`와 같은 식으로 하지만 `isNaN(123)` 은 `false`로 나온다. 
- `isNaN(123)`, 전달한 인자가 숫자가 아니다. => 숫자가 맞다. 한 번 더 생각해야 함 
- `isNaN(123 + '테스트')` =>  `true`
- `Number.isNaN(123 + '테스트')` => `false` 
- **숫자가 아니냐 맞냐를 할 때는 `Number` 붙이도록 한다.** 

#### Number.isNaN 사용하기 
```javascript
isNaN // 느슨한 검사
Number.isNaN // 엄격한 검사 
```


## 경계 다루기
### min-  max
```javascript
function genRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MIN_NUMBER = 1 
const MAX_Number = 45 

genRandomNumber(MIN_NUMBER, MAX_NUMBER);
```

```javascript
const MAX_AGE = 20

function isAdult(age) {
  // 최소값, 최대값 (포함되는지 vs 안되는지)
  // 이상, 초과 vs 이하, 미만 
  if (age >= 20) {

  }
}

// 상수
const MIN_IN_NUMBER = 1; // IN을 사용해서 포함여부를 확인할 수 있도록? 
const MAX_IN_NUMBER = 45
```
1. 최소값과 최대값을 다룬다.
2. 최소값과 최대값 포함 여부를 결정해야 한다 (이상-초과 / 이하-미만)
3. 혹은 네이밍에 최소값과 최대값 포함 여부를 포함한다. 

### begin - end
- 시작과 끝이 동일하지 않는 경우
- 예시
	- airbnb의 체크인 날짜 
		- 체크인은 begin
		- 체크아웃 end 
	- 수많은 datepicker 라이브러리가 begin 과 end로 구분됨
```javascript
function reservationDate(beginDate, endDate) {
 // code ...
}

reservationDate('YYYY-MM-DD', 'YYYY-MM-DD')
```

### first - last 
- 포함된 양 끝을 의미하는 네이밍 
- 부터 ~~~ 까지 
- min - max 와 비슷한데 min, max 사이에 값들이 규칙성이 없을 때 고려할 수 있는 것 
```javascript
const students = ['포코', '존', '현석'];
function getStudents(first, last) {
  // code...
}
getStudents(students[0],'현석')
```
- 사이에 연속성이 없는 경우 
- 예시
	- html dom 요소 firstChild, lastChild 

### prefix - suffix 
- 접두사와 접미사 
- 예시
	- 자바스크립트의 getter와 setter 
	- 리액트 Hook의  `use` 접두사를 사용한다. 
		- react use 라는 파생 라이브러리가 있음 -> 다 파일명이 use prefix가 붙어있다. 
	- jquery $를 붙이는 약속이 있음 
	- 자바스크립트 클래스 `#` private field  -> 옛날에는 `_`로 표현했었음
	- underscore라는 라이브러리 `_` prefix를 사용한다. 
	- lodash 도 `_` prefix를 사용한다. 
	- component도 있다.
		- vue에서 컴포넌트를다룰 때 `Base` `App`, `V`를 붙인다든지... 팀에서 코드를 작성할 때 규칙을 정함 
	- Redux를 사용할 때 
		- `_REQUEST`, `_SUCCESS`, `_FAILURE` 네트워크의 상태를 suffix로 표현 
	- file tree에서... 
		- 복수단위로 관리되는 파일 폴더는 `_s`를 붙임, 
- **개인이나 팀에서 네이밍, 컨벤션을 정할 때 `prefix`, `suffix`를 사용할 수 있다. 일관성을 위한 규칙임** 

### 매개변수의 순서가 경계다 
**호출하는 함수의 네이밍과 인자의 순서의 연관성을 고려하기**
```javascript
function someFunc (someArg, someArg) {

}
genRandomNumber(1, 50) // 1부터 50까지 난수를 생성하나? 라고 추측할 수 있다.
getDates('2021-10-11', '2021-10-32') // 저 사이 날짜를 가져오는 구나 라고 추측이 가능 
genShuffleArray(1, 5) // 1부터 5까지 숫자를 랜덤으로? 
```
- 인자를 2개를 넘기면 대부분 시작과 끝을 의미로 유추할 수 있다. 
	- 그래서 2개가 넘지 않도록 고정하는게 좋다. 

#### 유지보수에 도움되는 함수 
- 매개변수가 2개를 넘지 않도록 하기 
- 인자가 2개보다 많다면?
	- 객체로 받거나
	- `...`  [[JavaScript-Rest-Parameter|나머지 매개변수]] 사용 하기 
	- `arguments` 객체 활용하기 [[JavaScript-Function|JavaScript 함수]], [[JavaScript-First-Class-Object|일급 객체]]
	- 함수를 고치기 어려운 상황이라면? 래핑하는(그 함수를 호출하는) 함수를 만들기 

## 분기 다루기 
### 값식문
문법이 중요한 이유: 개발자는 프로그래밍 언어를 사용해서 컴퓨터를 이해시켜야 하기 때문이다. 컴퓨터는 단 하나의 문법 에러, 오타만 있어도 에러가 발생 -> 서비스 오류
하지만 값, 식, 문에 있어서 문법을 잘 지키지 않고 넘어가는 경우가 많다.   

```javascript
// This JSX:
ReactDOM.render(
  <div id="msg">Hello World!</div>,
  mountNode
)

// is transformed to this JS:
ReactDOM.render(React.createElement('div', { id: 'msg' }, 'Hello World!'), mountNode)
```
- `()`는 함수와 관련된다. 
- 값이 들어가야할 자리에 문을 넣으면 오류. ex)객체 값에 `if`문이 들어가면 오류 
- 값이 들어가야 할 자리에 식이 들어가는 것은 괜찮다. 식은 값으로 귀결될 수 있다. 
	- ex) 요소 id 값에 표현식(삼항 연산자)는 쓸 수 있다. `if`문은 쓸 수 없다. 
- [[JavaScript-Short-Circuit-Evaluation|논리 연산자는 `if` 대신 사용 가능하다.]] 
- `{}` 안에는 값과 식만 들어가야 한다. 

### 삼항 연산자 다루기
- 삼항 연산자를 사용하냐 안하냐보다 일관성이 중요하다. 
- 오히려 삼항 연산자가 너무 복잡하면 `switch case`문을 사용하는 것이 좋다. 
```javascript
const example = condition1 
  ? a === 0 ? 'zero' : 'positive'
  : 'negative'
```
위와 같은 코드는 사람이 읽기 쉽도록 괄호로 감싸는 것이 좋다. 
```javascript
const example = condition1 
  ? (a === 0 ? 'zero' : 'positive')
  : 'negative'
```

반환값이 `void`인 함수를 삼항연산자에 사용하면 `undefined`가 들어가는 것, 의미있는 코드가 아니다.
```javascript
function alertMessage(isAdult) {
  isAdult
    ? alert('입장이 가능합니다.')
    : alert('입장이 불가능합니다.')
}
```

개인의 취향에 따라 다르지만 강사는 이 상황에선 삼항 연산자가 어울리지 않는다고... 공감한다. 
```javascript
if (isAdult) {
  alert('입장이 가능합니다.')
} else {
  alert('입장이 불가능합니다.')
}
```

### Truthy & Falsy 
자바스크립트는 형변환을 사용자가 의도하지 않더라도 일어날 수 있다. 

truthy 참 같은 값 -> 참으로 평가된다. 
falsy 거짓 같은 값 -> 거짓으로 평가된다. 

```javascript
function printName(name) {
  // 안전한 코드를 만들기 위해 다음과 같이 if문을...
  if (name === undefined || name === null) {
    return '사람이 없네요'
  }
  return '안녕하세요 ' + name + '님'
}

// 하지만 falsy를 생각하면 다음과 같이 간단하다.
if (!name) {
  return '사람이 없네요'
}
```
`null`과 `undefined` 모두 falsy이기 때문에 가능한 것이다. 

### 단축평가 (short-circuit evaluation)
[[JavaScript-Short-Circuit-Evaluation|단축 평가]]를 이용하면 분기를 줄일 수 있다. 
```javascript
// AND
true && true && '도달 O' // 도달 O

true && false && '도달 X' // false 

// OR
false || false || '도달 O' // 도달 O

true || true || '도달 X' // true 
```

```javascript
function fetchData() {

 //if (state.data) {
 //   return state.data
 //} else {
 //  return 'Fetching...'
 //}

 return state.data || 'Fetching...'
}
```
지금은 사용이 어색하지만 **의식적으로 사용하다보면 언젠가는 그냥 편하게 사용할 수 있을 것!**

### else if 피하기 
`else if`를 맹목적으로 사용할 필요는 없다. 
```javascript
const x = 1;
if (x >= 0) {
  // true   
} else if (x > 0) {

} else {

}

// else if는 else 후에 if를 한 것과 같다는 사실을 잊지 말기 
if (x >= 0) {
 
} else {
  if (x > 0) {

	}
}
```
`else if`를 사용한다는게 조건에 대해 명확하게 생각하고 있지 못하는 상황이라고 볼 수 있음. 
계속 쓰는 행위를 하면 결국 `switch case`를 사용하는 것이 낫다. 

### else 피하기 
`else if`와 마찬가지

```javascript
function getActiveUserName(user) {
  if (user.name) {
    return user.name
  }
  // else 처리 필요 없음 

  return '이름 없음'
}
```
`else`를 사용하면 스타일 상 문제 뿐 아니라 논리적으로 단정된 로직을 사용하는 것 ... 
함수는 참이고, 거짓일 때 반환이 명백하게 짜여진 함수가 된다. 
습관적으로 `if - else` 로직을 사용하다가 다음과 같은 실수를 할 수 있다.
```javascript
function getHelloCustomer(user) {
  if (user.age < 20) {
    report(user)
  } else {
    return '안녕하세요'
  }
}
```
20세미만인 사람에게 `안녕하세요`를 리턴 못함 
`else`를 애초에 안썼다면 괜찮다. 
```javascript
function getHelloCustomer(user) {
  if (user.age < 20) {
    report(user)
  }
  return '안녕하세요'
}
```

### Early Return 
[읽어 보기 - Early Return 하는 코드를 작성하자](https://jheloper.github.io/2019/06/write-early-return-code/)
```javascript
function loginService(isLogin, user) {
  if (!isLogin) {
    if (checkToken()) {
      if (!user.nickName) {
        return registerUser(user)
      } else {
        refreshToken()
        return '로그인 성공'
      }
    } else {
      throw new Error("No Token")	
    }
  }
}
```
위 분기로직은 매우 복잡하다. 다음과 같이 조건을 확인한다. 
1. 로그인 여부
2. 토큰 확인 
3. 기등록 유저인지 확인 
	- 맞으면 로그인 성공
	- 아니면 회원가입으로 이동 

다음처럼 early return을 활용해서 함수를 미리 종료시킬 수 있다. 
early return 을 사용하면 코드의 흐름을 이해하기 편하다. 
```javascript
function loginService(isLogin, user) {
  // Early Return 
  if (isLogin) {
    return 
  }

  if(!checkToken()) {
    throw new Error("No Token")	
  }

  if (!user.nickName) {
    return registerUser(user)
  } 

  
  login()
}

function login() {
  refreshToken()
  return '로그인 성공'
}
```

### 부정 조건문 지양하기
부정 조건문을 추천하지 않는 이유: 실수할 가능성이 크기 때문에 
- 사람이 생각할 때 답답하다.. 조건을 보고 여러번 생각해야 할 수 있다. 
- 프로그래밍 언어 자체로 if문이 먼저 오고 true부터 실행시킨다.  
 
다음 처럼 조건 앞에 `!`을 추가해야 한다. 
```javascript
// 숫자일 때만 실행하는 로직 
if (!isNaN(3)) {
  console.log('숫자입니다')
}
```

함수를 만들어 위임하면 생각할 것이 적어짐 덜 헷갈린다. 
```javascript
function isNumber(num) {
  return !Number.isNaN(num) && typeof num === 'number'
}

if (isNumber(3)) {
  console.log('숫자입니다')
}
```

기본적으로 `if-else` 문에서 `if` (참인 경우) 부터 나온다. 두번 생각할 필요 없이 참일때 실행된다고 바로 생각하면 되는데 부정조건문을 쓰면 뒤집어서 한번 더 생각해야 함 

#### 부정조건문을 사용할 때 (예외적으로)
1. early return 사용 시
2. form validation 
3. 보안 혹은 검사하는 로직 

### Default Case 고려하기
```javascript
function sum(x, y) {
  x = x || 1 
  y = y || 1

  return x + y
}

sum(100, 200)
```

- 사용자에게 값을 전달받지 못했을 때 기본값을 정해놓는 것이 좋음 
- 엣지 케이스가 어디든지 도사리고 있을 수 있기 때문에 항상 조심하자. 
- 팀에서 코어 라이브러리를 개발하는 팀에선 이런 부분을 염두해 두고 개발, 안전하고 확장성 높은 코드를 작성할 수 있다. 
- **`parseInt`의 두번째 인자 생략하지 않기 명시적으로 전달해야 한다! 기본값은 10이 아니다.**  (강사가 두 번 정도 강조했다. 다른 섹션에서도...)
	- 지금까지 몰랐다. 단순히 사용만 했지 명세를 읽어보지 않았기 때문이라는 생각이 든다. 

`parseInt` 사용시 실수를 줄이기 위한 코드 
```javascript
function safeParseInt(number, radix) {
  return parseInt(number, radix || 10)
}
```

### 명시적인 연산자 사용 지향하기
연산자 우선순위를 무조건 외우는 것보다 조금 더 안전하게 연산자 우선순위를 사용하는 방법을 알아보자. 
1. **괄호 사용하기** 
2. 전위, 후위 증가,증감 연산자도 예측하기 힘들어서 헷갈리는 경우가 있음.  사용 지양하기 
```javascript
number-- // 보다
number = number -1 // 사용하기 
```

Redux가 추구하는 것 , 예측 가능한 상태 컨테이너  
-> **예측가능한 코드를 작성**해야 한다. 

### Nullish coalescing operator 
- 숫자 `0`은 falsy이기 때문에 `||` 로 논리 평가를 하면 분리하기 어렵다. 

```javascript
function createElement(type, height, width) {
  const element = document.createElement(type || 'div')

  element.style.height = String(height || 10) + 'px'
  element.style.width = String(width || 10) + 'px'

  return element
}

createElement('div', 0, 0) // -> 10px 10px div가 생성
// 0을 전달하면 falsy 이기 대문에 or 연산에서 분리가 어렵다. 
```

다음과 같이 nullish coalescing operator를 사용하면 된다. 
```javascript
function createElement(type, height, width) {
  const element = document.createElement(type ?? 'div')

  element.style.height = String(height ?? 10) + 'px'
  element.style.width = String(width ?? 10) + 'px'

  return element
}

createElement('div', 0, 0) // -> 0px 0px div가 생성
```
**`null`과 `undefined`를 사용할 때만 사용**
논리 연산자와 함께 사용하면 안 된다.  괄호로 감싸면 괜찮음 

### 드모르간의 법칙
- 조건이 복잡할 때 활용하기 
```javascript
// if (!(A || B)) {
// }

// if (!A && !B) {
// }
```

## 배열 다루기
### JavaScript의 배열은 객체다
그래서 배열을 다루는데 주의가 필요하다. 
```javascript
const arr = [1, 2, 3]

const obj = {
  0: 1,
  1: 2,
  2: 3
}
if (typeof arr === 'object') {}

if (arr in Array) {}

if (arr.length) {} // 문자열 프로퍼티에도 length가 있어서 `length`로 배열여부를 확인해선 안 된다. 
```

위 방법들 대신 `Array.isArray()` 활용하기
```javascript
const arr = '[1, 2, 3]'
Array.isArray(arr) // false 
```

### Array.length
```javascript
const arr = [1, 2, 3]
console.log(arr.length) 3 

arr.length = 10
console.log(arr.length) // 10
//arr -> [1, 2, 3, empty × 7]
```
`length`는 배열의 길이라기보단 마지막 인덱스에 가깝다. 주의해서 의식적으로 사용하기

### 배열 요소에 접근하기
- 인덱스를 통해 요소에 접근하는 것은 그 인덱스의 요소가 무엇을 의미하는지 바로 이해하기가 힘들다. 그래서 [[JavaScript-Destructuring-assignment|구조 분해 할당]]을 활용하는 것이 좋다.  
```javascript
// 0과 1이 무엇인지 바로 알기 어렵다. 
function operateTime(input, operators, is) {
  input[0].split('').forEach((num) => {
    cy.get('.digit').contains(num).click()
  })

  input[1].split('').forEach((num) => {
    cy.get('.digit').contains(num).click()
  })
}

// 다음과 같이 나누면 이해하기 쉽다. 
function operateTime(input, operators, is) {
  const [firstInput, secondInput] = inputs 
	
  firstInput.split('').forEach((num) => {
    cy.get('.digit').contains(num).click()
  })

  secondInput.split('').forEach((num) => {
    cy.get('.digit').contains(num).click()
  })
}

// 더 간단하게 하기 인자로 받을 때 부터 구조분해할당 
function operateTime([firstInput, secondInput], operators, is) {
  firstInput.split('').forEach((num) => {
    cy.get('.digit').contains(num).click()
  })

  secondInput.split('').forEach((num) => {
    cy.get('.digit').contains(num).click()
  })
}
operateTime([1, 2], 1, 2)

```

배열 요소가 하나만 있어도 구조분해할당이 가능하다.
```javascript
function formatDate(targetDate) {
  const [date] = targetDate.toISOString().split('T')

  const [year, month, day] = date.split('-')
  
  return `${year}년 ${month}월 ${day}일`
}
```

유틸 함수를 사용해도 된다. 
[lodash](https://www.geeksforgeeks.org/lodash-_-head-method/) 처럼 함수 만들기  
```javascript
function head(arr) {
  return arr[0] ?? ''
}
```

### 유사 배열 객체
```javascript
const arrayLikeObject = {
  0: 'HELLO',
  1: 'WORLD',
  length: 2
}

const arr = Array.from(arrayLikeObject) // ['HELLO', 'WORLD']
Array.isArray(arrayLikeObject) // false 
Array.isArray(arr) // true 
```
[[JavaScript-Array-Like-Object|유사 배열 객체]] 는 `Array.isArray`를 사용해서 확인하면 `false`다. 
- `NodeList`
- `arguments` 
	- 함수 내부에 갖고 있는 유사배열객체  
- 고차 함수가 동작하지 않는다. 
	- `Array.from`으로 배열로 바꿔주면 동작 
	
### 불변성
```javascript
const originonArray = ['123', '456', '789']

const newArray = originArray

originArray.push(10)
originArray.push(11)
originArray.push(12)
originArray.unshift(0)
```
위 코드를 실행해보면, `originArray`를 변경시켰는데 **`newArray`도 영향을 받는다.** 

#### 불변성 지키는 방법
1. 배열을 복사한다.
2. 새로운 배열을 반환하는 메서드들을 활용한다.  -> 고차 함수 
```javascript
const newArray = [...originArray]
```

### for 문 배열 고차 함수로 리팩터링
배열 고차 함수를 사용하면 [[Declarative-Programming|선언적 프로그래밍]]이 가능해진다. 

### 배열 메서드 체이닝 활용하기
[[Higher-Order-Function|배열 고차 함수]]는 결과 배열을 다시 배열 메서드에 사용할 수 있다. 

### map vs forEach 
- `map`은 새 배열을 반환한다. `forEach`는 반환하지 않는다. 그저 순회만 한다. 
- 그렇다고 `map`만 사용할 필요는 없다. 무언가 반환이 필요 없다면 `forEach`를 사용해도 된다. 
- 명세에 맞게 사용하기 

### Continue & Break 
배열 고차 함수에서는 `continue`와 `break`가 먹히지 않는다.   
그래서 조기에 반복문 종료가 가능한 메서드들을 잘 조합해서 흐름 제어도 가능하다.   
- 조기에 반복문 종료가 가능한 메서드
	- `for`, `for in`, `for of` 사용하기 
	-  `every`, `some`, `find`, `findIndex` 

## 객체 다루기
### Shorthand Properties
```javascript
const counterApp = combineReducers({
  counter,
  extra,
})
```

```javascript
const firstName = 'poco'
const lastName = 'jang'

const person = {
  firstName,
  lastName,
  getFullName() {
    return this.firstName + ' ' + this.lastName 
  }
}
```
- 소스코드를 보고 단축 속성을 사용했는지 아닌지 확인할 수 있다. 
- 리팩터링할 때 일관성있게 작업하기 

### Computed Property Name
```javascript
const [state, setState] = useState({
  id: '',
  password: '',
})

const handleChange = (e) => {
  setState({
    [e.target.name]: e.target.value // computed property name 
  })
}

return (
  <React.Fragment>
    <input value={state.id} onChange={handleChange} name="name" />
    <input value={state.password} onChange={handleChange} name="password" />
  </React.Fragment>
)
```
리액트에서 제공하는 기능인지, 자바스크립트 코드인지 헷갈려서 실수하는 경우가 많다. 
  
```javascript
const noop = createAction('INCREMENT')

const reducer = handleActions(
  {
    [noop]: (state, action) => ({ // 메서드 
      counter: state.counter + action.payload,
    })
  },
  { counter: 0 },
)
```
라이브러리 도구 사용시, 자바스크립트 문법을 잘 알아야 코드를 읽기 쉽다. 


### Lookup Table 
**순람표** 
- 배열 데이터 구조에서 키와 밸류로 나열된 표 
- `if`문이 너무 길어질 경우에 `switch case` 문 사용하기 

```javascript
function getUserType(type) {
  switch (key) {
    case 'ADMIN':
      return '관리자'
    case 'INSTRUCTOR':
      return '강사'
    case 'STUDENT':
      return '수강생'
    default:
      return '해당 없음'
  }
}
```

Coumputed property name 로 변경 
```javascript
function getUserType(type) {
  const USER_TYPE = {
    ADMIN: '관리자',
    INSTRUCTOR: '강사',
    STUDENT: '수강생',
    UNDEFINED: '해당 없음'
  }

  return USER_TYPE[type] ?? USER_TYPE['UNDEFINED']
}

console.log(getUserType('Hello'))

```

```javascript
function getUserType(type) {
  return (
    {
      ADMIN: '관리자',
      INSTRUCTOR: '강사',
      STUDENT: '수강생',
	}[type] ?? '해당 없음'
  )
}

console.log(getUserType('Hello'))
```

### Object Destructuring
매개변수의 순서가 정해져 있는 것은 문제가될 수 있다.  
```javascript
function Person(name, age, location) {
  this.name = name
  this.age = age
  this.location = location 
}
```

[[JavaScript-Destructuring-assignment|구조 분해 할당]] 사용하기 
매개변수의 순서가 바뀌어도 상관없고 매개변수에 원치 않는 값은 넘기지 않아도 되어서 좋다. 
```javascript
function Person({ name, age, location }) {
  this.name = name
  this.age = age
  this.location = location 
}

const poco = new Person({
  name: 'poco',
  age: 33,
  location: 'korea'
})
```

특정 인자를 필수로 받아야하는 경우엔 다음과 같이 할 수 있다. 
```javascript
function Person(name, { age, location }) {
  this.name = name
  this.age = age 
  this.location = location 
}

const poco = new Person(name, {
  age: 33,
  location: 'korea'
})
```

배열의 길이가 길 경우 
```javascript
const orders = ['First', 'Second', 'Third']
const st = orders[0]
const rd = orders[2] 
// 위 처럼 인덱스로 가져오는 대신
const [first, , third] = orders 
// 또는 
// 배열의 길이가 길면 아래와 같이 사용하는 것이 좋다. 
const { 0: st2, 2: rd2 }  = orders 
console.log(st2) // First
console.log(rd2) // Third 
```

### Object.freeze
[[JavaScript-Property-Attributes|객체 동결하기]] 
```javascript
const STATUS = Object.freeze({
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
})

STATUS.NEW_PROP = 'P2' // 추가되지 않는다.


// 동결 확인 
Object.isFrozen(STATUS.SUCCESS) // true 
```
shallow copy vs deep copy
`Object.freeze`는 shallow 
```javascript
const STATUS = Object.freeze({
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  OPTIONS: {
    GREEN: 'GREEN',
    RED: 'RED',
  }
})

// 동결 확인 
Object.isFrozen(STATUS.OPTIONS) // false 

STATUS.OPTIONS.GREEN = 'G'  // 가능 
STATUS.OPTIONS.YELLOW = 'Y' // 가능 
delete STATUS.OPTIONS.RED   // 가능 
```

중첩 프리징을 하는 법 
1. 대중적인 유틸 라이브러리 (lodash)
2. 직접 유틸 함수 생성 (개인/팀내에서)
	- 객체를 순회
	- 값이 객체인지 확인
	- 객체면 재귀 
	- 그렇지 않으면 `Object.freeze`
3. stackoverflow
4. TypeScript 사용하기 -> readonly 

### Prototype 조작 지양하기
```javascript
class Car {
  constructor(name, brand) {
    this.name = name
    this.brand = brand
  }

  sayName() {
    return this.brand + '-' + this.name
  }
}

const casper = new Car('캐스퍼', '현대')
```
프로토타입을 지양해야 하는 이유 
- 자바스크립트가 발전했기 때문에 -> Class 가 생김 
	- 추가 기능은 직접 만들어서 모듈화 => 배포 (NPM)
- 자바스크립트의 내장 객체(Built-in Object)를 건드리지 말자. 굉장히 위험한 행동 

### hasOwnProperty
```javascript
const person = {
  name: 'hhhh'
}

person.hasOwnProperty('age') // false 
person.hasOwnProperty('name') // true 
```

```javascript
const foo = {
  hasOwnProperty: function () {
    return 'hasOwnProperty'
  },
  bar: 'string'
}

foo.hasOwnProperty('bar') // hasOwnProperty

Object.prototype.hasOwnProperty.call(foo, 'bar') // true 

// 매번 적기 귀찮으니 함수로 호출하기 
function hasOwnProp(targetObj, targetProp) {
  return Object.prototype.hasOwnProperty.call(targetObj, targetProp)
}
```
알아두면 좋다. 언젠가는 코드 작성시에 의미있게 도움이 될 수 있음 
`call`을 사용하는 대신 [[JavaScript-Prototype|Object.hasOwn()]]을 사용하자!

### 직접 접근 지양하기
```javascript
const model = {
  isLogin: false,
  isValidToken: false,
}

function login() {
  model.isLogin = true 
  model.isValidToken = true 
}

function logout() {
  model.isLogin = false
  model.isValidToken = false 
}
```

객체에 직접 접근하지 않고 따로 함수로 빼기
- 객체를 수정하는 영역의 레이어를 따로 분리하는 것 
- 추상화하는 것 
- 코드를 안전하게 변화시킬 수 있다.
- 객체의 변화가 어디서 일어나는지 예측이 가능해진다. 
```javascript
// 객체에 대신 접근 
function setLogin(bool) {
  model.isLogin = bool
}
function setValidToken(bool) {
  model.isValidToken = bool
}

// 객체에 직접 접근x, 제공된 함수 사용하기 
function login() {
  setLogin(true)
  setValidToken(true)
}
```
`getter`와 `setter`라는 접근자도 제공된다. 

### Optional Chaning

### Extends & Mxin 

## 함수 다루기
### 함수, 메서드, 생성자 
```javascript
// 함수
function func() {
  return this
}

// 객체의 메서드
const obj = {
  method() {
    return this
  }
}

// 생성자 함수 
// Class가 나와서 사용할 일이 잘 없다. 하지만 누군가는 사용하고 있으니 알아두기
function Func() {
  return this
}
```

자바스크립트의 함수는 [[JavaScript-First-Class-Object|1급 객체]]이기 때문에 변수나 데이터에 담을 수 있다.
매개변수로 전달 가능 ([[JavaScript-Function|콜백 함수]])
함수가 함수를 반환 ([[Higher-Order-Function|고차 함수]])

#### 함수와 this
어떤 함수냐에 따라 [[JavaScript-this|this]]가 가리키는 값이 다르다.
- 함수의 `this` 는 전역 객체
- 메서드의 `this`는 호출한 객체 
- 생성자 함수의 `this`는 생성될 인스턴스 

### argument & parameter
- 함수를 정의할 때는 parameter 
- 함수를 사용하고 있는 곳에서 argument 
- 함수의 paramter는 함수의 정의 부분에 있는 이름들 
- 함수의 argument 함수로 전달되는 진짜 값 
- Paramter (Formal Parameter)
	- 형식을 갖춘 매개변수 
- Argument (Actual Parameter)
	- 실제로 사용되는 인자 

### 복잡한 인자 관리하기
인자의 갯수는 갯수에 따른 맥락을 유추할 수 있을 정도로 지정해야 한다. 
```javascript
function toggleDisplay(isToggle) {}

function sum(sum1, sum2) {}

function genRandomNumber(min, max) {}

function timer(start, stop, end) {}

function genSquare(top, right, bottom, left) {}

```

복잡한 인자 객체로 주고받기 
ES2015 부터는 디스트럭쳐링 사용하기 
```javascript
function createCar({ name, brand, color, type }) {
  return {
    name,
    brand, 
    color,
    type 
  }
}
```

### Default Value
함수를 안전하게 사용하는 방법 중 하나는 인자의 기본값 정하는 것 
```javascript
function createCarousel({ margin = 0, center = false, navElement = 'div' } = {}) {

  return {
    margin,
    center,
    navElement
  }
}

console.log(createCarousel())
```


함수를 넘겨서 필수 매개변수를 받을 수도 있다. 
```javascript
const required = argName => {
  throw new Error(`required is ${argName}`)
}

function createCarousel({
  margin = required('margin'),
  center = false,
  navElement = 'div'
} = {}) {
  // ... some code 
}
```

### Rest Parameters 
가변인자를 받을 경우에 [[JavaScript-Rest-Parameter|나머지 매개변수]]를 사용할 수 있다.
원래 `arguments` 객체를 사용하면 되는데, 추가적인 인자를 받을 수 없는 문제가 있다.
Rest Parameter로 들어온 값은 배열이기 때문에 배열 메서드를 사용할 수 있다. 
```javascript
function sumTotal(...args) {
  return args.reduce(
    (acc, curr) => acc + curr
	)
}
```

추가적인 인자도 받을 수 있다.
```javascript
function sumTotal(init, ...args) {
  console.log(init)
  return args.reduce(
    (acc, curr) => acc + curr
	)
}
```

### void & return 
```javascript
function handleClick() {
  return setState(false)
}

function showAlert(message) {
  return alert(message)
}
```
문제가 없다고도 볼 수 있지만 이런 코드는 줄여 나가야 한다.
기본적으로 `setState`와 `alert`은 `void` 함수, 굳이 `return`을 넣을 필요가 없다.  의도가 불분명해짐...
자바스크립트는 리턴 값이 없을 때 `undefined`를 리턴한다. 
불필요한 리턴을 사용하는 것은 내가 사용하는 api들의 리턴값 여부를 확인하는 습관이 덜 되었을 수 있다는 것

리턴이 있을법한 네이밍
- `is`, `get`

### 화살표 함수
[[JavaScript-Arrow-Function|화살표 함수]]를 무조건 사용할 필요도 없고 사용하지 않을 이유도 없다. 

#### 화살표 함수를 사용하지 않을 이유 ? 
1. 화살표 함수를 메서드로 사용할 때 화살표 함수의 `this`는 전역 공간을 가리킨다.
화살표 함수는 렉시컬 스코프를 가지게 된다. 호출된 객체를 `this`로 바라보는 것이 아닌 렉시컬 스코프로 상위 문맥을 따른다. 
```javascript
const user = {
  name: 'Poco',
  getName: () => {
    return this.name
  }
}
```

2. 화살표 함수는 `arguments`, `call`, `apply`, `bind`를 사용할 수 없다. 
- `arguments`를 사용하고 싶다면 [[JavaScript-Rest-Parameter|나머지 매개변수]]를 사용하면 된다. 

3. 화살표 함수는 생성자 함수로 사용할 수 없다. 

4. 클래스를 다룰 때 화살표 함수는 생성자 함수 내에서 초기화가 되어버린다. 그래서 자식 클래스에서 사용할 수 없다. 
```javascript
class Parent {
  parentMethod() {
    console.log('parentMethod')
  }

  parentMethodArrow = () => {
    console.log('parentMethodArrow')
  }

  overrideMethod = () => {
    return 'Parent'
  }
}

class Child extends Parent {
  childMethod() {
    super.parentMethod()
  }

  overrideMethod() {
    return 'Child'
  }
}

const child1 = new Child().overrideMethod(); // Parent
// 부모의 메서드가 호출된다. 화살표가 아닌 일반 함수로 만들면 오버라이드 된다. 
```
5. 화살표 함수는 `yield` 키워드와 함께 사용할 수 없다. 

**앞서 나온 이유들로 인해 맹목적으로 사용하면 오류를 만날 수도 있다.** 

### Callback Function
콜백 함수는 [[JavaScript-Asynchronous-Programming|비동기]]를 제어하는 기법이라고만 생각하는 경우가 간혹 있다. 하지만 함수의 제어권을 다른 함수에 위임하는 기능도 있다.  
```javascript
function register() {
  const isConfirm = confirm(
    '회원가입에 성공했습니다.'
  )

  if (isConfirm) {
    redirectUserInfoPage()
  }
}

function login() {
  const isConfirm = confirm(
    '로그인에 성공했습니다.'
  )

  if (isConfirm) {
    redirectIndexPage()
  }
}
```
위 코드에서 `confirm` 에 전달하는 메시지도 다르고, 확인 후에 실행되는 함수도 서로 달라서 두 개의 함수가 만들어져 있다. 이런 경우 리팩터링을 어떻게 할 수 있을까?  -> callback function 사용하기 

```javascript
function confirmModal(message, cbFunc) {
  const isConfirm = confirm(message)

  if(isConfirm && cbFunc) {
    cbFunc()
  }
}

function register() {
  cconfirmModal('회원가입에 성공했습니다.', redirectUserInfoPage)
}

function login() {
  cconfirmModal('로그인에 성공했습니다.', redirectIndexPage)
}
```
**콜백 함수로 함수를 위임했다.**


### 순수 함수
[[Functional-Programming|순수 함수]]란 side effects를 만들지 않는 함수를 말한다.  
[side effects](https://ko.redux.js.org/tutorials/fundamentals/part-6-async-logic/#redux-middleware-and-side-effects)
-   Logging a value to the console
-   Saving a file
-   Setting an async timer
-   Making an AJAX HTTP request
-   Modifying some state that exists outside of a function, or mutating arguments to a function
-   Generating random numbers or unique random IDs (such as `Math.random()` or `Date.now()`)

```javascript
let num1 = 10
let num2 = 20

function impureSum1() {
  return num1 + num2
}

function impureSum2(newNum) {
  return num1 + newNum
}
```
순수 함수는 호출할 때마다 일관적인 값을 반환해야 하는데 위 `impureSum1`은 함수 외부의 변수가 변경될 때 값이 변경된다. 즉 비순수 함수다. `impureSum2`도 마찬가지이다.  
이렇게 사이드 이펙트가 있다면 코드를 예측하는 것이 어려워진다.
  
순수 함수는 다음 코드와 같이 side effects를 만들지 않는 함수이다.  
```javascript
function pureSum(num1, num2) {
  return num1 + num2
}
```

  
```javascript
const obj = { one: 1 }

function changeObj(targetObj) {
  targetObj.one = 100

  return targetObj
}

changeObj(obj)
obj // { one: 100 } , 변경되어 있다! 비순수 함수 
```
객체나 배열을 조작하는 함수를 만들 때는 새로운 객체와 배열을 리턴해줘야 한다.  

```javascript
const obj = { one: 1 }

function changeObj(targetObj) {
  return {...targetObj, one: 100 }
}

changeObj(obj)
obj // { one: 1 } , 원래 객체의 값은 그대로, 순수 함수 
```
**항상 순수 함수를 만든다는 의식적인 생각을 가지고 코드를 작성하는 것이 좋다.**  
자바스크립트 레퍼런스 타입을 사용하는 경우에는 항상 새 값을 반환하는 함수를 만들자! 

### Closure 
```javascript
function add(num1) {
  return function sum(num2) {
    return num1 + num2
  }
}

const addOne = add(1)(3) // 4
const addTwo = add(2)
addTwo(1) // 3
```
[[JavaScript-Closure|클로저]] 코드를 볼 때, 괄호의 갯수를 보고 그 괄호들이 모두 호출되면 완벽히 함수가 호출되고 종료된다고 보면 된다. 

```javascript
function add(num1) {
  return function (num2) {
    return function (calculateFn) {
      return calculateFn(num1, num2)
    }
  }
}

function sum(num1, num2) {
  return num1 + num2
}

function multiple(num1, num2) {
  return num1 * num2
}

const addOne = add(1)(2)
const sumAdd = addOne(sum) 
const sumMultiple = addOne(multiple)
```
`sumAdd`와 `sumMultiple` 는 `addOne`이라는 함수를 똑같이 호출해도 각자의 컨텍스트를 가지고 있다. 

```javascript
function log(value) {
  return function (fn) {
    fn(value)
  }
}

const logFoo = log('foo')

logFoo((v) => console.log(v))
logFoo((v) => console.info(v))
logFoo((v) => console.error(v))
logFoo((v) => console.warn(v))
```
위 코드를 클로저를 사용하지 않았다면 `if`문이 떡칠되었을 수 있다...

```javascript
const arr = [1, 2, 3, 'A', 'B', 'C']

const isNumber = (value) => typeof value === 'number'
const isString = (value) => typeof value === 'string'

arr.filter(isNumber)
arr.filter(isString)
```

클로저를 활용하면 중복되는 코드를 하나로 합칠 수 있다. 
```javascript
function isTypeOf(type) {
  return function(value) {
    return typeof value === type
  }
}

const isNumber = isTypeOf('number')
const isString = isTypeOf('string')

arr.filter(isNumber)
arr.filter(isString)
```

클로저를 사용하는 또 다른 예시 
```javascript
function fetcher(endpoint) {
  return function (url, options) {
    return fetch(endpoint + url, options)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
			throw new Error(res.error)
		  }
		})
	    .catch((err) => console.error(err))
	}
}

const naverApi = fetcher('http://~')
const daumApi = fetcher('http://~')

naverApi.fetch('/webtoon').then(res => res)
daumApi.fetch('/search').then(res => res)
```

[[JavaScript-Debounce-Throttle|디바운스와 스로틀]] 
```javascript
someElement.addEventListener('click', debounce(handleClick, 500))

someElement.addEventListener('click', throttle(handleClick, 500))
```

#### Todo 
- 무엇때문에 이렇게 동작을 하는걸까 생각해보기
- 코드를 작성할 때 의도적으로 클로저를 사용하면서 코드를 리팩터링 해보기 
- 단점이 무엇인지, 메모리가 어떤 문제점을 겪는지 
- [[Dynamic-Programming|메모이제이션]] 관련 코드 작성해보기 

### 고차 함수
### Currying 

## 추상화하기
### Magic Number
### 네이밍 컨벤션
### 레이어 분리하기
### 관심사 분리하기

## 에러 다루기
### 유효성 검사
### 사용자에게 알려주기
### try ~ catch


## Brower & Web API
### HTML Semantic Element
### NodeList
### DOM
### DOM API 접근 추상화
### insertAdjacentHTML 
### innerHTML
### appendChild()
### Event Handling
### Data Attributes
### Fetch 

## 도구에 위임하기
### Husky
### Lint
### Formatting Tool

## 함께 하기
### 공백
### indent depth
### Tab vs Space
### 스타일 가이드
### 정적 타이핑을 도입해야하는 이유
### 클린 코드 학습 자료 추천 