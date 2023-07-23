---
title   : React에서 페이지 이동 후 form field 채우기
date    : 2023-07-23 22:22:30 +0900
updated : 2023-07-23 22:50:45 +0900
aliases : ["React에서 페이지 이동 후 form field 채우기"]
draft : false
tags : ["React", "historyAPI"]
---

## History API
회원가입 페이지를 구현하다가 이미 존재하는 이메일인 경우 나는 `409` [[HTTP-Status-Codes|HTTP 상태 코드]]를 던졌는데 그 후 처리를 어떻게 할지 고민이 됐다.  

다른 사이트는 어떻게 작동하나 탐색하다 Netflix를 봤다.  

이미 계정이 있어서 그 계정으로 회원가입을 진행하려니까 로그인 페이지로 이동시킨 후 email input field에 해당 email 값을 채워줬다. 오 이렇게 하고 싶었다. 그래서 쿼리 스트링을 넘겨주나 했더니 그건 아녔다. 

Netflix는 어떻게 구현했는지 모르지만 History API를 사용하는 방법을 찾았다. `pushState`에 `state`를 전달하고 다른 페이지에서 이 `state` 값을 가져올 수 있다.


## React에서  

마침 History API를 사용하는 `react-router`의 `BrowserRouter`를 사용하고 있기 때문에 React에서도 간편하게 구현할 수 있었다.  

```tsx
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  // ...
  const handleSubmit = async (e: FormEvent) => {
    const result = await signUp({
	  email,
	  password
    })
	
	// 회원가입 후 state 전달
	if (result.status === httpStatus.CONFLICT) {
	  navigate("/login", { state: { autofill: email } });
	}
  }

}
```

`state`를 받는 컴포넌트에서 `useLocation`을 사용해 받는다.  
```tsx
import { useLocation } from "react-router-dom";

const SignInForm = () => {
  const location = useLocation()
  
  // form field에 사용할 state에 담는다. 
  const [form, setForm] = useState({
    email: location.state?.autofill ? location.state.autofill : "",
	password: ""
  })
}
```


## reference
- [Historyt API - state](https://developer.mozilla.org/en-US/docs/Web/API/History/state)
- [https://stackoverflow.com/questions/65147949/is-it-possible-to-redirect-to-another-page-and-fill-a-field-in-reactjs](https://stackoverflow.com/questions/65147949/is-it-possible-to-redirect-to-another-page-and-fill-a-field-in-reactjs)
- [React Router - useLocation](https://reactrouter.com/en/main/hooks/use-location)
- [React Router - useNavigate](https://reactrouter.com/en/main/hooks/use-navigate)
