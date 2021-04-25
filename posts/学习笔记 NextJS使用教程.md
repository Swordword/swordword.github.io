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



## 路由

正如上文所说，Next.js 在`pages`文件夹下的每个文件都是一个路由，路由名称与文件目录相同

#### 动态路由

- `pages/index.js` → `/`
- `pages/blog/index.js` → `/blog`
- `pages/blog/first-post.js` → `/blog/first-post`
- `pages/dashboard/settings/username.js` → `/dashboard/settings/username`

**路由动态切片**

可以使用大括号语法定义一个切片路由

- `pages/blog/[slug].js` → `/blog/:slug` (`/blog/hello-world`)
- `pages/[username]/settings.js` → `/:username/settings` (`/foo/settings`)
- `pages/post/[...all].js` → `/post/*` (`/post/2020/id/title`)

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

#### 路由注入

使用`useRouter` hook



### 打包部署

### TypeScript集成

#### Use `GetStaticProps`

```ts
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
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

### 注意事项

#### 读取文件使用`process.cwd()`

Next.js编译代码是在一个独立的文件夹，所以不能使用`__dirname`获取文件夹目录,`process.cwd()`返回 Next.js 执行的目录

#### `getStaticPaths` 和 `getServerSideProps`不能同时使用



### 





























[未完待续...]