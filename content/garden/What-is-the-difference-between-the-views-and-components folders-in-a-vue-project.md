---
title   : Vue.js Project에서 views 와 components 폴더의 차이  
date    : 2021-07-16 17:29:58 +0900
updated : 2021-09-08 23:26:00 +0900
aliases : ["Vue.js Project에서 views 와 components 폴더의 차이"] 
private : false
hidden  : false
showReferences : true
---
[[Vue-CLI]]로 생성된 뷰 프로젝트의 `src/components`와 `src/views` 폴더에 둘 다 `.vue` 파일이 들어가있는데 차이점을 알고 싶었다. 검색해보니,  
Vue 컴포넌트가 라우팅을 위한 View 로 행동하느냐 안하느냐의 차이, `src/components` 속 컴포넌트는 라우터용으로 사용될 가능성이 적고, `src/views` 내부 컴포넌트는 적어도 하나의 라우터에서 사용한다는 것  
가장 중요한 것은 현재 진행중인 프로젝트에서 가장 베스트인 구조를 사용하면 된다고 한다.  

개인 프로젝트면 내 마음이지만 다른 사람과 협업을 할때는 어떻게 하는게 최상인지 생각해보고 작업을 하는 것이 좋을 것 같고, 또 규칙을 잘 정해놓는다면 프로젝트 구조를 이해하는데 훨씬 도움이될 것 같다.  
