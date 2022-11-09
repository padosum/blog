---
title   : NestJS Passport.js를 이용한 인증
date    : 2022-11-09 21:23:14 +0900
updated : 2022-11-09 21:33:48 +0900
aliases : ["NestJS Passport.js를 이용한 인증"]
tags: ["NestJS", "Authentication"]
draft : false
---

## Passport

Passport는 가장 널리 사용되는 node.js 인증 라이브러리로 미니 프레임워크로 생각하면 된다. 한마디로 **인증을 편하게 관리하기 위한 패키지**

**구현 중인 Strategy**에 따라 커스텀할 수 있는 몇 가지 기본 단계로 **인증 프로세스를 추상화**하는 장점이 있다.

여기서 `Strategy` 란 사용자(user)의 요청(request)을 다양한 제공자(provider)를 기반으로 인증하는(authenticating) 개념, 방법을 의미한다. strategy는 여러 종류가 있다. ([500개가 넘는다.]([https://www.passportjs.org/packages/](https://www.passportjs.org/packages/))) ex. `passport-amazon` 은 앱이 아마존 자격증명서를 통해 로그인하는 것을 허가해주는 등…)

커스터마이제이션 파라미터와 커스텀 코드를 콜백함수 형태로 제공해서 구성한다. 콜백함수는 Passport가 적절한 시간에 호출한다.

NestJS에서는 `@nestjs/passport` 모듈을 사용해 NestJS 스타일로 Passport를 구현할 수 있다. 그래서 Nest 응용 프로그램에 쉽게 통합이 가능하다.

### Vanilla Passport

`@nestjs/passport` 를 알아보기 전 vanilla passport가 어떻게 작동하는지 생각해보자. 🤔

passport가 실제로 하는 일은 `session` 객체 내부에 `passport` 프로퍼티를 만들고, 값으로 쿠키와 식별자를 매칭해 저장한다.(`serialize`). 이후 매 요청시에 세션에 저장된 식별자를 이용해 유저의 데이터를 찾아 `request.user` 에 해당 데이터를 저장한다.(`deserialize`)

Passport Strategy 중 하나인 `passport-local` ([https://www.passportjs.org/packages/passport-local/](https://www.passportjs.org/packages/passport-local/))는 username password로 인증하는 방식이다.

이 strategy는 콜백이 필요하다. 여기서 사용자가 존재여부 ( 또는 새 사용자를 생성하는지) 및 자격 증명이 유효한지 여부를 확인한다.  그리고 검증이 완료되면 `user` 를 리턴한다. (실패하면 `null` 을 반환한다.)

```jsx
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
```

router 에서 `passport.authenticate(local, callback)` 이 실행되면 strategy callback 이 실행되고 `done` 함수에 전달된 인자들이 `passport.authenticate` 의 콜백 인자로 전달된다. 

`passport.authenticate` 는 자동으로 `req.login()` 을 호출한다. ([http://www.passportjs.org/concepts/authentication/login/](http://www.passportjs.org/concepts/authentication/login/))

`**login()` 함수는 login session을 설정한다.**

로그인 작업이 완료되면 user가 `req.user` 에 할당된다.

```tsx
router.post('/login', (req, res, next) => {

  // 이 부분 실행
  passport.authenticate('local', (err, user, info) => {
    console.log(err, user, info);
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      const fillteredUser = { ...user.dataValues };
      console.dir(fillteredUser);
      delete fillteredUser.password;
      return res.json(fillteredUser);
    });
  })(req, res, next);
});

```

## Passport local 구현하기

`local.strategy.ts` 파일을 생성하고 다음 코드를 작성한다.

```tsx
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

위 코드에는 configuration option이 없어서 `constructor` 가 `super()` 만 호출하고 있다.

옵션을 전달할 수도 있다. 전달하지 않으면 기본값은 `username`과 `passport`를 참조하고 있다. 

인증을 위해 다른 속성 이름을 전달받고 싶으면 다음과 같이 할 수 있다.

```tsx
super({ usernameField: 'email' })
```

또 코드에는 `validate` 함수가 구현되어 있는데 각 Strategy에 대해 Passport는 이 검증 함수를 호출한다. local-strategy의 경우 Passport는 `validate` 메서드에 `validate(username: string, password: string): any` 시그니처를 사용할 것을 기대한다. 

이 코드에선 대부분의 검증 작업은 `this.authService.validateUser`에서 수행될 것이다.

그리고 모듈에서 `Passport` 기능을 사용할 수 있도록 정의해줘야 한다. `*.module.ts` 파일은 다음과 같이 작성한다.

```tsx
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
```

## Guards 와 함께

Guards:  route handler가 요청을 처리할지 여부를 결정한다. 

생각해보면 인증 관점에서 앱은 두 가지 상태로 존재할 수 있다.

1. user/client가 **로그인되지 않은** 상태 (인증되지 않음)
2. user/client가 **로그인된** 상태

1번의 경우(사용자가 로그인하지 않은 상태)에는 두 가지 다른 기능을 수행해야 한다.

- 인증되지 않은 사용자가 액세스할 수 있는 경로 제한하기 (유저 정보 수정 페이지 등…)
- 사용자가 로그인을 시도할 때 인증 단계를 시작하기

인증을 시작하기 위해 username/password `POST` 요청을 해야 한다. 여기서 `POST /auth/login` 라우트가 그걸 처리한다고 생각해보자. 그럼 password-local strategy는 어떻게 활용해야할까?

`**@nestjs/passport` 모듈은 이 기능을 수행하는 빌트인 Guard를 제공한다!** 

이 Guard는 Passport strategy를 실행하고 자격 증명 검색, 확인 기능 실행, 사용자 속성만들기 등을 실행한다.

그리고 인증되지 않은 사용자가 액세스할 수 있는 경로를 제헌하기 위해서도 Guard를 사용할 수 있다.

예시로 `/auth/login` route를 살펴보자. 

```tsx
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
```

Passport local strategy의 디폴트 이름은 `local` 이다. 

`@UseGuard()` 데코레이터에서 해당 이름을 참조해 `passport-local` 패키지에 의해 제공된 코드와 연결할 수가 있다. 

여기서 Passport의 또 다른 기능을 확인할 수 있다. Passport는 `validate()` 메서드에서 반환한 값을 기반으로 `user` object를 자동으로 생성해서 `Request` object에 `req.user`로 할당한다.

`AuthGuard`는 다음과 같이 자체 클래스를 만들어 사용하는 것이 좋다고 한다.

```tsx
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
```

```tsx
@UseGuards(LocalAuthGuard)
@Post('auth/login')
async login(@Request() req) {
  return req.user;
}
```

## 기타

### Strategy 옵션 객체를 생성자에 전달해 구성하기

기본적으로 `username` 과 `password` 를 전달해야 `validate()` 메서드가 실행된다. 그래서 `username` 대신 `id`나 `email` 속성을 사용하는 경우 다음과 같이 `usernameField` 의 값을 해당 이름으로 변경해주면 된다. 아래 코드는 `email` 로 설정한 것이다.

```tsx
constructor(private authService: AuthService) {
  super({
    usernameField: 'email',
    passwordField: 'password',
  });
}
```

### Strategy에 이름 붙이기

```tsx
export class GithubStrategy extends PassportStrategy(Strategy, 'github')
```

위와 같이 `github`라 이름 붙이면 `@UseGuards(AuthGuard('github'))` 와 같이 사용할 수 있다.

## session 사용하기

사용자가 로그인할 때 사용자가 세션으로 다른 경로에 액세스할 수 잇도록 세션에 사용자를 저장해야 한다.

세션에 사용자를 저장하기 전 사용자를 `serialize` 해야 한다. 그리고 세션이 끝나면 사용자를 `deserialize` 해야 한다.

우선 세션에 대한 기본 옵션이 `false` 이므로 PassportModule을 추가할 때 `session: true` 옵션을 넣어줘야 한다.

```tsx
@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    SessionSerializer,
    GithubStrategy,
  ],
})
export class AuthModule {}
```

`user` 객체가 `serialized` / `deserialized` 처리를 하도록 하는 로직이 필요하다.

`serialized`는 사용자의 정보를 가져와 압축/최소한으로 만드는 것이다. 대부분의 경우 사용자의 id를 사용한다. 

반대로 `deserialized`는 session에 저장된 값을 이용해 사용자를 찾은 후 HTTP Request로 리턴한다. 

`session.serializer.ts` 를 추가해 다음과 같이 코드를 작성한다.

```tsx
import { Injectable } from "@nestjs/common"
import { PassportSerializer } from "@nestjs/passport"

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user)
  }
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void
  ): any {
    done(null, payload)
  }
}

```

 `SessionSerializer`를 모듈의 `providers` 에 추가한다. 

Nest는 이걸 인스턴스화할 것이고 `passport.serializeUser`와 `passport.deserializeUser` 를 호출할 것이다.

```tsx
import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { UsersModule } from "src/users/users.module"
import { AuthService } from "./auth.service"
import { LocalStrategy } from "./local.strategy"
import { SessionSerializer } from "./session.serializer"

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
```

```tsx
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
```

`이제 AuthGuard` 클래스에서 **`super.logIn(request)`를 호출하면 세션을 얻을 수 있다.** (`logIn` 의 호출이 끝나면 `passport.serializeUser` 가 호출된다.)

### 로그인 여부 확인

```tsx
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if(!request.isAuthenticated()) throw new HttpException('로그인 상태가 아닙니다.', HttpStatus.FORBIDDEN)
    return request.isAuthenticated();
  }
}
```

이 guard는 세션이 사용 중일 때 passport가 request 객체에 추가하는 메서드인 `request.isAuthenticated()` 를 호출한다. 

사용자의 세션 ID가 있는 쿠키가 있기 때문에 사용자가 매 요청시 username과 password를 전달하는 대신 이 기능을 사용하면 된다.

### 로그아웃

로그아웃은 단순하다. `req.session.destroy();` 을 호출한다.

```tsx
@Get('/logout')
logout(@Request() req): any {
  req.session.destroy();
    return { msg: 'The user session has ended' }
}
```

## 참고자료

* [passport, localStrategy의 동작에 대해 이해하기](https://p-iknow.netlify.app/backend/node/passport-local-strategy)
* [https://cosmian.tistory.com/97](https://cosmian.tistory.com/97)
* [https://dev.to/nestjs/setting-up-sessions-with-nestjs-passport-and-redis-210](https://dev.to/nestjs/setting-up-sessions-with-nestjs-passport-and-redis-210)