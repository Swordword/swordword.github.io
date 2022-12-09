---
title: 使用MaterialUI实现暗模式与主题设置
date: 2022-09-27 14:28:10
category: category
tag: ui、NextJS、MaterialUI
cover:
description: description
---

最近想做一个有关颜色收藏的网站，打算使用materialUI来实现日间和夜间模式之间的来回切换，在此记录一下

#### 主题结合

当主题配置参数依赖另一个主题的参数。需要一步步的构建主题

```ts
import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

```





[未完待续...]