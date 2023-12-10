---
title: 웹에서 픽셀 아트 만들기
date: 2023-12-03 23:57:35 +0900
updated: 2023-12-04 00:00:13 +0900
aliases: ['웹에서 픽셀 아트 만들기']
tags: ['How to']
draft: true
---

![e-boy](https://cdn0.vox-cdn.com/assets/4604041/eboy_section_3_1.gif)
[pixel-perfect-the-story-of-eboy](https://www.theverge.com/2014/6/17/5803850/pixel-perfect-the-story-of-eboy)

나는 어릴적에 한 게임이나 소프트웨어의 영향인지 픽셀 아트를 아주 좋아한다.  
픽셀 아트는 작은 정사각형 단위의 픽셀(pixel: Picture Element)을 사용해 이미지를 만드는 예술이다.
각 픽셀은 화면에 표시되는 작은 점을 말한다.
컴퓨터 화면 속에 수많은 픽셀을 보고 있는 게 나의 직업이라 말할 수도 있겠다.

웹에서 픽셀 아트는 어떻게 만들 수 있을까? 웹 애플리케이션이 많이 있지만 그려지는 과정을 생각해보진 않았다.  
막연하게 생각하면 필요한 픽셀이 모아져있는 격자를 그리고 각 칸에 원하는 색을 칠하면 된다.

그렇다면 컴퓨터에서 픽셀의 색은 어떻게 표현하는걸까?

## 컴퓨터에서 색상

약간 주객이 전도된 것 같지만 질문을 바꿔서, 색이란 무엇일까?

우리가 눈으로 색을 인식하기 위해서는 빛이 필요하다. 이건 직관적으로 알 수 있다. 어두운 밤에 아무 빛이 없으면 눈 앞에 물건들의 색을 구분하지 못한다.

빛을 통해 색을 인식하는 것은 2가지 경우가 있다고 한다.

1. 광원(빛을 내는 물체)으로부터 직접 눈으로 들어오는 것 (🌞 ➡️ 👀)
2. 어떤 물체에 반사되서 그 반사된 빛을 눈으로 보는 것 (🌞 ➡️ 📦 ➡️ 👀)

빛의 색 중 빨간색(Red), 초록색(Green), 파란색(Blue)를 묶어 빛의 3원색이라 부른다. 이 3가지 색을 조합하면 여러 색의 빛을 만들 수 있다.

<img src="https://art-design-glossary.musabi.ac.jp/wpwp/wp-content/uploads/2014/05/058_three-primary-colors_01.jpg" width="100" height="100" alt="Additive color mixture"/>

2번의 경우 빛이 물체에 반사되는 순간 일부 파장이 물체에 흡수되어 일부만 눈에 도달하게 된다고 한다.

미술시간이 생각난다. 새로운 색을 만드려고 물감을 섞어본 적이 있을 것이다.
그림을 그릴 때 '빨강', '노랑', '파랑'(정확히는 Magenta, Yellow, Cyan) 3가지 색을 섞어서 새로운 색을 만들었다. 섞은 뒤 나온 색끼리 계속해서 조합해 더 많은 색상을 만들 수 있다. 중요한 것은 섞으면 섞을 수록 어두운 색이 나왔다는 것이다.
이러한 혼합을 '감산 혼합(substractive mixing)'이라고 한다.

흰 캔버스나 종이에서 그림을 그리기 시작한다. **물감도 물체** 이므로 각 물감들은 흡수하는 파장, 반사하는 파장이 존재한다.
노란색 물감과 파란색 물감을 섞어보자. 노란색 물체는 파란 빛을 흡수하고 파란 물체는 빨간 빛을 흡수한다. 그럼 남은 빛은 RGB 중 초록색이 남는다! 그래서 초록색으로 보이게 된다. 그래서 물감을 섞으면 섞을 수록 물체에 흡수되는 빛이 많아지고, 반사되는 빛은 적어져 검은색으로 변하게 되는 것이다.

컴퓨터 화면에서도 색상 표현을 위해 3가지 색상을 혼합하지만, 물감이 아닌 원하는 파장의 빛을 내는 것이다. 기본 색상이 빨강, 녹색, 파랑(RGB)가 사용된다. 화면의 각 픽셀에서 3가지 색상의 빛을 늘이거나 줄이면서 다양한 색상을 만드는 것이다. 아무 빛도 없으면 검은색이고, 빨간색 빛만 켜면 빨간색, RGB 모든 빛을 최대로 하면 흰색이된다. 이를 '가산 혼합(additive mixing)'이라고 한다.
<img src="https://art-design-glossary.musabi.ac.jp/wpwp/wp-content/uploads/2014/05/058_three-primary-colors_02.jpg" width="100" height="100" alt="Subtractive color mixture"/>

## 비트와 RGB

컴퓨터 화면에서 색상을 표현하기 위해 24비트를 사용한다. 24비트는 3가지 필드로 나뉘는데, 각 필드가 RGB의 빛의 양을 설명한다.
RGB의 각 원색은 8비트(0 - 255)로 구성된다. 그러나 현대 컴퓨터는 24비트 단위로 계산을 수행하도록 설계되지 않았기 때문에 32비트에 색을 넣어서 처리한다고 한다. (p.87)

![](https://ucarecdn.com/2a0bdcf2-c181-4eba-b6d6-f1c40cfb9caa/)
그럼 원색을 제외하고 8비트가 남아버리는데, 이 8비트는 투명도를 나타내기 위해 사용한다!

## 웹에서 픽셀 아트 표현하기

RGB에 대해 알게되었으니 정말로 화면에 그려보도록 하자.

여기 상자 그림이 하나 있다.  
![[box.png]]

이 그림은 가로 25개 픽셀 세로 25개 픽셀로 이루어져 있다. HTML로 이 그림을 표현하려면 `25 * 25 = 625`개의 `div`를 만들고 각 div의 `background-color`에 rgb 색상을 넣으면 되겠다.

625개의 `div`를 모두 직접 타이핑하는 것도 괜찮지만 배열로 표현해보는 것도 수정하기에 좋겠다.

```js
const PIXELS = ['', 'rgb(0,0,0)', '', 'rgb(0, 0, 0)']
```

위 `PIXELS`라는 변수처럼 색이 들어가는 좌표에 해당 rgb값을 넣어두고 색이 들어가지 않는 곳은 빈 문자열을 넣어서 그려주자.

<iframe height="300" style="width: 100%;" scrolling="no" title="pixel box" src="https://codepen.io/padosum/embed/LYqXOXx?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/padosum/pen/LYqXOXx">
  pixel box</a> by Yeonjeong Choi (<a href="https://codepen.io/padosum">@padosum</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## CSS로 픽셀 아트 그리기

앞에서 살펴본 `div` 마다 색상을 넣는 방법은 간단하지만 아쉬운 점이 하나 있다.  
픽셀이 많아지면 많아질 수록 `div`를 너무 많이 그려야 한다는 점이다.
만약 `100x100`의 그림이라면? `div`의 개수는 10,000개나 필요하다.  
여기저기 찾아보니 많은 사람들이 CSS의 `box-shadow`를 사용하고 있었다.  
처음엔 `box-shadow`라면 그림자를 표현하는 것인데 무슨 연관인지 이해가 되지 않았다.

방법을 알고나니 놀라웠다.

다음은 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)의 `box-shadow` 사용법 중 하나이다.

```css
/* Three length values and a color */
/* <length> | <length> | <length> | <color> */
box-shadow: 10px 5px 5px black;
```

`length` 값은 그림자의 오프셋 길이를 지정한다.
오프셋 길이란 위치를 나타내는 값이다.

- 1번째 `length`는 `offsetX`
- 2번째 `length`는 `offsetY`다.

아래와 같은 코드가 있으면 `.box` 요소를 기준으로 그림자가 오른쪽으로 `10px`, 아래로 `10px`에 표시되는 것이다. `<color>`에 지정된 값으로! 아래 코드에선 검정색이다.

```css
.box {
  box-shadow: 10px 10px #000;
}
```

- 3번째 `length`는 `blur-radius`로 값이 클 수록 흐려지고 그림자가 커진다. 지정하지 않으면 `0`으로 선명한 그림자가 된다.
- 4번째 `length`는 `spread-radius`로 양수면 그림자가 확장되어 커진다. **즉, 지정하지 않으면 `0`으로 그림자가 요소와 같은 크기가 된다.**

그리고 그림자는 쉼표로 구분해서 원하는 개수만큼 사용할 수 있다.

```css
/* Any number of shadows, separated by commas */
box-shadow: 3px 3px red inset, -1em 0 0.4em olive;
```

감이 오는가? 3, 4번째 `length`를 지정하지 않으면 요소와 같은 크기의 선명한 그림자가 만들어진다. 그리고 그 그림자의 위치는 1, 2번째 `length`로 지정할 수 있다!

`.box`라는 요소를 기준으로, 2개의 픽셀을 검은색으로 칠하려면 다음과 같이 할 수 있다.

```css
.box {
  width: 10px;
  height: 10px;
  box-shadow: 10px 10px #000, 20px 10px #000;
}
```

<iframe height="300" style="width: 100%;" scrolling="no" title="render pixel with css" src="https://codepen.io/padosum/embed/ExrOeOw?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/padosum/pen/ExrOeOw">
  render pixel with css</a> by Yeonjeong Choi (<a href="https://codepen.io/padosum">@padosum</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

`box-shadow` 문법을 안다고 해서 pixel art를 그리는 것으로 생각이 이어질 수 있었던 것이었을까? 이게 가장 신기했다. 픽셀 아트를 그리려고 `box-shadow`라는 속성을 만든 것 같진 않은데 말이다. 많이 사용하면 할 수록 떠올릴 수 있는 연결고리가 생기나 보다. 나도 기본을 열심히 익히고 노력하다보면 그걸 바탕으로 응용할 수 있지 않을까 하는 작은 희망이 생겼다.

## 만든 픽셀 아트를 export 하자.

[Osidian의 CEO는 자신의 블로그에 다음과 같이 말했다.](https://stephango.com/file-over-app)

> 시간이 지나면 파일을 만드는 데 사용하는 도구보다 만든 파일이 더 중요해집니다. 앱은 한시적이지만 파일은 오래도록 남을 수 있습니다.
> 이집트의 고대 신전에는 수천 년 전에 돌을 깎아 만든 상형 문자가 새겨져 있습니다. 상형 문자를 새기는 데 사용된 끌의 종류보다 상형 문자가 전달하는 아이디어가 더 중요합니다. (DeepL로 번역)

매우 공감되는 말이었다. 픽셀아트를 그리는 도구들은 정말 많다. 하지만 그 도구들은 영원하지 않다. 중요한 것은 파일이다. 포맷을 정해놓고 파일로 남겨놓으면 픽셀아트 데이터는 영원히 남을 수 있다!
그래서 지금까지 만든 데이터를 파일로 남겨보자.

보통 정적인 이미지 파일 포맷으로 jpeg, png, webp 등이 사용된다. javascript로 이미지를 파일로 저장하기 위해 canvas를 사용한다. canvas를 통해 이미지 데이터를 생성할 수 있기 때문이다.

그럼 지금까지 만든 픽셀 아트를 canvas에 옮겨야 한다.

### canvas 그리기

### png

### gif

내가 만들 픽셀 아트가 애니메이션을 표현할 수도 있으니 .gif로 만들어졌으면 좋겠다.
gif encoding을 위한 라이브러리는 아주 다양한데, 대부분 rgb를 나타내는 string을 입력 인자로 받진 않는다. 대부분 <img/> 요소 자체나 Uint8Array라는 타입을 전달받는다.
Uint8Array는 8비트의 부호없는 정수 값을 저장하는 타입이다. 어디서 많이 들어본 느낌이지 않는가? RGB를 나타내는 것이다.

지금 작업 중인 rgb string 배열에서 Uint8Array를 얻어내려면 canvas를 사용하면 된다.
canvas의 CanvasRenderingContext2D: getImageData() 메서드를 통해 얻어낼 수 있기 때문이다.

- alpha 값에 대한 이야기
- clamped canvas 어쩌구
  https://blog.yaox023.com/uint8array-and-uint8clampedarray
  https://velog.io/@dusunax/File-Blob-ArrayBuffer-TypedArrayUint8Array#unit8array
  https://github.com/LemonScone/pixel-art/pull/119

### svg

픽셀 아트를 크기에 상관없이 해상도를 유지하고자 한다면 svg 로 만들어야 한다.  
단순하게 svg의 `rect`를 픽셀 개수만큼 만들면 되겠다고 생각했는데 그렇게 하면 앞에서 HTML에 `div`를 픽셀 개수만큼 그린 것과 똑같은 방식이다.  
100x100 그림이라면 rect가 10,000개 생기는 것! 아주 비효율적이다.
다른 방법이 없을까 하고 찾아보니 `path`를 사용하는 방법이 있었다.

https://www.fespa.com/en/news-media/features/understanding-subtractive-and-additive-colours

rgba 이미지 https://hyperskill.org/learn/step/14484
빛의 삼원색
https://dadoc.or.kr/1952
file:///Users/padosum/Downloads/%EB%B9%9B%EC%9D%98%20%ED%95%A9%EC%84%B1%EA%B3%BC%20%EC%83%89%EC%9D%98%20%ED%95%A9%EC%84%B1.pdf

감산혼합 가산혼합
https://www.quora.com/Why-do-additive-and-subtractive-color-mixing-behave-differently

눈이 색을 인식하는 방법
https://blog.naver.com/handolekim/220043644233

웹에서 color
https://www.csfieldguide.org.nz/en/chapters/data-representation/images-and-colours/#what-about-in-practice

- [빛의 합성과 물감의 합성에 대한 이해](https://www.edunet.net/nedu/contsvc/viewWkstContPost.do?contents_id=1b12e3d2-cfd6-4ff4-a80b-fe55f9daec38&head_div=s2015w)
