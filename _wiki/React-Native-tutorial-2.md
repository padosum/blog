---
layout  : wiki
title   : 🚣‍♀️ 리액트 네이티브 시작하기 - 2
summary : 
date    : 2020-05-23 23:30:50 +0900
updated : 2020-05-23 23:31:08 +0900
tags    : React-Native
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}
{: .menu-list .is-marginless}

## index.js 
``` javascript
// index.js
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

- `AppRegistry.registerComponent` 를 사용하여 네이티브 브릿지에서 사용할 모듈을 지정
- 첫 번째 매개변수에 모듈 이름을 지정, 두 번재 매개변수에 처음으로 렌더링될 컴포넌트를 지정 
	- appName은 기본적으로 프로젝트 생성시 자동으로 생성, 연결됨 

## App.js
``` javascript
// App.js
import React from 'react'; // 리액트를 사용하기 위해 React를 불러온다. 
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
```

### 컴포넌트 
- 리액트는 HTML 태그를 사용해 화면에 표시하지만 리액트 네이티브는 그럴 수 없다. 대신에 리액트 네이티브에서 정한 특별한 태그(컴포넌트)만 사용할 수 있다.   
- SafeAreaView  
아이폰X와 같은 노치 디자인에서 상단에 상태 바와 하단에 홈 버튼 영역을 제외한 영역에 콘텐츠를 표시할 때 사용한다. 
- View   
상태 바와 홈 버튼 영역까지 콘텐츠가 표시된다. 
- StyleSheet   
리액트 네이티브의 컴포넌트(태그)에 스타일을 적용할 때 사용   
인라인 스타일과 StyleSheet를 사용하는 방법이 있음  
- ScrollView   
화면 스크롤이 가능한 컴포넌트   
	- 그 외 스크롤이 가능한 컴포넌트: FlatList, ScrollView, SectionList 등
- Text  
글자를 표시하기 위한 컴포넌트 
- StatusBar  
상단에 있는 상태 바를 숨기거나 색깔을 변경하는데 사용 
- 리액트 네이티브는 리액트 네이티브 컴포넌트를 반환하는 함수로 구성 
	- 반환하는 컴포넌트는 하나의 노드로 구성된다. 아래와 같이 여러 노드로 된 컴포넌트를 반환하는 것은 불가능 
``` javascript
const App = () => {
	return (
		<View></View>
		<View></View>
	);
};
```

	- 이 문제를 해결하고자 **Fragment** 기능이 추가되었다. Fragment는 화면에 렌더링되지 않지만 복수 노드를 반환할 수 있게 해준다. 
```javascript
import React, {Fragment} from 'react'; // Fragment를 불러와야함 
const App = () => {
	return (
		<Fragment>
			<View></View>
			<View></View>
		</Fragment>
	);
};
```

	- Fragment를 불러오지 않고 아래와 같이 단축 문법을 사용할 수도 있다.
``` javascript
const App = () => {
	return (
		<>
		<View></View>
		<View></View>
		</>
	);
};
```

더 많은 리액트 네이티브 컴포넌트 -> https://reactnative.dev/docs/components-and-apis.html

## 스타일링 
1. 인라인 스타일
2. StyleSheet를 사용하는 방법 


## 타입스크립트
리액트 네이티브 = 자바스크립트 = 동적 프로그래밍 언어  
동적 프로그래밍 언어는 런타임 시 변수의 타입이 결정되기 때문에 변수 타입때문에 생기는 버그와 에러는 자바스크립트를 실행해야 안다.  
-> 이 문제를 해결하고자 리액트 네이티브에선 플로우(Flow)라는 정적 타입 분석기를 기본적으로 사용한다.  
**타입스크립트**  
또 다른 정적 타입 분석기. 자바스크립트 전반에 걸쳐 사용할 수 있다.  

### 타입스크립트를 리액트 네이티브에 적용하기  
1. 타입스크립트 라이브러리와 리액트 네이티브의 타입이 정의된 타입 정의 파일을 설치  
`npm install type script @types/react @types/react-native --save-dev`
- typescript: 타입스크립트 라이브러리
- @types/react: 리액트의 타입이 정의된 파일  
- @types/react-native: 리액트 네이티브의 타입이 정의된 파일 

2. 타입스크립트 설정을 위해 "tsconfig.json" 파일을 프로젝트 루트 폴더에 만들고 다음 내용 추가  
```json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react",
    "lib": ["es6"],
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "target": "esnext"
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

   - 위 과정을 거친 프로젝트를 리액트 네이티브 CLI 명령어로 생성할 수 있다.(타입스크립트용 리액트 네이티브 프로젝트)   
`react-native init 프로젝트명 --template typescript`    
3. 리액트 네이티브를 타입스크립트 형식으로 코딩해야 한다. App.js를 App.tsx로 변경하고 수정한다.    
  ``` javascript
  interface Props {}
  const App = ({}: Props) => {
  };  
  ```