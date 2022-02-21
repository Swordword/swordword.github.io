---
title: 读书笔记 CSAPP:信息的表示与处理
date: 2022-02-14 23:41:26
category: category
tag:
cover:
description: description
---

#### 有符号数和无符号数的转换

对于C语言来说，处理同样字长的有符号数和无符号数之间相互转换的一般规则是：数值可能会改变，但是位模式不变。

> 例如：-12345的16位补码与53191的16位无符号码是一样的，所以将 int 类型的-12345转为 unsigned类型会是 53191

**补码转换为无符号数**
$$
对于满足 TMin_w \leq x\leq TMax_w有: \\
T2U_w(x) = \begin{cases}
x+2^w, x\ge 0 \\
x, x >0
\end{cases}
$$


[未完待续...]