---
title: babel使用教程
date: 2020-11-12 23:18:23
description: JavaScript向后兼容的转码器
tag: JavaScript
---

​	Babel是一个编译器，主要用于在较旧的浏览器或环境中将ES6+的代码转换为向后兼容的JavaScript版本。 babel除了语法转换功能，还可以自动填充目标js环境缺失的特性（通过@babel/polyfill, 即大名鼎鼎的core-js）。以及按照自己的要求转译源码(比如Taro中的多端转译)。

### 原理

就如同其他的编译器，Babel在源代码=>输出代码的过程也经历了parsing解析, transforming转换, printing打印三个阶段

