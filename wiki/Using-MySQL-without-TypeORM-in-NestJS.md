---
title   : NestJS에서 ORM 없이 MySQL 사용하기 
date    : 2023-07-22 22:52:00 +0900
updated : 2023-07-22 23:07:42 +0900
aliases : ["NestJS에서 ORM 없이 MySQL 사용하기"] 
draft : false
tags : ["NestJS"]
---

## Goal

NestJS에서 ORM 없이 MySQL을 사용해보자.


## ORM

NestJS 공식 문서에 따르면 다양한 방법으로 DB 연동을 할 수 있다고 나와있다. 그중에서도 `TypeORM` 연동 방법을 상세하게 설명하고 있는데 나 같은 경우에 물론 배워두면 좋지만, TypeORM을 사용하는게 익숙하지 않고 오히려 직접 쿼리를 작성하는 것이 편하기 때문에 `DbService`라는 클래스를 만들어 작업하려고 한다.

## Class 만들기

NestJS에서는 Class의 Instance를 다른 클래스에서 `new` 키워드로 만들어서 사용하는 대신 Dependency Injection을 통해 주입해줄 수 있다. 주입을 위해서는 `@Injectable()` 데코레이터를 추가해줘야 한다.  

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
}
```

MySQL 연동을 하고, 필요한 메서드들을 추가해주자.  
```ts
import { Injectable } from '@nestjs/common';
import { Pool, PoolConnection, createPool } from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';

type DbDefaults =
  | RowDataPacket[]
  | RowDataPacket[][]
  | OkPacket[]
  | OkPacket;

type DbQueryResult<T> = T & DbDefaults;

@Injectable()
export class DbService {
  pool: Pool;
  constructor(private configService: ConfigService) {
    this.pool = createPool({
      host: this.configService.get<string>('DATABASE_HOST'),
      port: parseInt(this.configService.get<string>('DATABASE_PORT'), 10),
      user: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      connectionLimit: 10,
      namedPlaceholders: true,
    });
  }

  async query<T>(sql: string, values?: unknown): Promise<DbQueryResult<T[]>> {
    const [result] = await this.pool.query<DbQueryResult<T[]>>(sql, values);
    return result;
  }

  async execute<T>(sql: string, values?: unknown): Promise<DbQueryResult<T[]>> {
    const [result] = await this.pool.execute<DbQueryResult<T[]>>(sql, values);
    return result;
  }

  async beginTransaction() {
    const conn = await this.pool.getConnection();
    await conn.beginTransaction();
    return conn;
  }

  async commit(connection: PoolConnection): Promise<void> {
    await connection.commit();
    connection.release();
  }

  async rollback(connection: PoolConnection): Promise<void> {
    await connection.rollback();
    connection.release();
  }
}

```

만들어진 `DbService`를 사용하기 위해서는 `DbService`를 사용할 모듈의 `providers` 목록에 `DbService`를 추가해준다.  
```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './db/dbService';

@Module({
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
```

이제 `AppService`에서 `DbService`의 메서드들을 사용할 수 있다.  
```ts
@Injectable()
expoert class AppService {
  constructor(private dbService: DbService) {}
  
  async test() {
    await this.dbService.execute(`SELECT * FROM USER`);
  }
}
```


## reference
- [https://docs.nestjs.com/fundamentals/custom-providers#di-fundamentals](https://docs.nestjs.com/fundamentals/custom-providers#di-fundamentals)
