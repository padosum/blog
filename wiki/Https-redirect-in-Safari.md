---
title   : Safari에서 http 요청을 https로 redirect하는 문제 
date    : 2023-01-11 20:49:09 +0900
updated : 2023-01-11 21:55:08 +0900
aliases : ["Safari에서 http 요청을 https로 redirect하는 문제"]
tags : ["How to", "express"]
draft : false
---
## Goal
Safari에서 script를 로드할 때 http 요청을 https로 redirect하는 문제를 해결하자.

## 문제의 발견
Node.js express에서webpack을 사용해 빌드된 파일을 불러와 실행하고 있었다.

빌드된 파일은 `main.js`였고 `index.html`에 다음과 같이 추가된다. 
```html
<!DOCTYPE html>
<html>
  <head>
    <script defer="" src="main.js"></script>
  </head>
</html>
```

위 코드만 보면 이상할 것이 없다.
갑자기 Safari에서 실행해보고 싶어 실행했는데 슬픈 예감은 틀림이 없다고. 다음과 같은 오류가 나타났다. 

> Failed to load resource: SSL 오류가 발생했기 때문에 서버에 안전하게 연결할 수 없습니다.

음? 갑자기 무슨 SSL? 황당했다. 우선 Safari에서 실행해보길 잘했다고 생각하며 원인을 찾아나섰다.

## express helmet
우선 프론트엔드 문제인지 백엔드 문제인지 판가름 내기 위해서, 빌드된 파일만 [live-server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)로 실행해봤다. 별다른 문제가 없었다! 그럼 백엔드 문제구나 하고 생각을 달리 해봤다.

express에서 보안을 강화해보겠다는 이유로 helmet을 사용중이었다. 하지만 그것이 화근이었다. 그냥 helmet을 장착했을 뿐이었는데 [[2023-01-10|어제]] 부터 오류들이 나타나기 시작했다. 뭣 모르고 헬멧을 쓴 격이었다. **냄새가 났다.** 확신의 주석처리를 했더니 멀쩡히 잘 동작하는 것이었다.

알고 쓰자는 마음으로 `helmet()`을 미들웨어로 추가했을 때 기본으로 들어가는 값이 무엇이 있을지 확인해봤다.

![[content-security-policy.png]]
우선 `Content-Security-Policy`에는 저렇게 많은 값들이 들어가게 된다.

기본값으로 어떤 것이 들어가는 것일까? 난 단지 `helmet()`을 사용했을 뿐인데...

[공식문서](https://helmetjs.github.io/) 가 너무나 친절하게 알려주고 있었다.
`helmet` 함수는 15가지 작은 미들웨어를 감싼 것이란다!
아래에 있는 녀석들이 다 추가된 것이었다. 
```js
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
```

## 원인을 찾아서
그럼 15가지 미들웨어들을 하나씩 추가해보자. 노가다지만 이 편이 원인을 찾기 쉬울 것 같다. 사실 하나 하나가 무슨 의미인지 다 알면 좋을텐데 내 눈에는 이 방법이 편해보였다.

하나씩 추가하다 어떤 녀석에서 걸렸다. 
`contentSecurityPolicy`(이하 CSP)였다. 얘만 없으면 Safari에서도 스크립트가 잘 불러와졌다.
뭐하는 녀석일까? 필요한 것일까? 당연했다. 아무나 스크립트, css 등을 넣지 못하도록 막는 것이다. 얼핏 들어왔던 XXS 공격을 막기 위한 정책이다.

이름만 들어도 아주 중요한 정책이라고 생각이 드는데 이걸 단순히 사용하지 않는 것으론 안될 것 같다. 사용해야 한다.

`helmet()`을 사용했을 때 헤더를 살펴보면 다음과 같은 지시문들이 설정되어 있는 것을 확인할 수 있었다. 
```js
default-src 'self';
base-uri 'self';
font-src 'self' https: data:;
form-action 'self';
frame-ancestors 'self';
img-src 'self' data:;
object-src 'none';
script-src 'self';
script-src-attr 'none';
style-src 'self' https: 'unsafe-inline';
upgrade-insecure-requests
```

아마 여기서 어떤 지시문 때문에 오류가 생겼으리라.
이번에도 무식하게 하나씩 설정해본다.

다음과 같이 특정 지시문(`directives`)를 설정할 수 있다. `useDefaults`를 `false`로 해서 기본적으로 설정되지 않도록 하고 하나씩 추가해줬다.
```js
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      'default-src': ["'self'"],
      'base-uri': ["'self"],
      'font-src': ["'self'", 'https: data:'],
      'form-action': ["'self"]
      // ....
    },
  }),
);
```

그런데 `upgrade-insecure-requests`를 넣고 나니 오류가 발생했다!
원인은 이것이었다.

이제 원인을 찾았으니 이게 무엇인지 확인하고 해결해야한다.

## upgrade-insecure-requests

`upgrade-insecure-requests` 는 클라이언트가 [[http]] -> https로 리다이렉션을 허용하는지 여부를 나타낸다. **사이트의 안전하지 않은 URL(http를 사용하는)을 보안 URL(https를 사용하는)로 대체된 것처럼 처리하도록 지시한다.**
따라서 이걸 설정하면, 클라이언트가 http 요청은 https로 리다이렉션을 하는 것 같아 보인다. 

http -> https ? 이것도 **냄새가 난다.**  

Safari를 다시 켜봤다.
> Failed to load resource: SSL 오류가 발생했기 때문에 서버에 안전하게 연결할 수 없습니다.

Https를 이용한 요청은 SSL을 이용해야 한다. 하지만 로컬 개발 환경에서 http를 사용하고 있다. `upgrade-insecure-requests`로 인해 http -> https 요청을 하게 된다. 따라서 SSL 오류가 나는 것이다. 

다시 오류를 확인했다. 처음엔 왼쪽 오류 메시지만 보였는데 오른쪽으로 눈을 돌리니. `https://localhost:7070/main.js`로 요청을 하고 있었다! `https`로 요청을 한 것이다.
![[ssl-error.png]]

그럼 Chrome은 왜 잘 작동한 것일까? 정확한 이유는 모르겠으나 Chrome은 localhost인 경우 리다이렉션을 하지 않는 것으로 추측된다. ~~하지만 Safari는 융통성이 없다.~~


## 문제 해결하기

내 생각에 프로젝트에 http URL이 들어가진 않을 것으로 판단된다. 따라서 지워줘도 될 것 같다. 

그럼 지워보자. `helment.contentSecurityPolicy.getDefaultDirectives()`로 기본 지시문 값들을 가져온 다음에,  [[JavaScript-Destructuring-assignment|Destructuring]]을 사용해 `upgrade-insecure-requests`만 제거한 뒤에 `helmet()` 에 전달하자! 
```js
const defaultDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();
const upgradeInsecureRequests = 'upgrade-insecure-requests';
const { [upgradeInsecureRequests]: removeDirective, ...otherDefaultDirectives } = defaultDirectives;

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        ...otherDefaultDirectives,
      },
    }
  }),
);
```

이렇게 작업하면 Safari에서도 http 요청을 그대로 하게 된다.

## 생각
- 언제나 처럼 공식문서가 중요함을 느꼈다.
- 프론트 개발만 하면 이런 일을 겪을 일이 없는데 같이 하니 경험해볼 수 있었다고 생각한다. 
- 에러로그를 잘 확인해서 https로 요청된다는 걸 알았으면 조금 더 빨리 해결할 수 있었을까?
	- 그래도 어차피 CSP의 directive 의미를 알았어야 할 것이다.
	- 돌고 돌아 꽤 시간이 흐렀지만 이번 기회에 알게되어서 좋은 경험이었다.

## reference
- [https://blog.csdn.net/tianxintiandisheng/article/details/125386066](https://blog.csdn.net/tianxintiandisheng/article/details/125386066)
- [https://scrapfly.io/blog/how-to-avoid-web-scraping-blocking-headers/](https://scrapfly.io/blog/how-to-avoid-web-scraping-blocking-headers/)
- [https://stackoverflow.com/questions/66599655/how-to-enable-and-disable-upgradeinsecurerequests-csp-directive-using-helmet-4-4](https://stackoverflow.com/questions/66599655/how-to-enable-and-disable-upgradeinsecurerequests-csp-directive-using-helmet-4-4)
- [https://stackoverflow.com/questions/31950470/what-is-the-upgrade-insecure-requests-http-header](https://stackoverflow.com/questions/31950470/what-is-the-upgrade-insecure-requests-http-header)
- [https://stackoverflow.com/questions/72341765/express-helmet-css-not-loading-on-ios-safari](https://stackoverflow.com/questions/72341765/express-helmet-css-not-loading-on-ios-safari)
- [https://github.com/helmetjs/helmet/issues/343](https://github.com/helmetjs/helmet/issues/343)
- [https://github.com/github/secure_headers/issues/348](https://github.com/github/secure_headers/issues/348)