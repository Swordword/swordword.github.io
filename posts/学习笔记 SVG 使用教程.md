---
title: 学习笔记 SVG 使用教程
date: 2021-04-02 10:32:52
description: description
tag: svg
---

SVG (Scalable Vector Graphics：可缩放矢量图) 是一种基于 XML格式的图像格式, 与常见的位图图像格式 jpg、png基于像素处理不同，SVG 基于矢量对二维图形进行描述，所以不管放大多少倍都不会失真

## 基本使用

SVG 的使用类似一个 html 标签，通过在 `<svg></svg>`内部添加内置形状生成 svg 元素

```html
<svg xmlns="http://www.w3.org/2000/svg">
  
</svg>
```



#### SVG 可以作为一个dom元素插入网页。

```html
<div>
  <svg>
    // ...
  </svg>
</div>
```



#### 作为一个独立的文件，作为`<img>`的 `src`

```html
<img src="fooabr.svg">
<style>
  .foobar{
    background:url(foobar.svg)
	}
</style>
```

#### 将SVG转为data编码内联

常见的有两种方式

**将SVG 转为 base64 作为Data URL**

`background: url(data:image/svg+xml;base64,[base64 data])`

**注意** 浏览器为了安全，直接内联 SVG  时 SVG 元素需要转义才能作为data

 `<img src="data:image/svg+xml;base64,encodeURIComponent(svgIcon)">` 

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

没有路径只靠前面几种基本图形，SVG能干啥呢？SVG 的`<path>`可以用来创建线条，曲线，弧形等等

```html
<path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5" />
```

`d` 一个点集数列以及其它关于如何绘制路径的信息

![image-20210407141642807](http://img.massivejohn.com/image-20210407141642807.png)

## 路径 ⭐️

根据上面的例子，路径是由内部属性`d`生成的，`d`包含一系列命令和参数供我们画出想要的图形。

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

#### 描边 stroke

`stroke`设置围绕对象绘制的线的颜色，

`stroke-width`表示线条的宽度，以路径为中心绘制边框，依靠路径的边缘左右拓展padding的，比如为一个 SVG 对象设置`stroke-width=20`，其实际边框在内部和外部都拓展10个单位

**`stroke-linecap`控制线条末端的形状**

`butt` : 到头直接90度切割

`square` :  到头会继续向线段两边延伸 `stroke-width`的一半，并直接90度切割

`round` : 线段到头会填充一个半圆，直径是`stroke-width`的一半

![svg_stroke_linecap_example](http://img.massivejohn.com/svg_stroke_linecap_example.png)

**`stroke-linejoin`控制两个线段之间的连接处理**

`miter`: 延伸两条直线到汇合成一个直角

`round`：形成一个弧度段

`bevel`：两条直线的最外边缘连接起来并填充

```html
<?xml version="1.0" standalone="no"?>
<svg width="160" height="280" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <polyline points="40 60 80 20 120 60" stroke="black" stroke-width="20"
      stroke-linecap="butt" fill="none" stroke-linejoin="miter"/>

  <polyline points="40 140 80 100 120 140" stroke="black" stroke-width="20"
      stroke-linecap="round" fill="none" stroke-linejoin="round"/>

  <polyline points="40 220 80 180 120 220" stroke="black" stroke-width="20"
      stroke-linecap="square" fill="none" stroke-linejoin="bevel"/>
</svg>
```



![svg_stroke_linejoin_example](http://img.massivejohn.com/svg_stroke_linejoin_example.png)

**`stroke-dasharray` 将线段设置为虚线**

`stroke-dasharray: filled-width, unfilled-width...` 按照这个顺序依次绘制线段，如果是奇数的话，可以视作 配置*2的配置进行绘制，

```html
 <path d="M 10 75 L 190 75" stroke="red"
    stroke-linecap="round" stroke-width="1" stroke-dasharray="20,10,5" fill="none"/>
```

![image-20210408140246502](http://img.massivejohn.com/image-20210408140246502.png)

### 使用CSS

只有有关绘制和填充的属性可以使用css进行修饰，比如`fill`,`stroke`,`stroke-dasharray`，而像 `width` ,`height`, `path` 无法使用css修改

CSS 在 SVG 中的使用方法有三种：

#### 使用内嵌 style

```html
 <rect x="10" height="180" y="10" width="180" style="stroke: black; fill: red;"/>
```

#### 使用 `<defs>`

`<defs>` 可以在其中插入css样式，也可以用来创建不在 SVG 中显示的元素（比如接下来的`<linearGradient>`）但是可以影响被其他元素，

```html
<?xml version="1.0" standalone="no"?>
<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <style type="text/css">
      /* <![CDATA[ some style ]]> 阻止xml解析其中的css */
      <![CDATA[
      #MyRect {
        stroke: black;
        fill: red;
      }
      ]]>
    </style>
  </defs>
  <rect x="10" height="180" y="10" width="180" id=MyRect />
</svg>
```

#### 引用外部css文件

```html
<!-- svg file -->
<?xml version="1.0" standalone="no"?>
<?xml-stylesheet type="text/css" href="./style.css"?>
<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect x="10" height="180" y="10" width="180" id="MyRect" />
</svg>
```

## 渐变

渐变分为线性渐变 和 径向渐变。渐变元素必须赋予一个 id，供 SVG 元素使用，为了复用渐变通常将其定义在 `<defs>`中

### 线性渐变

按照直线方向进行渐变，通过定义一个 `<linearGradient>`描述渐变信息

#### `<linearGradient>`

创建可以被 SVG 填充或者描边的线形渐变

**渐变方向**

`x1 = 0 y1=0 x2 =1 y2=0`：控制渐变梯度的方向，其中`x1,y1,y2`默认值为0%，`x2`默认值为100%，即1。`x1,y1`表示渐变梯度方向的起始点。`y1,y2`表示渐变梯度方向的终点。所以默认情况下 方向为 `(0,0)->(1,0)`，渐变方向为x轴向右

`<linearGradiene>`内部由一个个`<stop>`节点组成，描述在具体位置（`offset`）的颜色（`stop-color`）

一个基本的`<linearGradiene>`如下

```html
<defs>
<linearGradient id="Gradient1">
    <stop offset="0%" stop-color="red" />
  	<!-- stop-opacity 此处颜色的透明度 -->
    <stop offset="50%" stop-color="black" stop-opacity="0" />
    <stop offset="100%" stop-color="blue" />
</linearGradient>
</defs>
```

目前只是定义了一个渐变，要想使用它，在svg的基本图形中`fill` 或`stroke`通过 `url(#id)` 引用该 渐变

```html
  <rect width="100" height="100" x="10" y="10" rx='15' ry="15" 	fill="url(#Gradient1)" />
```

![image-20210408154730209](http://img.massivejohn.com/image-20210408154730209.png)

当然 ，由于`fill`和`stroke`在css中生效 ，也可以在css中引用 Gradient

```html
<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- （0.0）-> (0,1) 将渐变梯度方向改为垂直向下 -->
    <linearGradient id="Gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" class="stop1" />
      <stop offset="50%" class="stop2" />
      <stop offset="100%" class="stop3" />
    </linearGradient>
    <style type="text/css">
      <![CDATA[
      #rect {
        fill: url(#Gradient);
      }
      .stop1 {
        offset: 0%;
        stop-color: red;
      }
      .stop2 {
        offset: 50%;
        stop-color: rgba(0, 0, 0, 0);
      }
      .stop3 {
        offset: 0%;
        stop-color: blue;
      }
      ]]>
    </style>
  </defs>
  <rect width="100" height="100" x='10' y='10' rx='10' ry='10' id='rect' />
</svg>
```

### 径向渐变

从一中心点向外辐射的梯度进行渐变

#### `<radialGradient>`

**渐变方向**

由两个圆形点的位置决定

`(cx=0.5, cy=0.5, r=0.5)`：径向梯度结束圆的坐标。表示渐变发生的范围

`(fx=cx, fy=cy, fr=0)`：焦点位置, 径向梯度开始圆的坐标。表示渐变初始的位置

```html
<defs>
      <radialGradient id="Gradient"
            cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
        <stop offset="0%" stop-color="red"/>
        <stop offset="100%" stop-color="blue"/>
      </radialGradient>
  </defs>

  <rect x="10" y="10" rx="15" ry="15" width="100" height="100"
        fill="url(#Gradient)" stroke="black" stroke-width="2"/>

  <circle cx="60" cy="60" r="50" fill="transparent" stroke="white" stroke-width="2"/>
  <circle cx="35" cy="35" r="2" fill="white" stroke="white"/>
  <circle cx="60" cy="60" r="2" fill="white" stroke="white"/>
  <text x="38" y="40" fill="white" font-family="sans-serif" font-size="10pt">(fx,fy)</text>
  <text x="63" y="63" fill="white" font-family="sans-serif" font-size="10pt">(cx,cy)</text>

```

![SVG_Radial_Grandient_Focus_Example](http://img.massivejohn.com/SVG_Radial_Grandient_Focus_Example.png)

**`spreadMethod`**

当渐变到达终点后，若SVG仍未填充满的处理方式

`pad` 到达终点后，后续对象的颜色由最后的`offset`颜色填充

`repeat`：继续按照原有的梯地进行渐变

`reflect`：按照与原来梯度相反的方向进行渐变

```html
<defs>
    <radialGradient id="Gradient1" r='0.25' spreadMethod="pad" class='a'>
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
    <radialGradient id="Gradient2" r='0.25' spreadMethod="repeat" class='a'>
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
    <radialGradient id="Gradient3" r='0.25' spreadMethod="reflect" class='a'>
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
  </defs>
  <rect x="10" y='10' width="100" height="100" rx="10" ry="10" fill="url(#Gradient1)" />
  <rect x="10" y='120' width="100" height="100" rx="10" ry="10" fill="url(#Gradient2)" />
  <rect x="120" y='120' width="100" height="100" rx="10" ry="10" fill="url(#Gradient3)" />
  <text x="15" y="30" fill="white" font-family="sans-serif" font-size="12pt">Pad</text>
  <text x="15" y="140" fill="white" font-family="sans-serif" font-size="12pt">Repeat</text>
  <text x="125" y="140" fill="white" font-family="sans-serif" font-size="12pt">Reflect</text>
```

应该比 MDN 上要清楚一点

![image-20210408172423682](http://img.massivejohn.com/image-20210408172423682.png)

**`gradientUnits`** 控制梯度是绝对定位还是是相对定位

`objectBoundingBox` 默认情况，`cx` 等范围是0-1

`userSpaceOnUse` 采用绝对定位，指定在二维空间中的坐标。例如

` <radialGradient id="Gradient" cx="60" cy="60" r="50" fx="35" fy="35" gradientUnits="userSpaceOnUse">`

## 模式复用

### `<g>`

`<g>`可以在元素上赋予属性，属性将生效于其中所有的元素。

内部元素自有的属性会覆盖`g`上的属性

```html
  <g fill="red">
        <rect x="0" y="0" width="10" height="10" />
        <rect x="20" y="0" width="10" height="10" />
    </g>
```

### `<use>`

`use`用于复制一个形状并可以自定义其属性，通过`xlink:href='#id'`复用之前定义的元素

```html
<svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
  <circle id="myCircle" cx="5" cy="5" r="4"/>
  <use href="#myCircle" x="10" y="0" fill="blue" />
  <use href="#myCircle" x="20" y="0" fill="white" stroke="yellow" />
</svg>
```

![image-20210413110753233](http://img.massivejohn.com/image-20210413110753233.png)



### `<defs>`

`<defs>`标签用于自定义形状，它内部的代码不会显示，仅供引用。

```html
<svg width="300" height="100">
  <defs>
    <g id="myCircle">
      <text x="25" y="20">圆形</text>
      <circle cx="50" cy="50" r="20"/>
    </g>
  </defs>
  <use href="#myCircle" x="0" y="0" />
  <use href="#myCircle" x="100" y="0" fill="blue" />
  <use href="#myCircle" x="200" y="0" fill="white" stroke="blue" />
</svg>
```

![image-20210413111116359](http://img.massivejohn.com/image-20210413111116359.png)

### `<Patterns>` 

`pattern` 就像 SVG 中的组件，在`<defs>`中定义，可以在其中定义多个基本图形的集合并通过 `fill(#id)`在任意 SVG 基本形状中进行引用

相对于`Gradient`中的`gradientUnits`, `Pattern`有两个与单位有关的参数：`patternUnits`和`patternContentUnits`

`patternUnits` 控制 `pattern` 本身定位的方式，默认是 `objectBoundingBox`，即采用相对定位进行处理。

`patternContentUnits` 控制 `pattern`内部元素的定位方式，默认是`userSpaceOnUse`, 即采用绝对定位的方式。

```html
<!-- 都采用相对定位，pattern和内部的元素尺寸会随着 fill(#Pattern)的尺寸动态变化 -->
<pattern id="Pattern" width=".25" height=".25" patternContentUnits="objectBoundingBox">
   <rect x="0" y="0" width=".25" height=".25" fill="skyblue"/>
   <rect x="0" y="0" width=".125" height=".125" fill="url(#Gradient2)"/>
   <circle cx=".125" cy=".125" r=".1" fill="url(#Gradient1)" fill-opacity="0.5"/>
 </pattern>

<!-- 都采用绝对定位，pattern和内部的元素大小保持不变-->
 <pattern id="Pattern" x="10" y="10" width="50" height="50" patternUnits="userSpaceOnUse">
   <rect x="0" y="0" width="50" height="50" fill="skyblue"/>
   <rect x="0" y="0" width="25" height="25" fill="url(#Gradient2)"/>
   <circle cx="25" cy="25" r="20" fill="url(#Gradient1)" fill-opacity="0.5"/>
 </pattern>
```

两种方式各有千秋，但是当相对定位比例过小时，在某些浏览器会有bug()。

## 文本

SVG 中，文本分为两类：普通的在图片中显示文字；像 iconfront 那样的 SVG fonts

#### 将文字嵌入图片中

##### `<text>`

`<text x="10" y="10">Hello World</text>`

`x`和`y`描述 文字显示的位置

`text-anchor`：文本指向，可以是`start`、`end`、`middle`、`inherit`表示`x,y`点相对于文本的位置，默认为`start`，表明是从`x,y`开始绘制文本

`<text x="100" y="100" text-anchor="start" > This is Hello World  </text>`

![image-20210409141206123](http://img.massivejohn.com/image-20210409141206123.png)

 `dominant-baseline`：表示垂直对齐方向（类似 css 中的 `vertical-align`）

##### `<tspan>` 

放在 `<text>` 和 `<tspan>`之中，用于内嵌文本

```html
<text>
  This is <tspan font-weight="bold" fill="red">bold and red</tspan>
</text>
```

`x,y` ：`tspan`中的绝对定位,会覆盖默认的位置

`dx,dy`：`tspan`中文本相较于原位置进行偏移，类似相对于默认位置的相对定位

`rotate`：文本中的每个字符 旋转某个角度

`textLength`；当渲染器计算文本长度失真时，手动设置文本长度

##### `<textPath>`

元素通过`xlink:href`引入外部的`path`来处理文本

```html
<path id="my_path" d="M 20,20 C 80,60 100,40 120,20" fill="transparent" />
<text>
  <textPath xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#my_path">
    A curve.
  </textPath>
</text>
```

## 基本转换

### 平移与旋转

`transform="translate(30,40)"`

`transform="rotate(45)"`

联合转换使用**空格**隔离，不能使用逗号

`transform="translate(30,40) rotate(45)"`  

### 放大

`transform = "scale(2)"`

### 在SVG中嵌入SVG

SVG 内部可以嵌套 SVG元素，可以在 SVG 设置 `viewBox`属性，只展示SVG图像的一部分。

`viewBox=x, y, width and height` 指定`viewBox`定义的图形填充外部容器元素，即将内部 SVG 中设定范围的图形放大至外部 SVG 的大小

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100">
  <svg width="100" height="100" viewBox="0 0 50 50">
    <rect width="50" height="50" />
  </svg>
</svg>
```

`viweBox`内部的渲染方式受[`preserveAspectRatio`]([preserveAspectRatio - SVG: Scalable Vector Graphics | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio))影响

## 裁剪与遮罩

### 裁剪

`<clipPath>` ：定义裁剪显示的范围，可以在 `<defs>`中定义设置id，在基本元素中通过`clip-path="url(#id)"`设置

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
  <defs>
    <clipPath id="cut-off-bottom">
      <rect x='100' y='0' width="100" height="100" />
    </clipPath>
  </defs>
  <!-- 只会显示右上角的四分之一圆 -->
  <circle cx="100" cy="100" r="100" clip-path="url(#cut-off-bottom)" />
</svg>
```

![image-20210412170117688](http://img.massivejohn.com/image-20210412170117688.png)

### 遮罩

**`<mask>`**

通过创建一个带有 id 的遮罩层 `<mask>`设置基本图形 `mask='url(#id)'`赋予该基本图形遮罩层效果。

这和直接使用`<linearGradient>`有什么区别呢？

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
  <defs>
    <linearGradient id="Gradient">
      <stop offset="0%" stop-color="black" />
      <stop offset="100%" stop-color="white" />
    </linearGradient>
    <mask id="Mask">
      <rect width="200" height="200" x='0' y='0' fill="url(#Gradient)" />
    </mask>
  </defs>
  <rect x="0" y="0" width="200" height="200" fill="yellow" />
  <rect x="0" y="0" width="200" height="200" fill='red' mask='url(#Mask)' />
</svg>
```

![image-20210412171243507](http://img.massivejohn.com/image-20210412171243507.png)

### fill 与 stroke 的透明度

`fill`与`stroke`都具有各自的透明度设置`fill-opacity`与`stroke-opacity`

设置透明度会与背景形状颜色进行交互。并且如果设置`stroke-opacity`，由于`stroke`是按照形状两侧等比扩张的，所以``stroke`的颜色会被形状的`fill`所影响

```html
<rect x="0" y="0" width="200" height="200" fill="blue" />
<!-- stroke 外边20单位的颜色会被背景的 blue 影响，内部20单位的颜色会被球内的red影响 -->
<circle cx="100" cy="100" r="50" stroke="yellow" stroke-width="40"  stroke-opacity=".5" fill="red" />
```

![image-20210412173330783](http://img.massivejohn.com/image-20210412173330783.png)

## 在SVG中嵌入图片

**`<image>`**

SVG 中有`<image>`元素可以用来嵌入图片,可以使用SVG的masks等功能设置图片的样式

```html
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200"
  height="200">
  <image x="0" y="0" width="122" height="146"
    xlink:href="https://developer.mozilla.org/static/img/favicon144.png" />
</svg>
```

`<image>`元素允许 SVG 渲染光栅图片，例如jpg

## 滤镜

# SVG fonts





































**参考链接**

[SVG 图像入门教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2018/08/svg.html)

[引言 - SVG | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Introduction)

[Category "Svg" — Smashing Magazine](https://www.smashingmagazine.com/category/svg)

[An SVG Primer for Today's Browsers (w3.org)](https://www.w3.org/Graphics/SVG/IG/resources/svgprimer.html)

相关工具：

[Inkscape](https://inkscape.org/zh-hant/)

[未完待续...]

