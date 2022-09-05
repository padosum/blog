---
title   : Javascript 정규 표현식
date    : 2020-01-31 19:37:16 +0900
updated : 2022-09-05 19:47:36 +0900
aliases : ["JavaScript 정규 표현식"]
tags: ["JavaScript"]
---
## 정규 표현식?
특정한 규칙을 가진 문자열의 집합을 표현하는 데 사용하는 [형식 언어](https://ko.wikipedia.org/wiki/%ED%98%95%EC%8B%9D_%EC%96%B8%EC%96%B4 "형식 언어")이다.
자바스크립트의 정규 표현식은 원하는 패턴에 일치하는 문자열을 추출하거나 치환할 수 있는 기능을 가지고 있다.  

## 정규 표현식 생성 
정규 표현식 객체(`RegExp`)를 생성하는 방법에는 정규 표현식 리터럴과 `RegExp` 생성자 함수를 이용하는 방법이 있다.  
패턴과 플래그로 구성된다.
### 정규 표현식 리터럴
```javascript
const str = '험프티 덤프티 담 위에 앉아있었네.';

const regexp = /프티/g;
regexp.test(str); // true
```

### `RegExp` 생성자 함수
```javascript
const str = '험프티 덤프티 담 위에 앉아있었네.';

const regexp = new RegExp(/프티/g);
regexp.test(str); // true
```

## 플래그
플래그는 옵션이라 선택적으로 사용할 수 있고, 여러 개 사용도 가능하다.   

| 플래그 | 설명 |  
| --- | --- |
|  `g`  | 전역 검색 |
| `i`  | 대소문자 구분 없는 검색  |
|  `m`  | 다중 행 검색(행이 바뀌더라도 계속 검색) |

## `RegExp` 메서드  

### `RegExp.prototype.exec()`
인수로 전달받은 문자열에 대해 정규 표현식 패턴을 검색해 매칭 결과를 배열로 반환한다. 매칭 결과가 없다면 `null`을 반환한다.
```javascript
const str = '험프티 덤프티 담 위에 앉아있었네.';

const regexp = /프티/g;
regexp.exec(str); 
// ["프티", index: 1, input: "험프티 덤프티 담 위에 앉아있었네.", groups: undefined]
```
- **`g` 플래그를 사용해도 첫 번째 매칭만 반환한다**.  


### `RegExp.prototype.test()`
인수로 전달받은 문자열에 대해 정규 표현식 패턴을 검색해 매칭 결과를 불리언 값으로 반환한다. 매칭되는 값이 있으면 `true`, 없으면 ``
```javascript
const str = '험프티 덤프티 담 위에 앉아있었네.';

const regexp = /프티/g;
regexp.test(str); // true
```

### `String.prototype.match()`
`exec` 메서드 처럼, 인수로 전달받은 문자열에 대해 정규 표현식 패턴을 검색해 매칭 결과를 배열로 반환한다. **`g` 플래그를 사용하면 모든 매칭 결과를 반환한다.**
```javascript
const str = '험프티 덤프티 담 위에 앉아있었네.';

const regexp = /프티/g;
str.match(regexp); // ["프티", "프티"]
```

### `String.prototype.replace()`
대상 문자열에서 인수로 전달받은 정규 표현식 또는 문자열과 매치되는 문자열을 검색하고 그 문자열을 두 번째 인수로 전달한 문자열로 치환한 문자열을 반환한다. 말 그대로 문자열의 원하는 부분을 다른 원하는 문자열로 교체하는 메서드
```javascript
const str = 'http://google.com';

str.replace(/^http:\/\//i, 'https://'); // "https://google.com"
```

### `String.prototype.search()`
대상 문자열에서 인수로 전달받은 정규 표현식과 매치되는 문자열을 검색해 인덱스를 반환한다. 검색할 수 없으면 `-1`을 반환한다.  
```javascript
const str = 'Hello World';

str.search(/Hell/); // 0
str.search(/\d/);   // -1
```

## 패턴
패턴은 `/`로 열고 닫는다. 따옴표를 포함하면 따옴표까지도 패턴에 포함되어 검색된다.  
### 임의의 문자열 검색하기
`.`은 임의의 문자 한 개를 의미한다. 다음과 같이 사용할 수 있다.
```javascript
const str = '간장 공장 공장장은 강 공장장이고 된장 공장 공장장은 공 공장장이다';
const regexp = /../g;
str.match(regexp); 
// ["간장", " 공", "장 ", "공장", "장은", " 강", " 공", "장장", "이고", " 된", "장 ", "공장", " 공", "장장", "은 ", "공 ", "공장", "장이"]
```
### 반복해서 검색하기
`{m, n}` 패턴은 앞의 패턴이 최소 `m`번, 최대 `n` 번 반복되는 문자열을 의미한다. 다음 코드는 '장'이 최소 1번, 최대 2번 반복되는 문자열들을 검색한다.  
```javascript
const str = '간장 공장 공장장은 강 공장장이고 된장 공장 공장장은 공 공장장이다';
const regexp = /장{1,2}/g;
str.match(regexp); 
// ["장", "장", "장장", "장장", "장", "장", "장장", "장장"]
```
`+`는 앞의 패턴이 최소 한번 이상 반복되는 문자열을 의미한다.  
```javascript
const str = '간장 공장 공장장은 강 공장장이고 된장 공장 공장장은 공 공장장이다';
const regexp = /장+/g;
str.match(regexp);
// ["장", "장", "장장", "장장", "장", "장", "장장", "장장"]
```

### OR 검색하기  
`|`은 OR을 의미한다.  
```javascript
const str = '간장 공장 공장장은 강 공장장이고 된장 공장 공장장은 공 공장장이다';
const regexp = /간|된/g;
str.match(regexp); // ["간", "된"]
```
`[]` 내의 문자는 OR로 동작한다. 거기서 범위를 지정하려면 `[]` 내에 `-`를 사용한다. 
```javascript
const str = 'Humpty Dumpty sat on a wall';

const regexp = /[A-Z]/g; // 대문자 알파벳 찾기 
str.match(regexp); // ["H", "D"]
```

```javascript
const str = 'Humpty Dumpty sat on a wall';

const regexp = /[A-Za-z]/g; // 대소문자 구별하지 않고 알파벳 찾기 
str.match(regexp);
// ["H", "u", "m", "p", "t", "y", "D", "u", "m", "p", "t", "y", "s", "a", "t", "o", "n", "a", "w", "a", "l", "l"]
```

```javascript
const str = 'Humpty Dumpty sat on a wall';

const regexp = /[A-Za-z]+/g; // 대소문자가 하나 이상 반복되는 문자 찾기  
str.match(regexp); // ["Humpty", "Dumpty", "sat", "on", "a", "wall"]
```

```javascript
const str = 'Once I was 20 years old, my story got told';

const regexp = /[0-9]+/g; // 숫자 찾기(숫자가 하나 이상 반복되는 문자)
str.match(regexp);  // ["20"]

const regexp = /\d/g; // \d는 [0-9]와 같다.
str.match(regexp);    // ["2", "0"]

const regexp = /\D+/g; // \D는 숫자가 아닌 문자
str.match(regexp); 
// ["Once I was ", " years old, my story got told"]
```

```javascript
const str = 'Soon I\'ll be 60 years old, my daddy got 61';

const regexp = /\w+/g;   // \w는 알파벳, 숫자, 언더스코어를 의미
str.match(regexp); 
// ["Soon", "I", "ll", "be", "60", "years", "old", "my", "daddy", "got", "61"]
```

```javascript
const str = 'Soon I\'ll be 60 years old, my daddy got 61';

const regexp = /\W+/g;   // \W는 알파벳, 숫자 언더스코어가 아닌 문자
str.match(regexp); 
// [" ", "'", " ", " ", " ", " ", ", ", " ", " ", " "]
```

### NOT 검색하기  
`[]` 내의 `^`은 NOT을 의미한다.  
```javascript 
const str = 'Soon I\'ll be 60 years old';

const regexp = /[^0-9]+/g; // 숫자가 아닌 반복되는 문자 검색
str.match(regexp); // ["Soon I'll be ", " years old"]
```

### 위치로 검색하기  
```javascript
const phone = '010-1234-5678';

const regexp = /^010/g; // 010으로 시작하는지 확인
regexp.test(phone); // true
```

```javascript
const str = 'Humpty.md';
const str2 = 'Dumptee.html';
const regexp = /.md$/; // .md로 끝이 나는지 확인 
regexp.test(str); // true 
regexp.test(str2); // false
```

## 같이 보기
- [[Useful-Regex-Snippets-in-JavaScript|유용한 자바스크립트 정규표현식 코드 조각모음]]
- [RegExr - 정규표현식을 배우는 사이트](https://regexr.com/)

## reference
- [MDN Web Docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions)
