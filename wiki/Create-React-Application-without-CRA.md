---
title: CRA 없이 React App 만들기
date: 2023-03-09 13:24:16 +0900
updated: 2023-03-09 20:05:02 +0900
aliases: ["CRA 없이 React App 만들기"]
draft: false
---

## Goal

`create-react-app` 없이 React App 개발을 위한 환경을 준비해보자.

## 왜?

그동안 작은 토이 프로젝트와 튜토리얼을 따라하며 `create-react-app`을 사용했다. 간편하기 때문이다.
나는 겪어보지 못했지만 불편함이 있어서 사용하지 않는 경우도 많다고 한다. `create-react-app`을 사용하면 빌드 구성이 추상화되어 있기 때문에 `eject`를 사용해 설정을 해야 하는데 이때 어려움을 겪을 수 있다.

`create-react-app` 없이 내가 원하는 구성대로 프로젝트를 세팅할 수 있다면 `create-react-app`이 어떤 부분 때문에 간편한 것이고 어떤 부분때문에 불편한지 알 수 있지 않을까!

## Webpack으로 번들링하기

우선 React 프로젝트를 설정하기 위해 뭐가 필요할까?
react, react-dom, [[babel]]만 있으면 되겠다.

React는 최신 버전의 자바스크립트를 사용할 것을 권장한다. [[Transpiler|트랜스파일링]]을 위해 Babel이 필요하다.

그리고 `create-react-app`은 내부적으로 [[Webpack]]을 사용해 번들링을 한다.[^1] 그래서 webpack으로 프로젝트를 구성해보겠다.

### 프로젝트 초기화

프로젝트 디렉토리로 이동해 다음 명령어를 입력한다. `package.json` 파일을 생성된다.

```sh
npm init -y
```

`react` 설치하기

```sh
npm install react
```

`react-dom` 설치하기
`react-dom`은 React와 [[DOM]] 사이의 접착제 역할을 하는 패키지다.

```sh
npm install react-dom
```

Webpack 설치하기
개발시에만 필요한 것들은 `--save-dev`를 붙여준다.

```sh
npm install webpack --save-dev
```

`webpack-cli` 설치하기
`webpack`을 커맨드라인에서 사용할 수 있게 해주는 도구다.

```sh
npm install webpack-cli --save-dev
```

`webpack-dev-server` 설치하기
[[Webpack#webpack 데브 서버 (Webpack Dev Server)|코드 변경 후 저장하면 페이지를 알아서 다시 로드해준다.]]

```sh
npm install webpack-dev-server --save-dev
```

babel 설치하기

```sh
npm install @babel/core --save-dev
```

babel-loader 설치
webpack에서 babel로 트랜스파일링을 할 수 있도록 해주는 로더다.

```sh
npm install babel-loader --save-dev
```

babel preset 설치
[[Babel]]에서 변환 작업은 플러그인이 담당한다. 여러 플러그인을 세트로 모아놓은 것이 preset이다.
ES2015+ 를 변환할 때 사용하는 `@babel/preset-env` 와 React 앱에서 JSX 문법을 변환하는 `@babel/preset-react`를 설치한다.

```sh
npm install @babel/preset-env --save-dev
npm install @babel/preset-react --save-dev
```

html-webpack-plugin
번들링된 결과물을 불러오는 html 파일을 만들어준다.

```sh
npm install html-webpack-plugin --save-dev
```

### webpack 설정하기

root 디렉토리에 `webpack.config.js` 파일을 추가한다.

```js
module.exports = {
  entry: "./src/index.js",
};
```

애플리케이션의 진입점을 `entry` 속성에 추가한다.

`src/index.js`

```js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(React.createElement(App));
```

`src/components/App.js`

```js
import React from "react";

export default function App() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
```

`output` 속성에 빌드 결과물이 담길 경로를 설정한다.

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
};
```

빌드된 파일을 `index.html` 파일에 불러오기 위해 `html-webpack-plugin`을 추가한다.

```js
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
```

`index.html` 생성하기
`src/index.js`에서 `div#root`에 렌더링하는 코드가 있으므로 `div#root`가 있어야 한다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

babel-loader 사용 추가하기
`.js`로 끝나는 파일 `/node_modules` 내부 파일을 제외하고 babel-loader를 이용해 트랜스파일링 한다.

```js
module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
}
```

package.json에서 스크립트 수정하기

- `npm run dev`: 개발 서버 실행
- `npm run build`: webpack으로 빌드

```js
{
  "scripts": {
    "dev": "webpack-dev-server --mode development --open --hot",
    "build": "webpack --mode production"
  },
}
```

## ESLint, prettier 설치 및 적용

### eslint

[공식 문서](https://beta.reactjs.org/learn/editor-setup#linting) 에서 추천하는 `eslint-config-react-app`를 설치한다.

`create-react-app`을 사용하면 기본으로 포함되는 것이라고 한다!

[[ESLint]]와 `eslint-confing-react-app` 설치하기

```sh
npm install --save-dev eslint-config-react-app eslint@^8.0.0
```

`.eslintrc.json` 파일을 프로젝트 root 디렉토리에 추가하고 다음 내용을 추가하면 된다.

```json
{
  "extends": "react-app"
}
```

### prettier

설치는 [[Prettier]] 참고

[[ESLint#Prettier|Prettier]]을 사용할 때 ESLint와 충돌하는 규칙을 비활성화해야 한다.
`eslint-config-prettier`를 사용하면 된다.

```sh
npm install --save-dev eslint-config-prettier
```

`.eslintrc.json`

```json
{
  "extends": ["react-app", "eslint-config-prettier"]
}
```

## 환경 변수 설정하기

그렇게 다 잘 되었다고 생각하던 찰나에 `.env` 파일에 환경 변수를 설정하고 불러오려고 하니 당연히 되지 않았다. 이것도 `create-react-app`이 뒤에서 해주고 있었다!

[dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack) 플러그인을 추가하자. `.env` 파일에 담긴 정보 중 코드에서 명시적으로 참조된 환경 변수만 최종 번들에 노출된다고 한다.[^2]

```sh
npm install dotenv-webpack --save-dev
```

설치 후 `webpack.config.js` 에 추가한다.

```js
// webpack.config.js
const Dotenv = require('dotenv-webpack');

module.exports = {
  ...
  plugins: [
    new Dotenv()
  ]
  ...
};
```

## alias 설정하기

vscode에서 파일 import 시 경로 alias를 설정할 수 있다.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

webpack에 적용하기 위해 `webpack.config.js`에 다음 코드를 추가한다.

```js
module.exports = {
  ...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
```

## stylesheet 적용하기

webpack에서 `style-loader`와 `css-loader`를 사용한다.

```sh
npm install --save-dev style-loader
npm install --save-dev css-loader
```

```js
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  }
}
```


## 생각

`create-react-app`은 뒤에서 정말 많은 일을 해주고 있었다. 간단한 설정만 필요하다면 사용하는 것이 훨씬 이득같다. 하지만 조금이라도 더 설정이 필요할 때 문제가 생길 가능성이 농후해보인다. 다음번에는 vite에서 작업하는 것도 진행해봐야겠다.

## reference

- [Create a React App WITHOUT Create React App](https://youtu.be/h3LpsM42s5o)

[^1]: [Create React App (create-react-app.dev)](https://create-react-app.dev/)
[^2]: [dotenv-webpack - npm (npmjs.com)](https://www.npmjs.com/package/dotenv-webpack)
