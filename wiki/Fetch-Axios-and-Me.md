---
title   : 나와 Fetch와 Axios 
date    : 2022-09-21 18:19:15 +0900
updated : 2022-09-22 18:52:34 +0900
aliases : ["나와 Fetch와 Axios"]
tags    : ["JavaScript"]
---

**나**는 그동안 [[HTTP]] 요청을 하기 위해 배운대로 **[[JavaScript-Promise|Fetch API]]** 를 써왔다.

어떤 튜토리얼에서 **Axios**를 사용하는 것을 따라해봤고, 다른 개발자 분들도 Axios를 사용하는 걸 지켜봤다. 기회가 생겨 어떤 점이 좋은지 여쭤봤다. 

> fetch를 사용할 때보다 편리한 점이 있어요.

**편리한 점이 어떤 것일까? 이걸 알아내는 것은 내 몫이다.** 

하지만 지난 여름, 그걸 알아보기도 전에 사용을 먼저 해버렸다.   
그래서 조금 늦었지만 둘의 차이를 비교하고, 아니 `XMLHttpRequest`까지 셋의 차이를 알아본 뒤 사용하려고 한다.

## 요청하기
### XMLHttpRequest
[[XMLHttpRequest]]의 HTTP 요청 과정은 다음과 같다.
1. 새로운 `XMLHttpRequest` 객체 생성하기
2. [[HTTP-Method|HTTP 메서드]]와 URL을 전달해 요청을 초기화하기
3. 요청 구성하기 
4. 요청 전송하기

```js
const request = params => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    const { method = 'GET', url, headers = {}, body } = params

    xhr.open(method, url)

    setHeaders(xhr, headers)

    xhr.send()
  })
}
```

**JSON 데이터를 전송하기 위해선 직렬화해줘야 한다.**
```js
xhr.send(JSON.stringify(body))
```

### Fetch API

Fetch API는 `fetch()`가 [[JavaScript-Promise|Promise]] 객체를 반환하기 때문에 `XMLHttpRequest`보다 읽기 쉽다.  
`XMLHttpRequest`와 마찬가지로 전송 데이터는 `JSON.stringify`를 사용해 직렬화해야 한다.

```js
const request = async params => {
  const { method = 'GET', url, headers = {}, body } = params

  const config = {
    method,
    headers: new window.Headers(headers),
  }

  if (body) {
    config.body = JSON.stringify(body) // 직렬화
  }

  const response = await window.fetch(url, config)
  // ...
}
```

### Axios

Axios는 라이브러리로 Fetch API처럼 `Promise` 기반이다.

세 가지 방법 중 가장 읽기가 쉽다. 요청시 `POST` 메서드를 이용해서 JavaScript 객체를 전송하면 axios가 알아서 데이터를 문자열로 변경해준다!  
전송하고자 하는 데이터는 `data` 프로퍼티에 할당하면 된다.  
```js
const request = async params => {
  const { method = 'GET', url, headers = {}, body } = params

  const config = {
    url,
    method,
    headers,
    data: body,
  }

  return axios(config)
}
```

## 응답받기

### XMLHttpRequest
`XMLHttpRequest`의 응답과정은 다음과 같다.
1. 요청 완료까지 대기하기
	1. 요청이 성공적으로 끝나면 `onload` 호출
	2. 요청이 오류로 끝나면 `onerror` 호출
	3. 요청이 timeout으로 끝나면 `ontimeout` 콜백 호출
```js
xhr.onerror = () => {
  reject(new Error('Timeout Error'))
}

xhr.onload = () => {
  resolve(parseResponse(xhr))
}

xhr.ontimeout = () => console.log(`timeout`)
```

여기서 응답이 성공했을 때, 응답 데이터가 존재하고 ([[HTTP-Status-Codes|HTTP 상태 코드]]가 `204`가 아닌 경우) 라면, `JSON.parse`로 역직렬화해야 한다. 그러면 JSON 포맷으로 데이터를 가져올 수 있다.
```js
const parseResponse = xhr => {
  const { status, responseText } = xhr

  let data
  if (status !== 204) {
    data = JSON.parse(responseText)
  }

  return {
    status,
    data,  
  }
}
```
### Fetch API
`fetch()`는 `Promise`를 반환한다. 그런데 JSON 데이터 포맷이 아니기 때문에 `.json()` 메서드를 호출해야 하고, 그러면 JSON 포맷으로 resolve된 또 다른 `Promise`를 반환한다. 
```js
// ...
const response = await window.fetch(url, config)

let data
const { status } = response
if (status !== 204) {
  data = await response.json()
}

return {
  status
  data,
}
```

### Axios
Axios는 응답 데이터를 요청할때처럼 기본적으로 JSON 타입으로 사용이 가능하다. 응답 객체의 `data` 프로퍼티를 통해 응답 데이터를 얻을 수 있다.
```js
const url = 'https://jsonplaceholder.typicode.com/posts/1'

const config = {
  url, 
  method: 'GET'
}

const response = await axios(config)
console.log(response.data) // 응답 데이터
```

## 에러처리
### XMLHttpReqeust
[[XMLHttpRequest]]  참고

### Fetch API
Fetch는 HTTP 에러 응답을 받았다고 해서 `Promise`를 `reject`하지 않는다. 
네트워크 장애가 발생한 경우에만 `reject`한다고 한다. 그래서 `.then`을 사용해서 수동으로 에러 처리를 해야 한다.
```js
try {
  const response = await window
  .fetch(url, config)
  .then(response => {
	if (!response.ok) { // 응답을 확인해서 error 발생시키기
	  throw new Error(`HTTP Error: ${response.status}`)
	}

	return response
  })
  .catch(err => {
	throw new Error(err.message)
  })

  return parseResponse(response)
} catch (err) {
  console.log(err)
}
```

### Axios

Axios는 [[HTTP-Status-Codes|HTTP 상태 코드]]가 2xx를 넘어가면 모두 `reject`한다고 한다. 에러 객체에 `response` 또는 `request` 프로퍼티가 포함되어있는지 확인해서 상세한 정보를 얻을 수 있다.
```js
const url = 'https://jsonplaceholder.typicode.com/posts/1'

const config = {
  url, 
  method: 'GET'
}

axios(config).then(response => response)
  .catch(err => {
    const { response, request } = err
      if (response) {
        const { status, config } = response

        if (status === 404) {
          console.log(`${config.url} not found`)
        }
        if (status === 500) {
          console.log(`Server Error`)
        }
      } else if (request) {
        console.log(`No Response`, err.message)
      } else {
        console.log(`Error`, err.message)
      }
})
```


### 응답 시간 초과와 요청 취소 처리하기

### XMLHttpRequest
`XMLHttpRequest` 객체의 `timeout` 프로퍼티에 요청이 종료될 때까지의 시간을 밀리초로 지정할 수 있다.
```js
const request = params => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    const { method = 'GET', url, headers = {}, body } = params

    xhr.open(method, url)
    xhr.timeout = 10

    setHeaders(xhr, headers)

    xhr.send()
  })
}
```

요청이 정해진 시간 내에 처리되지 않는 경우 `ontimeout` 콜백이 호출된다.
```js
xhr.ontimeout = () => console.log(`timeout`)
```

### Fetch
Fetch는 요청 취소를 위해  [AbortController 인터페이스](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)를 사용할 수 있다.
```js
const url = 'https://jsonplaceholder.typicode.com/posts/1'

const controller = new AbortController()
const signal = controller.signal
setTimeout(() => controller.abort(), 3000)

fetch(url, { signal })
  .then((response) => response.json())
  .then(console.log)
  .catch((err) => {
    console.error(err.message)
  })
```
`controller` 객체 생성 후 `controller`의 `signal` 객체를 `fetch()`에 전달한다.  
이렇게하면 `controller.abort()` 메서드가 호출될 때마다 `fetch` 요청이 종료된다고 한다.
위 코드는 3초 이내에 응답이 없으면 종료될 것이다.  

응답을 기다리는 시간을 `10`으로 설정하고 확인해보니, `catch` 절에서 다음 에러가 발생하는 것을 확인할 수 있었다.
```
The operation was aborted. 
```

### Axios
Axios는 `XMLHttpRequest` 처럼 `timeout` 속성을 요청시 전달하면 설정할 수 있었다.
```js
const url = 'https://jsonplaceholder.typicode.com/posts/1'

const config = {
  url, 
  method: 'GET',
  timeout: 4000 // 요청을 기다리는 시간
}

axios(config)
```

`fetch()` 처럼 값을 `10`을 넘겨 테스트해보니, 
요청은 했으나 응답이 없는 경우에 `timeout of 10ms exceeded`라는 에러를 확인할 수 있었다.
```js
axios(config)
    .then(response => response)
    .catch(err => {
      const { response, request } = err
      if (response) {
        const { status, config } = response

        if (status === 404) {
          console.log(`${config.url} not found`)
        }
        if (status === 500) {
          console.log(`Server Error`)
        }
      } else if (request) { // 에러 발생!
        console.log(`No Response`, err.message)
      } else {
        console.log(`Error`, err.message)
      }
    })
```

## 생각

이 글에서 정리하려고 한 것은 `XMLHttpRequest`, Fetch API, Axios의 차이점이었다. 그리고 **Axios가 어떤점에서 편리한 것**인지 궁금했다.  

확실히 [[JSON]] 데이터를 알아서 잘 변환해줘서 편리한 것이 있었고,
에러처리도 다른 두 가지에 비해 더 에러에 대해 상세하게 확인할 수 있다는 걸 알게되었다. 

다른 [자료](https://www.measurethat.net/Benchmarks/Show/14128/0/xhr-vs-fetch-vs-axios)를 살펴보니 속도는 편리함과는 반대로 XMLHttpReqeust > Fetch API > Axios 순이었다.

어쨌든 이렇게 비교해보니 앞으로는 Axios를 사용하지 않을까 싶다.   

최근에 읽은 [[프레임워크 없는 프론트엔드 개발]]에 나온 팁 중에

> 라이브러리를 사용할 때는 항상 이에 대한 인터페이스를 생성하라. 필요시 새로운 라이브러리로 쉽게 변경할 수 있다.

라는 팁이 있었다. 여기 코드에서도 앞 부분에 `request`라는 wrapper 함수를 사용했는데 책에서 참고한 것이다.  
언젠가 Axios보다 더 편리하고 프로젝트에 맞는 라이브러리가 나타났을 때, 인터페이스를 사용해 코드를 작성해놨다면 쉽게 변경할 수 있을 것 같다.  
이 사실을 잘 기억해둬야 겠다!

## 참고
- [입문자를 위한 Axios vs Fetch](https://velog.io/@eunbinn/Axios-vs-Fetch)
