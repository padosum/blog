---
title   : Webpack
date    : 2021-06-04 20:37:21 +0900
updated : 2023-01-06 22:51:16 +0900
aliases : ["웹팩"]
tags: ["Web", "Webpack"]
---

- [[Module-Bundler|모듈 번들러]]

## 모듈
- 프로그래밍 관점에서 특정 기능을 갖는 작은 코드 단위 
- JavaScript에서의 모듈: [[JavaScript-Module]] 
- webpack에서의 모듈
    - 자바스크립트 모듈에만 국한되지 않고 웹 애플리케이션을 구성하는 모든 자원을 의미. HTML, CSS, JavaScript, image, font 등.... 하나하나가 모듈이다.  

## 모듈 번들링  
- 웹 애플리케이션을 구성하는 많은 자원들을 하나의 파일로 병합 및 압축해주는 동작

## webpack 사용 전후의 차이  
- Network 탭: webpack을 사용하면 http request 수가 적다. 여러 파일이 하나로 번들링 되었기 때문   
  
## webpack으로 해결하려는 문제들  
- 자바스크립트 변수 유효 범위 문제 
  - ES6의 Modules 문법, 모듈 번들링으로 해결
- 브라우저별 HTTP 요청 숫자의 제약  
  - 브라우저별로 한 번에 서버에 보낼 수 있는 HTTP 요청 숫자가 정해져있다.  
- 사용하지 않는 코드 관리
- Dynamic Loading & Lazy Loading 미지원 
  - 원하는 모듈을 원하는 타이밍에 로딩할 수 있음 

## webpack 설치  
- `npm install -D webpack webpack-cli`  

## webpack의 속성 

webpack 설정 파일인 `webpack.config.js`을 프로젝트 루트 폴더에 추가해야 한다. 그러면 webpack이 자동으로 이 파일을 사용한다.

`webpack.config.js` 예시 코드:
```javascript
const path = require("path");

module.exports = {
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js", // main.js
  },
};
```

### entry
- webpack에서 자원을 빌드하기 위한 최초 집입점, 자바스크립트 파일 경로 
- 웹 애플리케이션의 전반적인 구조와 내용이 담겨져야 하는데 그렇게 해서 모듈 간의 의존 관계가 생기는 구조를 디펜던시 그래프라고 한다.  
- 엔트리 포인트는 여러 개가 될 수도 있다.  
  - 싱글 페이지 애플리케이션이 아닌 경우  

### output
- webpack을 사용하고 난 뒤 결과물의 파일 경로  
- 다양한 옵션을 추가해야 한다.  

여기까지 설정하고 실행해보자.
```sh
npx webpack
```

빌드 결과물을 `dist` 디렉토리에서 확인한다.

### mode
- `mode` 파라미터를 `development`, `production`, `none`으로 설정하면 환경별로 최적화를 활성화할 수 있다. 기본값은 `production`
- `process.env.NODE.ENV`가 설정된다.

```js
module.exports = {
  mode: 'production'
}
```

### loader
- 자바스크립트 파일이 아닌 웹 자원(HTML, CSS, image, font 등)을 webpack이 인식할 수 있도록 도와주는 속성
- 여러 개의 로더를 사용하는 경우 **오른쪽에서 왼쪽 순으로 적용**된다.  
```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{
	  test: /\.scss$/,
	  use: ['style-loader', 'css-loader', 'sass-loader']
	}],
  },
};

```
- `test`: 변환이 필요한 파일을 식별하는 속성
- `use`: 변환을 수행하기 위해 사용하는 로더를 명시하는 속성
- loader의 예
	- `babel-loader`: ECMAScript 2015 이전 규격의 코드를 ECMAScript 5 규격으로 변환
	- `style-loader`: 동적으로 `style` 태그를 생성해 CSS를 적용
	- `css-loader`: `.css` 파일을 읽어들이기 위해 사용, CSS 파일 간의 의존관계를 해소
	- `sass-loader`: [[sass]] 파일을 사용하기 위한 loader  

#### Asset Modules
webpack에서 폰트나 아이콘 등을 불러올 때 `file-loader`, `url-loader`등을 사용했었다. Webpack5 부터는 로더를 사용하지 않고 [Asset Modules](https://webpack.kr/guides/asset-modules/) 을 사용하면 된다!

#### Babel 연동하기

babel-loader를 사용해보자.

다음 명령으로 `babel-loader`를 설치한다.
```sh
npm install babel-loader --save-dev
```

`webpack.config.js`에 `module`을 추가하고, `rule`을 추가한다:
```js
const path = require("path");

module.exports = {
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js", // main.js
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
```

다시 webpack을 실행한다.
```sh
npx webpack
```

사뭇 다른 결과물을 확인할 수 있을 것이다...


### plugin
- loader가 파일을 해석하고 변환하는 과정에 관여한다면 plugin은 해당 결과물의 형태를 바꾸는 역할 
	- 번들 최적화, 에셋 관리, 환경 변수 주입 등...

#### plugin 사용하기

`require()`로 플러그인을 불러와서 `plugins` 배열에 추가한다.

아래 예시는 `html-webpack-plugin`이다. webpack 빌드 결과물에 대해 html 파일을 만들어준다. 빌드 결과가 다 들어가있다. 

```sh
npm install --save-dev html-webpack-plugin
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 내장 plugin에 접근하는 데 사용

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```




## 개발을 위한 설정들

`webpack.config.js` 파일에 `mode`를 `development`로 설정하자.
```js
module.exports = {
  mode: 'development'
  // ...
}
```

### source maps

webpack이 코드를 번들링하게 되면 여러 파일들이 하나로 묶인다. 그래서 오류가 발생한 경우 오류의 기존 위치를 파악하기가 어려울 수 있다.

source map은 빌드된 파일과 원본 파일을 서로 연결해서 오류 추적을 도와준다. 
source map 사용을 위해서는 `webpack.config.js`를 다음과 같이 작성한다:
```js
module.exports = {
  devtool: 'eval-source-map'
}
```

source map을 설정하면 Devtools에서 오류가 발생한 위치가 몇 번째 줄인지 확인 가능하다.
![source map 적용 후](Attachments/source-map.png)

[devtool 옵션](https://webpack.js.org/configuration/devtool/#devtool)

### 코드 변경시 자동 컴파일 하기

코드를 수정할 때마다 매번 `npm run build`를 입력해서 빌드하기는 매우 귀찮을 것이다.

코드가 변경될 때 자동 컴파일을 도와주는 여러 옵션이 있다.
1. watch mode
2. webpack-dev-server
3. webpack-dev-middleware

이 3가지를 알아보자!

#### watch mode

"watch"라는 이름에서 알 수 있듯이 디펜던시 그래프 내 모든 파일에서 변경사항을 지켜보도록 webpack에게 요청하는 것이다. 

`package.json`에 watch mode로 webpack을 실행할 수 있도록 스크립트를 추가하자.
```json
{
	"watch": "webpack --watch"
}
```

그리고 `npm run watch`를 실행하자! 그리고 코드를 수정하고 저장하면 다시 빌드가 된다. 하지만 문제가 있다. **브라우저를 새로고침해야 변경 사항이 반영된다는 것이다.** 매번 또 새로고침을 해야 한다. 번거롭다. 

이를 해결하기 위해 webpack-dev-server를 사용하자.

####  webpack 데브 서버 (Webpack Dev Server)  
- 코드 한줄 변경시 다시 빌드해야 하는 번거로움을 해결하기 위한 도구
    - 매번 webpack 명령어를 실행하지 않아도 코드만 변경하고 저장하면 webpack으로 빌드한 후 **브라우저를 새로고침** 해준다.  
    - **webpack 빌드 시간 까지 줄여준다.** 
- 개발용 서버  
    - 배포시 잠재적 문제를 미리 확인(ajax 방식의 api연동에서 cors 문제 확인)  
- 빌드 후 메모리에만 번들 파일을 보관한다.
    - 컴퓨터 구조상 **파일 입출력 보다 메모리 입출력이 속도가 빠르고 자원이 덜 소모되기 때문** 
    - 만약 페이지가 다른 경로에서 번들 파일을 찾을 것으로 예상된다면 서버 설정에서 `devMiddleware.publicPath` 옵션을 사용해 설정 가능하다.

webpack-dev-server를 설치한다:
```sh
npm install --save-dev webpack-dev-server
```

아래와 같이 설정하면 `webpack-dev-server`에게 `dist` 디렉터리 파일을 `localhost:8080`에서 제공하도록 한다.
```javascript
// webpack.config.js 
module.exports = {
  // ...
  devServer: {
    static: './dist'
  },
};
```


`package.json`에 스크립트를 추가하자.
```js
"scripts": {
  "build": "webpack",
  "watch": "webpack --watch",
  "client:dev": "webpack serve --open"
},
```

`npm run client:dev`를 실행하면 코드 변경시 빌드 후 브라우저도 새로고침되는 것을 확인할 수 있다.
- [webpack-dev-server의 옵션들](https://webpack.js.org/configuration/dev-server/)
	- `--progress`를 추가하면 빌드 진행률을 보여준다.  

##### SPA와 함께

[HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)를 사용하는 경우엔 `404 Not Found` 응답을 받는 대신 `index.html`이 제공되어야 한다. 이때 `historyApiFallback` 설정을 `true`로 해주면 된다.
```js
// webpack.config.js
module.exports = {
  //...
  devServer: {
    historyApiFallback: true,
  },
};
```
이 옵션의 의미가 뭔지 몰랐는데 사용하는 경우를 생각해보니 그냥 직관적인 이름이었다. history Api 사용시 대처하는 기능(Fallback)을 의미하는 것이었다.

##### Hot Module Replacement  

커다란 프로젝트에서 일부 모듈만 수정되었지만 전체를 갱신한다면 불필요한 시간을 소모하는 것이다.

**Hot Module Replacement(HMR)**은 코드가 변경되었을 때 전체 모듈을 갱신하지 않고 변경된 모듈만 갱신하는 기능이다.

설정 방법
- `webpack-dev-server` `v4.0.0` 부터는 HMR이 기본적으로 활성화되어 있다.
- `devServer.hot` 속성을 `true`로  
- `module.hot` 객체의 `accept()` 메소드를 사용.  
  - 감시할 모듈과 콜백 함수를 인자로 받고, 해당 모듈의 변경이 있으면 콜백 함수가 동작하는 방식이다.  
  - 이런 동작을 **HMR 인터페이스를 구현한다**라고 한다.
- css, file loader 등이 핫로딩을 지원한다.


##### CORS  
- 실제 api 연동시, CORS 정책으로 인해 다른 서버의 api를 사용하지 못하는 경우가 있다.  
- 해결방법
  - 서버측에서 api 응답 헤더에 `Access-Control-Allow-Origin: *` 헤더 추가 
  - webpack dev server에서 `proxy` 속성
    - [https://webpack.js.org/configuration/dev-server/#devserverproxy](https://webpack.js.org/configuration/dev-server/#devserverproxy)

#### webpack-dev-middleware

frontend 코드와 server 코드가 함께 있는 경우에, `webpack-dev-middleware`를 사용하면 webpack에서 처리한 파일을 서버로 내보낸다.

express와 `webpack-dev-middleware` 를 결합해보자.
```sh
npm install --save-dev express webpack-dev-middleware
```


`webpack.config.js`를 수정하자:
```js
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    main: './src/client/App.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    publicPath: '/',
  },
```
`publicPath`는 서버 스크립트내에서 사용된다.

서버 스크립트(`server.js`):
```js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// express에서 webpack-dev-middleware와 webpack.config.js를 사용하도록 설정
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

`node server.js`를 실행하고 `http://localhost:3000`에 접속한다. webpack이 작동되는 것을 확인할 수 있다!

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
- [프론트엔드 개발자를 위한 webpack](https://inf.run/hVZe) 
- [프론트엔드 개발환경의 이해와 실습](https://inf.run/PM8f)  
  
