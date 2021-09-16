---
title   : JavaScript 프로퍼티 어트리뷰트
date    : 2021-05-15 17:49:40 +0900
updated : 2021-09-15 21:14:04 +0900
aliases : 
tags: ["JavaScript"]
---
## 프로퍼티 어트리뷰트 
[[JavaScript-Object|객체]]는 이름과 값으로 구성된 프로퍼티들의 정렬되지 않은 집합이다. 프로퍼티의 이름은 문자열, 객체는 문자열을 값에 대응시키는 구조라 할 수 있는데 단순히 문자열과 값의 대응관계 뿐 아니라 객체가 가진 고유 프로퍼티를 유지하는 것 외에 **[[JavaScript-Prototype|프로토타입]]**이라고 하는 다른 객체의 프로퍼티를 상속받는다.  

객체로 가장 많이 하는 작업은, "객체 생성 → 프로퍼티 추가 → 질의, 삭제, 테스트, 열거" 이다. **객체의 각 프로퍼티는 이름과 값 외에 프로퍼티 속성(property attribute)라고 하는 연관된 값을 갖는다.**   


## 내부 슬롯, 내부 메서드? 
- ECMAScript 사양에서 프로퍼티의 특징을 내부적으로만 유효한 속성에 따라 설명한다. 
- 내부 슬롯, 내부 메서드는 [[JavaScript-Engine|자바스크립트 엔진]]의 구현 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 [[Pseudo Code|의사]] 프로퍼티와 [[Pseudo Code|의사]] 메서드이다. 
- 자바스크립트 엔진의 내부 로직이므로 직접 접근하거나 호출할 수 있는 방법은 제공되지 않는다. → 일부 내부 슬롯과 내부 메서드에 한해 간접적으로 접근하는 수단은 제공된다.  
- ECMAScript 사양에 등장하는 `[[..]]`로 감싼 이름들이 내부 슬롯과 내부 메서드이다. 

### 예시  
- 모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 가지고 있다. 
- 자바스크립트 엔진의 내부 로직이므로 직접 접근할 순 없지만 `__proto__`를 통해 간접적으로 접근이 가능하다. 
```javascript
const o = {};
o.[[Prototype]] // 에러, 직접 접근할 수 없다. 
o.__proto__ // Object.prototype 
```

## 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체 
- 자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다. 
- 프로퍼티의 상태로는,
  - 프로퍼티의 값
  - 값의 갱신 가능 여부
  - 열거 가능 여부 
  - 재정의 가능 여부
- 프로퍼티 어트리뷰트는 내부 슬롯 `[[Value]]`, `[[Writable]]`, `[[Enumerable]]`, `[[Configurable]]`이다. 
  - 내부 슬롯이기에 직접 접근할 수 없지만 `Object.getOwnPropertyDescriptor`메서드를 이용해 간접적으로 확인이 가능하다. 
	  - 해당 메서드는 프로퍼티 어트리뷰트 정보를 제공하는 **프로퍼티 디스크립터 객체**를 반환한다. 
```javascript
const person = {
    name: 'Lee'
};
console.log(Object.getOwnPropertyDescriptor(person, 'name'));

person.age = 20;
console.log(Object.getOwnPropertyDescriptors(person)); 
// 모든 프로퍼티의 프로퍼티 어트리뷰터 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환 (ES8에서 도입됨)
```

## 데이터 프로퍼티, 접근자 프로퍼티
객체의 프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티가있다.  

### 데이터 프로퍼티 
- 키와 값으로 구성된 일반적인 프로퍼티 
- 데이터 프로퍼티의 프로퍼티 어트리뷰트 (자바스크립트 엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의된다. )
	- `[[Configurable]]` - 해당 프로퍼티가 delete를 통해 삭제하거나 , 프로퍼티의 속성을 바꾸거나, 접근자 프로퍼티로 변환할 수 있음을 나타냄. 객체에서 직접 정의한 모든 프로퍼티에서 이 속성은 기본적으로 true
	- `[[Enumerable]]` - for-in 루프에서 읽을 수 있는지 여부를 결정. 객체에서 직접 정의한 모든 프로퍼티에서 이 속성은 기본적으로 true
	- `[[Writable]]` - 프로퍼티 값을 바꿀 수 있음을 나타냄. 객체에서 직접 정의한 모든 프로퍼티에서 이 속성은 기본적으로 true
	- `[[Value]]` - 프로퍼티의 실제 데이터 값을 포함. 프로퍼티의 값을 읽는 위치이며 새로운 값을 쓰는 위치. 기본값은 undefined

### 접근자 프로퍼티
- 데이터 값이 들어 있진 않고 대신 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수( `getter`, `setter` )로 구성된다. 
	- `[[Get]]` - 프로퍼티를 읽을 때 호출할 함수 
	- `[[Set]]` - 프로퍼티를 바꿀 때 호출할 함수 
	- `[[Configurable]]` - 데이터 프로퍼티의 `[[Configurable]]`과 같다. 
	- `[[Enumerable]]` - 데이터 프로퍼티의 `[[Enumerable]]`과 같다. 

## 프로퍼티 정의
- 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것 
- `Object.defineProperty` 메서드를 사용하면 정의할 수 있다. 
```javascript
const person = {};

Object.defineProperty(person, 'firstName', {
    value: 'JungSeob',
    writable: true,
    enumerable: true,
    configurable: true
});

Object.defineProperty(person, 'lastName', {
    value: 'Lee'
});

// 접근자 프로퍼티 
let book = {
    _year: 2021,
	edition: 1 
};

Object.defineProperty(boo, "year", {
    get: function() {
	    return this._year;
	},
	set: function(newValue) {
	    if (newValue > 2010) {
		    this._year = newValue;
			this.edition += newValue - 2010;
		}
	}
});

console.log(book.year);
book.year = 2022;
console.log(book.edition); // 2 
```
- 정의할 때 프로퍼티 디스크립터 객체의 일부 프로퍼티를 생략 가능하다. 기본값이 적용된다.  
- `Object.defineProperties` 메서드를 사용하면 여러 개의 프로퍼티를 한 번에 정의 가능하다. 
- `_year`에서 `_`는 이 프로퍼티는 객체의 메서드를 통해서만 접근할 것이고 외부에서는 접근하지 않겠다는 의도를 나타낼 때 흔히 쓰는 표기법이다. 
- **접근자 프로퍼티는 프로퍼티의 값을 바꿨을 때 해당 프로퍼티만 바뀌는 것이 아니라 부수적인 절차가 필요한 경우에 사용한다.**

## 객체 변경 방지
- 객체는 변경 가능한 값이기에 재할당 없이 직접 변경이 가능하다. 방지하기 위한 다양한 메서드를 자바스크립트에서 제공하고 있다. 

### 객체 확장 금지
- `Object.preventExtensions` 
- 프로퍼티 추가 금지를 의미 
  - 원래는 프로퍼티 동적 추가와 `Object.defineProperty`메서드로 추가할 수 있는데 금지되는 것이다. 
- 프로퍼티 삭제는 가능하다. 
```javascript
const person = { name: 'Lee' };

// 확장 가능 객체인지 확인 
console.log(Object.isExtensible(person)); // true

Object.preventExtensions(person); // 확장 금지 처리 

console.log(Object.isExtensible(person)); // false 

person.age = 20; // 무시됨, strict mode에서는 에러 발생 
Object.defineProperty(person, 'age', { value: 20 }); // error 
```
### 객체 밀봉
- `Object.seal` 
- 밀봉(seal): 프로퍼티 추가 및 삭제, 프로퍼티 어트리뷰트 재정의 금지
```javascript
const person = { name: 'Lee' };

// 밀봉된 객체인지 확인 
console.log(Object.isSealed(person)); // false

// 밀봉 
Object.seal(person);

console.log(Object.isSealed(person)); // true 

// 프로퍼티 값 갱신은 가능 
person.name = 'Choi';
console.log(person); // {name: "Choi"}
```

### 객체 동결 
- `Object.freeze`  
- 객체 동결(freeze): 프로퍼티 추가 및 삭제, 프로퍼티 어트리뷰터 재정의 금지, 프로퍼티 값 갱신 금지 → 동결된 객체는 읽기만 가능 
```javascript
const person = { name: 'Lee' };

// 동결된 객체인지 확인 
console.log(Object.isFrozen(person)); // false

// 동결 
Object.freeze(person);

console.log(Object.isFrozen(person)); // true 
```

### 불변 객체  
- 객체 확장 금지, 밀봉, 동결은 얕은 변경 방지로 직속 프로퍼티만 방지되고 중첩 객체에는 영향을 주지 못한다. 
- 중첩 객체까지 동결하려면 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 `Object.freeze` 메서드를 호출해야 한다.  
```javascript
function deepFreeze(target) {
    // 객체가 아니거나 동결된 객체는 무시
    if (target && typeof target === 'object' && !Object.isFrozen(target)) {
        Object.freeze(target); 

        Object.keys(target).forEach(key => deepFreeze(target[key])); // 재귀호출 
    }
    return target; 
}
```
## reference
- [자바스크립트 완벽 가이드](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788966261796&orderClick=LAG&Kc=)
- [프론트엔드 개발자를 위한 자바스크립트 프로그래밍](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788966260768&orderClick=LAG&Kc=) 
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)

