---
title: 学习笔记 SVG 使用教程
date: 2021-04-02 10:32:52
description: description
tag: svg
---

SVG是一种基于 XML格式的图像格式，全称 可缩放矢量图, jpg、png等图形格式基于像素进行处理，而 SVG 基于矢量对二维图形进行描述，所以不管放大多少倍都不会失真

## 基本形状

### 矩形

```html
<rect x="10" y="10" width="30" height="30"/>
<rect x="60" y="10" rx="10" ry="10" width="30" height="30"/>
```

![image-20210407134442781](http://img.massivejohn.com/image-20210407134442781.png)

| 属性       | 描述                                     |
| ---------- | ---------------------------------------- |
| **x**      | 矩形左上角的x位置                        |
| **y**      | 矩形左上角的y位置                        |
| **width**  | 矩形的宽度                               |
| **height** | 矩形的高度                               |
| **rx**     | 圆角的x方位的半径 可选，用于生成圆角矩形 |
| **ry**     | 圆角的y方位的半径                        |

### 圆形

```html
<circle cx="25" cy="75" r="20"/>
```

![image-20210407135803011](http://img.massivejohn.com/image-20210407135803011.png)

| 属性 | 描述        |
| ---- | ----------- |
| r    | 圆的半径    |
| cx   | 圆心的x位置 |
| cy   | 圆心的y位置 |

### 椭圆

```html
<ellipse cx="75" cy="75" rx="20" ry="5"/>
```

| 属性   | 描述            |
| ------ | --------------- |
| **rx** | 椭圆的x半径     |
| **ry** | 椭圆的y半径     |
| **cx** | 椭圆中心的x位置 |
| **cy** | 椭圆中心的y位置 |

### 线条

```html
<line x1="10" y1="10" x2="50" y2="50" fill="transparent" stroke="red" stroke-width="5" />
```

![image-20210407140338436](http://img.massivejohn.com/image-20210407140338436.png)

| 属性   | 描述        |
| ------ | ----------- |
| **x1** | 起点的x位置 |
| **y1** | 起点的y位置 |
| **x2** | 终点的x位置 |
| **y2** | 终点的y位置 |

### 折线

折线由各个点连接而成的一段直线

```html
  <polyline points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145" stroke="orange" fill="transparent"
    stroke-width="5" />
```

`points`表示 点集数列 每两个数表示一个点

![image-20210407141134542](http://img.massivejohn.com/image-20210407141134542.png)

### 多边形

类似折线，并且首尾点通过直线相连

```html
  <polygon points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180" stroke="green"
    fill="transparent" stroke-width="5" />
```

![image-20210407141252889](http://img.massivejohn.com/image-20210407141252889.png)

### 路径 

没有路径只靠前面几种基本图形，SVG还能干啥呢？SVG 可以用来创建线条，曲线，弧形等等

```html
<path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5" />
```

`d` 一个点集数列以及其它关于如何绘制路径的信息

![image-20210407141642807](http://img.massivejohn.com/image-20210407141642807.png)

## 路径 ⭐️

根据上面的例子，路径内部是由属性`d`生成的，`d`包含一系列命令和参数供我们画出想要的图形。

每个命令都通过特定的字母进行实例化，例如上面 的 `M 20,230`就是将点移至坐标系中的 (20,230) 点

**每个命令都区分大小写，并且大写字母与小写字母代表不同的含义**，大写字母表示后面跟着的是绝对坐标（即坐标对应着的是空间坐标，M 20,230 表示移到 空间坐标 20,230 处）, 小写字母表示后面跟着的是相对坐标（即坐标表示的是相对上一个点的 x, y 距离，m 20,230 表示相对于上一个坐标点，x轴移动20，y轴移动230） 

### 线条命令

SVG 中含有5个与线条绘制有关的命令

| 命令                 | 描述                                            |
| -------------------- | ----------------------------------------------- |
| M x y \|\| m dx dy   | 将初始点移动至某一位置                          |
| L x y  \|\|  l dx dy | 从当前位置到目的坐标 绘制一条线                 |
| H x  \|\|  h dx      | 从当前位置沿 水平方向 绘制一条线至目的坐标      |
| V y  \|\|  v dy      | 从当前位置沿 垂直方向 绘制一条线至目的坐标      |
| Z  \|\|  z           | 闭合当前子路径，绘制一条线 (连接当前点与初始点) |

### 曲线命令

| 命令                                               | 描述                 |
| -------------------------------------------------- | -------------------- |
| C x1 y1, x2 y2, x y \|\| c dx1 dy1, dx2 dy2, dx dy | 贝塞尔曲线，三次曲线 |
| L x y  \|\|  l dx dy                               |                      |
| H x  \|\|  h dx                                    |                      |

## 为 SVG 添加样式

有多种方法可以使用内联CSS为SVG的形状着色（包括在对象上指定属性？？？），内嵌css，或者引入外部css文件

### 使用内部属性 fill 和 Stroke

#### 着色

`fill`设置对象内部的颜色

```html
<rect x="10" y="10" width="100" height="100" stroke="blue" fill="purple" fill-opacity="0.5" stroke-opacity="0.8" stroke-width="10" />
```

![image-20210407185504566](http://img.massivejohn.com/image-20210407185504566.png)

#### 填充

`stroke`设置围绕对象绘制的线的颜色，

`stroke-width`表示线条的宽度，以路径为中心绘制边框，依靠路径的边缘左右拓展padding的，比如为一个 SVG 对象设置`stroke-width=20`，其实际边框在内部和外部都拓展10个单位





参考链接

[SVG 图像入门教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2018/08/svg.html)

[引言 - SVG | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Introduction)

[Category "Svg" — Smashing Magazine](https://www.smashingmagazine.com/category/svg)

[An SVG Primer for Today's Browsers (w3.org)](https://www.w3.org/Graphics/SVG/IG/resources/svgprimer.html)

相关工具：

[Inkscape](https://inkscape.org/zh-hant/)

[未完待续...]

