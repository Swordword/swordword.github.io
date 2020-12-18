---
title: 在vscode中运行C&C++
date: 2020-06-28 18:44:32
description: 在 vscode 中 运行与调试C&C++，未完结
tag: VSCode、C、C++
---

### 安装

1. 安装 gcc
2. vscode中安装 C/C++ 插件
3. 安装 Code Runner 插件 更方便的运行 C++代码

### 调试

F5--> C++(GDB/LLDB)版本 选择g++-8 版本 生成和调试活动文件，

若要想调试 cin，需在项目根目录下的 launch.json 中 配置 `externalConsole:true` 即可在调试的时候打开控制台。

结果如下

![image-20201218150340230](http://img.massivejohn.com/image-20201218150340230.png)