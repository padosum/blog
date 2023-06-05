---
title   : Props-Type-in-React-Component
date    : 2023-06-04 12:32:01 +0900
updated : 2023-06-04 12:32:01 +0900
aliases : ["React Component의 props type 설정하기"]
tags: ["react"]
draft : false
---

[[TypeScript]]로 component props type 설정

```ts
type CardProps = {
  style: React.CSSProperties
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ style, children }) => {
  return (
    <div className="card" style={style}>
      {children}
    </div>
  )
}
```
