---
title: React 的状态管理
date: 2021-03-25 15:34:21
description: react中的状态管理,从props到context到redux
tag: react,state
---

### 概述

React 中的状态管理

### props

父子组件之间进行状态管理

### context with hooks

### Redux

#### redux中执行异步函数

在Web世界中，充斥着异步请求，在了解如何在 redux 中实现异步请求之前，需要先熟悉一下 redux 的中间件 middleware。



redux 中的 异步请求 是通过中间件 完成的，在 `@reduxjs/toolkit` 中默认处理异步的中间件是 [redux-thunk](https://github.com/reduxjs/redux-thunk) , 并且内置在 `configureStore` 中可以直接使用，一个`thunk`函数总是以 (dispatch, getState)作为参数，并在其中 dispatch action。

```js
// 为了和普通的 action 保持一致
const logAndAdd = amount => {
  return (dispatch, getState) => {
    const stateBefore = getState()
    console.log(`Counter before: ${stateBefore.counter}`)
    setTimeOut(()=>{
    	dispatch(incrementByAmount(amount))
    }, 1000)
    const stateAfter = getState()
    console.log(`Counter after: ${stateAfter.counter}`)
  }
}

store.dispatch(logAndAdd(5))
```





[未完待续...]