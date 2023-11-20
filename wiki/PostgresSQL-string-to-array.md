---
title   : PostgreSQL - string_to_array  
date    : 2023-11-20 23:16:28 +0900
updated : 2023-11-20 23:26:46 +0900
aliases : 
tags    : ["PostgreSQL"]
---

PostgreSQL에 `string_to_array`라는 함수가 있다.

```sql
string_to_array(string TEXT, delimiter TEXT, null_string TEXT)
```
- 텍스트와 구분자를 전달한다. 
- 마지막 파라미터는 `NULL`로 변환할 값을 전달한다. (옵셔널)
- 배열을 반환한다. 말 그대로 string을 array로 바꾸는 것!
  - JavaScript의 `split()` 메서드가 생각났다.

## unnest() 함수와 함께

```sql
SELECT unnest(ARRAY[1, 2]);
```

- `UNNEST()` 함수는 배열을 파라미터로 받는다.
- 그 배열의 값 하나가 행이 된다.

```sql
SELECT unnest(string_to_array('abc@mail.com,def@mail.com', ','));
```

- 위와 같이 쿼리를 작성하면 다음과 같이 `,`로 구분되는 각 항목이 행이 된다.

| unnest       |
| ---          |
| abc@mail.com |
| def@mail.com |
