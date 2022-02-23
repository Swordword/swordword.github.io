---
title: 学习笔记 Golang:基础语法与结构
date: 2021-09-08 10:42:19
category: category
tag:
cover:
description: 简单熟悉go语法
---

#### 基础用法

`go mod init`： 初始化一个go 模块

`go run .|file.go`：执行该项目或指定 go 文件

`go mod tidy`：根据 import 的包下载依赖放在 sum 文件中

#### 模块之间引用

go中一个模块里面的方法，以大写开头的会被默认导出，小写的只能在文件中使用

一个简单的目录结构， 有 greetings 和 hello 两个包

```
-example
	-greetings
		go.mod
		greetings.go
	-hello
		go.mod
		hello.go
```

如果想在 hello 中引用greeting，需要将example/greeting指向本地文件：`go mod edit -replace example/greetings=../greetings`

同步模块的依赖项： `go mod tidy`

运行带有包的项目：`go run .`

> Q: vscode显示报错：Error loading workspace: You are outside of a module and outside of $GOPATH/src.
>
> A: 

#### 错误处理

go的错误处理需要在具体执行的包函数中添加判断，如果有错返回标准库 errors中定义的错误，无错需要返回`nil`告诉程序调用者函数正常运行

```go
// package
func Hello(name string) (string, error) {
    if name == "" {
        return "", errors.New("empty name")
    }
    message := fmt.Sprintf("Hi, %v. Welcome!", name)
    return message, nil
}
// main
message, err := greetings.Hello("")
if err != nil {
	log.Fatal(err)
}
fmt.Println(message)
```

初始化map类型：`make(map[*key-type*]*value-type*)`

`go build`将当前的go包打包未为二进制执行文件

`go list -f '{{.Target}}'`获取 `go install` 的安装路径

`export PATH=$PATH:/path/to/your/install/directory` 将 go 安装路径设置设置为系统变量

`go install`：安装打包的二进制包

