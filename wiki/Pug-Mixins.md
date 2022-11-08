---
title   : Pug - Mixins 사용하기
date    : 2022-11-08 23:07:48 +0900
updated : 2022-11-08 23:48:26 +0900
aliases : ["Pug - Mixins 사용하기"]
tags: ["pug"]
draft : false
---

## Mixins ?

[pug 공식문서](https://pugjs.org/language/mixins.html) 에는 Mixins에 대해 다음과 같이 설명하고 있었다.

> Mixins allow you to create reusable blocks of Pug.

내가 이 기능이 아주 마음에 들었던 점은 마치 React의 컴포넌트 처럼, pug의 블록(UI 블록)을 재사용할 수 있게 해주는 점이다. 함수처럼 사용하기 때문에 데이터 전달도 가능하다.

UI 블록들이 계속해서 반복되고 있다면, 사용을 고려할 만 하다. 예를 들어 여러 페이지에서 `<input>` 요소를 반복해서 사용한다고 생각해보자. 
```pug
div(class='input-container')
  label(for='id', class='form-label')='아이디'
  div(class='input-wrap')
	  input(name='id', id='id', type='text', placeholder='아이디')
```

```pug
div(class='input-container')
  label(for='password', class='form-label')='비밀번호'
  div(class='input-wrap')
	  input(name='password', id='password', type='password', placeholder='비밀번호')
```
이런식으로 말이다.  
한 두개가 아닐 것이다. 그럼 복사한다고 치더라도 매번 저 코드를 입력해야 한다. 여기서 필요한 것이 Mixins이다!

## 사용하기
Mixins 파일은 다음과 같이 선언한다. 보통 관습적으로 `/views/mixins` 디렉토리에 파일을 생성하는 것 같다.
```pug
mixin input
	label
	input
```

사용은 `mixin` 뒤에 선언한 이름으로 `+`을 붙여서 사용하면 된다.
```pug
include mixins/input

+input
```

아주 간단하다! 이렇게 사용하는 것만으로도 코드가 간결하지만, 예를 든 것처럼 데이터를 전달해 상황마다 동적으로 UI를 구성할 수 있다.

Mixins은 함수로 컴파일되어서 인수를 전달할 수 있다.
```pug
mixin input(className)
	div(class=className)
		label
		input
```

```pug
+input('form-control')
```

인수를 전달할 때 기본값 설정도 가능하다.
```pug
mixin input(className = 'form-control')
	div(class=className)
		label
		input
```

```pug
+input() //- div.form-control
```

**Attributes**라는 것도 사용할 수 있다. 
다음과 같이 `&attributes(attributes)` 를 사용하면, 기존 인수를 전달하는 괄호 옆에 새로 괄호를 해서 전달한 인수가 해당 요소에 attribute로 설정된다.
```pug
mixin input(label = '')
	div(class=className)
		label=label
		input&attributes(attributes)
```

```pug
+input('아이디')(id='id', name='id', placeholder='아이디', type='text')
```

```html
<div class='form-control'>
  <label>아이디</label>
  <input id='id' name='id' placeholder='아이디' type='text'>
```

여기서 `label`에도 `for` 속성에 `id`를 전달하고 싶은데.. 인수에는 추가하고 싶지 않았다. 그렇다고 `&attributes`를 사용하려니 `label`에 name, placeholder, type등이 모두 전달된다.
다행히 변수로 `attributes`로 받은 것들을 따로 골라낼 수 있었다.
```pug
mixin input(label = '')
- var inputID = attributes['id']
	div(class=className)
		label(for=inputID)=label
		input&attributes(attributes)
```

그리고 인수를 전달할 때 [[JavaScript-Destructuring-assignment|Destructuring]]을 사용할 수 있다.
```pug
mixin input({ label = '' })
```

JavaScript 파일 처럼 인수가 자동완성 되진 않지만... 전달할 때 좀 더 명확하게 사용할 수 있는게 좋다는 생각이 들었다. 
```pug
+input({ label: 'label1' })
```
자동완성과 더불어 formatting도 깔끔하게 되진 않는 것 같은데.. 아마 더 찾아보면 vscode에 해당 extension같은 것이 있을지도 모르겠다. 지금은 일단 스킵

