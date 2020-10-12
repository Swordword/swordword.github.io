---
title: forof 遍历数组的原理
date: 2020-10-10 23:17:42
description: description
tag: javascript
---

数组使用 for、forEach、every、some都是通过数组下标遍历属性，ES6 `for...of`可以直接通过迭代器遍历数组的值。

for...of 其实创建一个循环用于遍历可迭代对象，包括:内置的string、array、类数组对象(例如函数参数arguments或节点nodeList)、TypedArray、Map、Set和用户定义的迭代对象。它调用一个定制的迭代钩子，其中包含针对对象的每个不同属性的值执行的语句

### 数组为何可以使用for...of遍历

for...of语法适用于遍历定义了迭代器的对象，而数组刚好有内置的`@@iterator`,因此可以直接应用。

```js
var arr = [1, 2, 3];
var it = arr[Symbol.iterator]()

console.log(it.next()) // {value:1,done:false}
console.log(it.next()) // {value:2,done:false}
console.log(it.next()) // {value:3,done:false}
console.log(it.next()) // {value:undefined,done:true}
```

符号`Symbol.iterator`获取对象的`@@iterator`内部属性。引用类似iterator的特殊属性时要使用符号名，而不是符号代表的值。(?) `@@iterator`其实并不是一个迭代器对象，而是一个返回迭代器对象的函数

### 给普通的对象定义@@iterator迭代器

比如一个普通的obj对象，含有a、b两个属性。为该对象定义一个`Symbol.iterator`迭代器属性，即可使用for-of 遍历

```js
var myObject = {
  a: 2,
  b: 3,
};
Object.defineProperty(myObject, Symbol.iterator, {
  enumerable: true,
  writable: false,
  configurable: true,
  value: function () {
    var o = this;
    var idx = 0;
    var ks = Object.keys(o);
    return {
      next: function () {
        return {
          value: o[ks[idx++]],
          done: idx > ks.length,
        };
      },
    };
  },
});
```

