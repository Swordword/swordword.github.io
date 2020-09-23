---
title: 使用plop生成博客
date: 2020-06-28 7:21:32
description: 使用plop自动生成博客模板
tag: 工作流、JavaScript
---

[plop](https://github.com/amwmedia/plop)是一个可以自定义生成格式化文件的js库，本文使用它作为对gatsby博客的补充，可以自动生成md博客

* 安装plop `yarn add plop`

* 项目根目录新建`plopfile.js`

  plop 是一个node包，module.exports 公开了包含`setGenerator(name，config)`函数的plop api对象
  
  ```js
  // const blogGenerator = require('./plop-template/prompt')
  module.exports = function (plop) {
      // controller generator
      plop.setGenerator('blog', {
          description: "generate new blog",
          prompts: [
              {
                  type: 'input',
                  name: 'name',
                  message: 'blog title please'
              }
          ],
          actions: data => {
              const name = '{{name}}'
              const actions = [
                  {
                      type: 'add',
                      path: `content/blog/${name}/index.md`,
                      templateFile: './plop-blog.hbs',
                      data: {
                          name: name,
                          date: new Date()
                      }
                  }
              ]
              return actions
          }
      });
  };
  ```
  
* 在当前目录生成一个模板文件`plop-blog.hbs`

  ```markdown
  ---
  title: {{ name}}
  date: {{ date}}
  description: 'description'
  tag: 
  ---
  ```

* 在package.json中添加对应脚本`"new":"plop blog"
`npm run new bolg title` plop 会默认生成标题

