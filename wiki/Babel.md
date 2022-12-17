---
title: Babel
date: 2021-06-11 17:42:26 +0900
updated : 2022-12-17 23:42:52 +0900
aliases:
tags: ['Web', 'JavaScript']
---

**Babel**

- [[Transpiler]]
- 크로스 브라우징 문제 해결을 위해 등장
- ES2015+ 로 작성한 코드를 모든 브라우저에서 일관적으로 동작하도록 호환성을 지켜준다.
```js
// ES6에 등장한 화살표 함수를
const foo = () => {...}
    
// 아래와 같이 변환
function foo() {...}
```
    

## Babel 설치하기

Babel을 사용해서 ES2015+ 구문을 사용하는 JavaScript 코드를 구형 브라우저에서 작동하는 코드로 컴파일해보자.

우선 필요한 패키지를 설치해야한다:
```bash
npm install @babel/core @babel/cli @babel/preset-env
```

## Babel 설정하기

패키지를 설치했다면 `babel.config.json`라는 이름의 설정 파일을 추가한다. (`v7.8.0` 이상 버전이어야 한다.), 만약 이전 버전의 Babel을 사용하는 경우엔 `babel.config.js` 파일로 생성한다.

### babel.config.json

아래는 [공식 문서](https://babeljs.io/docs/en/usage) 에서 가져온 설정 파일 내용이다:
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```

### Babel 빌드 단계

설정 파일에 담긴 내용은 무엇을 의미하는 것일까?

우선 Babel의 동작은 다음 3단계로 이루어진다.

1. 파싱
2. 변환
3. 출력

BAabel은 파싱과 출력만 담당, 변환 작업은 **플러그인**이 처리한다.

ES2015+으로 코딩시 필요한 플러그인을 일일이 찾아 적는 것은 힘들기 때문에 목적에 맞게 여러가지 플러그인을 세트로 모아놓은 **프리셋**을 사용하는 것이 좋다. 패키지 설치 때 `@babel/preset-env`라는 프리셋을 설치했따.

- Babel에서 제공하는 [프리셋](https://babeljs.io/docs/en/presets)
- preset-env
  - `npm i @babel/preset-env`
  - ES2015+ 를 변환할 때 사용
  - `targets` 옵션에 지원해야할 브라우저, 버전을 지정할 수 있다.

`preset-env` 옵션에는 명시한 대상 브라우저 버전에서 사용할 수 없는 기능에 대한 플러그인만 로드하도록 설정되어 있다. 
```json
"@babel/preset-env",
{
	"targets": {
	  "edge": "17",
	  "firefox": "60",
	  "chrome": "67",
	  "safari": "11.1"
	}
}
```

다음과 같이 점유율로 설정할 수도 있다:
```json
"@babel/preset-env",
{
	"targets": "> 0.25%, not dead"
}
```
### Babel 실행하기

다음과 같이 [[NPX]]를 사용해 Babel을 실행하면 `src` 디렉토리 내부의 코드들이 컴파일된 결과가 `lib` 디렉토리에 담긴다:
```sh
npx babel src --out-dir lib
```


### 폴리필

polyfill

- babel은 문법을 변환하는 [[transpiler]] 역할만 한다. 
- 따라서 지원하지 않는 객체나 메서드 등의 경우는 따로 추가를 해줘야 한다. 이 때 사용하는 것이 폴리필이다.
	- 예를 들어 ES6에서 비동기 처리를 위해 등장한 `Promise`는 ES5에 존재하지 않기 때문에 사용할 수 없다.
- 폴리필은 지원하지 않는 native API를 다른 코드로 동작하게 한다.
	- Feature Detection을 기반으로 동작한다. Feature Detection은 브라우저가 특정 코드 블록을 지원하는지 여부에 따라 코드를 실행하도록 하여, 일부 브라우저에서 항상 오류 대신 무언가 작동하도록 한다.[^1]
	- [참고](https://gist.github.com/MiguelCastillo/38005792d33373f4d08c)
- 폴리필 관련 옵션
	- [출처](https://tech.kakao.com/2020/12/01/frontend-growth-02/)
	- `useBuiltIns`: 폴리필 삽입 방식을 설정
	  - 최신 자바스크립트 폴리필이 포함된 모듈인 `core-js`를 가져오는(`import`) 코드를 타깃 브라우저에 맞게 삽입/수정한다.
	  - `entry`: `core-js/stable`과 `regenerator-runtime/runtime` 모듈을 전역 스코프에 직접 삽입한 경우에 사용 가능. 전체 `core-js` `import` 문을 `core-js` 하위 특정 모듈들의 `import`문으로 변경시켜, 타깃 환경에 필요한 폴리필만 전역 스코프에 추가되도록 처리
	  - `usage`: 실제 사용한 폴리필만 삽입
  - `corejs`: corejs모듈 버전 명시

core-js 모듈을 설치해서 폴리필을 추가할 수 있다.
```sh
npm install core-js@3
```

## Webpack과 Babel

- 실무에서는 Babel을 직접사용하는 것보다 [[Webpack]]과 통합해서 사용한다.
  - `npm i babel-loader`

## reference

- [https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html](https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html)

[^1]: https://velog.io/@lucas/Javascript%EC%9D%98-%EA%B8%B0%EB%B3%B8-2