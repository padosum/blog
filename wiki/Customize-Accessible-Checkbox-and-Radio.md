---
title   : 웹 접근성을 준수해 Checkbox와 Radio 커스텀하기 
date    : 2022-09-12 15:34:26 +0900
updated : 2022-09-13 23:07:42 +0900
aliases : ["웹 접근성을 준수해 Checkbox와 Radio 커스텀하기"]
tags    : ["CSS"]
---
## Goal
**checkbox와 radio를 원하는 모양으로 커스텀하는 방법**을 익혀서 구현해야할 일이 생길때 당황하지 않고 작업하기 
& **웹 접근성**을 준수하는 방법을 알아보자!

## Checkbox와 Radio
HTML `<input>` 엘리먼트엔 `checkbox`와 `radio`라는 타입이 존재한다.
두 속성 모두 브라우저가 실행되는 OS에 따라 다르게 보여진다.
그래서 원하는 모양으로 보여지게 하려면 CSS로 작업을 해야 할 필요가 있다.

## Checkbox
checkbox는 입력양식에서 자주 볼 수 있다. 
여러 값 중 체크한 값을 form에 submit할 수 있다.
```html live
<fieldset>
    <legend>좋아하는 음식을 고르세요:</legend>

    <div>
      <input type="checkbox" id="songpyeon" name="food" value="songpyeon"
             checked>
      <label for="songpyeon">송편</label>
    </div>

    <div>
      <input type="checkbox" id="friedShrimp" name="food" value="friedShrimp">
      <label for="friedShrimp">새우튀김</label>
    </div>
</fieldset>
```


### Checkbox 커스텀하기

Checkbox 스타일을 커스텀하는 다른 여러 코드들을 살펴봤는데 기본적으로 다음 방식으로 구현하는 것을 확인했다.
1. 기존 `input[type=checkbox]` 를 보이지 않도록 과감히`display:none`을 사용한다.
2. 원하는 모양의 checkbox style 요소를 추가한다. 의사 요소(`::before`) 일 수도 있고 `<span>`등의 다른 요소일 수도 있다.
3. `input[type=checkbox]` 가 check된 경우 style도 추가한다.


코드와 함께 살펴보자. HTML 코드는 다음과 같이 작성한다.
```html live
<form>
      <fieldset>
        <legend>좋아하는 음식을 고르세요:</legend>
        <label for="songpyeon">
          <input
            type="checkbox"
            id="songpyeon"
            name="food"
            value="songpyeon"
            class="checkbox"
            checked
          />
          <span class="check-mark"></span>
          송편
        </label>

        <label for="friedShrimp">
          <input
            type="checkbox"
            id="friedShrimp"
            name="food"
            value="friedShrimp"
            class="checkbox"
          />
          <span class="check-mark"></span>
          새우튀김
        </label>
      </fieldset>
    </form>
  <span class="selectFood"></span>
```

먼저 custom한 checkbox를 클릭할 때도 체크처리가 될 수 있도록 요소들을  `<label>`로 감쌌다.
```html
<label for="songpyeon">
  <input
	type="checkbox"
	id="songpyeon"
	name="food"
	value="songpyeon"
	class="checkbox"
	checked
  />
  <span class="check-mark"></span>
  송편
</label>
```

그리고 기존의 `input[type=checkbox]` 에 `.checkbox` 클래스를 추가했다. 보이지 않도록 `display: none;`을 추가한다.
```css
.checkbox {
  display: none;
}
```

기존 `input[type=checkbox]` 대신 보여줄 `span.check-mark`라는 요소를 `input[type=checkbox]` 이후에 추가했다.
```html
<input
  type="checkbox"
  id="songpyeon"
  name="food"
  value="songpyeon"
  class="checkbox"
  checked
/>
<span class="check-mark"></span>
```

```css
.check-mark {
  content: '';
  width: 20px;
  height: 20px;
  background-color: #d9d9d9;
  border-radius: 1px;
  display: inline-block;
  vertical-align: text-bottom;
}
```

이제 체크박스가 check되었을 경우의 스타일을 추가해주면 된다.
[인접 형제 결합자](https://developer.mozilla.org/ko/docs/Web/CSS/Adjacent_sibling_combinator) 를 사용해 앞에 지정한 `input:checked` 바로 다음에 위치한 `.check-mark` 에게 스타일을 추가한다. (여기선 체크되었을 때 `background-color`를 변경했다.)
```css
input:checked + .check-mark {
  background-color: #2ac1bc;
  transition: 0.1s;
}
```

추가적으로 의사 요소 (`::after`) 를 사용해 체크모양도 넣었다.
```css
input:checked + .check-mark::after {
  content: '';
  width: 10px;
  height: 5px;
  background: #2ac1bc;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  position: absolute;
  transform: translate(30%, 50%) rotate(-45deg);
  transition: 0.1s;
}
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Checkbox Custom" src="https://codepen.io/padosum/embed/xxjOQaY?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/padosum/pen/xxjOQaY">
  Checkbox Custom</a> by Yeonjeong Choi (<a href="https://codepen.io/padosum">@padosum</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

그럼 위와 같이 잘 나오기는 하는데... 한가지 문제가 있었다. 바로 웹 접근성에 있어서 맞지 않다는 생각이 들었다.
일단 정확한 것은 잘 모르겠지만 보통 마우스로 체크박스를 선택할 수도 있고 또 **<kbd>SPACE</kbd>를 누르면 해당 체크박스가 체크가 되고, 다음 체크박스를 포커스하려면 <kbd>Tab</kbd>을 누르면 된다.** 하지만 전혀 되고 있지 않았다. 

이렇게 되면 **모두가 사용할 수 없는 체크박스가 될 것**이다.

무엇이 문제일까? 좀 더 찾아봤다.

### Accessible Custom Checkbox 만들기

[한 문서](https://webdesign.tutsplus.com/tutorials/how-to-make-custom-accessible-checkboxes-and-radio-buttons--cms-32074) 를 참고할 수 있었다. 
먼저 다소 충격적인 것을 알게되었다. **`display: none`을 사용하면 브라우저와 더불어 AT(보조 기술) 사용자 모두에게 checkbox가 숨겨진다는 사실**이었다. 왜 키보드로 선택을 할 수 없을까 궁금했는데 바로 이것 때문이었다.

그렇담 `display:none` 대신 뭘 사용해야 할까? `opacity: 0`을 사용해 보이지 않게 처리하자.
```html
<div class="checkboxWrapper">
  <input
	type="checkbox"
	id="songpyeon"
	name="food"
	value="songpyeon"
	checked
  />
  <label for="songpyeon"> 송편 </label>
</div>
```

```css
.checkboxWrapper {
  position: relative;
}

.checkboxWrapper input {
  height: 20px;
  width: 20px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
```

checkbox를 보이지 않도록 `opacity` 속성 값을 `0`으로 준다. 그리고 `input`과 `label`을 감싸는 요소에 `position`을 `relative`로 해서 추후에 추가할 custom한 checkbox의 `position` 속성을 `absolute`로 할 수 있도록 한다.

`height`와 `width` 값은 보이진 않지만 보여질 체크박스 아래의 기능적인 타겟이되는 영역을 명확하게 하기 위해 추가한다고 하는데... 아직 어떤 이점이 있는지는 모르겠다.

#### 보여질 checkbox를 의사 요소로 추가하기
이제 보여질 checkbox가 필요하다. 
```css
.checkboxWrapper input + label::before {
  content: '';
  height: 20px;
  width: 20px;
  background-color: #d9d9d9;
  border-radius: 1px;
  position: absolute;
  top: 0;
  left: 0;
}
```

![[Custom-Checkbox-Style.png]]

checkbox가 `label` 과 조금 공간이 필요해보인다. 

```css
.checkboxWrapper label {
  display: block;
  padding: 2px 0 2px 24px;
}
```

![[Customize-Checkbox-Space.png]]
깔끔해졌다.

이제 checkbox가 체크된 후의 스타일을 지정하자.
체크 모양을 만드려고한다. `rotate`를 사용하자.
```css
.checkboxWrapper input + label::after {
  content: '';
  border: 2px solid #ffffff;
  border-left: 0;
  border-top: 0;
  height: 10px;
  width: 6px;
  transform: rotate(45deg);
  position: absolute;
  top: 1px;
  left: 6px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
```

아마 이 상태에서는 `opacity: 0`으로 설정되어있어서 보이지 않는다.

checkbox가 체크되었을 경우에 `label::after`가 표시되도록 `:checked`를 사용해 `opacity: 1`로 지정하자.
```css
.checkboxWrapper input:checked + label::after {
  opacity: 1;
}

/* 뒷 배경 색상도 변경하고 싶어서 추가함 */
.checkboxWrapper input:checked + label::before {
  background-color: #2ac1bc;
  transition: 0.2s ease-in-out;
}
```

요로코롬 키보드를 이용해서도 잘 체크가 되는 것을 확인할 수 있다!!
![[Customize-Checkbox-Whith-Checked-Style.png]]

하지만 한 가지 더 추가하고 싶어졌다.
기본 checkbox에서는 포커스될 때 테두리가 생겨서 <kbd>SPACE</kbd> 를 누를 시 어떤 체크박스가 체크될지를 알 수 있다.  지금 체크박스는 그렇지 못하다.

#### focus 스타일 추가하기
```css
.checkboxWrapper input:focus + label::before {
  box-shadow: 0 0 0 3px #2ac1bc;
  outline: 3px solid transparent;
}
```

아래 `outline` 속성은 [Windows의 고대비 모드](https://support.microsoft.com/ko-kr/windows/%EC%83%89-%EB%8C%80%EB%B9%84%EB%A5%BC-%EB%B3%80%EA%B2%BD%ED%95%A9%EB%8B%88%EB%8B%A4windows-fedc744c-90ac-69df-aed5-c8a90125e696)가 `box-shadow`를 제거하므로 투명한 윤곽선을 추가해야한다고 한다. windows 고대비 모드에서는 투명한 윤곽이 테두리로 나타난다고 한다.

![[Customize-Checkbox-Focust.png]]
<iframe height="300" style="width: 100%;" scrolling="no" title="Accessible Custom Checkbox" src="https://codepen.io/padosum/embed/RwyGedZ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/padosum/pen/RwyGedZ">
  Accessible Custom Checkbox</a> by Yeonjeong Choi (<a href="https://codepen.io/padosum">@padosum</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Radio
radio는 checkbox와 유사한데 그룹화된 라디오 버튼 중 하나의 값만 선택 가능하다는 차이점이 있다.
```html live
<fieldset>
    <legend>Select Framework:</legend>

    <div>
      <input type="radio" id="vue" name="framework" value="vue"
             checked>
      <label for="vue">Vue</label>
    </div>

    <div>
      <input type="radio" id="svelte" name="framework" value="svelte">
      <label for="svelte">Svelte</label>
    </div>

    <div>
      <input type="radio" id="react" name="framework" value="react">
      <label for="react">React</label>
    </div>
</fieldset>
```

### Radio 커스텀하기
Checkbox를 웹 접근성을 준수해 커스텀해봤으니 Radio도 비슷하게 하면 될 것 같다.

<iframe height="300" style="width: 100%;" scrolling="no" title=" Accessible Custom Radio" src="https://codepen.io/padosum/embed/RwyGeOL?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/padosum/pen/RwyGeOL">
   Accessible Custom Radio</a> by Yeonjeong Choi (<a href="https://codepen.io/padosum">@padosum</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

한가지 알게된 것은 radio는 <kbd>Tab</kbd>이 아니라 키보드 방향키로 선택을 변경할 수 있다. 그리고 check가 어차피 하나만 가능하기 때문에 항목 이동시 바로 선택이되는 것 같다.

## 생각
그냥 단순히 내가 원하는 모양대로 커스텀하면 되겠다고 생각했는데 Accessibility에 대해 생각해보고 작업하고 나니 도저히 커스텀했다고 말할 수가 없는 코드였다.

특히 다 만들고 나서 safari의 voice over를 사용해봤는데 이전에 만든 것은 가관이었다. 키보드로는 전혀 선택을 할 수가 없었다. 
아무튼 다시 만들어보길 잘했고 다음에 다른 것을 만들 때도 웹 접근성에 대해 꼭❗ 생각해야겠다.

## 참고
[https://webdesign.tutsplus.com/tutorials/how-to-make-custom-accessible-checkboxes-and-radio-buttons--cms-32074](https://webdesign.tutsplus.com/tutorials/how-to-make-custom-accessible-checkboxes-and-radio-buttons--cms-32074)