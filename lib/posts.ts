import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {unified} from 'unified'
import slug from 'remark-slug'
import toc from 'remark-toc'
import markdown from 'remark-parse'
import headings from 'remark-autolink-headings'
import html from 'remark-html'
import guide from 'remark-preset-lint-markdown-style-guide'
import highlight from 'remark-highlight.js'

/** post 所在文件夹 */
const postsDirectory = path.join(process.cwd(), 'posts')

interface IPostData {
  date: string
  title: string
  description: string
  tag: string
  category: string
  cover: string
}

// 格式化gray-matter数据
const dateStripped = (obj: { [s: string]: any }): { data?: any } => {
  const newObj: { [s: string]: any } = {}
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    if (value !== null) {
      // If array, loop...
      if (Array.isArray(value)) {
        value = value.map((item) => dateStripped(item))
        // eslint-disable-next-line brace-style
      }
      // ...if property is date/time, stringify/parse...
      else if (
        typeof value === 'object'
        && typeof value.getMonth === 'function'
      ) {
        value = JSON.parse(JSON.stringify(value))
        // eslint-disable-next-line brace-style
      }
      // ...and if a deep object, loop.
      else if (typeof value === 'object') {
        value = dateStripped(value)
      }
    }
    newObj[key] = value
  })
  return newObj
}

/**
 * @description 过滤写完的blog
 * @returns
 */
const getFinishedFiles = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  // const unfinishedTag = '[未完待续...]'
  // return fileNames.filter((fileName) => {
  //   const filePath = path.resolve(postsDirectory, fileName)
  //   const content = fs.readFileSync(filePath, 'utf-8')
  //   return !content.trim().endsWith(unfinishedTag)
  // })
  return fileNames
}

// index page blog 列表
export function getSortedPostsData() {
  const finishFileNames = getFinishedFiles()

  const allPostsData = finishFileNames.map((fileName) => {
    const id = encodeURI(fileName.replace(/\.mdx?$/, ''))
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return {
      id,
      ...(dateStripped(matterResult).data as IPostData),
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    }
    return -1
  })
}

/**
 * 返回动态路由id
 * Returns an array that looks like this:
   [
    {
      params: {
        id: 'ssg-ssr'
      }
    }
  ]
*/
export function getAllPostIds() {
  const finishFileNames = getFinishedFiles()

  return finishFileNames.map((fileName) => ({
    params: {
      id: decodeURI(fileName.replace(/\.mdx?$/, '')),
    },
  }));
}

// 获取单个博客的内容
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${decodeURI(id)}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const processedContent = unified()
    .use(markdown)
    .use(guide)
    .use(highlight)
    .use(slug)
    .use(toc)
    .use(headings)
    .use(html)
    .processSync(matterResult.content)

  const contentHtml = processedContent.toString()
  return {
    id,
    contentHtml,
    ...(dateStripped(matterResult).data as IPostData),
  }
}

/**
 * ************
 * 归档
 * ************
 */

type TSimpleBlog = {
  title: string
  id: string
  date: string
}

export type IAchive = {
  year: number
  blogList: TSimpleBlog[]
}

// 归档 数据结构整合
const unifyAchive = (
  result: IAchive[],
  date: string,
  year: number,
  id: string,
  title: string,
) => {
  const sameYear = result.find((r) => r.year === year)
  if (!sameYear) {
    const newYear = {
      year,
      blogList: [
        {
          id,
          title,
          date,
        },
      ],
    }
    result.push(newYear)
    return
  }
  sameYear.blogList.push({
    id,
    title,
    date,
  })
}

// 获取归档数据
export const getActiveData = () => {
  const finishFileNames = getFinishedFiles()
  const achiveList: IAchive[] = []
  finishFileNames.forEach((fileName) => {
    const filePath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)
    const { title } = matterResult.data
    const id = encodeURI(fileName.replace(/\.mdx?$/, ''))
    const { date } = matterResult.data
    const year = date.getFullYear()
    unifyAchive(achiveList, date, year, id, title)
  })
  // 日期排序
  achiveList.forEach((r) => {
    r.blogList.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      }
      return -1
    })
  })
  achiveList.sort((a, b) => b.year - a.year)
  const res = {
    length: finishFileNames.length,
    achiveList,
  }
  // 嵌套对象使用 getStaticProps 需要序列化
  return JSON.stringify(res)
}

/**
 * ************
 * 分类
 * ************
 */
export type ICategory = {
  cate: string
  shrink: boolean
  blogList: TSimpleBlog[]
}

export const getCategoryData = () => {
  const finishFileNames = getFinishedFiles()
  const categoryList: ICategory[] = []
  finishFileNames.forEach((fileName) => {
    const filePath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)
    const { title } = matterResult.data
    const { category } = matterResult.data
    const id = encodeURI(fileName.replace(/\.mdx?$/, ''))
    const { date } = matterResult.data
    const sameCategory = categoryList.find((c) => c.cate === category)
    if (!sameCategory) {
      categoryList.push({
        cate: category,
        shrink: false,
        blogList: [
          {
            title,
            id,
            date,
          },
        ],
      })
      return
    }
    sameCategory.blogList.push({ title, id, date })
  })
  return JSON.stringify(categoryList)
}

export const getAllPostCates = () => {
  const finishFileNames = getFinishedFiles()
  return finishFileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)
    const { category } = matterResult.data
    return {
      params: {
        cate: category || '其他分类',
      },
    }
  })
}

export const getPostListByCate = (cate: string) => {
  const cateList: IAchive[] = []
  let sum = 0
  const finishFileNames = getFinishedFiles()
  finishFileNames.forEach((fileName) => {
    const filePath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)
    const { title } = matterResult.data
    const id = encodeURI(fileName.replace(/\.mdx?$/, ''))
    const { date } = matterResult.data
    const category = matterResult.data.category || '其他分类'
    const year = date.getFullYear()
    if (category === cate) {
      unifyAchive(cateList, date, year, id, title)
      sum++
    }
  })
  // 日期排序
  cateList.forEach((r) => {
    r.blogList.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      }
      return -1
    })
  })
  cateList.sort((a, b) => b.year - a.year)
  const res = {
    length: sum,
    cateList,
  }
  // 嵌套对象使用 getStaticProps 需要序列化
  return JSON.stringify(res)
}

/**
 * ************
 * 标签
 * ************
 */
type TTag = {
  tag: string
  length: number
}

export const getTagData = () => {
  const finishFileNames = getFinishedFiles()
  const res: TTag[] = []
  finishFileNames.forEach((fileName) => {
    const filePath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)
    const tags = matterResult.data.tag
    if (!tags) return
    const tagList: string[] = tags.split(/[,|，|、]/)
    tagList.forEach((b) => {
      const foundedTag = res.find((r) => r.tag === b.toLowerCase())
      if (foundedTag) {
        foundedTag.length++
      } else {
        res.push({
          tag: b.toLowerCase(),
          length: 1,
        })
      }
    })
  })
  return res
}

export const getAllPostTags = () => {
  const finishFileNames = getFinishedFiles()
  const res: { params: { tag: string } }[] = []
  finishFileNames.forEach((fileName) => {
    const filePath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)
    const tags = matterResult.data.tag
    if (!tags) return
    const tagList: string[] = tags.split(/[,|，|、]/)
    tagList.forEach((tag) => {
      if (!res.find((r) => r.params.tag === tag.toLowerCase())) {
        res.push({
          params: {
            tag: tag.toLowerCase(),
          },
        })
      }
    })
  })
  return res
}

export const getPostListByTag = (tag: string) => {
  console.log('fn getPostListByTag', tag)
  const tagList: IAchive[] = []
  let sum = 0
  const finishFileNames = getFinishedFiles()
  finishFileNames.forEach((fileName) => {
    const filePath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)
    const { title } = matterResult.data
    const id = encodeURI(fileName.replace(/\.mdx?$/, ''))
    const { date } = matterResult.data
    const year = date.getFullYear()
    const tags = matterResult.data.tag
    if (!tags) return
    const tagStrList: string[] = tags.split(/[,|，|、]/)
    if (tagStrList.map((n) => n.toLowerCase()).includes(tag)) {
      unifyAchive(tagList, date, year, id, title)
      sum++
    }
  })
  // 日期排序
  tagList.forEach((r) => {
    r.blogList.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      }
      return -1
    })
  })
  tagList.sort((a, b) => b.year - a.year)
  const res = {
    length: sum,
    tagList,
  }
  // 嵌套对象使用 getStaticProps 需要序列化
  return JSON.stringify(res)
}
