---
title: React NextJS 搭建博客模版
date: 2021-04-22 13:34:36
description: 本文尝试使用NextJS搭建一个具有基本功能的博客并部署于后端
tag: React,Next.js,Nginx
---

### Next.js 博客初始化

就在不久之前（3月末），NextJS版本升级到了v10，

### 博客模板生层

### markdown 翻译

### 后端部署

### 翻页功能

### 归档功能

### 博客图库设置

图库使用的是七牛云存储，等到以后自己搭了NAS之后，打算迁移到NAS中

七牛云免费存储空间有10个g，但是图片路径是http协议的。谷歌在[Chrome 81 开始 HTTPS 下的 HTTP 请求全部升级]([Google Chrome 81 Will Not Load Mixed Content (searchenginejournal.com)](https://www.searchenginejournal.com/chrome-81-will-not-load-mixed-content/358298/))强制使用https，

所以需要在nginx中配置一下，将`https:image.domain.com/***`转为`https:image.domain.com/***`

### 博客评论功能

### 博客RSS设置

[未完待续...]