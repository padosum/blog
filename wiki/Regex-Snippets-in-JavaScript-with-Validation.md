---
title   : 유효성 검사를 위한 정규표현식
date    : 2022-11-07 23:13:40 +0900
updated : 2022-11-08 00:15:03 +0900
aliases : ["유효성 검사를 위한 정규표현식"]
tags    : ["JavaScript", "How to"]
draft : false
---

## Goal
정규표현식을 매번 검색하기 귀찮으니 조금이라도 수고를 덜기 위해 기록해두자. 
그리고 사용할 때마다 어떻게 이렇게 될 수 있는지 파악하는 시간을 가졌으면 좋겠다.

## 이메일
```js
const emailPattern = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]{2,3})$/
```
[참고 자료](https://jh91.tistory.com/entry/javescript-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%82%AC#rp)
@ 앞에는 숫자, 영어 대소문자, `_`와 `.`, `-`이 들어갈 수 있고 
뒤에는 숫자, 영어 대소문자, `_`와 `-` 그리고 `.`이 오고 또 숫자, 영어 대소문자, `_`와 `-`  그리고 2~3자리여야 한다. (ex. `.com`, `.net` 처럼)
[읽어 보기](https://www.w3resource.com/javascript/form/email-validation.php)


## 전화번호

### 하이픈 자동 완성
```js
target.value = target.value
					.replace(/[^0-9]/g, '')
					.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
					.replace(/(\-{1,2})$/g, '');
```

- `replace(/[^0-9]/g, '')`: 숫자를 제외한 값은 삭제
- `replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')`: 3자리, 4자리, 4자리의 숫자를 `$1-$2-$3`형태로 변환
	- `replace(/(\-{1,2})$/g, '')`: 변환한 문자열에서 끝자리 부분에 `--` 가 연속되면 삭제 -> 숫자가 다 입력되지 않으면 전 단계에서 `010--` 처럼 변환될 수 있어서

### 유효성 검사
```js
const phoneNumberPatter = /^[0-9]{3}-[0-9]{4}-[0-9]{4}/
// 000-0000-0000
```
- 숫자3자리-숫자4자리-숫자4자리 형식

## 닉네임

```js
const nicknamePattern = /^[A-Za-z0-9가-힣]{5,11}$/;
```
- 영어 대소문자, 숫자, 한글 가능
- 5자리에서 11자리

## 비밀번호
```js
const passwordValidator = password => {
  const checkAlphabetNumber = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,}$/.test(password); // 영어 대소문자, 숫자 조합 10자리 이상

const checkAlphabetSpecialSymbol = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{10,}$/.test(password); // 영어 대소문자, 특수문자 조합 10자리 이상

const checkSpecialSymbolNumber = /^(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{10,}$/.test(password); // 특수문자, 숫자 조합 10자리 이상

if (
    !(
      checkAlphabetNumber ||
      checkAlphabetSpecialSymbol ||
      checkSpecialSymbolNumber
    )
  ) {
    message =
      '10자 이상 영어 대문자, 소문자, 숫자, 특수문자 중 2종류를 조합해야 합니다.';
    return message;
  }

  if (/(.)\1\1/.test(password)) {
    message = '같은 문자를 3개 이상 입력할 수 없습니다.';
    return message;
  }

  if (
    /(012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210)+/gi.test(
      password
    )
  ) {
    message = '연속된 숫자를 3개 이상 입력할 수 없습니다.';
    return message;
  }
}
```
연속된 숫자는 어떻게 하는지 고민이었는데 생각보다 가짓수가 많지 않았다. [[Brute-Force-Search-Algorithm|완전 탐색]]이 생각났다.

## 날짜

## 포맷팅
```js
target.value = target.value
    .replace(/[^0-9]/g, '')
    .replace(/(\d{4})(\d{2})(\d{2})/g, '$1.$2.$3');
```
- 숫자 아닌 것 지우기
- `4자리숫자.2자리숫자.2자리숫자` 형식으로 변환

## 유효성 검사
```js
const birthPattern = /^(19[0-9][0-9]|20\d{2}).(0[1-9]|1[0-2]).(0[1-9]|[1-2][0-9]|3[0-1])$/;
```
- `19**년 ~ 20**년`
- `01월 ~ 12월`
- `31 일`
- 30일까지 있는 달과 31일까지 있는 달은 구별 x




## reference
- [https://stackoverflow.com/questions/7147810/regular-expression-same-character-3-times](https://stackoverflow.com/questions/7147810/regular-expression-same-character-3-times)