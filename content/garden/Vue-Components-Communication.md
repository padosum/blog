---
title   : 컴포넌트 통신
date    : 2021-04-26 14:03:12 +0900
updated : 2021-04-26 14:03:20 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---

## 개요 
뷰 컴포넌트는 각각 데이터를 관리하기 때문에 서로 공유하려면 규칙을 따라야 한다.  
- `props` 속성, 이벤트 전달 방식을 이용해야 한다.  

## 컴포넌트 통신 규칙이 왜 필요할까?
- N방향 데이터 통신을 할 경우 추적이 힘들다. ([MVC 모델에서의 문제점](https://facebook.github.io/flux/docs/in-depth-overview/)) 하지만 컴포넌트 통신 규칙이 있는 경우 위에서 아래로 전달되기 때문에 데이터 흐름을 추적할 수 있다. 
- 내려가는 것은 데이터 (Props)
- 올라가는 것은 이벤트 (Event)

## props 속성
```html
<body>
    <div id="app">
        <!-- <app-header v-bind:프롭스 속성 이름="상위 컴포넌트의 데이터 이름"></app-header> -->
        <app-header v-bind:propsdata="message"></app-header>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        let appHeader = {
                template: '<h1>{{propsdata}}</h1>',
                props: ['propsdata']
        }

        new Vue({
            el: '#app',
            components: {
                'app-header': appHeader
            },
            data: {
                message: 'hi'
            }
        })
    </script>
</body>
```  
- Root 컴포넌트의 data를 변경하면 하위 컴포넌트의 props 데이터도 똑같이 변경된다 → Reactivity  

## event emit 

## 뷰 인스턴스에서 this 
 
## 출처 
- [Vue.js시작하기 - 장기효](https://inf.run/SwGd)