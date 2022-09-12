---
title   : Node.js Express에서 lowdb를 활용한 session login 구현 
date    : 2022-09-12 12:09:35 +0900
updated : 2022-09-12 15:27:58 +0900
aliases : ["Node.js Express에서 lowdb를 활용한 session login 구현"] 
tags    : ["Node.js", "How to", "Web"]
---

[[Session-and-Token-Authentication|세션]]에 대해 공부했으니 배운 내용으로 **로그인**을 구현해보자.

매우 **간단**하게 진행하겠다.
- 사용자 정보는 [lowdb](https://github.com/typicode/lowdb) 를 사용해 [[JSON]] 형식 파일로 저장한다.
- 보통 session 사용을 위해 [express-session](https://www.npmjs.com/package/express-session) 을 많이 사용하는 것 같다. 하지만 간단하게 session도 마찬가지로 lowdb에 저장한다.


## express 설치 
[여기](https://expressjs.com/en/starter/installing.html) 튜토리얼 대로 설치해도 되는데 [Express application generator](https://expressjs.com/en/starter/generator.html)를 사용하는 방법도 있다! 
```shell
$ npm install express-generator -g
$ express login
$ cd login
$ npm i
```

express-generator를 사용하면 다음과 같은 디렉토리 구조로 프로젝트가 생성된다.
```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
```

### Express middleware
Express에는 **middleware** 함수라는 것이 있다.
이 middleware 함수는 기본적으로 다음과 같은 작업들을 수행한다.
- 모든 코드 실행
- 요청, 응답 오브젝트에 대한 변경을 실행
- 요청, 응답 주기를 종료
- 스택 내의 그 다음 미들웨어 함수를 호출

middleware를 등록하기 위해서는 `app.use()`를 사용한다.
```js
app.use(cookieParser());
```

더 자세한 것은 [공식문서](https://expressjs.com/ko/guide/using-middleware.html) 를 참고하자.

### router
하나의 라우터를 등록하자. 
- `/auth`: [[Session-and-Token-Authentication|인증]]을 위한 router

```js
app.use("/auth", authRouter);
```

## lowdb 사용하기

앞서 lowdb를 이용해 사용자 정보를 관리하겠다고 했다. 먼저 lowdb를 설치하자.
```shell
$ npm install lowdb
```

lowdb를 사용하기 위해 `/db/db.js` 파일을 생성하고 아래와 같이 코드를 작성한다.
```js
import path from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

// JSON 파일
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.basename(__filename));
const file = path.join(__dirname, "db", "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

export default db;
```

데이터가 저장될 JSON 파일은 `db.json`이라는 이름으로 지정했다. 
이제 export한 `db`라는 모듈을 불러와서 사용하면 된다!

## 사용자 추가하기

`/auth` router에 `/register_process`를 통해 사용자를 추가한다.
```js
import express from 'express'
import db from '../db/db.js'
const router = express.Router()

router.post('/register_process', async (req, res, next) => {
  const { body: user } = req
  const { email, password, nickname, birth } = user

  await db.read()

  db.data = db.data || { users: [] }

  db.data.users.push({
    email,
    password,
    nickname,
    birth,
  })

  await db.write()
  res.sendStatus(200)
})
```

여기서 `await db.read()`를 사용하면 lowdb에서 지정한 JSON 파일로부터 데이터를 불러온다. 
데이터에 접근하려면 `db.data`를 사용하면 된다.

만약 JSON 파일이 존재하지 않는다면 `db.data`는 `null`이기 때문에 default 값을 지정해줘야 한다.
여기선 다음과 같이 `users: []`라는 빈 배열을 넣어줬다.
```js
db.data = db.data || { users: [] }
```


lowdb에 record를 추가하기 위해선 `push` 메서드를 사용한다. 다음과 같이 사용자 정보에 필요한 값들을 전달해줬다. 
```js
db.data.users.push({
  email,
  password,
  nickname,
  birth
})
```

최종적으로 JSON 파일에 변경된 데이터를 저장하려면 꼭 `db.write()`를 해줘야 한다.
```js
await db.write()
```

위와 같이 작성한 코드가 정상동작 한다면, JSON 파일은 다음과 같은 내용으로 채워질 것이다.
```json
{
  "users": [
    {
      "email": "padosum@padosum.dev",
      "password": "password",
      "nickname": "padosum",
      "birth": "2000.01.01"
    }
  ],
}
```

## 로그인
**세션** 기반 인증을 위해 필요한 처리들은 한 곳에 묶도록 하자. 그래서 `session.js`라는 파일을 만들어 거기서 처리를 하자.

우선 사용자 정보를 검증하고 정확하다면 해당 인증 정보를 서버의 세션 저장소에 저장할 것이다. 여기서 사용자에겐 세션 정보의 식별자인 session id를 발급해줘야 한다. 

식별을 위해선 고유한 값이어야 할 것이다!
🤔 UUID를 사용해볼까? UUID는 완벽하게 고유할 순 없지만 동일한 UUID가 나올 확률은 매우 낮다. 간단하게 하기로 했으므로 이걸로 처리하자.

> 보안을 위해 session id는 어떤 값을 사용해야 하는지 더  찾아보고 공부할 필요를 느낀다.


[코드](https://gist.github.com/jsmithdev/1f31f9f3912d40f6b60bdc7e8098ee9f) 를 참고해서 UUID를 만드는 함수를 추가했다. 보통은 [uuidv4](https://www.npmjs.com/package/uuidv4) 모듈을 사용하는 듯 하다.
```js
// session.js
const createUUID = () => {
  let dt = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    }
  )

  return uuid
}
```

`session` 객체에 다음 4가지 함수를 추가했다.
```js
// session.js
const session = {
  async addSession(sessionId, id, name) {},
  async findSession(id) {},
  async deleteSession(id) {},
  generateSessionID() {},
}

export default session
```

우선 `generateSessionID`는 session ID를 발급하는 메서드다.
```js
generateSessionID() {
  return createUUID()
}
```

다음 `addSession` 메서드를 추가한다. 로그인할 때 사용자의 인증 정보를 서버 저장소에 추가하는 메서드다. 여기서 저장소는 JSON 파일이다.
```js
async addSession(sessionId, id, name) {
  await db.read()
  db.data.sessions.push({
    sessionId,
    userInfo: {
	  id,
	  name,
    },
  })

  await db.write()
},
```

`findSession` 메서드는 session ID를 가지고 서버의 세션 저장소에 해당 id가 존재하는지 확인한다. 로그인 여부를 확인할 때 사용하면 되겠다.
```js
async findSession(id) {
  await db.read()
  const session = db.data.sessions.find(s => s.sessionId === id)
  return session ? session : false
},
```

`deleteSession` 메서드는 session ID를 가지고 서버의 세션 저장소에 해당 id를 삭제한다. 사용자가 로그아웃을 하면 세션 저장소에서 해당 세션을 지울 때 사용한다.
```js
async deleteSession(id) {
  await db.read()
  db.data.sessions = 
  db.data.sessions.filter(
  ({ sessionId }) => sessionId !== id
  )
  await db.write()
  return true
}
```

자, 이제 로그인을 작업을 마저 해보자.
`/auth` router에 `/login_check`를 통해 로그인을 한다.

```js
router.post('/login_check', async (req, res, next) => {
})
```

우선 다음과 같이 JSON 파일에서 해당 사용자가 존재하는지 찾아야 할 것이다. 
```js
router.post('/login_check', async (req, res, next) => {
  const { body } = req
  const { id, password } = body

  await db.read()

  const findUser = db.data.users.find(
    user => user.email === id && user.password === password
  )
```
lowdb에서 `find` 메서드를 사용해 데이터를 찾을 수 있다.

그리고 사용자가 존재한다면,
```js
if (findUser) {
  const sessionId = session.generateSessionID()
  session.addSession(sessionId, findUser.email, findUser.nickname)

  res.cookie('loginSession', sessionId)
  res.json({
    success: true,
    name: findUser.name,
  })
} else {
  // 사용자 정보가 없는 경우 처리
}
```
session ID를 생성하고, 세션 저장소에도 인증 정보를 저장한다.
그리고 쿠키에 `loginSession`이란 이름으로 session ID를 저장한다.
클라이언트는 session ID를 가지게 되는 것이다!

## 로그아웃
로그아웃은 `/logout` router에서 처리하자.
```js
router.get('/logout', (req, res, next) => {
  if (session.deleteSession(req.cookies.loginSessio)) {
    res.cookie('loginSession', '', {
      maxAge: 0,
      httpOnly: true,
    })
    res.redirect('/')
  }
})
```
`deleteSession` 을 이용해 세션 저장소에서 해당 session ID를 삭제한다.
그리고 나서 cookie에 저장된 session ID도 `maxAge`(쿠키 보관 기간) 을 `0`으로 설정해서 삭제하자.

## 로그인 여부 확인
홈(`/`)에 접속할 때마다 로그인 여부를 확인하고 싶다. 어떻게 해야할까? 
초반에 설명한 middleware를 사용하면 된다!
```js
const checkSessionExist = async (req, res, next) => {
  const s = await session.findSession(req.cookies.loginSession);
  if (s) {
    req.isLogin = true;
    req.name = s.userInfo.name;
  } else {
    req.isLogin = false;
  }
  next();
};

/* GET home page. */
router.get("/", checkSessionExist, (req, res, next) => {
});

```
`checkSessionExist` 함수는 middleware다. 세션 저장소에서 현재 쿠키에 있는 `loginSession`이 존재한다면, 로그인되어 있는 것으로, 아니면 로그인이 되지 않는 것으로 처리하고 `next()` 메서드로 다음 middleware를 실행한다. 여기서 다음 middleware는 `router.get("/")`에 등록된 두번째 콜백함수다.


## 생각
실제 프로젝트는 이것보다 훨씬 복잡할 것이고 보안에 대해서 고려해야 할 것도 많을 것이다.
캠프에서 관련된 프로젝트를 처음으로 진행했는데 프론트단 건드리는 것에 더 시간을 많이 소요했고 비밀번호를 평문으로 저장하고 넘어갔다..

그치만 이렇게 개념을 알고 나면 실제 프로젝트 이해도 조금은 더 쉽지 않을까 하는 생각이든다.

토큰을 이용한 방식은 to be continued....

![tobecontinued](https://gpacheco.org/wp-content/uploads/2019/10/tobecontinued.jpg)



