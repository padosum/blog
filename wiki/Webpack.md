---
title   : Webpack
date    : 2021-06-04 20:37:21 +0900
updated : 2022-01-15 21:56:33 +0900
aliases : ["웹팩"]
tags: ["Web", "Webpack"]
---

- [[모듈 번들러]]

## 모듈
- 프로그래밍 관점에서 특정 기능을 갖는 작은 코드 단위 
- JavaScript에서의 모듈: [[JavaScript-Module]] 
- 웹팩에서의 모듈
    - 자바스크립트 모듈에만 국한되지 않고 웹 애플리케이션을 구성하는 모든 자원을 의미. HTML, CSS, JavaScript, image, font 등.... 하나하나가 모듈이다.  
## 모듈 번들링  
- 웹 애플리케이션을 구성하는 많은 자원들을 하나의 파일로 병합 및 압축해주는 동작

## 웹팩 사용 전후의 차이  
- Network 탭: 웹팩을 사용하면 http request 수가 적다. 여러 파일이 하나로 번들링 되었기 때문   
  
## 웹팩으로 해결하려는 문제들  
- 자바스크립트 변수 유효 범위 문제 
  - ES6의 Modules 문법, 모듈 번들링으로 해결
- 브라우저별 HTTP 요청 숫자의 제약  
  - 브라우저별로 한 번에 서버에 보낼 수 있는 HTTP 요청 숫자가 정해져있다.  
- 사용하지 않는 코드 관리
- Dynamic Loading & Lazy Loading 미지원 
  - 원하는 모듈을 원하는 타이밍에 로딩할 수 있음 

## 웹팩 설치  
- `npm install -D webpack webpack-cli`  

## 웹팩의 속성 
### entry
- 웹팩에서 자원을 빌드하기 위한 최초 집입점, 자바스크립트 파일 경로 
- 웹 애플리케이션의 전반적인 구조와 내용이 담겨져야 하는데 그렇게 해서 모듈 간의 의존 관계가 생기는 구조를 디펜던시 그래프라고 한다.  
- 엔트리 포인트는 여러 개가 될 수도 있다.  
  - 싱글 페이지 애플리케이션이 아닌 경우  
```javascript
...
entry: {
    main: './src/app.js'
},
output: {
    path: path.resolve('./dist'),
    filename: '[name].js' // main.js
}
```
### output
- 웹팩을 사용하고 난 뒤 결과물의 파일 경로  
- 다양한 옵션을 추가해야 한다.  
  
### loader
- 자바스크립트 파일이 아닌 웹 자원(HTML, CSS, image, font 등)을 웹팩이 인식할 수 있도록 도와주는 속성
- 여러 개의 로더를 사용하는 경우 **오른쪽에서 왼쪽 순으로 적용**된다.  
```javascript
{
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
}
```
- `babel-loader`: ECMAScript 2015 이전 규격의 코드를 ECMAScript 5 규격으로 변환
- `style-loader`: 동적으로 `style` 태그를 생성해 CSS를 적용
- `css-loader`: CSS 파일 간의 의존관계를 해소

### plugin
- 웹팩의 기본적인 동작에 추가적인 기능을 제공  
- 로더가 파일을 해석하고 변환하는 과정에 관여한다면 플러그인은 해당 겨로가물의 형태를 바꾸는 역할 
- HtmlWebpackPlugin
    - 웹팩 빌드 결과물에 대해 html 파일을 만들어준다. 빌드 결과가 다 들어가있다.  

## 웹팩 데브 서버 (Webpack Dev Server)  
- 코드 한줄 변경시 다시 빌드해야 하는 번거로움을 해결하기 위한 도구
    - 매번 웹팩 명령어를 실행하지 않아도 코드만 변경하고 저장하면 웹팩으로 빌드한 후 브라우저를 새로고침 해준다.  
    - **웹팩 빌드 시간 까지 줄여준다.** 
- 개발용 서버  
    - 배포시 잠재적 문제를 미리 확인(ajax 방식의 api연동에서 cors 문제 확인)  
- 파일이 아닌 메모리 상으로만 빌드 결과물을 보여준다.
    - 컴퓨터 구조상 **파일 입출력 보다 메모리 입출력이 속도가 빠르고 자원이 덜 소모되기 때문** 
- `npm i -D webpack-dev-server`로 설치
```javascript
// webpack.config.js 
module.exports = {
  // ...
  devServer: {
    contentBase: path.join(__dirname, '/'),
    historyApiFallback: true,
    port: 3000
  },
};
```
- `npx webpack-dev-server --mode=development --hot --inline --open`
  
### Webpack Dev Server 옵션  
- [옵션들](https://webpack.js.org/configuration/dev-server/)
- `--progress`를 추가하면 빌드 진행률을 보여준다.  

## [[Babel]]

## [[Sass]] 
- sass파일을 사용하기 위해 웹팩에서 `sass-loader`를 사용한다.  
 
### Webpack Dev Server와 API  
#### API mockup - devServer.before
```javascript
devServer: {
  before: (app, server, compiler) => {
    app.get("/api/users", (req, res) => {
      res.json([
	{ id: 1, name: "tomas" },
	{ id: 2, name: "nicolas" },
	{ id: 3, name: "james" } 
      ])
    })
  }
}
```   
#### API mockup - connect-api-mocker  
- 특정 목업 폴더를 만들어 api 응답을 담은 파일을 저장하고 api로 제공해주는 기능 
```bash
npm i -D connect-api-mocker
```
```javascript
// webpack.config.js:
const apiMocker = require("connect-api-mocker")

module.exports = {
  devServer: {
    before: (app, server, compiler) => {
      app.use(apiMocker("/api", "mocks/api"))
    },
  },
}
```  
- `/mocks/api` 디렉토리 내부 경로에 `GET.json` 응답파일을 만들면된다.  
- `/api`로 들어온 요청에 대해 처리하겠다는 것  

### CORS  
- 실제 api 연동시, CORS 정책으로 인해 다른 서버의 api를 사용하지 못하는 경우가 있다.  
- 해결방법
  - 서버측에서 api 응답 헤더에 `Access-Control-Allow-Origin: *` 헤더 추가 
  - webpack dev server에서 `proxy` 속성
    - [https://webpack.js.org/configuration/dev-server/#devserverproxy](https://webpack.js.org/configuration/dev-server/#devserverproxy)

### Hot Module Replacement  
- 전체 화면을 갱신하지 않고 변경된 모듈만 갱신하는 기능  
- `devServer.hot` 속성을 `true`로  
- `module.hot` 객체의 `accept()` 메소드를 사용.  
  - 감시할 모듈과 콜백 함수를 인자로 받고, 해당 모듈의 변경이 있으면 콜백 함수가 동작하는 방식이다.  
  - 이런 동작을 **HMR 인터페이스를 구현한다**라고 한다.     
- css, file loader 등이 핫로딩을 지원한다.  

## 최적화 하기  
### production 모드  
- `mode: production`  
- 운영환경에 적합한 번들 결과(최소화한 결과)를 만들 수 있다.    

### optimazation 속성  
- 빌드 과정을 커스터마이징  
- `optimize-css-assets-webpack-plugin`: css 파일에 빈칸 없애는 압축 
- `TerserWebpackPlugin`: 자바스크립트 코드 난독화, debugger, console.log 제거 등  

### Code Splitting  
- 결과물을 여러개로 쪼개는 것이 더 속도를 빠르게할 수도 있다. 큰 파일 하나 다운로드보다 작은 파일 여러개를 동시에 다운로드하는 것이 더 빠르기 때문이다.  
- entry를 여러개로 분리
  - `SplitChunksPlugin` 사용 
    - 코드 분리시 중복을 예방 
- dynamic import 
- 개발 초기단계가 아닌 후에 용량이 커졌을 때 분리해도 된다.  

### externals  
- 서드 파티 라이브러리는 이미 패키지로 제공되었을 때 빌드 과정을 거쳤기에 프로세스에서 제외하는 것이 좋다. externals가  제공하는 기능이다.  
## reference
- [프론트엔드 개발자를 위한 웹팩](https://inf.run/hVZe) 
- [프론트엔드 개발환경의 이해와 실습](https://inf.run/PM8f)  
  
