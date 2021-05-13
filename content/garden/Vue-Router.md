---
title   : 뷰 라우터
date    : 2021-05-13 23:07:18 +0900
updated : 2021-05-13 23:07:25 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
## 뷰 라우터?
- 뷰에서 싱글 페이지 애플리케이션을 구현하거나 페이지 간 이동기능을 구현할 때 사용하는 라이브러리  


## 라우터 뷰 
- URL에 따라 뿌려주는 영역은 라우터에서 제공하는 `<router-view></router-view>` 태그로 지정할 수 있다. (뷰 인스턴스에 라우터를 연결해야함)  
- `a` 태그가 생성된다.  

```html
<body>
    <div id="app">
        <div>
            <router-link to="/login">Login</router-link>
            <router-link to="/main">Main</router-link>
        </div>
        <router-view></router-view>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
</body>
```
```javascript
let LoginComponent = {
    template: '<div>login</div>'
}
let MainComponent = {
    template: '<div>Main</div>'
}

let router = new VueRouter({
    // 페이지의 라우팅 정보 -> 어떤 URL로 이동했을 때 어떤 페이지가 출력될지에 대한 정보 
    routes: [
        {
            // 페이지의 url 
            path: '/login',
            // 해당 url에서 표시될 컴포넌트
            component: LoginComponent
        },
        {
            path: '/main',
            component: MainComponent
        }
    ]
});

new Vue({
    el: '#app',
    router:  router 
});
```

## 라우터 옵션 
### url에 있는 `#` 해쉬값 지우기 
```javascript
const router = new VueRouter({
    mode: 'history'
})
```
[https://stackoverflow.com/questions/34623833/vue-js-how-to-remove-hashbang-from-url](https://stackoverflow.com/questions/34623833/vue-js-how-to-remove-hashbang-from-url)    


### component 
- 라우터에 있는 component는 무조건 하나만 올 수 있기에 component이고 뷰 인스턴스에서는 여러개가 등록 가능해서 component**s**다. 

## 생각 
Vuepress를 그냥 가져다 쓰기만 했을 때 왜 url에 `#`이 붙는지 알 수가 없었는데 이제서야 공부를하니 알게되었다! 다른 분이 올려놓은 질문글에 친절히 답변을 해주셨는데 SPA에서 라우터라는 개념 자체가 hashchange 이벤트를 기반으로 하여 URL이 바뀌었을 때 서버로 가지 않고 화면을 이동하는 효과를 주기 위함이라고... 어쩐지 브라우저에서 뭔가 로딩이 되지 않고 바로바로 페이지 이동이 되는 느낌이었다. 


## Reference 
- [Vue.js시작하기 - 장기효](https://inf.run/SwGd)

