---
title: LocalStorage 대신 IndexedDB 사용하기
date: 2024-01-20 09:37:14 +0900
updated: 2024-01-21 13:57:48 +0900
aliases:
tags: ['How to', '글또']
description:
draft: false
---

요즘 개발하고 있는 서비스에서 임시로 특정 데이터를 저장하기 위해 브라우저 스토리지 중 하나인 **localStorage**를 사용하고 있었다.  
잘 작동하고 있는 줄 알았던 어느 날, [sentry](https://sentry.io/)를 확인해 보니 특정 사용자들에게 에러가 발생하고 있었다. 이름은 [`QuotaExceededError`](https://webidl.spec.whatwg.org/#quotaexceedederror)였다.

에러는 `localStorage.setItem`에서 발생하고 있었다. Quota는 할당량을 의미하는데 `localStorage`에 저장 가능한 데이터 할당량을 초과했다는 의미다.  
**스토리지 용량이 무제한이 아니라는 점을 간과**한 것이다. 처음 localStorage를 학습했을 때부터 작은 데이터만 저장하는 용도로 사용했기에 용량 제한이 있다는 생각을 해본 적이 없었다.  
우선 급한 대로 `try...catch`문을 감싸줬다. 오류가 남에도 수십 번 시도한 사용자에겐 미안한 마음도 들기도 했다. 사용자의 기기나 브라우저에 따라 임시 저장을 아예 하지 못하는 경우가 생길 수 있겠다는 생각이 들어 동료분과 의논 후 **IndexedDB** 라는 것으로 변경해보기로 했다.

작업에 앞서 IndexedDB와 다른 브라우저 스토리지에 대해 학습하고자 한다.

## 브라우저에 데이터를 얼마나 저장할 수 있을까?

최신 웹 브라우저들은 사용자 컴퓨터에 데이터를 저장해서 불러올 수 있도록 하는 다양한 방법을 제공한다. 이러한 데이터는 사이트의 환경설정을 개인화하거나 (테마 설정 등) 데이터를 임시 저장 (장바구니, 로그인 기록), 캐싱 등에 사용된다.

### Cookies

예전부터 사용자의 데이터를 저장할 때 쿠키(Cookies)를 사용했다. 쿠키는 서버에서 설정해 주며 [[HTTP]]를 통해 서버로 전송된다. 따라서 쿠키에 큰 데이터를 저장해버리면 HTTP 요청 시 요청 데이터도 커지는 단점이 있다.

### Web Storage

Web Storage에는 두 가지 종류가 있다.

- Local Storage
- Session Storage

Web Storage는 쿠키처럼 server-side에서 설정하는 것이 아니라 client-side에서 간단하게 값을 저장하고 불러오는 것이 가능하고 HTTP를 통해 서버로 전송되지 않는다.  
Local Storage와 Session Storage의 주요 차이점은 Session Storage는 브라우저를 닫으면 데이터가 손실되지만 Local Storage는 데이터가 유지되는 것이다.

Web Storage는 편리하게 사용자 데이터를 저장할 수 있는 장점이 있지만 origin당 5 MiB의 Local Storage와 5 MiB의 Session Storage를 저장할 수 있어서 그보다 큰 데이터를 저장하려고 하면 오류가 발생한다.

### Cache API

웹 페이지를 빠르게 로드하기 위해 **HTTP 요청 및 응답을 저장**한다.
[Cache API에 저장하는 데이터는 각 브라우저에 고유한 storage 관리 시스템에서 관리한다고 한다.](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#other_web_technologies) 그래서 브라우저 시스템마다 저장할 수 있는 용량 제한이 상이하다.

## IndexedDB

여러 스토리지에 대해 알아봤고 LocalStorage를 사용하는 것을 대체하기 위해 IndexedDB를 사용하는 것이 적절하겠다는 생각이 들었다. 그 이유가 되는 특징 몇 가지를 소개한다.

### localStorage에 비해 큰 할당량을 제공한다.

localStorage는 origin마다 5MiB까지 저장할 수 있지만 IndexedDB는 수백 메가 바이트에서 수백 기가 바이트까지 저장이 가능하다. 이는 브라우저마다 다르다.

Chrome, Edge, Chromium 기반 브라우저는 전체 디스크 크기의 최대 80%까지 저장 가능하고 origin마다 전체 디스크 공간의 60%까지 사용 가능하다.

Safari의 모든 origin의 한도는 브라우저 앱의 경우 전체 디스크 크기의 최대 80%까지, 다른 앱은 전체 디스크 크기의 최대 20%까지 가능하다. 여기서 브라우저 앱이란 기본 브라우저로 설정할 수 있는 앱이라고 한다. origin 당 브라우저 앱은 전체 디스크 크기의 최대 60%, 다른 앱은 전체 디스크 크기의 최대 15%까지 저장 가능하다.

브라우저를 실행해서 [Storage API의 estimate() 메서드](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate)를 사용하면 현재 사용 가능한 할당량을 확인할 수 있다.

### structured clone algorithm

IndexedDB는 [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)을 지원하는 객체라면 모두 저장 가능하다. 해당 객체는 [`structuredClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)에 전달해서 깊은 복사(Deep Clone)를 할 수 있다.

localStorage에 저장하는 데이터가 "객체" 구조였는데 localStorage는 문자열 값만 저장이 가능하기 때문에 이를 위해 객체를 직렬화(`JSON.stringify`)하고 가져올 때는 반대로 역직렬화(`JSON.parse`)해야 하는 번거로움이 있었다. 반면에 `structredClone()`을 사용할 수 있는 객체를 저장할 때는 IndexedDB를 사용하면 코드가 간결해진다.

### 비동기식이다.

localStorage에 데이터를 저장할 때 동기식이기 때문에 용량이 큰 데이터를 저장하거나 하는 경우 blocking이 발생할 수 있다. (사실 그 정도로 많은 데이터를 저장할 순 없지만... 그래도 데이터 저장이 완료되기 전에 다음 코드를 실행할 수 없다.)  
IndexedDB는 비동기식이기 때문에 blocking이 발생하지 않는다. 하지만 [[JavaScript-Promise|Promise]] 기반은 아니고 이벤트 기반이라고 한다. 이게 무슨 의미냐면, 데이터베이스에서 데이터를 저장하거나 불러올 때 해당 작업이 수행되도록 "요청" 하는 것이다. 그래서 작업이 완료되면 다음과 같이 [[DOM]] 이벤트로 알림을 받게 된다.

```js
// 데이터베이스를 여는 것도 요청
const request = window.indexedDB.open('MyTestDatabase', 3)

request.onerror = (event) => {
  // 문제가 있는 경우 실행되는 이벤트
}

request.onsuccess = (event) => {
  // 요청 성공 시 실행되는 이벤트
}
```

그 외 관계형 데이터베이스처럼 트랜잭션, 버저닝, 커서 등을 지원한다고 하는데 이번엔 데이터를 저장하고 불러오는 기능만 사용할 것이므로 추후에 사용할 일이 있으면 학습하도록 해야겠다!

### 사용해보기

IndexedDB는 대부분의 브라우저에서 사용 가능하지만 오래된 브라우저는 사용할 수 없는 경우가 있다. 다음과 같이 브라우저 지원 여부를 확인할 수 있다. ([참고](https://web.dev/articles/indexeddb#support))

```js
if (!('indexedDB' in window)) {
  // IndexedDB를 사용할 수 없음
  console.log("This browser doesn't support IndexedDB")
} else {
  // IndexedDB 사용 가능
}
```

IndexedDB는 row level API이므로 실제로 다루기 위해선 다소 복잡하다. 초기 세팅해야 하는 코드들(데이터베이스를 열고 이벤트 리스너를 연결하는 등) 이 많기 때문에 wrapper 라이브러리가 많이 존재한다. 많은 라이브러리들이 비동기 처리를 위해 Promise를 지원한다! 나는 localStorage처럼 사용할 수 있는 [idb-keyval](https://github.com/jakearchibald/idb-keyval)를 사용했다.

```js
import { get, set, del } from 'idb-keyval'

const setItem = async (key, data) => {
  await set(key, data)
}
const getItem = async (key) => {
  return await get(key)
}
const delItem = async (key) => {
  await del(key)
}
```

에러가 발생하는 경우를 디버깅하기 위해 IndexedDB에 더미 데이터를 넣는 코드도 필요했다. 하지만 용량이 매우 넉넉해서 `QuotaExceededError`를 마주치긴 어려웠다.

```js
// 100 MiB를 IndexedDB 데이터베이스에 추가하는 함수
const setDummyDataToStorage = async (mb = 100) => {
  const key = `idb_${Date.now().toString()}`
  // 1 MiB = 1024 * 1024 bytes
  await set(key, 'x'.repeat(mb * 1024 * 1024))
}
```

남은 할당량은 `navigator.storage.estimate()`라는 Storage API의 메서드를 통해 확인 가능하다.

```js
const getStorageUsed = async () => {
  const { usage, quota } = await navigator.storage.estimate()
  const percentUsed = Math.round((usage / quota) * 100)
  const usageInMib = Math.round(usage / (1024 * 1024))
  const quotaInMib = Math.round(quota / (1024 * 1024))

  const details = `${usageInMib} out of ${quotaInMib} MiB used (${percentUsed}%)`
  console.log(details)
}
```

그리고 이 글을 쓰게 된 이유, 에러 핸들링을 잘 해두자!

```js
const isQuotaExceededError = (err) => {
  return (
    err instanceof DOMException &&
    (err.name === 'QuotaExceededError' ||
      err.name === 'NS_ERROR_DOM_QUOTA_REACHED')
  )
}

const setItem = async (key, data) => {
  try {
    await set(key, data)
  } catch (err) {
    if (isQuotaExceededError(err)) {
      // 할당량 초과
    }
  }
}
```

---

글의 서두에서도 말했듯이 예전부터 많이 사용해 봤다고 localStorage에 데이터를 저장할 때 예외 처리를 하지 않은 것은 문제였다. 이번에 학습하면서 몇몇 [문서](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#web_storage)에서 이 부분을 알려주는 것도 봤다.

에러 덕분에 [예전에 봤던 발표 영상](https://youtu.be/o9JnT4sneAQ?si=uN5FDVAUR8a_Avuo)을 다시보는 계기가 되었다. 처음에 이 영상을 봤을 때 순수 함수, 비동기 처리 키워드에만 집중하면서 봤는데 이번엔 에러 핸들링에 집중해서 보게 되었다.

앞서 사용한 [idb-keyval](https://github.com/jakearchibald/idb-keyval) 라이브러리 코드를 살펴보면 IndexedDB 데이터베이스에 무언가 요청했을 때 에러가 발생하면 (`request.onabort`) 에러를 밖으로 뿜어낸다. 해당 함수를 사용하는 코드 입장에서 에러 핸들링을 할 수 있도록 하는 것이다.

```js
export function promisifyRequest<T = undefined>(
  request: IDBRequest<T> | IDBTransaction
): Promise<T> {
  return (
    new Promise() <
    T >
    ((resolve, reject) => {
      // @ts-ignore - file size hacks
      request.oncomplete = request.onsuccess = () => resolve(request.result)
      // @ts-ignore - file size hacks
      request.onabort = request.onerror = () => reject(request.error)
    })
  )
}
```

그래서 라이브러리를 사용하는 입장에서 어떤 에러가 발생했고 그 이후 상황을 생각할 수 있다. 만약 라이브러리의 코드에서 `try...catch`를 사용해 입맛대로 에러를 처리해놨다면 사용할 때 에러는 발생하지 않겠지만, 예전에 나처럼 `QuotaExceededError`의 존재 자체를 모를 수 있겠다는 생각이 들었다.

## reference

- [Working with IndexedDB](https://web.dev/articles/indexeddb#create_data)
- [Storage for the web](https://web.dev/articles/storage-for-the-web#cache_api)
- [Storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
- [Stop Using localStorage!](https://medium.com/@julienetienne/stop-using-localstorage-64a6d6805da8)
- [IndexedDB key characteristics and basic terminology](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Terminology)
- [Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)
