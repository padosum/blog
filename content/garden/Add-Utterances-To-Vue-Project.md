---
title   : Vue Project에 Utterances 추가하기  
date    : 2021-08-14 21:11:13 +0900
updated : 2021-08-14 21:21:14 +0900
aliases : ["Vue Project에 Utterances 추가하기"]
tags: ["How to", "Vue.js"]
---
Vue 컴포넌트에 [Utterances](https://utteranc.es/) 를 추가하고 싶었다.   
[vue-utterances](https://github.com/khalby786/vue-utterances)와 [utterances-vue-component](https://github.com/TomokiMiyauci/utterances-component)라는 이미 만들어진 컴포넌트들이 있었는데 모두 vue 3 버전에 가능해서 그냥 간단하게 만들기로 했다.  

## Comment 컴포넌트 만들기 

```vue
<template>
  <div ref="comment"></div>
</template>

<script>
export default {
  props: {
    repo: String,
  },
  mounted() {
    const utterances = document.createElement('script')

    utterances.type = 'text/javascript'
    utterances.async = true
    utterances.crossorigin = 'anonymous'
    utterances.src = 'https://utteranc.es/client.js'

    utterances.setAttribute('issue-term', 'pathname')
    utterances.setAttribute('theme', theme)
    utterances.setAttribute('repo', this.repo)

    this.$refs.comment.appendChild(utterances)
  },
}
</script>

<style scoped></style>
```
- [utteranc.es](https://utteranc.es/)에서 가져온 코드를 `mounted()`에서 불러올 수 있도록 작업한다.  

- 해당 컴포넌트를 가져올 곳에서 `repo` 이름을 넘기면 끝 
```vue
<template>
...
  <comment :repo="[ENTER REPO HERE]"></comment>
...
</template>

<script>
import Comment from '@/components/Comment.vue'
export default {
  components: {
	  Comment,
	},
  ...
}
</script>
</script>
```

## reference 
- [https://junilhwang.github.io/TIL/Vuepress/Utterances/#%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%8C%E1%85%A5%E1%86%B8-%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AB-theme%E1%84%8B%E1%85%A6-%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5](https://junilhwang.github.io/TIL/Vuepress/Utterances/#%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%8C%E1%85%A5%E1%86%B8-%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AB-theme%E1%84%8B%E1%85%A6-%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5)
