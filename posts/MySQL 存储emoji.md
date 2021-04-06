---
title: MySQL 存储emoji
date: 2021-03-04 20:40:51
description: description
tag: mysql
---

mysql存储字符串时，如果字符串还有emoji，会存储失败，这是在保存之前要将emoji转码然后在api请求获取数据时重新解码返回带emoji的字符

```js
// 表情转码
function utf16toEntities(str) {
  const patt = /[\ud800-\udbff][\udc00-\udfff]/g // 检测utf16字符正则
  str = str.replace(patt, (char) => {
    let H
    let L
    let code
    let s

    if (char.length === 2) {
      H = char.charCodeAt(0) // 取出高位
      L = char.charCodeAt(1) // 取出低位
      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00 // 转换算法
      s = `&#${code};`
    } else {
      s = char
    }

    return s
  })

  return str
}
// 表情解码
function entitiestoUtf16(strObj) {
  const patt = /&#\d+;/g
  const arr = strObj.match(patt) || []

  let H
  let L
  let code

  for (let i = 0; i < arr.length; i += 1) {
    code = arr[i]
    code = code.replace('&#', '').replace(';', '')
    // 高位
    H = Math.floor((code - 0x10000) / 0x400) + 0xD800
    // 低位
    L = ((code - 0x10000) % 0x400) + 0xDC00
    code = `&#${code};`
    const s = String.fromCharCode(H, L)
    strObj = strObj.replace(code, s)
  }
  return strObj
}
```

