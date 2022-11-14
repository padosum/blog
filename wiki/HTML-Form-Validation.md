---
title   : 유효성 검사에 대하여 
date    : 2022-11-14 17:51:40 +0900
updated : 2022-11-14 19:31:42 +0900
aliases : ["유효성 검사에 대하여"]
tags : ["form", "validation", "accessibility"]
draft : false
---

## Goal
HTML form 유효성 검사하는 방법 알아보기

`<form>` 요소는 사용자로부터 어떤 정보를 입력받기 위해 존재한다. 그래서 submit 버튼을 이용해 데이터를 서버로 전송하는데 이때 제대로 된 값이 들어가 있는지 클라이언트 단에서 확인해야 하는 경우가 있다.

submit 버튼을 클릭했을 때 값을 확인하기도 하고, form 내부의 요소에 값이 들어가는 이벤트가 발생했을 때 확인하기도 한다.  내 기억으론 이렇게 유효성 검사를 하는 방법을 먼저 알게된 것 같다.

그리고 한참이 지나서 `required` 라는 어트리뷰트를 알게되었다. 해당 속성은 **사용자가 `<form>`을 submit 하기 전에 값을 입력해야 함**을 의미한다. 회원가입 페이지라면 아이디나 비밀번호 등 필수로 입력해야 하는 요소에 지정한다. 
**`required` 속성이 있는 요소에 값을 넣지 않고 `submit` 버튼을 클릭하면 브라우저가 값을 입력해야 한다고 말해준다.**  

`<input>`,  `<select>`, `<textarea>`에 적용할 수 있다.  

라디오 버튼의 경우, 동일한 그룹 내에서 한 라디오 버튼에 `required`가 있으면 해당 그룹 중 하나가 선택되어야 한다. 하지만 그게 꼭 `required`가 있는 라디오 버튼일 필요는 없다. [^1]  
그래서 아래 코드에서 tennis를 꼭 선택할 필요는 없고, tennis와 basketball 중 하나만 선택하면 된다.
```html
<form action="">
	<label for="tennis">🎾</label>
	<input type="radio" name="sports" id="tennis" value="tennis" required />
	<label for="basketball">🏀</label>
	<input type="radio" name="sports" id="basketball" />
	<button type="submit">확인</button>
</form>
```

## 그렇다면 값의 형식은 어떻게 검사할까?

`required` 어트리뷰트만 추가하면 요소에 값이 들어가 있지 않다는 것을 알 수 있고 따라서 입력하지 않는 한 submit이 되지 않는다.

그렇다면 더 나아가서 이 값이 어떤 형식으로 저장되어있는지를 확인하는 것은 어떻게 해야할까? 예를 들어 전화번호 형식으로 저장되었는지 (`000-0000-0000`) 이메일 형식으로 저장되었는지 (`aaa@bbb.com`) 말이다.  

### Pattern
특정 형태의 값을 확인하기 위해서 `pattern` 어트리뷰트를 설정할 수 있다!  `pattern` 속성에는 입력 컨트롤의 값이 일치해야 하는 정규식을 지정한다. 
타입이 `text`, `tel`, `email`, `url`, `password`, `search`인 경우에 사용할 수 있다.  

`required` 어트리뷰트를 설정했을 때 아무런 값을 입력하지 않으면 Chrome에서 다음과 같은 메시지가 표시된다.
![[Pasted image 20221114175303.png]]
`pattern` 어트리뷰트를 다음 코드처럼 영어만 입력되도록 지정하면,
```html
<form action="">
  <label for="id">아이디</label>
  <input type="text" id="id" pattern="[A-Za-z]+" required />
  <button type="submit">확인</button>
</form>
```

처음 submit 버튼을 클릭한 후로 다음과 같은 메시지가 표시된다.
![[Pasted image 20221114175456.png]]

그리고 `title` 어트리뷰트에 pattern에 대한 상세 설명을 추가할 수 있다. 이건 프로그래머스 과제관에 나와있어서 궁금했는데 검색해보니 찾을 수 있었다.
```html
<input
	type="text"
	id="id"
	pattern="[A-Za-z]+"
	title="영어 대소문자만 가능합니다."
/>
```

![[Pasted image 20221114175725.png]]

아주 편리해보였는데 Safari만 보더라도 다음과 같이 `title`에 적은 내용을 표시해주지 않고 있었다.
![[Pasted image 20221114180429.png]]

파이어폭스도 글자가 너무 작았다.
![[Pasted image 20221114180454.png]]

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern#accessibility_concerns)에서 **많은 사용자 에이전트가 접근 가능한 방식으로 속성을 노출하지 않기 때문에** 텍스트 콘텐츠의 시각적 표시를 위해 `title` 속성에 의존하는 것은 일반적으로 권장되지 않는다고 적혀있었는데 여러 브라우저로 확인해보니 이 말이 와닿았다. 각자 다르고, 심지어 나오지 않는 브라우저가 있다면 이 속성만으로 패턴을 설명하면 안되겠다. 다른 위치에도 꼭 표시해줘야 함을 알 수 있었다.

### Constraint Validation API
브라우저에 Constraint Validation API라는 것이 있어서 앞서 설명한 `required` 속성을 사용하는 요소들이 `validity`라는 속성을 사용할 수 있다.  

`validity` 속성은 `ValidityState` 객체를 리턴한다. 이 객체에는 유효성 상태를 설명하는 상태들이 들어가있다.  

JavaScript로 확인해보자.
```js
const inputId = document.querySelector('input')
inputId.addEventListener('input', ({ target }) => {
  console.log(target.validity)
    /* 
    badInput: false
    customError: false
    patternMismatch: true
    rangeOverflow: false
    rangeUnderflow: false
    stepMismatch: false
    tooLong: false
    tooShort: false
    typeMismatch: false
    valid: false
    valueMissing: false
    */
 })
})
```

만약 pattern에 일치하지 않는 값이 입력되면 `ValidateState` 객체의 `patternMismatch`
가 `true`로 나온다.
`true`인 경우 해당 요소는  `:invalid` CSS 의사 클래스와 일치하게 되어서 다음과 같이 스타일 지정도 가능하다. (반대로 `valid`는 `patternMismatch`가 `false`인 경우다.)
```css
input:invalid {
	border: red solid 3px;
}
input:valid {
	border: blue solid 3px;
}
```


### 유효성 검사 메세지 커스텀

```js
inputId.addEventListener('input', ({ target }) => {
  if (target.validity.patternMismatch) {
    target.setCustomValidity('영어 대소문자를 입력해주세요!')
    target.reportValidity()
  } else {
    target.setCustomValidity('')
  }
})
```

`setCustomValidity()` 메서드를 사용하면 팝업에 나오는 메시지를 변경할 수 있다.
`reportValidity()`를 사용해야 `input` 이벤트 발생시 표시가 된다. 그리고 위 코드처럼 `pattern`이 일치하는 경우에 다시 `setCustomValidity()` 메서드를  빈 값과 함께 호출해야 submit을 할 수 있다.



## 생각
- `required`, `pattern`을 사용하는 경우와 직접 설정을 하는 방법 두 가지가 있는데, 상황에 따라 적용할 수 있어야겠다.
- 입력해야 할 특정한 패턴이 필요하다면 submit할 때 알려주기 보다는 미리 입력 요소 근처에 표시해주는게 좋겠다.

## reference
- [https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern)
- [https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

[^1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required

