---
title: 웹에서 픽셀 아트 만들기
date: 2023-12-03 23:57:35 +0900
updated: 2023-12-10 20:28:24 +0900
aliases: ['웹에서 픽셀 아트 만들기']
tags: ['How to', '글또']
---

![e-boy](https://cdn0.vox-cdn.com/assets/4604041/eboy_section_3_1.gif)  
[pixel-perfect-the-story-of-eboy](https://www.theverge.com/2014/6/17/5803850/pixel-perfect-the-story-of-eboy)

나는 어릴 적에 한 게임이나 소프트웨어의 영향인지 픽셀 아트(Pixel Art)를 아주 좋아한다.  
픽셀 아트는 작은 정사각형 단위의 픽셀(Pixel: Picture Element)을 사용해 이미지를 만드는 예술이다.  
원하는 색으로 구성된 그림을 프린트할 필요 없이 화면을 통해 볼 수 있다는 점이 픽셀 아트의 매력이다.  
각 픽셀은 화면에 표시되는 작은 점을 말한다.  
컴퓨터 화면 속에 수많은 픽셀을 보고 있는 게 나의 직업이라 말할 수도 있겠다.

웹에서 픽셀 아트는 어떻게 만들 수 있을까? 픽셀 아트 웹 애플리케이션이 많이 있지만 이들이 어떻게 작동하는지, 즉 픽셀이 어떻게 그려지고 색이 어떻게 표현되는지에 대한 과정은 생각해 보지 않았다.  
생각해 보면, 픽셀 아트를 그릴 때 가장 직관적인 방법은 격자 모양의 캔버스를 그리고 각각의 칸에 원하는 색상을 채워 넣는 것이다.

그렇다면 컴퓨터에서 픽셀의 색은 어떻게 표현되는 걸까? 이를 이해하기 위해 컴퓨터가 색을 표현하는 방식을 알아야 한다.

## 컴퓨터에서 색상

컴퓨터에서 색상을 표현하는 방법에 대해 간략하게 살펴보기 전에 먼저 '색'이 정확히 무엇인지 알아보자.

우리가 눈으로 색을 인식하기 위해서는 빛이 필요하다. 이건 직관적으로 알 수 있다. 어두운 밤에 아무 빛이 없으면 눈앞의 물건들의 색을 구분하지 못한다.

빛을 통해 색을 인식하는 것은 2가지 경우가 있다고 한다.

1. 광원(빛을 내는 물체)으로부터 직접 눈으로 들어오는 것 (🌞 ➡️ 👀)
2. 어떤 물체에 빛이 반사되어서 그 반사된 빛을 눈으로 보는 것 (🌞 ➡️ 📦 ➡️ 👀)

### 빛의 3원색과 색의 3원색

1번의 경우, 자연에서 광원으로부터 인식하는 다양한 빛은 3가지 기본색을 조합해서 만들어진다. 이것을 우리는 **빛의 3원색**이라 부르며, **빨강(Red), 녹색(Green), 파랑(Blue)**이다.

2번의 경우, 빛이 물체에 반사되는 순간 물체의 특성에 따라 다양한 파장이 흡수되고 반사된다. 이 과정에서 일부 파장이 물체에 흡수되어 눈에 도달하지 않는다. 따라서 물체의 구성에 따라 색이 변하게 된다.

미술 시간을 떠올려 보면, 물감을 섞어 새로운 색을 만들어본 적이 있을 것이다.  
섞은 뒤 나온 색끼리 계속해서 조합하면 더 다양한 색을 만들어낼 수 있었다. 중요한 것은 섞으면 섞을수록 어두운색이 나왔다는 것이다.

이러한 혼합을 '감산 혼합(substractive mixing)'이라고 하며 색의 3원색으로 알려진 기본 색상인 Magenta, Yellow, Cyan이 여기에 사용된다.

![Subtractive color mixture](https://learn.microsoft.com/en-us/windows/win32/wcs/images/400px-subtractivecolor.png)

예를 들면 흰 캔버스나 종이에서 그림을 그리기 시작한다. **물감도 물체**이므로 각 물감들은 흡수하는 파장, 반사하는 파장이 존재한다.
노란색 물감과 파란색 물감을 섞어보자. 노란색 물체는 파란빛을 흡수하고 파란 물체는 빨간빛을 흡수한다. 그럼 남은 빛은 RGB(빛의 3원색) 중 초록색이 남는다! 그래서 초록색으로 보이게 된다.  
물감을 섞으면 섞을수록 물체에 흡수되는 빛이 많아지고, 반사되는 빛은 적어지기 때문에 검은색으로 변하게 된다.

컴퓨터 화면에서도 색상 표현을 위해 3가지 색상을 혼합한다. 하지만 물감이 아닌 원하는 파장의 빛을 내는 것이다. 화면의 각 픽셀에서 3가지 색상의 빛을 늘이거나 줄이면서 다양한 색상을 만들 수 있다. 아무 빛도 없으면 검은색이고, 빨간색 빛만 켜면 빨간색, RGB 모든 빛을 최대로 하면 흰색이 된다. 이를 '가산 혼합(additive mixing)'이라고 한다.

![Additive color mixture](https://learn.microsoft.com/en-us/windows/win32/wcs/images/400px-additivecolor.png)

## 비트와 RGB

컴퓨터 화면에서 색상을 표현하기 위해 24비트가 사용된다. 24비트는 3가지 필드로 나뉘는데, 각 필드가 RGB의 빛의 강도를 설명한다. 앞서 살펴봤듯이 R 값이 높고 G, B가 낮으면 빨강 빛을 띄게 되는 것이다.
RGB의 각 원색은 8비트(0 - 255)로 구성된다. 그러나 현대 컴퓨터는 24비트 단위로 계산을 수행하도록 설계되지 않았기 때문에 색상을 처리할 때 32비트를 사용한다고 한다. [^1]

![](https://ucarecdn.com/2a0bdcf2-c181-4eba-b6d6-f1c40cfb9caa/)  
https://hyperskill.org/learn/step/14484

그럼 원색을 제외하고 8비트가 남게 되는데, 이 8비트는 투명도를 나타내기 위해 사용된다.

## 웹에서 픽셀 아트 표현하기

앞서 색이 무엇인지, 컴퓨터가 색상을 어떻게 표현하는지에 대한 개념을 살펴보았으니 이제는 실제로 화면에 픽셀 아트를 그려보자.

여기 상자 그림이 하나 있다.  
![[box.png]]

이 그림은 가로 25개 픽셀 세로 25개 픽셀로 이루어져 있다. HTML로 이 그림을 표현하려면 `25 * 25 = 625`개의 `div`를 만들고 각 `div`의 `background-color`에 색상을 설정하면 된다. CSS에서는 다음과 같이 RGB 값을 지정할 수 있다.

```css
div {
  background-color: rgb(red, green, blue);
}
```

625개의 `div`를 모두 직접 타이핑하는 것도 괜찮지만 다음과 같이 배열로 처리하는 보는 것이 나중에 수정하기에 좋겠다.

```js
const PIXELS = ['', 'rgb(0,0,0)', '', 'rgb(0, 0, 0)']
```

위 `PIXELS`라는 변수처럼 색이 들어가는 좌표에 해당 rgb 값을 넣어두고 색이 들어가지 않는 곳은 빈 문자열을 넣어서 그려주자. [[JavaScript]]로 [[DOM]] api를 적절히 사용하면 된다. 하하 상자가 화면에 그려졌다!

<iframe height="300" style="width: 100%;" src="https://stackblitz.com/edit/js-hxaphk?&embed=1&file=index.js&ctl=1" loading="lazy">
</iframe>

## CSS로 픽셀 아트 그리기

앞에서 살펴본 `div` 마다 색상을 넣는 방법은 간단하지만 아쉬운 점이 하나 있다.  
픽셀이 많아지면 많아질수록 `div`를 너무 많이 그려야 한다는 점이다.  
만약 `100x100`의 그림이라면 `div`의 개수는 10,000개나 필요하다.

여기저기 찾아보니 많은 사람들이 CSS의 `box-shadow`를 사용하고 있었다.  
처음엔 `box-shadow`라면 그림자를 표현하는 것인데 무슨 연관인지 이해가 되지 않았지만 방법을 알고 나니 놀라웠다.

다음은 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)의 `box-shadow` 사용법 중 하나이다.

```css
/* Three length values and a color */
/* <length> | <length> | <length> | <color> */
box-shadow: 10px 5px 5px black;
```

`length` 값은 그림자의 오프셋 길이를 지정한다.
오프셋 길이란 위치를 나타내는 값이다.

- 1번째 `length`는 `offsetX`
- 2번째 `length`는 `offsetY`

아래와 같은 코드가 있으면 `.box` 요소를 기준으로 그림자가 오른쪽으로 `10px`, 아래로 `10px`에 검정색(`#000`) 그림자가 표시되는 것이다.

```css
.box {
  box-shadow: 10px 10px #000;
}
```

- 3번째 `length`는 `blur-radius`로 값이 클수록 흐려지고 그림자가 커진다. 지정하지 않으면 `0`으로 선명한 그림자가 된다.
- 4번째 `length`는 `spread-radius`로 양수면 그림자가 확장되어 커진다. **즉, 지정하지 않으면 `0`으로 그림자가 요소와 같은 크기가 된다.**

그리고 그림자는 쉼표로 구분해서 원하는 개수만큼 사용할 수 있다.

```css
/* Any number of shadows, separated by commas */
box-shadow: 3px 3px red inset, -1em 0 0.4em olive;
```

감이 오는가? 3, 4번째 `length`를 지정하지 않으면 요소와 같은 크기의 선명한 그림자가 만들어진다. 그리고 그 그림자의 위치는 1, 2번째 `length`로 지정할 수 있다!

`.box`라는 요소를 기준으로, 2개의 픽셀을 검은색으로 칠하려면 다음과 같이 할 수 있다. `.box`에 색상을 넣어보면 이해하기 쉽다.

```html live
<html>
  <head>
    <style>
      .box {
        width: 10px;
        height: 10px;
        box-shadow: 10px 10px #000, 20px 10px #000;
        background-color: green;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

<iframe height="300" style="width: 100%;" src="https://stackblitz.com/edit/js-famfbq?ctl=1&embed=1&file=index.js" loading="lazy">
</iframe>

어떻게 `box-shadow` 문법을 안다고 해서 픽셀 아트를 그리는 것으로 생각이 이어질 수 있었던 것이었을까? 이게 가장 신기했다. 픽셀 아트를 그리려고 `box-shadow`라는 속성을 만든 것 같진 않은데 말이다. 많이 사용하면 할수록 떠올릴 수 있는 연결고리가 생기나 보다. 나도 기본을 열심히 익히고 노력하다 보면 그걸 바탕으로 응용할 수 있지 않을까 하는 작은 희망이 생겼다.

## 만든 픽셀 아트를 파일로 만들기

[Osidian의 CEO는 자신의 블로그에 다음과 같이 말했다.](https://stephango.com/file-over-app)

> 시간이 지나면 파일을 만드는 데 사용하는 도구보다 만든 파일이 더 중요해집니다. 앱은 한시적이지만 파일은 오래도록 남을 수 있습니다.
> 이집트의 고대 신전에는 수천 년 전에 돌을 깎아 만든 상형 문자가 새겨져 있습니다. 상형 문자를 새기는 데 사용된 끌의 종류보다 상형 문자가 전달하는 아이디어가 더 중요합니다. (DeepL로 번역)

매우 공감되는 말이었다. 무언가를 만들기 위한 도구들은 정말 많다. 하지만 그 도구들은 영원하지 않다. **중요한 것은 '그 무언가 자체'** 이다. 포맷을 정해놓고 파일로 남겨놓으면 픽셀아트 데이터는 영원히 남을 수 있다!  
그럼 지금까지 만든 데이터를 파일로 남겨보자.

보통 정적인 이미지 파일 포맷으로 jpeg, png, webp 등이 사용된다. javascript를 사용해 이미지를 파일로 저장하기 위해 canvas를 사용한다. canvas를 통해 이미지 데이터를 생성할 수 있기 때문이다.

따라서 코드로 만든 픽셀 아트를 canvas에 옮겨야 한다.

### canvas 그리기

픽셀 아트를 위한 배열 데이터가 존재한다면 canvas에 그대로 옮기기는 간단하다. canvas의 [`fillRect`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect) 함수를 사용해 사각형을 그릴 수 있기 때문이다.

```js
const renderPixelToCanvas = ({ canvasData, pixels, cols, rows, cellSize }) => {
  const { canvas, canvasHeight, canvasWidth } = canvasData

  const ctx = canvas.getContext('2d')
  // 가로 세로 크기 설정
  ctx.canvas.height = canvasHeight
  ctx.canvas.width = canvasWidth

  // 픽셀 하나하나의 색상이 들어간 배열을 순회한다.
  pixels[0].forEach((fillStyle, pixelIdx) => {
    if (!fillStyle) {
      return
    }
    // canvas의 도형을 채우는 색을 설정
    ctx.fillStyle = fillStyle

    const col = pixelIdx % cols
    const row = Math.floor(pixelIdx / rows)

    // 각 파라미터는
    // x 좌표, y좌표, 사각형의 가로 길이, 세로 길이를 의미한다
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
  })
}
```

### png

canvas의 [`toBlob`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) 메서드를 사용해 이미지를 `Blob`으로 만들 수 있다.  
앞서 만든 canvas를 `Blob`으로 만들고 다운로드하면 된다.

```js
canvas.toBlob((buffer) => {
  downloadFile({ buffer, filename: 'pixel.png' })
})

const downloadFile = ({ buffer, filename }) => {
  const blob =
    buffer instanceof Blob ? buffer : new Blob([buffer], { type: 'image/png' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
}
```

<iframe height="300" style="width: 100%;" src="https://stackblitz.com/edit/js-khhzjn?ctl=1&embed=1&file=index.js" loading="lazy"></iframe>

### gif

픽셀 아트가 애니메이션을 표현할 수도 있기 때문에 gif로도 만들어보자.  
![[box.gif]]  
애니메이션을 추가하기 위한 작업과 인코딩 작업이 필요하다. 왜냐하면 gif는 256가지 색상만 사용하기 때문이다.

여기서 gif 인코딩을 위해 [gifenc](https://github.com/mattdesl/gifenc)라는 라이브러리를 사용했다. 다른 라이브러리들도 사용법은 비슷하다.

gif 인코딩은 다음 세 가지 단계로 이루어진다.

1. 이미지의 픽셀 색상을 256개 색상으로 축소시킨 palette로 변환한다. 수천 가지 색상을 256개 색상으로 줄이면서 좋은 품질의 결과물을 나타내는 것을 **quantization** 라고 한다. (gifenc의 `quantize` 함수)
2. 픽셀을 살펴보고 축소된 palette를 기반으로 해당 픽셀의 색상과 가장 가까운 인덱스를 찾아서 인덱싱된 비트맵을 반환한다. (gifenc의 `applyPalette` 함수)
3. 인덱싱된 비트맵과 palette를 통해 단일 프레임을 인코딩한다. (gifenc의 `gif.writeFrame` 함수)

애니메이션을 위해선 각 프레임을 인코딩하면 되는 것이다.

아까 만들어본 상자에 배경 색상을 추가한 프레임을 하나 더 추가한다. 즉, 기존 배열에 빈 값을 다른 값으로 대체한 배열만 하나 더 추가하는 것이다.

```js
const pixels = ["", "", "rgb(0, 0, 0)", ... ] // 기존 배열
const pixels = [ ["", "", "rgb(0, 0, 0)", ... ],  ["", "", "rgb(0, 0, 0)", ... ]] // 프레임
// 첫 번째 배열이 애니메이션의 첫 번째 프레임이 되고, 두 번째가 두 번째 프레임이 되는 식이다.
```

gifenc나 다른 gif encoding 라이브러리는 quantization을 위해 이미지 데이터를 입력받는데 데이터 타입이 Uint8Array다. 해당 타입은 RGBA 순서로 이미지 데이터를 가지고 있다.

```js
[r0, g0, b0, a0, r1, g1, b1, a1, ..., rn, gn, bn, an]
```

그렇다면 기존 rgb 값을 나타내는 string 배열을 위와 같이 만드는 코드가 또 필요하다. 하지만 다행히도 canvas의 [`getImageData`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData) 함수가 위와 같은 형식의 데이터(`Uint8ClampedArray`)를 반환해 준다.

canvas를 그리는 함수에서 `return` 값을 추가하자.

```js
const renderPixelToCanvas = ({ canvasData, pixels, cols, rows, cellSize }) => {
  const { canvas, canvasHeight, canvasWidth } = canvasData

  const ctx = canvas.getContext('2d')
  ctx.canvas.height = canvasHeight
  ctx.canvas.width = canvasWidth

  pixels.forEach((fillStyle, pixelIdx) => {
    if (!fillStyle) {
      return
    }
    ctx.fillStyle = fillStyle

    const col = pixelIdx % cols
    const row = Math.floor(pixelIdx / rows)

    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
  })

  return ctx.getImageData(0, 0, canvasWidth, canvasHeight) // 추가
}
```

그리고 프레임 단위로 인코딩한다.

```js
const gif = new GIFEncoder()

pixels.forEach((frame) => {
  const { data } = renderPixelToCanvas({
    canvasData,
    pixels: frame,
    cols: COLS,
    rows: ROWS,
    cellSize: CELL_SIZE,
  })

  const { palette, index, transparent, transparentIndex } =
    getPaletteWithTransparent(data) // quantization

  gif.writeFrame(index, canvasData.canvasWidth, canvasData.canvasHeight, {
    palette,
    delay: 500,
    transparent,
    transparentIndex,
  })
})
```

<iframe height="300" style="width: 100%;" src="https://stackblitz.com/edit/js-glgpw6?ctl=1&embed=1&file=index.js" loading="lazy"></iframe>

### svg

픽셀 아트를 크기에 상관없이 해상도를 유지하고자 한다면 svg로 만들어야 한다.  
단순하게 svg의 `rect`를 픽셀 개수만큼 만들면 되겠다고 생각했는데 그렇게 하면 앞에서 HTML에 `div`를 픽셀 개수만큼 그린 것과 똑같은 방식이 돼버린다.  
`100x100` 그림이라면 rect가 10,000개 생기는 것! 아주 비효율적이다.

다른 방법이 없을까 하고 찾아보니 `path`를 사용하는 방법이 있었다.
[이 코드](https://codepen.io/shshaw/details/XbxvNj)에서 사용하는 방법이다.

우선 svg의 `path`는 경로를 정의하는 데 사용된다. 이 경로를 정의하는 명령을 `d`라는 attribute에 전달한다.

예를 들어 다음과 같은 코드가 있다면

```xml
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 10 L90 10 L50 90 Z" />
</svg>
```

- `M10 10`: M(이동) 명령으로 시작점을 `(10, 10)`으로 이동한다.
- `L90 10`: L(직선) 명령으로 `(10, 10)`에서 `(90, 10)`까지 선을 그린다.
- `L50 90`: `(90, 10)`에서 `(50, 90)`까지 선을 그린다.
- `Z`: path를 닫는다.

여기서 다른 명령도 있는데 그중 `H`를 사용한다. `H`는 수평선을 그리는 명령이다.  
canvas를 그리는 방법과 비슷한데, canvas의 `fillRect`를 사용하는 방법처럼 `rect`를 그리면 그 개수가 너무 많아지니까 **같은 수평선상에 다른 픽셀에 동일한 색상이 존재한다면 선을 이어 그리는 방법** 이다.

이를 위해 먼저 같은 색상의 픽셀들의 좌표를 구한다.

```js
const getColors = (img: ImageData) => {
  const colors = {} as Colors
  const data = img.data
  const len = data.length
  const w = img.width

  // 4 요소 단위로 확인 Uint8ClampedArray
  // [r0, g0, b0, a0, r1, g1, b1, a1, ...]
  for (let i = 0; i < len; i += 4) {
    const transparent = data[i + 3] === 0 //alpha 값이 0이면 투명한 것
    if (!transparent) {
      const color =
        data[i] + ',' + data[i + 1] + ',' + data[i + 2] + ',' + data[i + 3]
      colors[color] = colors[color] || []

      // 실제 좌표
      const x = (i / 4) % w
      const y = Math.floor(i / 4 / w)

      colors[color].push([x, y])
    }
  }

  return colors
}
```

좌표를 통해 `path` 요소를 생성한다.

```js
// M, h 명령
function makePathData(x, y, w) {
  return 'M' + x + ' ' + y + 'h' + w + '';
}

// path 생성
function makePath(color, data) {
  return '<path stroke="' + color + '" d="' + data + '" />\n';
}

function colorsToPaths(colors: Colors) {
  let output = ''

  // 앞서 구한 색상 좌표를 순회한다.
  for (const [color, coordinates] of Object.entries(colors)) {
    const rgba = color.toString().split(',')
    const pixelColor = getColor(...rgba)

    if (pixelColor === false) {
      return
    }

    const paths = [] as string[]
    let firstPosition = [] as number[]
    let w = 1

    coordinates.forEach((coordinate) => {
      const [x, y] = coordinate

      // 색상의 첫 좌표와 현재 좌표를 비교했을 때 w 만큼 더한 값이 현재 좌표라면 (= 수평선상에 존재한다면)
      // path 길이는 늘어나야 한다.
      if (
        firstPosition &&
        y === firstPosition[1] &&
        x === firstPosition[0] + w
      ) {
        w++
      } else {
        if (firstPosition.length > 0) {
          paths.push(makePathData(firstPosition[0], firstPosition[1], w))
          w = 1
        }
        firstPosition = coordinate
      }
    })

    paths.push(makePathData(firstPosition[0], firstPosition[1], w))
    output += makePath(pixelColor, paths.join(''))
  }

  return output
}
```

<iframe height="300" style="width: 100%;"
 src="https://stackblitz.com/edit/js-a5kkgx?ctl=1&embed=1&file=index.js" loading="lazy"></iframe>

## 마무리하며

지금까지 픽셀 아트를 만드는 여러 방법들을 살펴봤다. 많은 사람들이 조금 더 효율적으로 그림을 그리기 위해 다양한 방법을 시도했다는 것을 알게 되었다. 아마 인코딩 함수에는 어떠한 알고리즘이 들어갔을 것이고, canvas를 그리거나 svg를 그릴 때 더 좋은 알고리즘으로 그려낼 수도 있을 것이다. svg를 만들 때 참고한 코드는 [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)를 사용하기도 했다.

개발과 살짝 멀어진 것 같았지만 색에 대해 잠깐 알아보는 것도 재밌었다. 비록 '투명한 것은 어떻게 투명하게 보이는지'에 대해 공부하려다가 이해하지 못해서 막혔지만... 언젠가 기회가 되면 알게될 것이다.

중간에도 말했지만 어떠한 지식이 전혀 다른 것을 만들기 위해 응용되는 것이 정말 신기했다. 나중에 나도 '아하!'하며 깨달음을 얻는 일이 생겼으면 좋겠다.

## reference

- [https://velog.io/@dusunax/File-Blob-ArrayBuffer-TypedArrayUint8Array#unit8array](https://velog.io/@dusunax/File-Blob-ArrayBuffer-TypedArrayUint8Array#unit8array)
- [https://blog.yaox023.com/uint8array-and-uint8clampedarray](https://blog.yaox023.com/uint8array-and-uint8clampedarray)
- [Understanding subtractive and additive colours](https://www.fespa.com/en/news-media/features/understanding-subtractive-and-additive-colours)
- [Image colors](https://hyperskill.org/learn/step/14484)
- [빛에 담긴 색의 세계와 컬러 인쇄의 원리](https://dadoc.or.kr/1952)
- [가산혼합과 감산혼합 그리고 간단한 대수학](https://blog.naver.com/handolekim/220043644233)
- [Images and Colours](https://www.csfieldguide.org.nz/en/chapters/data-representation/images-and-colours/#what-about-in-practice)
- [빛의 합성과 물감의 합성에 대한 이해](https://www.edunet.net/nedu/contsvc/viewWkstContPost.do?contents_id=1b12e3d2-cfd6-4ff4-a80b-fe55f9daec38&head_div=s2015w)
- [How to Make Pixel Art With Box Shadows](https://webtips.dev/pixel-art-with-box-shadows)

[^1]: 오현석 역, 조너선 스타인하트 저, 《한 권으로 읽는 컴퓨터 구조와 프로그래밍》, 인사이트, 2021년 (p.87)
