---
title   : NPM
date    : 2021-06-03 13:56:01 +0900
updated : 2022-01-23 20:42:29 +0900
tags    : ["JavaScript"] 
---
**NPM (Node Package Manager)**  

- 명령어로 자바스크립트 라이브러리를 설치하고 관리할 수 있는 [[Package-Manager|패키지 매니저]], 전 세계 자바스크립트 개발자들이 자바스크립트 라이브러리를 공개된 저장소에 올려놓고 `npm` 명령어로 편하게 다운받을 수 있다. 

## NPM 설치 
- `npm install` 
- `npm uninstall`: 라이브러리 삭제 명령어 
  
### NPM 설치 명령어 옵션 
- `--global` 또는 `-g`
  - 프로젝트에서 사용할 라이브러리를 불러오는 것이 아니라 시스템 레벨에서 사용할 라이브러리를 설치할 때 사용 
  - 전역으로 설치된 라이브러리 경로: `/usr/local/lib/node_modules`
- `--save-prod`
  - 옵션에 아무것도 넣지 않은 것과 같다. **package.json**의 `dependencies`에 등록됨 
- `--save-dev` 또는 `-D` 
  - **package.json**의 `devDependencies`에 등록됨

## dependencies, devDependencies 
- `dependencies`는 배포용, `devDependencies`는 개발용  
  - 배포용은 화면 로직과 연관된 라이브러리, 개발용은 개발할 때만 사용하고 배포할 때는 빠져도 좋은 라이브러리
  - 배포용 라이브러리는 `npm run build`로 빌드하면 최종 애플리케이션 코드 안에 포함되게 된다. 
- 개발용 라이브러리의 예
  - webpack
  - eslint
  - sass
  - js-compression 
  - imagemin 

## NPM 명령어
### `npm ci`
`node_modules`가 없는 경우에 `npm install`보다 2배 이상 빠르다. 


## scripts
- custom scripts는 `npm run 명령어`로 실행한다.  

### concurrently
[concurrently](https://github.com/open-cli-tools/concurrently)를 사용하면 여러 개의 스크립트를 동시에 실행할 수 있다. server와 client를 동시에 실행시킬 때 사용한다.  
```bash
$ npm install concurrently
```
```json
"scripts": {
    "backend": "nodemon server/index.js",
    "dev": "concurrently \"npm run backend\" \"npm run start --prefix client \""
  },
```
스크립트의 경로가 다른 곳에 있다면 `--prefix 경로`를 뒤에 붙여준다.
  
## reference 
- [프론트엔드 개발자를 위한 웹팩](https://inf.run/hVZe)
