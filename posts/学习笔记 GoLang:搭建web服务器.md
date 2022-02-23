---
title: 学习笔记 GoLang:搭建Web服务器
date: 2021-09-18 02:46:55
category: category
tag:
cover:
description: 使用 go 和 gin 开发 restful API
---

### 设想

设计两个关于唱片接口 

`/albums` get请求返回唱片合集，post请求会根据传入的信息新建唱片

 `/albums/:id`根据传入的id返回该唱片的信息

### Code

#### 获取所有唱片

首先找一个合适的目录，新建一个文件夹`web-service-gin`, 控制台进入该文件夹， `go mod init` 初始化包：

`$ go mod init example/web-service-gin`

在该文件夹下创建 main.go 文件作为我们 RESTful 程序的入口

```go
package main
...
```

首先定义需要返回的数据格式与mock数据

```go
type album struct {
    ID     string  `json:"id"`
    Title  string  `json:"title"`
    Artist string  `json:"artist"`
    Price  float64 `json:"price"`
}		
var albums = []album{
    {ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
    {ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
    {ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}
```

定义一个方法，相当于控制器，用来返回所有mock的唱片信息

```go
// getAlbums 以 JSON 的形式返回所有的albums信息
func getAlbums(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, albums)
}
```

> gin.Context 用来接收http request 的入参信息等

声明main函数，在main函数里面根据请求的路由走不同的控制器

```go
func main() {
	router := gin.Default()
	router.GET("/albums", getAlbums)
	router.Run("localhost:8080")
}
```

需要引用自带的`http` 模块和`github.com/gin-gonic/gin`模块 ，完整代码如下：

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

var albums = []album{
	{ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
	{ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func getAlbums(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums)
}

func main() {
	router := gin.Default()
	router.GET("/albums", getAlbums)
	router.Run("localhost:8080")
}
```

使用`go get`将 gin 作为依赖项安装

> go get 会从GitHub上安装gin包，需要注意网络

在 项目文件夹`web-service-gin`下，执行代码：`go run .`，浏览器打开`[localhost:8080/albums](http://localhost:8080/albums)`会看到返回的 albums json 信息

#### 添加唱片

目的：当通过post方法请求/albums时，在原有的mock数据基础上添加新唱片

首先创建`postAlbum`方法处理post请求的信息

```go
func postAlbum(c *gin.Context) {
	var newAlbum album
	if err := c.BindJSON(&newAlbum); err != nil {
		return
	}
	albums = append(albums, newAlbum)
	c.IndentedJSON(http.StatusCreated, newAlbum)
}
```

> c.BindJSON(& newAlbum) 方法会将请求体的数据赋予 newAlbum

在 mian 方法里添加对 /albums post 方法的处理:

```go
func main() {
    router := gin.Default()
    router.GET("/albums", getAlbums)
    router.POST("/albums", postAlbums)
    router.Run("localhost:8080")
}
```

重启一下 go 服务`go run .`

通过 curl 执行post请求 

```bash
$ curl http://localhost:8080/albums \
    --include \
    --header "Content-Type: application/json" \
    --request "POST" \
    --data '{"id": "4","title": "The Modern Sound of Betty Carter","artist": "Betty Carter","price": 49.99}'
```

成功后在浏览器打开 `http://localhost:8080/albums`会发现唱片集数量增加到了4个，表明我们新建唱片成功了

#### 获取单个唱片的信息

同样的，先创建一个方法来根据id获取唱片信息

```go
func getAlbumByID(c *gin.Context) {
	id := c.Param("id")
	for _, a := range albums {
		if a.ID == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
}
```

> c.Param("id") 即 gin.Context.Param("id") 会获得请求URL的路径参数id， go是真方便呐！
>
> 一个 for 循环找到 id相同的唱片并返回，没有的话返回404

在main方法里面监听 `/albums/:id`

```go
func main() {
	router := gin.Default()
	router.GET("/albums", getAlbums)
	router.GET("/albums/:id", getAlbumByID)
	router.POST("/albums", postAlbum)
	router.Run("localhost:8080")
}
```

重启项目`go run .`，在浏览打开http://localhost:8080/albums/2会看到id为2 的唱片信息

将路径换成http://localhost:8080/albums/4，会发现结果为404，因为之前通过post添加的唱片信息在项目重启时已经清空了，可以再执行一边上面的curl语句，就可以开到id为4 的唱片信息了

完整代码如下

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

var albums = []album{
	{ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
	{ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func getAlbums(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums)
}

func postAlbum(c *gin.Context) {
	var newAlbum album
	if err := c.BindJSON(&newAlbum); err != nil {
		return
	}
	albums = append(albums, newAlbum)
	c.IndentedJSON(http.StatusCreated, newAlbum)
}

func getAlbumByID(c *gin.Context) {
	id := c.Param("id")
	for _, a := range albums {
		if a.ID == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
}

func main() {
	router := gin.Default()
	router.GET("/albums", getAlbums)
	router.GET("/albums/:id", getAlbumByID)
	router.POST("/albums", postAlbum)
	router.Run("localhost:8080")
}
```



