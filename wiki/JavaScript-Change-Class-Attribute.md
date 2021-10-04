---
title   : JavaScript class 속성 변경하기 (class 추가/삭제)
date    : 2021-10-04 13:49:34 +0900
updated : 2021-10-04 13:50:09 +0900
aliases : ["JavaScript class 속성 변경하기"]
tags    : ["JavaScript"]
---

## className
`Element.className`을 사용하면 특정 요소의 class 속성 값을 가져오거나 설정할 수 있다.  

### class 속성 값 가져오기 
```javascript
const cName = element.className; // 가져오기 
```

### class 값 설정하기 
```javascript
element.className = cName; // 설정
```

## classList 
`Element.classList`는 요소의 class 속성 정보를 담은 `DOMTokenList`를 반환한다. [[JavaScript-Array-Like-Object|유사 배열 객체]]이면서 이터러블이다. 
### class 추가하기
```javascript
link.classList.add('foo'); // 클래스 추가하기 
link.classList.add('foo', 'bar' 'baz'); // 여러 개 추가 
```

### class 삭제하기  
```javascript
link.classList.remove('foo'); // 클래스 제거하기 
link.classList.remove('foo', 'bar' 'baz'); // 여러 개 제거 
```

### class 소유 여부 확인 
```javascript
link.classList.contains('foo'); // 클래스 소유 여부 
```

### class 교체하기   
```javascript
// replace(oldClassName, newClassName)
link.classList.replace('red', 'blue');
```

### class toggle
```javascript
// toggle(className[, force])
li.classList.toggle('foo'); 
// 해당 class가 있으면 삭제, 없으면 추가 
// 두 번째 인수가 true면 첫 인수로 전달한 문자열을 추가, false면 제거 
```

### 인덱스 값으로 가져오기 
```javascript
li.classList.item(0); 
```






