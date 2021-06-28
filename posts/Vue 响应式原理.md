---
title: Vue 响应式原理
date: 2019-06-29 13:45:05
description: vue2.x的监听绑定使用的是`Object.defineProperty`,不能对数组和特殊对象进行监听，而`Proxy`则解决了这个问题
tag: JavaScript,Vue,Reactive
---

## 背景

vue的响应式更新是vue的一大特点

响应式原理一般包括以下几个部分

* 通过数据劫持/数据代理：用于侦测数据的变化
* 依赖收集：收集视图用来了哪些数据
* 发布订阅模式：当数据发生变化时，自动通知需要更新的视图，进行更新

## 数据劫持

vue2.x的数据劫持使用的是`Object.defineProperty`,其不能对数组和特殊对象进行监听，因此Vue3.x使用的`Proxy`则解决了这个问题

```js
function observe(obj){
  if(!obj|| typeof obj ==='object') return
  Object.keys(obj).forEach(key=>{
    // 劫持obj的每个属性
    defineReactive(obj,key,obj[key])
  })
}
function defineReactive(obj,key,val){
  // 如果 val 是一个对象，则需要深度遍历该对象
  observe(val)  
  Object.defineProperty(obj,key,{
    configureble: true,	// 可删除
    enumrable: true,	// 可遍历
    get(){
      return val;
    },
    set(newVal){
      if (val === newVal) return
      val = newVal
      // 如果设置的是一个新的对象，也需要劫持这个对象
      observe(newVal)
    }
	})
}
```

### Vue3.x使用的Proxy有何优势

* proxy对于数组的变化也能监听到

* 不需要想defineProperty进行深度遍历监听

## 依赖收集

依赖收集是一个队列，如果视图使用了监听的data，则创建一个新的 Wactcher，将其 push 到依赖收集的队列中

```js
class Dep {
  static target = null
  subs = []
  addSub(sub) {
    // sub 是一个 Wacther 实例
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach((watcher) => watcher.update())
  }
}
```

## 发布订阅

发布订阅其实内部储存了一个用于更新视图的 callback 函数，放在依赖收集的队列中，当 data 的属性发生变化时，依赖收集队列中的每个 wacther都会调用 update 函数，从而触发视图更新

```js
class Wacther{
  // vm 时 Vue 的实例
  constructor(vm,exp,cb){
    Dep.target = this
    this.vm = vm
    this.exp = exp
    this.cb = cb
    // vm._data.a，从而触发 data.get 方法，在 dep 中 push 这个 Dep.target（即这个watcher）
    let arr = exp.split('.')
    let val = vm
    arr.forEach(key=>{
      val = val[key]
    })
    Dep.target = null
  }
}
```

## 更新 数据劫持的函数

现在有了依赖收集的队列和生成发布订阅的构造函数，我们需要更新一下 observe 函数来使用这个 dep 队列和 wacther 实例

```js
...
function defineReactive(obj,key,val){
  // 如果 val 是一个对象，则需要深度遍历该对象
  observe(val)  
+  // 实例化一个依赖收集队列，里面存放的订阅实例 Watcher
+  let dep = new Dep()
  Object.defineProperty(obj, key,{
    configureble: true,	// 可删除
    enumrable: true,	// 可遍历
    get(){
+     // Dep.target 是 Wacther，见之后的 Wactcher 的构造函数
+      Dep.target && dep.addSub(Dep.target)
      return val;
    },
    set(newVal){
      if (val === newVal) return
      val = newVal
      // 如果设置的是一个新的对象，也需要劫持这个对象
      observe(newVal)
+      // 当设置新值时,触发 Wacther 中 update 函数，对视图进行更新
+      dep.notify()
    }
	})
}
```

## 总结

完整的实例如下

```js
class Vue {
  constructor(options) {
    let data = (this._data = options.data)
    observe(data)
  }
}

function observe(obj) {
  if (!obj || typeof obj !== 'object') return
  Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]))
  function defineReactive(obj, key, val) {
    observe(val)
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newVal) {
        if (val === newVal) return
        val = newVal
        dep.notify()
        observe(newVal)
      },
    })
  }
}

class Dep {
  static target = null
  subs = []
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach((sub) => sub.update())
  }
}

class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    Dep.target = this
    let val = vm._data
    exp.split('.').forEach((key) => {
      val = val[key]
    })
    Dep.target = null
  }
  update() {
    let val = this.vm._data
    this.exp.split('.').forEach((key) => {
      val = val[key]
    })
    this.cb(val)
  }
}

let vue = new Vue({
  data: {
    name: 'Bob',
  },
})

// 手动添加一个 watcher，实际情况下，模版渲染时自动生成订阅函数
new Watcher(vue, 'name', (newVal) => {
  console.log('render', newVal)
})

setTimeout(() => {
  vue._data.name = 'Alice'
}, 1000)
```

## 参考

[不好意思！耽误你的十分钟，让MVVM原理还给你 (juejin.cn)](https://juejin.cn/post/6844903586103558158)

[剖析 Vue.js 内部运行机制 - 染陌同学 - 掘金小册 (juejin.cn)](https://juejin.cn/book/6844733705089449991/section/6844733705228025869)

[响应式对象 | Vue.js 技术揭秘 (ustbhuangyi.github.io)](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/reactive-object.html)

