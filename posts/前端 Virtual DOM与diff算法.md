---
title: Virtual DOM 与 diff 算法
date: 2021-05-28 17:39:31
category: category
tag: algorithm
cover: 
description: 现代前端框架使用的Virtual DOM与diff算法概述
---

## 背景

dom的操作成本是非常高的，并且极其容易导致页面的回流重绘，开销大

## Virtual DOM

Virtual Dom 算法包括几个步骤

1. 使用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的DOM树，插到文档中。
2. 当状态变更的时候，重新构造一棵新的对象树，然后用新的对象树与旧的树进行比较，记录两棵树的差异
3. 将步骤2记录的差异应用到步骤1所构建的真正 DOM 树上，更新视图

### 虚拟DOM 转为 真实DOM

### 真实DOM 转为 虚拟DOM

## diff 算法

### 捕获actions



### patch 将actions 应用到 真实DOM中



## 参考

[深度剖析：如何实现一个 Virtual DOM 算法 · Issue #13 · livoras/blog (github.com)](https://github.com/livoras/blog/issues/13)





















## 参考

[你不知道的Virtual DOM（一）：Virtual Dom介绍 - SegmentFault 思否](https://segmentfault.com/a/1190000016129036)

[深度剖析：如何实现一个 Virtual DOM 算法 · Issue #13 · livoras/blog (github.com)](https://github.com/livoras/blog/issues/13)

[虚拟 DOM 与 diff 算法 - 易迟的博客 | Bryan Blog (hustyichi.github.io)](https://hustyichi.github.io/2020/09/16/vdom/#react-算法)

[snabbdom/snabbdom: A virtual DOM library with focus on simplicity, modularity, powerful features and performance. (github.com)](https://github.com/snabbdom/snabbdom)

[infernojs/inferno: An extremely fast, React-like JavaScript library for building modern user interfaces (github.com)](https://github.com/infernojs/inferno)

[去哪儿网迷你React的研发心得 - SegmentFault 思否](https://segmentfault.com/a/1190000011235844)

[未完待续...]