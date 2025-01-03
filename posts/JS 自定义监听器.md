---
title: js实现自定义监听器
date: 2020-12-23 14:03:56
description: 在浏览器端与js端分别实现自定义监听器
tag: JavaScript
---

js中的自定义监听器分为浏览器DOM端、Node端，最后可以自己实现一个自定义监听器

### 浏览器端

浏览器端的自定义监听器可以通过原生的**`Event`**和**`CustomEvent`**构造函数实现

**`Event`**语法 [基础](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event)

**`CustomEvent`**[基础](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)

`CustomEvent`相比`Event`的优势是有个`detail`字段可以为事件传入自定义参数

举例使用

在两个独立的模块：商品购买，购物车中，可以在购买页面定义一个自定义监听器 **BuyEvent**，再在其他模块中监听该事件。当用户购买商品时，通过`dispatchEvent`触发该事件

**buy模块**

```js
// btnElem 购买按钮	
btnElem.addEventListener('click', (e) => {
  // goodInfo 商品信息
  const buyEvent = new CustomEvent('buyEvent', {
    detail: goodInfo,
  })
  document.dispatchEvent(buyEvent)
})
```

**购物车模块**

```js
document.addEventListener('buyEvent', (e) => {
  console.log(`商品模块get，${e.detail}`)
})
```

### Node端

Node端自带了**event**模块可以实现监听器功能

```js
const EventEmitter = require('events')

const myEvent = new EventEmitter()

myEvent.on('mEvent', (data) => {
  console.log(data)
})

myEvent.emit('mEvent', '发射！！！')

```

### 自定义事件监听器

可以自己实现一个自定义监听器实现上述功能

```js
class EventEmiter {
  constructor() {
    this.events = []
  }
  on(event, cb) {
    console.log('this.events', this.events)
    if (this.events[event]) {
      this.events[event].push(cb)
    } else {
      this.events[event] = [cb]
    }
  }
  emit(event) {
    const cbList = this.events[event]
    if (!cbList) {
      console.error('你注册了事件嘛QAQ')
      return
    }
    let args = Array.from(arguments).slice(1)
    cbList.forEach((cb) => {
      cb.apply(this, args)
    })
  }
}

let mEvent = new EventEmiter()
mEvent.on('mEvent', (data) => {
  console.log('got it', data)
})
setTimeout(() => {
  mEvent.emit('mEvent', '发射！！！')
}, 2000)

```

当然，如果你不想用`class`的话，用函数也可以实现

```js
function EventEmiter() {}
EventEmiter.prototype.events = {}
EventEmiter.prototype.on = function (event, cb) {
  console.log('this.events', this.events)
  if (this.events[event]) {
    this.events[event].push(cb)
  } else {
    this.events[event] = [cb]
  }
}
EventEmiter.prototype.emit = function (event) {
  const cbList = this.events[event]
  if (!cbList) {
    console.error('你注册了事件嘛QAQ')
    return
  }
  let args = Array.from(arguments).slice(1)
  cbList.forEach((cb) => {
    cb.apply(this, args)
  })
}

let foo = new EventEmiter()

/**
 * 或者这样也行
 * function foo(num) {
  this.events = {}
  }
 Object.setPrototypeOf(foo, EventEmiter.prototype)
 */

foo.on('mEvent', function (res, a) {
  console.log('success', res, a)
})


setTimeout(() => {
  foo.emit('mEvent', '发射！！！', '剩余氧气: undefined')
}, 1000)

```

### 总结

监听器本质是一个个**事件**，是**观察者模式**的实现。OVER！！！

