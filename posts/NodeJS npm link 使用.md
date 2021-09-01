---
title: NodeJS npm link 使用
date: 2021-09-01 11:22:24
category: category
tag:
cover:
description: description
---

#### 介绍

npm link 链接自己开发的包，而不需要每次测试时都需要再度打包

#### 语法

```bash
npm link (in package dir)
npm link [<@scope>/]<pkg>[@<version>]
alias: npm ln
# 简写形式
cd ~/project/test-package
npm link ../develop-package
# 相当于
cd ~/project/develop-package
npm link
cd ~/project/test-package
npm link develop-package
```

#### 原理

包链接包含两个步骤

1. 在想要链接的包文件夹执行`npm link`，将会在全局文件夹`{prefix}/lib/node_modules/<package>`创建符号链接来链接这个包文件
2. 在测试文件夹执行 `npm link <执行 npm link 的包package.json中的名称>`，这样就会在测试文件夹的node_modules创建一个符号链接指向全局安装的包，执行 `npm link`的包修改时，测试中引入的包也会同步修改

#### 使用

#### 参考：

[npm-link | npm Docs (npmjs.com)](https://docs.npmjs.com/cli/v7/commands/npm-link)

[未完待续...]