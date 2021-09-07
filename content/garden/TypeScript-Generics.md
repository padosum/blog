---
title   : TypeScript Generics 
date    : 2021-09-07 16:48:44 +0900
updated : 2021-09-07 16:49:01 +0900
aliases : ["제네릭"]
private : false
hidden  : false
showReferences : true
---
- 호출하는 시점에 타입을 넘겨줄 수 있다.  
```typescript
function logText<T>(text: T): T {
	console.log(text)
	return text
}
logText('hello')  
logText<string>('hello') // 명시해서 호출  
```
- ES6 arrow function 사용시 
```typescript
console logText = <T>(text: T):T => {
	console.log(text)
	return text 
}
```
	- [https://stackoverflow.com/questions/32308370/what-is-the-syntax-for-typescript-arrow-functions-with-generics](https://stackoverflow.com/questions/32308370/what-is-the-syntax-for-typescript-arrow-functions-with-generics)  
	
## 제네릭 사용의 장점  
- 함수의 파라미터에 여러가지 타입을 넘기고 싶은 경우에 함수를 여러개 만들면 코드가 중복되어 유지보수 관점에서 좋지 않다.  
- 유니온 타입을 사용하면 타입들의 공통된(교집합)의 속성만 사용되고 타입 추론이 정확히 되지 않는 문제가 있다.  
- 제네릭을 이용하면 코드의 중복도 줄이고, 타입이 호출된 시점에 정의되어 반환값의 타입도 추론이 된다. 타입관련 코드돌 줄일 수 있다.  

## 인터페이스에서 제네릭 선언하기  
```typescript
interface DropdownItem<T> {
	value: T;
	version: number; 
} 
```

- reference 
	- [https://inf.run/RqLt](https://inf.run/RqLt)  
