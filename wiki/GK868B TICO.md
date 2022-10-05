---
title   : GK868B TICO 볼륨조절, 화면 밝기 조절을 위한 키 설정하기
date    : 2022-10-05 22:50:15 +0900
updated : 2022-10-05 23:27:35 +0900
aliases : ["GK868B TICO 볼륨조절, 화면 밝기 조절을 위한 키 설정하기"]
tags: ["Tools", "How to"]
draft : false
---

## Goal
- 한성컴퓨터 GK868B TICO 키보드에서 볼륨조절, 화면 밝기 조절 등을 위한 키 설정하기

## 문제의 발견
GK868B 사용이 많이 익숙해졌다. 무엇보다 크기가 마음에 든다. 블루투스라는 점 때문에 더 마음에 든다. 하지만 2가지 정도 문제점이 있었다.  

높이가 좀 높아서 손목이 아주 쪼금 아팠다. 이건 오늘 맞춤주문한 아크릴 팜레스트가 와서 해결되었다.

다른 한 가지 문제는 작은 크기를 위해 Fuction 키 들이 숫자 키와 합쳐져 있어서 <kbd>Fn</kbd> 키를 누른 채로 눌러야 한다는 점이다. 그래서 그런지! 애플 키보드에 있는 화면 밝기 조절, 볼륨 조절, 음악 재생, 뒤로 가기 앞으로 가기 등... 키보드로 조작할 수 없는 문제가 발생했다.

## 해결해보자.
처음엔 검색을 했다. [한 블로그](https://surasuralife.tistory.com/689)에서 키 조합을 알려주셨는데, 내 키보드의 문제인지 전혀 동작하지 않았다. 이것저것 시도해보다가. 동봉되어있던 선을 사용해 유선으로 작업하니 잘 작동되었다. 하지만 이 키보드의 장점은 무선에 있다고 생각하기 때문에 과감히 포기했다..

두 번째로 더 검색을 하니 webpack과 React, Vue에 대해 많이 도움을 받았던 [개발자분의 블로그](https://jeonghwan-kim.github.io/think/2021/04/29/my-first-capacitive-keyboard.html)가 나왔다.  

예전에 hammerspoon에 대해 우연히 알게되었는데 써볼 생각은 못했었다. 여기 블로그에 들어가기 전에 karabiner를 사용하는 법도 알게되었는데 뭔가 내 맘대로 작동하질 않았다. 그리고 hammerspoon을 사용하는 편이 더 개발자스럽다는 생각이 들어서 따라했다.

런치패드를 실행하고 한/영 전환 표시까지는 잘 되었는데 `sendSystemKey` 부분이 잘 먹히지 않았다..

이것때문에 한 이틀동안 키보드 붙잡고 씨름을 한 것 같다. 왜 안되는거냐며...!! 하지만 포기하지 않았다. 

갑자기 뭔가 삘이 딱!! 왔다. 바로 시스템을 건드리는 것이니 시스템 환경설정에 들어가 해당 앱에 권한을 줘야겠다는 생각이었다.  
![[hammerspoon-accessibility.png]]
아니나 다를까 Accessibility에 hammerspoon이 체크가 안되어 있었다.  
체크를 해주니 잘 작동했다. 

[어떤 위키](https://jace.link/open/hammerspoon-system-keyevent)를 참고해서 화면 밝기 조절, 음악 재생 관련, 볼륨 조절 다 설정할 수 있었다. lua도 다른 프로그래밍 언어처럼 `for`문이 있었다.  
```lua
local hyper_fn_keys =  {
  {'f1', 'BRIGHTNESS_DOWN'},
  {'f2', 'BRIGHTNESS_UP'},
  {'f4', 'MUTE'},
  {'f5', 'SOUND_DOWN'},
  {'f6', 'SOUND_UP'},
  {'f7', 'PREVIOUS'},
  {'f8', 'PLAY'},
  {'f9', 'NEXT'}
}

for i, keymap in ipairs(hyper_fn_keys) do
  hs.hotkey.bind(hyper, keymap[1], function()
    hs.eventtap.event.newSystemKeyEvent(keymap[2], true):post()
    hs.eventtap.event.newSystemKeyEvent(keymap[2], false):post()
  end)
end
```


## 참고
- [한성 무접점키보드 868b 맥 키보드 주요 키 / 컨트롤, 커맨드 키 정리 / 키맵핑 안될 때](https://surasuralife.tistory.com/689)
- [나의 첫 무접점 키보드](https://jeonghwan-kim.github.io/think/2021/04/29/my-first-capacitive-keyboard.html)
- [https://jace.link/open/hammerspoon-system-keyevent](https://jace.link/open/hammerspoon-system-keyevent)