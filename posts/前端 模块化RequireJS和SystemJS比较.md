---
title: 前端 模块化RequireJS和SystemJS比较
date: 2021-08-23 14:10:54
category: FE
tag:
cover:
description: description
---

公司微前端方案已经从RequireJS转向SystemJS了，为了理清迁移的优势，整理一下二者的区别与联系

## RequireJS

RequireJS 是一个js文件，也是一个模块打包器，脱胎于CommonJS。在ESM还没有出现的年代，致力于使得各个js文件脱离全局变量进行模块化。

### 安装与引用

[官网下载 requireJS文件](https://requirejs.org/docs/download.html),作为<script>脚本引入，

```html
 <!-- data-main 属性表明在 require.js 加载完成之后加载 scripts/main.js -->
 <script data-main="scripts/main" src="scripts/require.js"></script>
```

### 使用

##### baseUrl

RequireJS 相对于 baseUrl 加载 js 文件，baseUrl 默认设置为 data-main 制定的入口文件所在的目录，也可以通过 RequireJS config 设置 baseUrl。

```js
requirejs.config({
  // 默认加载模块，以 js/lib 作为加载根目录
  baseUrl: 'js/lib',
  // 如果遇到 app 开头的require，路径为'js/lib/../app/'
  paths: {
      app: '../app'
  }
})
// 'jquery', 'canvas' 在 js/lib 中，app/sub 在 js/app 中
requirejs(['jquery', 'canvas', 'app/sub'],function($,canvas,sub) {
});
```

##### 定义模块

在 js 文件中通过 define 来定义可以导出的对象，供其他模块requreJS导入

> define(*name*?, *deps*?, *callback*) {}

* 定义导出简单的key/value 对象

  ```js
  define({
      color: "black",
      size: "unisize"
  })
  ```

* 定义方法导出数据

  ```js
  define(function () {
      //做一些准备工作
      return {
          color: "black",
          size: "unisize"
      }
  });
  ```

* 定义依赖于其他模块的导出方法

  ```js
  // 1个依赖和本文件是在一个文件夹中，my 开头的依赖默认情况下是在本文件的兄弟文件夹 my 中
  define(["./cart", "my/inventory"], function(cart, inventory) {
          return {
              color: "blue",
              size: "large",
              addToCart: function() {
                  inventory.decrement(this);
                  cart.add(this);
              }
          }
      }
  );
  ```

* 将模块定义为方法

  ```js
  define(["my/cart", "my/inventory"],
      function(cart, inventory) {
          return function(title) {
              return title ? (window.title = title) :
                     inventory.storeName + ' ' + cart.name;
          }
      }
  );
  ```

* 定义一个具名模块

  ```js
  // 模块名称是 foo/title
  define("foo/title",
          ["my/cart", "my/inventory"],
          function(cart, inventory) {
         }
      );
  ```

  

##### 引用模块

```js
require([], function(module1,module2){
  
})
```

##### 

### Code

#### 

[未完待续...]

