---
title: 使用webpack打包构建electron客户端
date: 2021-01-19 16:42:36
category: 软件开发
tag: electron,webpack,typescript,react
cover: 
description: 使用webpack构建打包electron客户端，渲染进程使用React和Typescript
---

### 前导

使用`electron` 可以方便打包跨平台的客户端软件，但是如何将前端工程化的优势与electron联系起来呢？

[github electron-webpack-react-ts](https://github.com/Swordword/electron-webpack-react-ts)

### 目录结构

创建空文件夹作为根目录，在根目录创建文件夹 app 和 .cli_build, 并在 app 中创建 main 和 renderer 文件夹分别存放 electron 主进程和渲染进程的代码, 文件夹 .cli_build 用于存放打包配置文件

## 脚手架搭建

初始化项目`npm init -y` 或者`yarn init -y`，这里使用`yarn`

安装依赖项：注意，这里的 webpack 版本为5，

`yarn add webpack webpack-cli electron html-webpack-plugin webpack-dev-server  --dev`

### 打包 main 主进程

app/main 文件夹下创建 index.js 作为 main 进程文件

```js
// 目录：app/main/index.js

import { app, BrowserWindow, Menu } from 'electron'

let mainWindow

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  })

  const isDev = process.env.NODE_ENV === 'development'

  const winURL = isDev
  	//	待会渲染进程打包时运行的端口
    ? `http://localhost:8765`
    : `file://${__dirname}/index.html`

  mainWindow.loadURL(winURL)
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
}
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
app.on('ready', createWindow)
```

`.cli_build`文件夹下创建`webpack.main.js`用于打包主进程文件。

```js
// 目录：.cli_build/webpack.main.js
// Native
const path = require('path')

const WebpackMainConfig = {
  mode: 'development',
  // mode: 'production',
  entry: {
    main: path.resolve(process.cwd(), 'app/main/index.js'),
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'main.js',
  },
  target: 'electron-main',
}

module.exports = WebpackMainConfig

```

`package.json` 添加 `script`：`"main": "webpack --config ./.cli_build/webpack.main.js"`

执行 `yarn main` 会在`dist`文件夹下打包出一个`main.js`文件, 供之后使用

### 打包 renderer 渲染进程

类似的，在`app/renderer`文件夹下创建`index.js`和`index.html`作为渲染窗口

```html
<!-- 目录：app/renderer/index.js -->
console.log('hello world')
<!-- 目录：app/renderer/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Electron</title>
  </head>
  <body>
    <p>Hello World</p>
  </body>
</html>
```

在`.cli_build`文件夹创建`webpack.renderer.js`对渲染进程进行打包

```js
// Native
const path = require('path')
// Package
const htmlWebpackPlugin = require('html-webpack-plugin')

const WebpackMainConfig = {
  mode: 'development',
  // mode: 'production',
  entry: {
    main: path.resolve(process.cwd(), 'app/renderer/index.js'),
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[hash:name].js',
  },
  devServer: {
    contentBase: path.resolve(process.cwd(), 'dist'),
    compress: true,
    port: 8765,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'app/renderer/index.html'),
    }),
  ],
}

module.exports = WebpackMainConfig

```

`package.json` 添加 `script`：`"renderer": "webpack serve --config ./.cli_build/webpack.renderer.js"`和 `"start":"electron ./dist/main.js"`

执行`yarn renderer`并新建控制台执行`yarn strat`可以看到运行出来的demo

<img src="http://img.massivejohn.com/electron1.png" alt="electron1" style="zoom:20%;" />

但是每次都得开两个控制台运行三次脚本，实在不方便。可以将其做到一个脚本文件中执行。

在 `.cli_build`文件夹下创建`dev.js`，通过 Node 打包主进程与渲染进程并启动 electron

```js
// 目录：.cli_build/dev.js
// Native
const path = require('path')
const { spawn } = require('child_process')

// Package
const electron = require('electron')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const mainConfig = require('./webpack.main')
const rendererConfig = require('./webpack.renderer')

const env = process.env.NODE_ENV
console.log('env', env)

/**
 * main function
 *
 */
function main() {
  buildRenderer()
  buildMain().then(() => {
    launch()
  })
}

/**
 * build main process
 */
function buildMain() {
  console.log('fn buildMain')
  return new Promise((resolve) => {
    mainConfig.mode = 'development'
    const compiler = Webpack(mainConfig)
    compiler.close(() => {
      console.log('buildMain resolve')
      resolve()
    })
    compiler.watch({}, (err, stats) => {
      if (err) {
        console.error(err)
        return
      }
    })
  })
}

/**
 * build renderer process
 */
function buildRenderer() {
  console.log('fn buildRenderer')
  rendererConfig.mode = 'development'
  const compiler = Webpack(rendererConfig)
  const devServerOptions = Object.assign({}, rendererConfig.devServer, {
    contentBase: path.resolve(__dirname, '../dist'),
    // open: true,
  })
  const server = new WebpackDevServer(compiler, devServerOptions)
  server.listen(8765, () => {
    console.log('Starting server on http://localhost:8765')
  })
}

function launch() {
  const args = [path.resolve(process.cwd(), 'dist/main.js')]
  let mainProcess = spawn(electron, args)
  mainProcess.on('close', () => {
    // exit console
    process.exit()
  })
}

main()

```

`package.json` 添加 `script`：`"dev": "node .cli_build/dev.js`，控制台执行`yarn dev`

## 使用 React 和 Typescript

我们的`renderer`文件夹目前只是一个空落落的`hello world`，接下来将其替换为 React+Typescript示例

### 安装所需依赖

`yarn add react react-dom @types/react @types/react-dom typescript ts-loader --dev`

### 升级主进程

 `app/main/index.js`=>`app/main/index.ts`

```typescript
// 目录：app/main/index.ts
// 添加一个类型说明就行
let mainWindow: BrowserWindow
```

为`webpack.main.js`添加处理typescript文件的`module`

```js
// 目录 .cli_build/webpack.main.js
entry: {
    main: path.resolve(process.cwd(), 'app/main/index.ts'),
  },
output:...
module: {
    rules: [
      {
        test: /\/tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
plugins:[...]
```

在项目根目录创建`tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "sourceMap": true,
    "target": "ES5",
    "module": "CommonJS",
    "outDir": "./dist/ ",
    // 设置jsx支持，待会渲染进程会使用到
    "jsx": "react",
    // 允许使用 import React from "react";
    "allowSyntheticDefaultImports": true,
    // any类型警告
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    // 阻止 const enum 语法，babel 好像解析不了？
    "preserveConstEnums": true,
    "removeComments": true
  },
  "exclude": ["node_modules"]
}
```

### 升级渲染进程

修改`renderer/index.js`为`renderer/index.tsx`

```tsx
// 目录 app/renderer/index.tsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'

const App = () => {
  return (
    <div>
      Hello World1122
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
```

`renderer/index.html`添加一个`<div id='app' />`以供挂载

更新 `.cli_build/webpack.renderer.js`

```json
  entry: {
    main: path.resolve(__dirname, '../app/renderer/index.tsx'),
  },
  module: {
    // 如果觉得和webpack.main.js重复的话，可以使用 webpack-merge 合并一下
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // webpack5 静态资源新的处理方法
       {
        test: /\.(png|jpg|jpeg)$/,
        type: 'asset/resource',
      },
    ],
  },
	plugins: [...],
	resolve: {
		// 支持无后缀引入ts文件 
    extensions: ['.ts', '.tsx', '.js'],
		// 路径别名
    // alias: {
    //   '@': path.resolve(__dirname, '../src/renderer/'),
    // },
  },

```

重新执行`yarn dev`,依然显示打包成功，剩下的单元测试，样式loader等配置就跟普通的React项目一样了

### 打包部署

使用 electron-builder 进行打包

`yarn add electron-builder --dev` 

> tips：如果在安装 electron 和 electron-builder 失败或者龟速，可以尝试使用淘宝镜像，在 baserc 或者 zshrc中添加
>
> export ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
>
> export ELECTRON_BUILDER_BINARIES_MIRROR=https://npm.taobao.org/mirrors/electron-builder-binaries/
>
> 再进行安装

在 .cli_build 文件夹中创建 build.js 打包两个进程

```js
const Webpack = require('webpack')

const mainConfig = require('./webpack.main')
const rendererConfig = require('./webpack.renderer')

const env = 'production'

function main() {
  console.log('fn main')
  Promise.all([buildMain(), buildRenderer()]).then(() => {
    buildApp()
  })
}

function buildMain() {
  console.log('fn buildMain')
  mainConfig.mode = env
  return new Promise((resolve) => {
    const compiler = Webpack(mainConfig)
    compiler.watch({}, (err) => {
      if (err) {
        console.error(err)
        return
      }
      resolve()
    })
  })
}
function buildRenderer() {
  console.log('fn buildRenderer')
  rendererConfig.mode = env
  return new Promise((resolve) => {
    const compiler = Webpack(rendererConfig)
    compiler.watch({}, (err) => {
      if (err) {
        console.error(err)
        return
      }
      resolve()
    })
  })
}
function buildApp() {
  console.log('starting build your app')
  process.exit()
}

main()

```

`package.json` 添加 `script`：`"build": "node ./.cli_build/build.js && electron-builder"` 

并添加用于 electron-builder 打包的配置

```json
"scripts": {
    "dev": "node ./.cli_build/dev.js",
    "build": "node ./.cli_build/build.js && electron-builder",
  	// 在mac中 打包windows项目
    "build:windows": "node ./.cli_build/build.js && electron-builder --win --x64"
  },
  "build": {
    "productName": "Your App Name",
    "appId": "com.example.yourapp",
    "directories": {
      "output": "build"
    },
    "files": [
      "dist/**/*"
    ],
    "dmg": {
      "contents": [
        {
          "x": 410,
          "y": 150,
          "type": "link",
          "path": "/Applications"
        },
        {
          "x": 130,
          "y": 150,
          "type": "file"
        }
      ]
    },
    // 可以在根目录添加 static 文件夹，里面放置各个端的icon
    "mac": {
      "icon": "static/icon.icns"
    },
    "win": {
      "icon": "static/icon.ico"
    },
    "linux": {
      "icon": "static/icons"
    }
  },
```

运行 `yarn build`会在`build`文件夹中查看打包后的软件











