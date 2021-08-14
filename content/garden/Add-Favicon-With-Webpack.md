---
title   : 웹팩을 이용해 파비콘 추가하기 
date    : 2021-08-14 21:05:20 +0900
updated : 2021-08-14 21:08:22 +0900
aliases : ["웹팩으로 파비콘 추가하기"]
private : false
hidden  : false
showReferences : true
---

- `html-webpack-plugin`을 사용하면 된다.  
```bash
npm i --save-dev html-webpack-plugin
```

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports - {
...
  plugins: [
	  new HtmlWebpackPlugin({
		  template: './index.html',
			favicon: './favicon.ico', // favicon 경로 입력 
		}),
	],
...
}
```
- 빌드 후 template 파일에 favicon이 추가된다.  
	
## reference
- [https://www.npmjs.com/package/html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)	
