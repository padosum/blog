---
title   : Node-MySQL2
date    : 2022-11-17 23:51:18 +0900
updated : 2022-11-19 15:28:08 +0900
aliases : ["Node MySQL2"]
tags: ["Node.js", "MySQL"]
draft : false
---

## connection pools
- Connection은 DB에 접속하고, query 문을 실행하고, 결과를 받고, 연결을 종료하는 흐름이다. 
	- 연결을 종료하지 않으면 리소스가 계속 낭비된다. 
- 많은 사람이 Connection을 하면 어떻게 될까? 매번 Connection을 만들고, 다쓰면 종료하고, 계속 반복될 것이며, 다른 사람의 커넥션 종료까지 또 기다리게 된다... 서버에  큰 부하를 줄 것이다.
- Connection pools은 이전 연결을 재사용해서 MySQL 서버에 연결하는 데 소요되는 시간을 줄일 수 있게 한다.
- 말 그대로 커넥션이 담긴 수영장. 거기서 하나씩 꺼내 쓰는 개념이다. 연결이 종료되면 다시 수영장에 보관한다.

다음과 같이 작성하면 `pool.getConnection()` -> `connection.query()` -> `connection.release()` 의 흐름으로 실행된다고 한다. [참고](https://github.com/mysqljs/mysql#pooling-connections)
```js
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'example.org',
  user            : 'bob',
  password        : 'secret',
  database        : 'my_db'
});

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
```

하지만 저번에 프로젝트를 진행할 때 이걸 제대로 이해하지 못한 채로 [코드를 엉망으로](https://github.com/padosum/web-fleamarket-9/blob/af2ae074f149fabcfe2622f03e688ce60fd3fbfa/server/src/db/db.module.ts#L11-L24) 작성했었다.  

모듈을 만들어놓고 거기서 connection을 만들었다. 그래서 해당 connection이 종료되었을 때도 모듈을 사용하는 다른 곳에서 그 사실을 모르기에 계속 쿼리 요청을 하게 된다.  
`pool`을 반환해서 사용하는 곳에서 `getConnection()`을 해야 한다.  

코드를 다시 보는 것은 상당히 부끄러운 마음이 들었다. 넘 괴로웠지만 꾹 참고 미래의 나를 위해 봤다.  
**코드에서도 내가 참 마음이 급했다는게 느껴졌다.** 하지만 이제라도 알게되어서 다행이다. 좋다.


## mysql과 mysql2

mysql과 mysql2의 차이는 [[JavaScript-Promise|프로미스]]를 지원한다는 사실만 알고 사용했다. 다른 것을 찾아봤다.


### Promise Wrapper
- 앞서 말한 것처럼 MySQL2는 [[JavaScript-Promise|프로미스]]를 지원한다. 그래서 `async/await` 을 사용해 콜백 지옥에서 벗어날 수 있다.

### query() 와 execute()
그동안 프로젝트에서 `query`만을 사용했다. `execute`가 있는 줄도 모르고! 말이다. 
이번에 알고 넘어가려 한다.

저장소 README.md에 설명이 있었다.  
Mysql2를 사용하면 **prepared statements** 를 얻을 수 있다고 한다. **prepared statements**를 사용하니, 성능이 향상된다고 한다. 이게 뭘 말하는 걸까?

우선 prepared statements를 얻으려면 `execute`를 사용해야 한다. **prepared statements** 는 무엇이고, `query`는 왜 안되는 것일까?  

저장소에 등록된 이슈에 이에 대한 [설명](https://github.com/sidorares/node-mysql2/issues/382) 이 있었다.

 > `execute` 는 statement를 먼저 **준비한 다음 실행**한다. (다음에 동일한 쿼리를 사용할 때는 준비되지 않고 재사용)
 > 
 > 주요 차이점은 `query`를 사용하면 매개변수가 드라이버측에 보간되는 반면에 `execute`를 사용하면 서버에 보간된다는 것

보간이란 단어는 예전에 얼핏 들어는 본 것 같은데 기억이 나지 않았다. 프로그래밍에서는 '중간에 무언가 끼워넣는다'는 의미라고 한다.[^1]


그래서 다음과 같이 예시를 보여줬는데.. 
query
```
 driver -> server: query "INSERT INTO documents SET name='john'" 
 server => driver: ok, insertId, ...

 driver -> server: query "INSERT INTO documents SET name='smith'" 
 server => driver: ok, insertId, ...
```

execute:
```
 driver -> server: prepare "INSERT INTO documents SET name=?"
 server -> driver: statement id = 1

 driver -> server:   execute 1, parameters: 'john'
 server -> driver: ok, insertId, ...

 driver->server: execute 1, parameters: 'smith'
 server -> driver: ok, insertId, ...
 ```

**보간**의 의미를 알고 나서 다시 살펴봤다. 
`query`의 경우 매번 드라이버측에서 바로 매개변수가 끼워져 mysql 서버에 요청을 한다.
반면에 `execute`는 처음엔 문을 준비한다. 그리고 나서 전달받은 매개변수를 서버에서 끼워넣어 실행한다. 
문이 미리 준비되어 있으므로 같은 문을 사용하면 재사용이 될 수 있는 것이었다. 여기서 LRU 캐시를 사용한다고 하는데, 역시 컴퓨터과학에서 캐시는 정말 중요한 요소라는 생각이 들었다.




[^1]: https://www.inflearn.com/questions/536047
