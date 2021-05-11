---
title: axios 源码解读
date: 2021-03-15 23:44:57
description: description
tag: JavaScript、CodeReview
---

​		阅读一个npm包，首先看的是 package.json。在 package.json 中, main 字段是 index.js, 进入index.js 中 发现只有一行代码 `module.exports = require('./lib/axios');`再去 lib/axios 这里就是代码的核心入口了。

​		axios是由 `createInstance` 返回的实例，createInstance 是  ./core/Axios 中的 Axios

​	`var axios = createInstance(defaults);`



[未完待续...]

