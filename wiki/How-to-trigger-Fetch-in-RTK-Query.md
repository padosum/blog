---
title   : How-to-trigger-Fetch-in-RTK-Query
date    : 2023-07-24 23:45:19 +0900
updated : 2023-07-24 23:50:51 +0900
aliases : ["Redux-Tookit-Query에서 fetch 요청을 trigger 하는 법"]
tags: ["Redux", "RTK"]
draft : false
---

RTK Query에서 데이터를 가져올 때 `fetchBaseQuery` 를 사용한다.  

공식 문서에 나온 코드를 참고하면 다음과 같이 `use`로 시작하는 hook을 사용할 수 있다.
```ts
export const PostDetail = ({ id }: { id: string }) => {
  const {
    data: post,
    isFetching,
    isLoading,
  } = useGetPostQuery(id, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  if (isLoading) return <div>Loading...</div>
  if (!post) return <div>Missing post!</div>

  return (
    <div>
      {post.name} {isFetching ? '...refetching' : ''}
    </div>
  )
```


내가 궁금한 것은 컴포넌트가 렌더링될 때 데이터를 가져오지 않고 어떤 이벤트가 발생했을 때 가져오고 싶었다.   

역시나 방법은 있었ek. [`useLazyQuery`](https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#uselazyquery)를 사용하면 된다!
`useLazyQuery`가 반환한 배열의 첫 번째 요소를 원하는 이벤트 발생시 호출하면 그때 데이터를 가져온다.
```ts
const [trigger, result, lastPromiseInfo] = api.useLazyGetPostsQuery(options)

const handleClick = () => {
  trigger()
}
```
