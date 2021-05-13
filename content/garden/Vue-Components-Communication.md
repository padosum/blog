---
title   : 컴포넌트 통신
date    : 2021-04-26 14:03:12 +0900
updated : 2021-05-13 22:51:08 +0900
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
- 하위 컴포넌트에서 상위 컴포넌트로 이벤트를 올리는 것 → event emit  
  - 검색해보니 emit의 뜻은 방출하다였다.   

```html
<body>
    <div id="app">
        <app-header v-on:pass="상위 컴포넌트의 메서드 이름"></app-header>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        let appHeader = {
            template: '<button v-on:click="passEvent">click me</button>',
            methods: {
                passEvent: function() {
                    this.$emit('pass')
                }
            }
        }
        new Vue({
            el: '#app',
            components: {
                'app-header': appHeader
            }
        })
    </script>
</body>
```
- 버튼을 클릭했을 때 `passEvent`라고 하는 메서드를 정의 
- vue.js 개발자도구에 있는 Events 탭에서 event emit에 대한 log를 확인할 수 있다.  

### event emit을 받고 할 수 있는 것 
```html
<div id="app">
    <h1>{{ num }}</h1>
    <app-header v-on:pass="logText"></app-header>
    <app-content v-on:add="logNumber"></app-content>
</div>
```

```javascript
let appHeader = {
    template: '<button v-on:click="passEvent">click me</button>',
    methods: {
        passEvent: function() {
            this.$emit('pass')
        }
    }
}

let appContent = {
    template: '<button v-on:click="addNumber">Add</button>',
    methods: {
        addNumber: function() {
            this.$emit('add')
        }
    }
}
new Vue({
    el: '#app',
    components: {
        'app-header': appHeader,
        'app-content': appContent,
    },
    methods: {
        logText: function() {
            console.log(`hi`);
        },
        addNumber: function() {
            this.num = ++this.num;
        },
        data: {
            num: 10
        }
    }
})
```
- `pass`라는 이벤트가 아래에서 올라왔을 때 받은 곳에서 `logText`라는 메서드를 실행한다. 

## 뷰 인스턴스에서 this 
- `this`는 기본적으로 뷰 인스턴스를 가리킨다.  

## 같은 컴포넌트 레벨 간 통신  
- 같은 레벨의 컴포넌트끼리 바로 통신이 되지 않아 상위 컴포넌트로 전달(event) 후 전달하고 싶은 컴포넌트로 전달(props)한다.   


## Reference 
- [Vue.js시작하기 - 장기효](https://inf.run/SwGd)
