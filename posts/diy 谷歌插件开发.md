---
title: diy 谷歌插件开发
date: 2021-06-08 10:22:09
category: category
tag:
cover:
description: description
---

## 背景

## 准备工作

### 谷歌插件能做什么

### 开发

谷歌插件通过 `manifest.json`创建

```json
{
  "name": "Getting Started Example",
  "description": "Build an Extension!",
  "version": "1.0",
  "manifest_version": 3,
+  "background": {
+    "service_worker": "background.js"
+  }
}
```

background scripts，与其他重要的组件一样，必须在`manifest`中进行注册，告知插件引用哪个文件，并且文件如何工作

`chrome.runtime.onInstalled`插件安装，可以在此时添加监听事件缓存插件需要的数据

```js
let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});
```

大多数API，例如`storage`需要在`manifest`文件下的`permissions`字段中做申请

```json
{
	...
  "background": {
    "service_worker": "background.js"
  },
+  "permissions": ["storage"]
}
```

可以在插件管理页面，reload一下，通过`inspect views`检查试图,由于现在没有页面，只能在控制台看到打印的日志

### UI 界面

谷歌插件有很多类型的用户界面，常见的是popup,即弹出的那个小页面,新建`popup.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="button.css">
  </head>
  <body>
    <button id="changeColor"></button>
  </body>
</html>
```

`popup`也必须在`manifest`中的`action`字段引入, 我们将它作为action 的默认弹出页面

```json
{
  ...
  "permissions": ["storage"],
+  "action": {
+    "default_popup": "popup.html"
+  }
}
```

插件的icon也需要在action的`default_icon`中引入

```json
 "action": {
    "default_popup": "popup.html",
+    "default_icon": {
+      "16": "/images/get_started16.png",
+      "32": "/images/get_started32.png",
+      "48": "/images/get_started48.png",
+      "128": "/images/get_started128.png"
    }
  }
```



























[未完待续...]