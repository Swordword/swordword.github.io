---
title: CSS 动画的基本使用
date: 2021-05-21 11:41:27
category: category
tag: CSS
cover: 
description: CSS 动画可以在不借助 Javascript 的情况下做出一些简单的动画效果
---

## 背景

随着互联网的发展，网页已经不仅仅起到展示信息的作用，

CSS动画主要分为两类：过渡transition 和 动画animation。这两者也可以协同合作达到更好的效果

## CSS 过渡 transition

定义某一个属性，以及如何动态的表示其变化，浏览器会自动的绘制出响应的过渡动画

CSS提供了1个属性表示需要过渡的DOM属性，和3个表示如何过渡的属性，这4个属性完整描述一个过渡

### `transition-property`

需要设置动画的属性，如height、transform等。默认情况下表示dom的所有可过渡属性。

不是dom上所有的属性都是可过渡的(animatable)，具体参见[W3C](http://www.w3.org/TR/css3-transitions/#animatable-properties-)

### `transition-duration`

 动画持续的时间 , 单位为 s 或者 ms。比如`2s`表示动画会在2s运行完成

### `transition-delay`

动画开始前的延迟时间。可以为一个负值，比如是`-1s`的话动画的开始状态为完整动画已经运行1s时的状态。

### `transition-timing-function`

顾名思义，是一个时间函数，描述动画在duration上的每个时间的分布。默认值为`ease`, 通俗的说就是动画是怎么动的，匀速还是越来越快？

时间函数后面会具体介绍。现在每次设置一个过渡都需要些4个属性太麻烦，CSS可以快捷设置一个过渡，如果在一个class上需要添加多个过渡，可以通过 , 分隔。不能定义多个`transition`(后者会覆盖前者)

 `transition: property duration timing-function delay , property duration... `

### `transition-timing-function`详细介绍

时间函数属性有两种：贝塞尔曲线或者跃迁函数

#### 贝塞尔曲线

贝塞尔曲线的控制点由4个控制点组成，其中第一个点是(0,0)表示开始时刻,最后一个点为(1,1)表示结束时刻,中间的点，x必须位于0-1之间（表示一段贝塞尔曲线的某一时间）,y可以是任意值。

由于只需要设置中间两个点。CSS中设置贝塞尔曲线的语法是`cubic-bezier(x2,y2,x3,y3)`，可以在线配置中间两个点查看生成的[贝塞尔曲线](https://cubic-bezier.com/)。

动画在每一刻的快慢是由贝塞尔曲线的切线斜率决定的。斜率越大动画运行的就越快，反之越慢

CSS提供了几条内置的贝塞尔曲线 `linear`、`ease`、`ease-in`、`ease-out` 和 `ease-in-out`。`linear`就是匀速运动，其贝塞尔曲线为 `cubic-bezier(0,0,1,1)`

![image-20210526154934598](http://img.massivejohn.com/image-20210526154934598.png)

#### 跃迁函数（Steps）

跃迁函数可以将一段完整的动画分成一帧一帧展示，这样其实就没有所谓的动效了，暂且不表

## CSS动画 animation

transition 虽然可以实现基础的动画效果，但是我们不能具体控制具体某个时间节点的显示状态， CSS `animation `却可以做到。 CSS 动画 也可以叫做关键帧动画。因为它的实现效果基本上是由通过`@keyframes`定义的关键帧实现的

我们知道计算机上所有运动的东西其实都是由一段段连续的图片播放形成的，这些图片就叫做帧，设置关键帧使得计算机可以根我们定义的帧计算出其余的帧从而形成流畅动画



























## 参考

[CSS 动画 (javascript.info)](https://zh.javascript.info/css-animations)

[CSS动画简介 - 阮一峰的网络日志 (ruanyifeng.com)](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)

[使用 CSS 动画 - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

[掘金 (juejin.cn)](https://juejin.cn/post/6844903845470945294)

[未完待续...]