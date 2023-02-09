---
title   : Nuxt 3에서 Vuex 사용하기 
date    : 2023-02-09 09:18:56 +0900
updated : 2023-02-09 19:05:26 +0900
aliases : ["Nuxt 3에서 Vuex 사용하기"] 
draft : false
tags : ["How to", "Vue", "Nuxt", "Vuex"]
---

## Goal

[Nuxt 3 공식문서](https://nuxt.com/docs/migration/configuration#vuex)를 살펴보면 Vuex를 더 이상 Vuex integration을 제공하지 않는다고 나와있다. `pinia`를 사용을 추천한다고 하는데 아직 학습을 하지 않아서 Vuex를 계속 사용하는 방법을 알아보도록 하자.


## Vuex 설치하기

우선 Vuex를 설치해야 한다.
```sh
npm i vuex
```

## store 추가

`createStore`로 사용할 vuex store를 만든다. Nuxt에서 사용하기 위해 `export` 한다. 
```ts
// @/store/index.ts

import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return {
	  items: []
	}
  }
});
```

## Plugin 추가

Nuxt에서 `plugins/` 디렉터리 내 모든 plugin이 자동추가 된다! `plugins/` 하위에 적당한 이름의 파일을 추가해주자.
```sh
mkdir plugins
cd plugins
touch 'vuexPlugin.ts'
```

다음과 같이 앞서 만든 `store`를 `import`해서 추가한다.
```ts
// @/plugins/vuexPlugin.ts

import { store } from '@/store';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});
```

plugin이 등록되었으므로 `useStore`로 접근할 수 있다.
```html
<script setup lang="ts">
import { useStore } from 'vuex';
const store = useStore();

const items = computed(() => store.state.items));
</script>
```
