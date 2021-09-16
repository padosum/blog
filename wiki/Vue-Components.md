---
title   : 뷰 컴포넌트
date    : 2021-04-26 13:26:30 +0900
updated : 2021-04-26 13:26:39 +0900
aliases : 
tags: ["Vue.js"]
---
- 컴포넌트: 화면의 영역을 구분해 개발할 수 있는 뷰의 기능  
  - 재사용성이 올라가고 빠르게 화면을 만들 수 있다.  

## 컴포넌트 만들기  
- 뷰 인스턴스를 생성하면 기본적으로 `Root` 컴포넌트가 된다.   

### 전역 컴포넌트
```javascript
Vue.component('컴포넌트 이름', 컴포넌트 내용);
```
```html
<body>
    <div id="app">
        <app-header></app-header>
        <app-content></app-content>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        Vue.component('app-header', {
            template: `<h1>Header</h1>`
        });
        Vue.component('app-content', {
            template: `<div>content</div>`
        });
        const vm = new Vue({
            el: '#app',
        });
    </script>
</body>
```

### 지역 컴포넌트  
```javascript
const vm = new Vue({
    el: '#app',
    components: {
        '컴포넌트 이름': 컴포넌트 내용
    }
});
```
```html
<body>
    <div id="app">
        <app-header></app-header>
        <app-content></app-content>
        <app-footer></app-footer>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        Vue.component('app-header', {
            template: `<h1>Header</h1>`
        });
        Vue.component('app-content', {
            template: `<div>content</div>`
        });

        const vm = new Vue({
            el: '#app',
            components: {
               'app-footer': {
                   template: `<footer>all rights reserved.</footer>`
               }
            }
        });
    </script>
</body>
```

## 전역 컴포넌트 vs 지역 컴포넌트 
- 지역 컴포넌트는 특정 컴포넌트 하단에 어떤 컴포넌트가 등록되어있는지 알 수 있다.  
- 전역 컴포넌트는 플러그인이나 라이브러리 (전역으로 사용해야 하는) 경우에만 사용한다.  

## 컴포넌트와 인스턴스 
- 전역 컴포넌트는 인스턴스를 생성할 때마다 새로 등록할 필요 없이 모든 인스턴스에 등록이 되어 있다.  
- 하지만 지역 컴포넌트는 인스턴스마다 새로 등록해야 화면에 이상없이 나온다.  

```javascript
<body>
    <div id="app">
        <app-header></app-header>
        <app-footer></app-footer>
    </div>

    <div id="app2">
        <app-header></app-header> <!-- 전역 컴포넌트는 생성자에 등록하지 않아도 사용 가능 -->
        <app-footer></app-footer> <!-- 지역 컴포넌트는 생성자에 등록하지 않았으므로 오류가 남 -->
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        Vue.component('app-header', {
            template: `<h1>Header</h1>`
        });
        Vue.component('app-footer', {
            template: `<div>footer</div>`
        });

        new Vue({
            el: '#app',
            components: {
               'app-footer': {
                   template: `<footer>all rights reserved.</footer>`
               }
            }
        });
        
        new Vue({
            el: '#app2'
        })
    </script>
</body>
```

## 출처 
- [Vue.js시작하기 - 장기효](https://inf.run/SwGd)
