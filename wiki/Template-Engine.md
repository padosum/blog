---
title   : 템플릿 엔진
date    : 2022-11-01 23:00:07 +0900
updated : 2022-11-08 00:15:00 +0900
aliases : ["템플릿 엔진"]
tags    : ["Node.js", "How to"]
draft : false
---

## 템플릿 엔진
- 데이터와 템플릿을 합성해 문서를 출력해주는 소프트웨어다.
- 웹 템플릿 엔진은 view code(HTML)과 data logic code(DB)를 분리해준다.


## pug와 ejs
- 캠프 첫 프로젝트에서 템플릿 엔진이라는 것을 사용했다. 복습하는 겸 살펴봤다.
- 당시에 pug를 사용했는데, 익숙하지 않은 문법이라 애먹었다. 하지만 다른 엔진은 뭐가 있을까 하고 찾아봤던 'ejs'에 비해 코드가 훨씬 간결하다는 것은 알게되었다.
- pug는 코드 중복을 해결하기 위해 [상속 기능](https://pugjs.org/language/inheritance.html)이 있다. 그게 코드의 깔끔함을 더해주는 것 같다.
- [ejs에는 따로 내장된 상속 기능이 없는 것으로 보인다.](https://stackoverflow.com/questions/41795871/how-to-use-block-inheritance-in-ejs-templates)
- **하지만 개인적으로 jsp, asp를 경험한 기억 때문에 ejs가 이해하기 쉬웠다.**  
	- ~~하지만 pug파일의 vscode 아이콘이 귀엽다.~~
- 프로젝트 진행시에 편한 방식으로 선택해서 하면 좋을 것 같다.
-  [[2022-11-06|사용해본 걸 복습하는 겸 프로젝트를 클론하기로 했는데 문제가 생겼다.]]
	- 나는 단순히 ejs 문법이 내가 보기 편해서 사용해보기로 했었는데 막상 프로젝트 작업을 하고 나니, 공통적으로 사용하고싶은 HTML 구조가 필요했다. (`input` 태그 같은...)
	- 하지만 ejs의 경우에는 "Layout" 이라는 기능을 제공해서 **정적인** HTML을 **include**할 수는 있는데
	- 그때그때 다르게 동작하도록 동적인 HTML 구조를 추가할 수는 없었다. 이게 아쉬웠다. **pug는 [mixins](https://pugjs.org/language/mixins.html) 이라는 기능이 제공되는데 HTML 구조를 인수를 전달해서 만들 수 있다!** 

## express-generator를 이용해 앱 skeleton 생성하기

Express는 HTTP 요청에 대해 라우팅과 미들웨어 기능을 제공하는 [[Framework|프레임워크]]다. 
`express-generator`를 사용하면 애플리케이션의 skeleton을 빠르게 생성할 수 있다.

```bash
$ npm install -g express-generator
$ express
```

[다양한 옵션](https://expressjs.com/en/starter/generator.html) 이 있는데 앱 생성시 **템플릿 엔진**을 설정할 수 있다.
다음 명령은 템플릿엔진은 ejs로 해서 현재 폴더에 skeleton을 생성하는 것이다.
```bash
$ express --view=ejs .
```

[[tree]] 를 사용해 디렉토리를 확인하면 다음과 같이 나온다.
```js
.
├── app.js
├── bin
│   └── www
├── package-lock.json
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.ejs
    └── index.ejs
```

pug로 생성한 프로젝트와 다를 바 없다. 차이점이 있다면 views 디렉토리에 layout.pug가 있다. 앞서 말한 pug의 상속 기능 때문인 듯 하다.
```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public 
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug
```

## Iteration
ejs:  `<% %>`만 잘 넣어주면 된다.
```ejs
<% for(var i = 1; i <= menuCnt; i++){ %>
  <li><img src="/images/menu<%=i%>.png" /> 메뉴<%= i %></li>
<% } %>
```

pug
```pug
each _, i in Array(5)
  li = i
```

## Conditionals
ejs:  `<% %>`를 잘 넣고 잘 닫자.
```ejs
<% if (description) { %>
  <p class="description">blablabla...</p>
<% } %>
```



## includes
> 작성중

## Inheritance

## Mixins
[[Load-SVG-using-Pug-Mixin|Pug Mixin을 사용해 SVG 불러오기]]

> 작성중


## 참고 자료
- [https://velog.io/@hi_potato/Template-Engine-Template-Engine](https://velog.io/@hi_potato/Template-Engine-Template-Engine)
