---
title   : Vuepress GitHub Pages에 배포하기  
date    : 2021-03-18 17:12:06 +0900
updated : 2021-03-18 17:12:38 +0900
tags: ["Vue.js", "How to"]
---

 예전에 처음 정적 웹사이트를 만들고 배포했을 때는 GitHub Pages에 하는 경우가 많았는데 오랜만에 하려니 뚝딱 해내기가 힘들었다. 나중을 위해 기록한다.  


## yml 파일 만들기  
- 우선 push할 때 배포를 위해 GitHub Action이 필요했다. 
- 이번에 알게된 것은 [Github Marketplace](https://github.com/marketplace?type=actions)에 이런 저런 Actions이 모여있다는 것이었다.  
- vuepress를 배포하는 것은 여러개 있었던 것 같은데 다음 Action을 사용했다.  
  - [https://github.com/marketplace/actions/vuepress-deploy](https://github.com/marketplace/actions/vuepress-deploy)
- `.github/workflows` 디렉토리에 적당한 이름으로 `.yml` 파일을 생성한다.  
  - 나와있는 코드엔 `Checkout` repo 브랜치가 `master`가 적혀있었는데 `main`으로 변경되어 있어서 바꿔줬다.  

## secrets.ACCESS_TOKEN 설정하기  
- yml 파일을 추가하고 push하니 `ACCESS_TOKEN`이 없다는 오류가 발생했다. repo에 추가를 해야 했다.  

### Personal access tokens 만들기  
- [https://github.com/settings/tokens](https://github.com/settings/tokens)에서 `Generate new token`  
- scopes에는 "repo"를 선택한다. 
  - **그 뒤 만들어진 token은 복사해둔다**. 

### Secrets 만들기  
- 해당 repo > Settings > Secrets에서 `New repository secret` 
![[111595400-71cbca00-880f-11eb-984d-9e86cf69dfc9.png]]
- Name에는 `ACCESS_TOKEN`, Value에 아까 복사한 token을 넣는다.  

## 발생한 문제  
- 위 과정을 거치고 배포는 완료되었는데 사이트가 엉망이었다.  
  - 이미지랑 css 등 파일을 불러온 경로들이 잘못된 느낌이었다.  
- 찾아보니 [vuepress config reference](https://vuepress.vuejs.org/config/#basic-config)에 사이트를 sub path에 배포를 했다면 'base' 값을 넣어줘야한다고 설명되어 있었다.  
```js:title=config.js
module.exports = config({
  base: '/base-url/',
...
```  