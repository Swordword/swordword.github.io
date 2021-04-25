---
title: 学习笔记 Next.JS使用教程
date: 2021-04-23 13:47:05
description: description
tag: React, Next.js
---

Next.js 是一个基于 React 的服务端渲染框架，但是它能做的显然不止于此

### 项目初始化

#### 

### 页面展示

pages 文件夹下面的每个命名组件都作为软件的一个页面存在，

#### 预渲染

##### 静态生成 Static Generation

**静态生成**是在项目打包部署时生成的页面，即打包完成后，页面内容是保持不变的。可以通过CDN进行缓存

Next.js 默认情况下，页面都是静态生成的，若只是一个单纯的不需要额外数据的页面。写法与React组件基本相同

**带有数据的静态渲染**

**页面内容由额外数据决定**

为了在打包时获取到额外数据，可以 导出一个异步函数`getStaticProps`,导出一个props对象供 React 组件使用

```js
const Index = (data) => {
  // {data.name}
}
export async function getStaticProps() {
  let data = {
    name: 'John',
  }
  return {
    props: data,
  }
}
export default Index
```

`getStaticProps(context): ReturnObject` 打包时决定 React 可以使用的 `props`,不会在浏览器端代码出现（666）,并且只能在页面组件中使用这个函数，

参数`context`由以下属性组成

* `params`：动态路由情况下每个页面的`id`值在此生成
* `preview`：判断页面是否处于预览模式。在部署之前跳过部署提前预览页面
* `previewData`：通过`setPreviewData`返回的预览数据
* `locale`：当前活动地区？
* `locales`：所有支持的地区
* `defaultLocale`：默认活动区域

返回的`ReturnObject`应该包含以下元素

* `props`：必填项，React 组件接受的props对象。

* `revalidate`：可选项，多少秒这个页面重新生成?

* `notFound`：可选bool值，使页面返回 404 状态

* `redirect`：可选项，用于跳转至另一个页面。格式如`{ destination: string, permanent: boolean}`，`destination`代表跳转的路径，`permanent`表明是否永久跳转？

  一个使用`notFound`和`redirect`的示例

  ```js
  export async function getStaticProps(context) {
    const res = await fetch(`https://.../data`)
    const data = await res.json()
    if (!data) {
      // 
      return {
        notFound: true,
      }
      //
      return {
        redirect:{
          destination: '/',
          permanent: false,
        }
      }
    }
    return {
      props: { data }
    }
  }
  ```

**页面路径由额外数据决定**

Next.js提供了之前 Gatsby 才有的动态路由，这也是我放弃 Gatsby 的原因( GraphQL 搞不懂是另一个)。

可以创建一个文件`pages/posts/[id].js`，根据传入的`id`决定展示哪个页面, 可以在`[id].js`导出一个异步方法`getStaticPaths`返回一个路径集合数组,类似`[{params:{id:1}},{params:{id:1}]`。再使用`getStaticProps(context)`中的`context.params.id`获取`id`动态生成内容

```js
// [id].js
const Post = (data) => {
  // {data.contentHtml}
}

export async function getStaticPaths(){
  return [
    {params:{id:1}},
    {params:{id:1}
  ]
}

export async function getStaticProps(context){
  const id = context?.params?.id
  const data = loadData(id)
  return {props: data}
}

export default Post;
```

`getStaticPaths: ReturnObject`：打包前获取所有的动态路径

`ReturnObject` 包含属性

* `paths`：必填项，路径数组 `[{params:{id:'1'}},{params:{id:"2"}}]`

  `params`必须与 pages 文件夹 中的文件名称对应

  * 如果 page 文件名称是`pages/posts/[postId]/[commentId]`，`params`必须含有`postId`与`commentId`
  * 如果使用类数组路由, page 文件名称是`pages/posts/[...slug]`，`params`必须包含一个`slug`的数组
  * 如果使用可选类数组路由，可以使用 `null`, `[]`, `undefined` 或 `false` 渲染根路由。例如，对于`pages/[[...slug]]`,如果`slug: false`,会渲染/页面

* `fallback`必填项，访问路径不存在时的处理情况

  * `fallback: false`：如果当前访问路径不在`paths`对象中,访问404页面。每次添加新页面时，都需要重新打包
  * `fallback: true`：访问路径不在`paths`中不会导致404，Next.js 前端会创建一个`fallback`版本以供使用，在后端重新走一遍`getStaticPaths`，重新创建一个对应访问路径页面，并放到预渲染`paths`对象中以供以后使用
  * `fallback:blocking`：访问路径不在`paths`中不会导致404，Next.js 会通过服务端渲染

* Fallback pages

  在`fallback`版本时，`page`的`props`为空,如果使用`next/router`,`router.isFallback`是`true`

  ```js
  const Post = ({ data }) => {
    const router = useRouter()
    if (router.isFallback) {
      return <div>Loading...</div>
    }
    return <div>{data}page</div>
  }
  export async function getStaticPaths() {
    return {
      paths: [
        {
          params: {
            id: '1',
          },
        },
      ],
      fallback: true,
    }
  }
  export async function getStaticProps(context) {
    const id = context.params.id
    return {
      props: {
        data: id,
      },
      revalidate: true,
    }
  }
  export default Post
  ```

##### 服务端渲染 Server-side Rendering

**服务端渲染**在每个请求都会根据内容重新生成页面

类似`getStaticProps`,可以使用`getServerSideProps`返回一个props对象,在每次请求时都会走一遍这个函数并重新生成页面

```js
const Index = (data) => {
  // {data.name}
}
export async function getServerSideProps() {
  let data = {
    name: 'John',
  }
  return {
    props: data,
  }
}
export default Index
```

`getServerSideProps(context):ReturnObject`：用于服务端渲染的异步函数，返回一个props对象供 React 组件使用。同样的，不会在浏览器端代码出现该函数,并且只能在页面组件中使用这个函数，

```js
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
```

`context`：包含以下属性

* `params`：同`getStaticProps`
* `req`：请求对象
* `res`：响应对象
* `query`：query string 的对象
* `preview`：同`getStaticProps`
* `previewData`：同`getStaticProps`
* `resolvedUrl`：请求URL的规范化版本
* `locale`：同`getStaticProps`
* `locales`：同`getStaticProps`
* `defaultLocale`：同`getStaticProps`

ReturnObject包含以下属性：

* `props`：同`getStaticProps`
* `notFound`：同`getStaticProps`
* `redirect`：同`getStaticProps`

##### 增量静态生成 Incremental Static Regeneration ?

感觉像动态部署，部署时不会导致服务切断。返回时添加一个`revalidate: second`表明在几秒之后重新部署

### 样式集成

#### 全局样式

创建文件`pages/_app.js`，在该文件中的样式会在所有页面和组件中生效

```jsx
// _app.js
import '../styles.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

#### 范围样式

Next.js 支持[CSS Modules](https://github.com/css-modules/css-modules) 为每个组件赋予独立的样式。命名为`[name].module.css`。会在每个`class`后添加一个 Hash 值

#### Sass 支持

`npm install sass`即可在项目中使用 sass 或 scss

**自定义 Sass 配置**

可以通过在`next.config.js`中的`sassOptions`对 sass 进行配置

```js
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
```

#### CSS-in-JS

基本上和create-react-app一样，Next.js 内置了[styled-jsx](https://github.com/vercel/styled-jsx)。实现[styled-component]([styled-components](https://styled-components.com/))和[emotion](https://emotion.sh/docs/introduction)的效果

### 图形组件与优化

Next.js 提供了与Gatsby一样优化很棒的图像组件`next/image`，`Image`支持常见的懒加载，resize，以现代格式显示图片等功能。

#### 配置

可以在`next.config.js`配置images获得最优化的效果

**支持外部网站**

加载一个外部网站托管的图片，在`next.config.js`中配置`images`的`domains`字段

**自定义加载器**

Next.js  可以自定义自己的图形加载器，通过配置`images`的`loader`字段

**缓存**

Next.js 默认会将访问过的图片缓存至`<distDir>/cache/images`文件夹。缓存时间有服务端的`Cache-Control`字段控制：`s-maxage||max-age||60s`

```js
module.exports = {
  images: {
    // 外部域名
    domains: ['example.com'],
    // 自定义加载器
   	loader: 'imgix',
    path: 'https://example.com/myaccount/',
  },
}
```

### 静态文件托管

`public`文件夹下的文件会作为 Next.js 的静态文件夹。可以通过URL`/`进行访问

## 路由

正如上文所说，Next.js 在`pages`文件夹下的每个文件都是一个路由，路由名称与文件目录相同

#### 路由规则

- `pages/index.js` → `/`
- `pages/blog/index.js` → `/blog`
- `pages/blog/first-post.js` → `/blog/first-post`
- `pages/dashboard/settings/username.js` → `/dashboard/settings/username`

**路由动态切片**

可以使用大括号语法定义一个切片路由

- `pages/blog/[slug].js` → `/blog/:slug` (`/blog/hello-world`)
- `pages/[username]/settings.js` → `/:username/settings` (`/foo/settings`)
- `pages/post/[...all].js` → `/post/*` (`/post/2020/id/title`)

### 动态路由

在一些app中，比如博客系统，路由的路径很难预先定义，可以在pages文件夹下设置方括号定义动态路由，例如`pages/post/[id].js`, 会匹配任何类似`/post/1`,`/post/a`的路由

```jsx
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Post: {pid}</p>
}

export default Post
```

#### 路由跳转

通过`next/link`的`Link`组件,允许浏览器端跳转页面

```jsx
import Link from 'next/link'
function Home() {
  return (
    <>
      <Link href="/home">
        <a>Home</a>
      </Link>
    	<Link href={`/blog/${encodeURIComponent(post.slug)}`}>
        <a>{post.title}</a>
			</Link>
    // href 对象,pathname表明文件所在路径 
      <Link
        href={{
          pathname: '/blog/[slug]',
          query: { slug: post.slug },
        }}
      >
        <a>{post.title}</a>
      </Link>
    </>
  )
}
```

#### 捕获所有路由

可以在方括号中添加拓展运算符`...`捕获所有路由

`pages/post/[...slug].js`匹配`/post/a`,`/post/a/b`。这种情况下, `router.query`的`slug`会是一个数组`['a','b']`

**Optional 捕获所有路由**

`pages`文件夹名称是双括号包裹的话，可以匹配根路由。`pages/post/[[...slug]].js`可以匹配`/post`,`/post/a`,`/post/a/b`

#### 路由注入

使用`useRouter` hook进行路由注入,命令式的跳转路由

```jsx
// post/aa&name=bb
import { useRouter } from 'next/router'
const router = useRouter()
const { pid } = router.query	// {pid:'aa', name:'bb'}
<span onClick={() => router.push('/about')}>Click here to read more</span>
```

#### 浅层路由

浅层路由允许你在不加载具体页面内容的前提下，修改路由。不知道有啥用

```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
const router = useRouter()
useEffect(() => {
   router.push('/?counter=10', undefined, { shallow: true })
}, [])
```

### 打包部署

### TypeScript集成

创建`tsconfig.json`，`yarn add --dev typescript @types/react @types/node`即可在 Next.js 中使用 typescript

#### 常见的渲染方法

```ts
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
  // ...
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
}
```

如果想要在 React 组件中的 props引用类型，可以使用`InferGetStaticPropsType<typeof getStaticProps>`

```tsx
import { InferGetStaticPropsType } from 'next'

type Post = {
  author: string
  content: string
}

export const getStaticProps = async () => {
  const res = await fetch('https://.../posts')
  const posts: Post[] = await res.json()

  return {
    props: {
      posts,
    },
  }
}

function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  // will resolve posts to type Post[]
}

export default Blog
```

#### API 路由

在`pages/api`中可以自定义一些接口

```ts
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' })
}
```

#### Custom `App`

比如在`_app.tsx`中自定义 App 组件

```tsx
// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp
```

### 环境变量

可以在项目根目录添加`.env/*`配置环境变量,其中`.env`和`.env.local`会作为默认配置，`.env.development`会作为开发环境的变量, `.env.production`会作为生产环境的变量设置

环境变量中的变量可以通过`$`访问之前的变量

环境变量只能被`node`环境使用,如果想在浏览器端使用环境变量，需要在变量名前添加`NEXT_PUBLIC_`前缀

```bash
# .env
HOSTNAME=localhost
PORT=8080
HOST=http://$HOSTNAME:$PORT
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

### API 路由

`pages/api/*`中的文件会作为 api 接口而不是作为页面使用

```js
// pages/api/hello
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
```

访问`/api/hello`会返回一个 json 字符串

API 路由也支持像 `pages`那样的动态路由

#### API 中间件

目前没有在 Next 中使用过

### 高级特性



### 注意事项

#### 读取文件使用`process.cwd()`

Next.js编译代码是在一个独立的文件夹，所以不能使用`__dirname`获取文件夹目录,`process.cwd()`返回 Next.js 执行的目录

#### `getStaticPaths` 和 `getServerSideProps`不能同时使用



### 





























[未完待续...]