---
title: NodeJS 使用ffmpeg放大视频
date: 2021-04-12 13:43:19
description: description
tag: NodeJS
---

#### 问题

最近接到一个需求，将几百个不到1mb的视频扩充到20m以上

#### 处理

视频处理只听说过[ffmpeg]([FFmpeg](http://www.ffmpeg.org/)),自然就使用了node包 [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) 

`const ffmpeg = require('fluent-ffmpeg')`

首先想到的是修改视频的分辨率，之前的分辨率一直是 640, 但是通过一番查找发现视频的尺寸其实与分辨率并没有太大的关系。

码率：数据传输时单位时间传送的数据位数，单位是 kbps 或 mbps

**视频尺寸 = 码率 * 时长 / 8**

视频的时长自然没法改变，所以可以通过添加视频的码率增加视频尺寸

通过 ffmpeg 的 ffprobe 查询当前视频的码率是多少

```js
ffmpeg.ffprobe(filePath, (err, data) => {
      console.log('data', data.format.bit_rate,data.format.size)
    })
```

![image-20210412162835650](http://img.massivejohn.com/image-20210412162835650.png)

可以得到一个测试视频的码率是 485935，大小大概 570k

因为按照比例将码率扩大40倍，`ffmpeg(filePath).videoBitrate(40 * originBitrate)`发现视频尺寸并没有到达 20mb 以上。。。

又将码率从 2 开始慢慢增加，发现当码率增加到一定的倍数后，视频尺寸与码率就不在按照正比例增加了。可能是因为视频的分辨率限制了码率的最大值，分辨率就只有640，码率增加过大也没有任何意义了。也可能 ffmpeg 内部对码率与分辨率做了限制。

那就去修改分辨率吧，将分辨率设置为 1920 在将码率设置为 20 mbps，这样只要视频的长度大于 8

s 时视频的尺寸就超过了20m

```js
     ffmpeg(filePath)
        .videoBitrate('20000k')
        .size(`1920x?`)
        .save(`${dir}/${name}copy.mp4`)
        .on('end', () => {
          resolve()
        })
        .on('error', (err) => {
          console.log('err', err)
          reject('error')
        })
```

当然，最终也没有用到 ffprobe 读取的视频信息。

查找过程中找了一些别的信息值得记录一下：

分辨率：每一帧图像的大小，不同的分辨率要采用不同的位率

帧率：FPS(Frames PerSecond) 每秒钟播放图片的帧数

波特率：每秒传送的比特(bit)数，和码率看起来是一个东西。

#### 结论

视频尺寸是由码率和视频时长决定了，而码率的最大值是受视频的分辨率影响（或者只是在ffmpeg之中）

