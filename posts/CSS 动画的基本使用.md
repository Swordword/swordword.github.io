---
title: CSS 动画的基本使用
date: 2021-05-21 11:41:27
category: category
tag: CSS
cover: 
description: CSS 动画可以在不借助 Javascript 的情况下做出一些简单的动画效果
---

## 背景

随着互联网的发展，网页已经不仅仅起到展示信息的作用，更可以带给观众愉悦感

CSS动画主要分为两类：过渡transition 和 动画animation。这两者也可以协同合作达到更好的效果

## CSS 过渡 transition

定义某一个属性，以及如何动态的表示其变化，浏览器会自动的绘制出响应的过渡动画

CSS提供了1个属性表示需要过渡的DOM属性，和3个表示如何过渡的属性，这4个属性完整描述一个过渡。

每次设置一个过渡都需要些4个属性太麻烦，CSS可以快捷设置一个过渡，如果在一个class上需要添加多个过渡，可以通过 , 分隔。不能定义多个`transition`(后者会覆盖前者)

 `transition: property duration timing-function delay , property duration... `

### `transition-property`

需要设置动画的属性，如height、transform等。默认情况下表示dom的所有可过渡属性。

不是dom上所有的属性都是可过渡的(animatable)，具体参见[W3C](http://www.w3.org/TR/css3-transitions/#animatable-properties-)

### `transition-duration`

 动画持续的时间 , 单位为 s 或者 ms。比如`2s`表示动画会在2s运行完成

### `transition-delay`

动画开始前的延迟时间。可以为一个负值，比如是`-1s`的话动画的开始状态为完整动画已经运行1s时的状态。

### `transition-timing-function`

顾名思义，是一个时间函数，描述动画在duration上的每个时间的分布。默认值为`ease`, 通俗的说就是动画是怎么动的，匀速还是越来越快？

#### `timing-function`属性

时间函数属性有两种：贝塞尔曲线或者跃迁函数

##### 贝塞尔曲线

贝塞尔曲线的控制点由4个控制点组成，其中第一个点是(0,0)表示开始时刻,最后一个点为(1,1)表示结束时刻,中间的点，x必须位于0-1之间（表示一段贝塞尔曲线的某一时间）,y可以是任意值。

由于只需要设置中间两个点。CSS中设置贝塞尔曲线的语法是`cubic-bezier(x2,y2,x3,y3)`，可以在线配置中间两个点查看生成的[贝塞尔曲线](https://cubic-bezier.com/)。

动画在每一刻的快慢是由贝塞尔曲线的切线斜率决定的。斜率越大动画运行的就越快，反之越慢

CSS提供了几条内置的贝塞尔曲线 `linear`、`ease`、`ease-in`、`ease-out` 和 `ease-in-out`。`linear`就是匀速运动，其贝塞尔曲线为 `cubic-bezier(0,0,1,1)`

![image-20210526154934598](http://img.massivejohn.com/image-20210526154934598.png)

##### 跃迁函数（Steps）

跃迁函数可以将一段完整的动画分成一帧一帧展示，是一种自己实现动画的方式。暂且不表

### transition events

#### transitionend

CSS transition 结束时会触发该事件

## CSS动画 animation

transition 虽然可以实现基础的动画效果，但是我们不能具体控制具体某个时间节点的显示状态， CSS `animation `却可以做到。 CSS 动画 也可以叫做关键帧动画。因为它的实现效果基本上是由关键帧实现的。

我们知道计算机上所有运动的东西其实都是由一段段连续的图片播放形成的，这些图片就叫做帧，设置关键帧使得计算机可以根我们定义的帧计算出其余的帧从而形成流畅动画

CSS可以通过`@keyframes`定义关键帧

```css
@keyframes rotateFrames{  
  from{    
    transform: rotate(0deg);  
  }  
  to{    
    transform: rotate(360deg);  
  }
}
```

CSS animation 的属性比 transition更多，有8个属性。也可以简写为一行CSS

`animation: name duration timing-function delay iteration-count direction fill-mode;`

其中，`animation-duration`、`animation-delay`、`animation-timing-function`

与 `transition`属性相同

### `animation-name`

关键帧的名称, 比如上面代码中的`rotateFrame`

### `animation-iteration-count`

动画的播放次数，默认是1，设置为 `infinite` 表示无限循环播放

### `animation-direction`

指定动画播放的方向，默认是`normal`：每个动画结束，动画重置到起点

`reverse`: 反转播放，从100% 到 0%

`alternate`: 正反转轮流播放，奇数次为 0% 到 100%，偶数次为 100% 到 0%；

`alternate-reverse`: 与`alternate`相反

### `animation-fill-mode`

指定动画填充模式，描述动画开始或结束时，元素处于什么状态。默认是`none`

*  `none` : 默认行为
* `forwards`: 动画完成后，保持关键帧中最后一帧的状态 
* `backwards`: 在`animation-delay`指定动画延迟的一段时间内，元素保持为第一帧中的状态（也就是第一帧中所定义的状态）
* `both`: 上面两种模式都被应用

`both`和`forwards`的区别主要是当`animation-delay`存在时，动画未开始时元素的位置，`both`时元素的位置处于关键帧的第一帧，`forwards`元素的位置属于CSS起始位置

```css
@keyframes move {
  from {
    transform: translateX(50px);
  }
  to {
    transform: translateX(150px);
  }
}
.ball-1,
.ball-2,
.ball-3 {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  animation-name: move;
  animation-duration: 2s;
  animation-delay: 1s;
}

.ball-1 {
  background-color: red;
  animation-fill-mode: both;
}

.ball-2 {
  background-color: yellow;
  animation-fill-mode: forwards;
}

.ball-3 {
  background-color: blue;
  animation-fill-mode: backwards;
}

```

![demo](http://img.massivejohn.com/demo.gif)

### `animation-play-state`

指定动画播放状态，正在运行还是暂停, 默认是running

### animation Events

#### `animationstart`

动画开始时触发此事件

#### `animationend`

动画结束时触发事件

#### `animationiteration`

当一个动画循环结束，另一个动画事件开始时触发，不会和`animationstart`与`animationend`重叠。如果 `iteration-count`为1的话不触发此事件



## 参考

[CSS 动画 (javascript.info)](https://zh.javascript.info/css-animations)

[CSS动画简介 - 阮一峰的网络日志 (ruanyifeng.com)](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)

[使用 CSS 动画 - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

[掘金 (juejin.cn)](https://juejin.cn/post/6844903845470945294)