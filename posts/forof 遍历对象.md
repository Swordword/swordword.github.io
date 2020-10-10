---
title: 使用forof 遍历对象
date: 2020-10-10 23:17:42
description: description
tag: javascript
---

数组 for、forEach、every、some都是通过数组下标遍历属性，ES6 `for...of`可以直接通过迭代器遍历数组的值。

for...of语法适用于定义了迭代器的对象，而数组刚好有内置的`@@iterator`,因此可以直接应用。

```js
var arr = [1, 2, 3];
var it = arr[Symbol.iterator]()

console.log(it.next()) // {value:1,done:false}
console.log(it.next()) // {value:2,done:false}
console.log(it.next()) // {value:3,done:false}
console.log(it.next()) // {value:undefined,done:true}
```

符号`Symbol.iterator`获取对象的`@@iterator`内部属性。引用类似iterator的特殊属性时要使用符号名，而不是符号代表的值。(?) `@@iterator`其实并不是一个迭代器对象，而是一个返回迭代器对象的函数

