---
title   : ESLint
date    : 2021-06-13 20:37:56 +0900
updated : 2021-06-14 10:48:33 +0900
aliases : 
tags: ["JavaScript"]
---
## Lint 
- 보풀
- Lint Roller, 돌돌이 보풀제거기 
- 린트 롤러처럼 코드의 오류나 버그, 스타일을 점검하는 것을 린트, 린터라 한다.  
  
## ESLint
- ECMAScript 코드에서 린트 도구 중 하나  
- 코드에서 검사하는 항목
  - 포맷팅
    - 일관된 코드 스타일 유지, 가독성을 더 좋도록 해준다. 
  - 코드 품질 
    - 앱의 잠재적인 오류나 버그를 예방, 오류 발생 확률을 줄여준다. 
    
## ESLint 설치와 사용  
```bash
npm i -D eslint
```
- 노드 패키지 설치 후 `.eslintrc.js`라는 이름의 린트 설정파일 생성

```javascript
module.exports = {
  rules: {
    "no-unexpected-multiline": "error",
  },
}
```
- `.eslintrc.js` 파일의 `rules`에 코드를 검사하는 규칙을 정할 수 있다. 
  - [미리 정해놓은 규칙들](https://eslint.org/docs/rules/)
  - 규칙 목록 중 렌치 아이콘이 표시되어 있는 항목은  `--fix` 옵션으로 자동 수정이 가능한 규칙이다.  
    
### `extends`
- 미리 규칙들을 프리셋처럼 만들어논 것이 있다. `eslint:recommended` 설정  
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    "eslint:recommended", // 미리 설정된 규칙 세트을 사용한다
  ],
}
```
- 규칙 목록 중에 체크 표시가 되어있는 항목
- 이외 자주 사용하는 2가지  
  - airbnb
    - [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)
  - standard  
    - [eslint-config-standard](https://github.com/standard/eslint-config-standard)
- **`npx eslint --init`을 사용하면 쉽게 구성이 가능하다.**  

## [[Prettier]]
- ESLint와 프리티어를 함께 사용하기 위해 `eslint-config-prettier`를 사용하면 프리티어와 충돌하는 ESLint 규칙을 비활성화 한다.  
```javascript
// .eslintrc.js
{
  extends: [
    "eslint:recommended",
    "eslint-config-prettier"
  ]
}
```
```bash
npx prettier 파일명 --write && npx eslint 파일명 --fix
```
### eslint-plugin-prettier
- eslint-plugin-prettier 플러그인은 프리티어의 규칙을 ESLint 규칙에 추가한다. 그래서 ESLint만 실행하면 된다.  
```bash
npm i -D eslint-plugin-prettier
```
```javascript
// .eslintrc.js
{
  plugins: [
    "prettier"
  ],
  rules: {
    "prettier/prettier": "error"
  },
}
// 또는
{
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ]
}
```

## 자동화  
- 린트를 매번 코딩시에 수시로 실행하는 것보다 자동화하는 것이 편하다.  
  
### Git Hooks
- [husky](https://github.com/typicode/husky)는 깃 훅을 쉽게 사용할 수 있는 도구  
```bash
npm i -D husky
```
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "eslint app.js --fix"
    }
  }
}
```
- 린트중 오류가 발생하면 커밋에 실패한다.  
- [lint stage](https://github.com/okonet/lint-staged)은 변경된 파일만 린트로 검사하는 도구  
  ```bash
  {
    "lint-staged": {
      "*.js": "eslint --fix"
    }
  }
  ```
  ```json
  {
    "lint-staged": {
      "*.js": "eslint --fix"
    },
    "husky": {
      "hooks": {
        "pre-commit": "lint-staged"
      }
    }
  }
  ```
  
### 에디터 확장 도구 사용하기  
- [https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)  
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```  
- 저장시 린트 검사를 하는 옵션  

## 생각  
ESLint라 하면 여러 강의나 튜토리얼에서 "코드 오류를 수정해준다. 확장 프로그램을 설치해라." 하고 간단하게 설명만들었었는데 왜 필요한지, 어떻게 사용해야 하는지, 또 다른 사용법은 무엇인지 상세하게 알게되었다. 결국 기초와 원리가 중요함을 또 느꼈다. 그냥 확장프로그램이 만들어져 있으니 사용하는 것이 아니라 그걸 사용하는 이유와 어떤 부분에서 편리한 프로그램인지 한번 더 생각해볼 수 있었다.

## reference 
- [https://jeonghwan-kim.github.io/series/2019/12/30/frontend-dev-env-lint.html](https://jeonghwan-kim.github.io/series/2019/12/30/frontend-dev-env-lint.html) 
