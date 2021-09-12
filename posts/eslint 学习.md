---
title: eslint 学习
date: 2021-09-10 09:50:32
category: category
tag:
cover:
description: description
---

#### 介绍

ESLint 是格式化 JavaScript 代码的工具

#### 特点

- ESLint 使用 [Espree](https://github.com/eslint/espree) 来编译 JavaScript 代码
- ESLint 使用 AST(抽象语法树)来评估代码
- ESLint 每个规则都是一个可拔插的插件

#### 安装

```bash
yarn add eslint --dev
# or
npm install eslint --save-dev

```

#### 初始化

```bash
yarn run eslint --init
# or
npx eslint --init
```

会根据配置生成一个 `.eslintrc.{js,yml,json}`文件

#### 对单文件使用

```bash
yarn run eslint yourfile.js
# or
npx eslint yourfile.js
```

#### 配置规则

1. 在文件的评论中配置
2. 通过配置文件

#### 配置文件类型

* JavaScript文件:`.eslint.js`
* YAML:`.eslintrc.yml`
* JSON: `.eslintrc.jscon`
* package.json: 在 eslintConfig 的属性中

优先级 .eslintrc.* > package.json, 配置文件只会取一个

eslint 寻找配置文件 会从同一文件目录开始找，逐级往上直至root文件夹，()

#### 通过拓展（extend）添加配置文件

.eslintrc.* 如果配置 extend 属性，会继承额外配置文件的所有属性

```json
{
  "extends": "eslint:recommended",
  "rules": {
  }
}
```

extend 可以设置包名，名称可以忽略开头为`eslint-config-`

#### 通过插件（plugin）添加配置文件

插件是一个为 ESLint配置各种规则的npm 包 

[未完待续...]