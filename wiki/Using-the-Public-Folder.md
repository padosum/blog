---
title   : Electron, React로 만든 프로젝트에서 Public 폴더 사용하기  
date    : 2022-06-03 23:29:08 +0900
updated : 2022-06-04 00:41:45 +0900
aliases : ["Electron, React로 만든 프로젝트에서 Public 폴더 사용하기"]
tags    : ["React", "electron", "How to"]
---
## Goal
Electron, React로 만든 프로젝트에서 이미지 파일을 불러올 때 `public` 폴더에서 파일을 가져오는 방법 알아보기

프로젝트에서 이미지 파일 경로를 다음과 같이 설정했었다.
```javascript
// ExComponent.js
const assetPathPrefix = '../../assets/images'
```
위와 같이 설정하고 로컬에서 프로젝트를 실행했을 때는 경로를 잘 불러왔다. 왜냐하면 디렉토리 구조가 다음과 같았기 때문이다.
```
├── public
│   ├── assets
│   │   └── images
│   │       └── header.png
└── src
    ├── App.js
    ├── components
    │   └── ExComponent.js
    └── index.js
```

하지만 프로젝트를 배포하고 나면 이미지 경로를 불러오지 못했다. 파일이 존재하지 않는다는 알림과 함께...
[electron-builder](https://github.com/electron-userland/electron-builder)를 이용해서 빌드를 하는데 다음과 같이 production mode에서 빌드된 html 파일을 불러오도록 되어있다. (`/build/index.html`)
```javascript
if (process.env.mode === 'dev') {
  win.loadURL('http://localhost:3000');
} else {
  win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
}
```
따라서 경로는 `../../`와 같이 상대경로로 설정하면 파일을 불러오지 못하는 것이 당연했다. `public` 폴더 내부에 있는 `assets/images` 는 빌드 후 루트에 존재했다. 

파일을 `public` 폴더에 넣으면 [[Webpack]]에 의해 처리되지 않는다고 한다. 그대로 복사되어 빌드 폴더에 들어가게 된다. `public` 폴더 내부의 파일에 접근하려면 환경 변수인 `PUBLIC_URL`을 사용하면 된다. 빌드 시 `public` 폴더에 있는 파일을 절대 경로로 사용할 수 있도록 다음과 같이 설정하면 해결된다. [^1] 
```javascript
// ExComponent.js
const assetPathPrefix = `${process.env.PUBLIC_URL}/assets/images`;
```

## 여담
다음과 같이 Create React App으로 만든 프로젝트에서 절대 경로를 사용해 이미지 파일 등을 불러오는 것을 많이 봤었다.
```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

많이봤지만 둘 사이의 연결고리를 만들지 못했다. 역시 바로바로 연결되도록 많이 경험해보는 것이 중요한 듯 하다..

## reference
- [https://create-react-app.dev/docs/using-the-public-folder/](https://create-react-app.dev/docs/using-the-public-folder/)

[^1]: https://create-react-app.dev/docs/using-the-public-folder/#adding-assets-outside-of-the-module-system