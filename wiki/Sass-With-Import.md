---
title   : Sass와 @import 
date    : 2022-02-05 22:20:18 +0900
updated : 2022-02-05 22:35:24 +0900
aliases : 
tags    : ["Sass", "SCSS"] 
---
## Goal
Sass에서 `@import`를 사용하는 방법 알아보기  

## `@import`  
CSS 파일을 로드하기 위해서는 `<link>` 태그를 사용하는 방법과 `@import`를 사용하는 방법이 있다.  
CSS 파일에서 `@import`는 다음과 같이 사용한다. **파일의 확장자까지 적어줘야 한다.**
```css
@import url("header.css");
@import 'common.css';
```
SASS(`.sass`, `.scss`) 파일에서는 확장자가 `.sass` 또는 `.scss`인 경우에는 확장자를 적어주지 않아도 해당 파일을 불러온다.  

## SASS 파일명 앞에 `_`를 붙이는 이유  
Sass 파일명 앞에 `_`가 붙은 경우를 볼 수 있다. 왜 붙이는 것일까?   
Sass 파일은 컴파일을 할 때 파일 이름 기반으로 컴파일을 하게 된다. 그래서 하나의 Sass 파일에 포함된(`@import`시킨) 파일도 따로 컴파일이 될 수 있다. 이를 방지하기 위해 별도의 외부 파일 이름 앞에 `_`를 붙여서 하나의 파일로 컴파일 되게 해준다.  

예를 들어, 다음과 같이 `main.scss`에서 `colour.scss`를 불러오는 경우에  
```scss
// colour.scss
$dark__background: #12111a;
```
```scss
// main.scss
@import 'colours';

.box {
  width: 100px;
  height: 100px;
  background: $dark__background;
}
```

컴파일을 하면 다음과 같은 css 파일이 각각 생성된다.
```
colours.css
colours.css.map
main.css
main.css.map
```

하지만 `_colour.scss`로 파일 이름에 `_`을 추가하고 불러오게 되면 `main.scss` 파일만 컴파일 된다.  가져올 때는 이름 앞의  `_`를 생략해도 된다.
```scss
@import 'colours';
```

이처럼 `_`를 붙인 파일은 부분 파일(partial file)로 CSS 파일로 생성되어서는 안 된다는 것을 알려준다. 해당 파일은 다른 Sass 파일에 포함할 수 있는 작은 조각이 되며 이 부분 파일 덕분에 CSS를 모듈화하고 쉬운 유지 보수를 할 수 있게 된다. 

## references 
- [https://sass-lang.com/guide](https://sass-lang.com/guide)
- [W3Schools - sass import](https://www.w3schools.com/sass/sass_import.php)
