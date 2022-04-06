---
title   : CSS z-index 
date    : 2021-10-28 15:49:23 +0900
updated : 2022-04-06 18:36:32 +0900
aliases : 
tags    : ["CSS"] 
---
## Goal
CSS `z-index` 속성에 대해 알아보기. 관련된 간단한 문제가 생겼을 때 더 이상 검색하지 않고 바로 이해할 수 있도록 학습하기.  

## 기본 문법 
`z-index` 속성은 해당 요소의 Z축 상의 위치를 지정한다. 더 큰 `z-index` 값을 가진 요소가 작은 값을 가진 요소 위를 덮는다. 주의할 점은 ~~`z-index`는 `position` 속성이 설정된 요소에만 의미를 갖는다. (`position: static` 제외)~~
**`z-index`는 Flow 레이아웃에서는 구현되지 않는다.** [^1] 책이나 블로그글 등에서 `position` 속성에 대해 이야기 하는데 코드로 확인해보면 `position` 속성이 없더라도 `display: flex` 나 `display: grid` 등 Flow 레이아웃이 아닌 경우에 `z-index` 속성이 동작한다는 사실을 알 수 있었다.
이후 나올 예시 코드는 편의상 `position` 속성을 사용한 것으로 작성했다.

값은 정수이거나, `auto`로 설정하면 부모 요소와 동일한 위치가 된다.   
```css
z-index: auto;

z-index: 1;
z-index: 2;
z-index: -1; /* 음수도 가능 */
```
`z-index`의 값이 정수이면 자손의 `z-index`를 해당 요소 바깥 요소와 비교하지 않는다.    
예를 들어 다음과 같이 `div.green`의  부모 요소인 `div.red`가 `z-index: 1`이고, 부모의 형제인 `div.blue`가  `z-index: 2` 인 경우에 부모의 자식인 `div.green`이 `z-index: 9999`여도 부모의 형제 요소를 덮을 수 없다.
```html
<div class="box blue">Blue Box</div>
<div class="box red">
  Red Box
  <div class="box green">Green Box</div>
</div>
```

```css
.box {
  color: white;
  position: absolute;
}

.blue {
  z-index: 2;
  width: 70px;
  height: 70px;
  background-color: blue;
}

.red {
  z-index: 1;
  width: 100px;
  height: 100px;
  background-color: red;
}

.green {
  z-index: 9999;
  width: 50px;
  height: 50px;
  background-color: green;
}
```
![[z-index-1.png]]

하지만 위 코드에서 부모 요소(`div.red`)의 `z-index` 값이 없다면 부모 형제 요소와 자식 요소를 비교해서 덮을 수 있다.   
```css
.red {
  /* z-index: 1; */
  width: 100px;
  height: 100px;
  background-color: red;
}
```
![[z-index-2.png]]

## 기타 
간혹 다음과 같이 `z-index` 속성의 값을 아주 큰 값(`9999`, `10000` 등...)으로 해두는 경우를 볼 수 있다.  
```css
z-index: 9999;
```
해당 요소를 다른 요소보다 항상 앞에 두기 위한 일종의 hack 이다. 일반적으로 개발을 할 때 요소의 z축을 구축하는 방법을 생각하고 작업을 하기 때문에 대부분 1~10 사이의 값으로 `z-index`를 설정할 것이다. 하지만 다른 사람이 개발한 것 위에 설정하려는 경우  더 큰 `z-index` 값이 무엇인지 확신할 수 없으므로 매우 큰 값으로 설정하는 것이다.   
위와 같은 경우를 방지하기 위해 [airbnb style guide](https://github.com/CodeMakeBros/css-style-guide)에 나온 것처럼 `z-index`를 사용하는 경우엔 자세한 주석을 남기는 것이 좋을 것 같다.  

[^1]: [레이아웃 알고리즘 이해하기](https://junghan92.medium.com/%EB%B2%88%EC%97%AD-%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-baed8b1eca5f)