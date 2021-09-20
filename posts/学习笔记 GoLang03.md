---
title: 学习笔记 GoLang03
date: 2021-09-20 14:52:49
category: category
tag:
cover:
description: 使用 golang 搭建Web应用 
---

### 目的

* 创建一个保存和加载文件的方法
* 使用 `net/http`包打包web应用
* 使用`html/template`包处理 HTML 模版
* 使用`regexp`验证用户输入
* 使用闭包

### 操作起来

#### io保存与读取文件

go标准库`io/ioutil`定义了方法用来保存文件(`ReadFile`)和读取文件(`ReadFile`)

在一个新文件夹gowiki下创建`wiki.go`作为我们项目入口文件, 引用`io`包

```go
package main

import (
	"fmt"
	"io/ioutil"
)
```

定义WIki页面的数据结构

```go
type Page struct{
  Title string
  Body []byte
}
```

> 将Body设置为`[]byte`切片类型是 io 库 ReadFile 方法返回的类型

设置保存和读取文件的方法

```go
func (p *Page) save() error {
	filename := p.Title + ".txt"
	return ioutil.WriteFile(filename, p.Body, 0600)
}

func loadPage(title string) (*Page, error) {
	filename := title + ".txt"
	body, err := ioutil.ReadFile(filename)
	if err != nil {
		return nil, err
	}
	return &Page{Title: title, Body: body}, nil
}
```

定义入口方法main

```go
func main(){
  p1 = &Page{Title:"TestPage", Body:[]bytes("This is a sample page")}
  p1.save()
  p2,_ := loadPage("TestPage")
  fmt.Println(string(p2.body))
}
```

运行测试 `go run wiki.go`会在当前文件夹生成一个`TestPage.txt`文件, 并在控制台输出文件内容

#### 使用`net/http`包



[未完待续...]

