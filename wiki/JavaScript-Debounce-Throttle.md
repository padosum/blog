---
title   : 디바운스와 스로틀
date    : 2021-12-07 13:25:31 +0900
updated : 2021-12-07 13:25:53 +0900
aliases : ["디바운스와 스로틀"]
tags    : ["JavaScript"]
---

`scroll`, `resize`, `input`, `mousemove` 등의 이벤트들은 짧은 시간 연속해서 발생하기 때문에 여기에 이벤트 핸들러를 등록해두면 성능상에 문제가 생길 수 있다. "디바운스"와 "스로틀"은 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서 과도한 이벤트 핸들러 호출을 방지하는 기법이다.  

## 디바운스(Debounce)
디바운스는 짧은 시간 간격으로 이벤트가 연속해서 발생하면 일정 시간이 경과한 후에 이벤트 핸들러를 한 번만 호출하는 기법  

### 예시
텍스트 필드에 사용자의 입력을 받고 그 입력값으로 [[Ajax]] 요청을 하는 프로그램이 있다고 가정하자. `input` 이벤트를 이용해 사용자가 텍스트 필드에 값을 입력할 때마다 `Ajax` 요청을 한다면 서버에 부담을 줄 것이다. 이 때 디바운스를 활용할 수 있다.  

```javascript
<!DOCTYPE html>
<html>
<head>
</head>
<body>
  <input type="text">
  <div class="msg"></div>
  <script>
    const $input = document.querySelector('input');
    const $msg = document.querySelector('.msg');

    const debounce = (callback, delay) => {
      let timerId;
      // timerId를 기억하는 클로저를 반환 
      return event => {

        // delay가 경과하기 전에 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머 재설정
        // 따라서 delay보다 짧은 간격으로 이벤트 발생 시, callback은 호출되지 않는다. 
        if (timerId) clearTimeout(timerId); 
        timerId = setTimeout(callback, delay, event);
      };
    };

    // debounce 함수가 반환하는 클로저가 이벤트 핸들러로 등록된다. 
    // 300ms보다 짧은 간격으로 input 이벤트 발생 시, debounce 콜백 함수는 
    // 호출되지 않다가 300ms 동안 input 이벤트가 더 이상 발생하지 않으면 한 번만 호출된다. 
    $input.oninput = debounce(e => {
      $msg.textContent = e.target.value;
    }, 300);
  </script>
</body>
</html>
```

사용자가 입력을 완료했는지 여부는 정확하게 알 수 없으니, 일정 시간 동안 텍스트 입력을 하지 않으면 입력이 완료된 것으로 간주한다. `debounce` 함수가 반환한 함수는 `debounce` 함수에 전달한 시간(`delay`) 보다 짧은 간격으로 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머를 재설정한다. 콜백 함수는 호출되지 않고 있다가 `delay` 동안 이벤트가 더 이상 발생하지 않은 경우에 한 번 호출이 된다.  

**실무에서는 Underscore의 `debounce` 함수나 Lodash의 `debounce` 함수를 사용하는 것을 권장한다.** 

### 디바운스를 사용하는 경우
- `resize` 이벤트 처리시
- `input` 요소 값으로 [[ajax]] 요청을 하는 입력 필드 자동완성 UI 구현시 
- 버튼 중복 클릭 방지 처리 

## 스로틀(Throttle)
스로틀(throttle)은 짧은 시간 간격으로 이벤트가 연속해서 발생하더라도 일정 시간 간격으로 핸들러가 최대 한 번만 호출되도록 한다. 연속해서 발생하는 이벤트를 그룹화하여 일정 시간 단위로 이벤트 핸들러가 호출되도록 호출 주기를 만드는 것 

```javascript
<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      width: 300px;
      height: 300px;
      background-color: rebeccapurple;
      overflow: scroll;
    }

    .content {
      width: 300px;
      height: 1000vh;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content"></div>
  </div>
  <div>
    <span class="normal-count">0</span>
  </div>
  <div>
    <span class="throttle-count">0</span>
  </div>

  <script>
    const $container = document.querySelector('.container');
    const $normalCount = document.querySelector('.normal-count');
    const $throttleCount = document.querySelector('.throttle-count');

    const throttle = (callback, delay) => {
      let timerId;

      return event => {
        // delay가 경과하기 이전에 이벤트가 발생하면 아무것도 하지 않다가
        if (timerId) return;
        // delay가 경과했을 때 이벤트가 발생하면 새로운 타이머를 재설정한다. 
        // 따라서 delay 간격으로 callback이 호출된다.
        timerId = setTimeout(() => {
          callback(event);
          timerId = null;
        }, delay, event);
      };
    };

    let normalCount = 0;
    $container.addEventListener('scroll', () => {
      $normalCount.textContent = ++normalCount;
    });

    let throttleCount = 0;
    // throttle 함수가 반환하는 클로저가 이벤트 핸들러로 등록된다.
    $container.addEventListener('scroll', throttle(() => {
      $throttleCount.textContent = ++throttleCount;
    }, 100))
  </script>
</body>
</html>
```
`scroll` 이벤트는 사용자가 스크롤할 때 짧은 시간 간격으로 연속해서 발생한다. 이처럼 짧은 시간 간격으로 연속해서 발생하는 이벤트의 과도한 이벤트 핸들러의 호출을 방지하기 위해 `throttle` 함수 사용할 수 있다.  

`throttle` 함수가 반환한 함수는 `throttle` 함수에 전달한 시간이 경과하기 이전에 이벤트가 발생하면 아무것도 하지 않다가, `delay` 시간이 경과했을 때 이벤트가 발생하면 콜백 함수를 호출하고 새로운 타이머를 재설정한다. 따라서 `delay` 간격으로 콜백 함수가 호출된다.

**실무에서는 Underscore의 `throttle` 함수나 Lodash의 `throttle` 함수를 사용하는 것을 권장한다.**

### 스로틀을 사용하는 경우
`scroll` 이벤트 처리나 무한 스크롤UI 구현 등에 유용하게 사용한다.

## 같이 보기 
- [lodash로 간단하게 debounce 사용하기](https://www.mrlatte.net/code/2020/12/15/lodash-debounce.html)

## reference
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)