---
title   : 
date    : 2021-06-11 17:42:26 +0900
updated : 2021-06-11 23:02:41 +0900
aliases : 
tags: ["Web", "JavaScript"]
---
**Babel**
- [[Transpiler]]
- 크로스 브라우징 문제 해결을 위해 등장  
  - ES2015+ 로 작성한 코드를 모든 브라우저에서 일관적으로 동작하도록 호환성을 지켜준다.
## Babel 설치하기 
```bash
npm install @babel/core @babel/cli
```
## Babel 실행하기
```bash
npx babel 파일명
```
## Babel의 동작

### Babel 빌드 단계 
1. 파싱
2. 변환
3. 출력
- 바벨은 파싱과 출력만 담당, 변환 작업은 **플러그인**이 처리한다.
```bash
npx babel 파일명 --plugins 커스텀플러그인
```
- 명령어가 길어지면 파일로 분리하는 것이 좋다. 프로젝트 루트에 `babel.config.js` 
### babel.config.js 
```javascript
module.exports = {
  plugins: [ 
  ...
  ]
}
```
- ES2015+으로 코딩시 필요한 플러그인을 일일이 찾아 적는 것은 힘들기 때문에 목적에 맞게 여러가지 플러그인을 세트로 모아놓은  **프리셋**을 사용하는 것이 좋다.  
```javascript
// preset.js 
module.exports = function preset() {
  return {
    plugins: [
    ...
    ]
  }
}
```
```javascript
// babel.config.js
module.exports = {
  preset: ["./preset.js"]
}
```

## Babel 사용법  
- Babel에서 제공하는 [프리셋](https://babeljs.io/docs/en/presets)  
- preset-env
  - `npm i @babel/preset-env` 
  - ES2015+ 를 변환할 때 사용
  - `targets` 옵션에 지원해야할 브라우저, 버전을 지정할 수 있다.  
    
### 폴리필 
- 바벨은 ES5로 변환할 수 있는 것만 빌드한다. 그외는 **폴리필**이라는 코드 조각을 추가해서 해결해야 한다. 
- 폴리필 관련 옵션
  - `useBuiltIns`: `usage`, `entry`, `false`.
  - `corejs`: corejs모듈 버전 명시  
  - 💡 [https://tech.kakao.com/2020/12/01/frontend-growth-02/](https://tech.kakao.com/2020/12/01/frontend-growth-02/) 읽어보기   

## [[Webpack]]과 Babel  
- 실무에서는 바벨을 직접사용하는 것보다 웹팩으로 통합해서 사용한다. 
  - `npm i babel-loader` 
    
## reference
- [https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html](https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html)
