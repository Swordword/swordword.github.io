// Package
import { useState } from 'react';
import { css } from '@emotion/react'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'

// Local
import Layout from 'layout';
import { ICategory, getCategoryData } from 'lib/posts'
import { YearStyle, BlogStyle } from 'pages/archive'

const CateStyle = css`
    ${YearStyle};
    display: flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &:hover{
      color: #30a9de;
      background-color:#f8f9fa;
    }
`

const Index = ({ categoryList }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [cateList, setCateList] = useState(categoryList)

  const handleClick = (cate: string) => {
    const tempCateList = Array.from(cateList)
    const tempCate = tempCateList.find((t) => t.cate === cate)!
    tempCate.shrink = !tempCate.shrink
    setCateList(tempCateList)
  }

  const BlogListStyle = (shrink: boolean, length: number) => css`
    height: ${shrink ? 0 : `${44 * length}px`};
    transition: height ${length * 100}ms cubic-bezier(.5,0,.5,1);
    overflow: hidden;
  `

  return (
    <Layout>
      {cateList.map((category) => (
        <div key={category.cate}>
          <div css={CateStyle} onClick={() => handleClick(category.cate)}>
            <div>{category.cate || '其他分类'}</div>
            <div>{category.blogList.length}</div>
          </div>
          <div css={BlogListStyle(category.shrink, category.blogList.length)}>
            {category.blogList.map((blog) => (
              <Link href={`/posts/${blog.id}`} key={blog.id}>
                <div css={BlogStyle}>
                  <div>{blog.title}</div>
                </div>
              </Link>
            ))}
          </div>
          {/* {category.shrink ? <div>
            {category.blogList.map(blog => (
              <Link href={`/posts/${blog.id}`} key={blog.id}>
                <div css={BlogStyle}>
                  <div>{blog.title}</div>
                </div>
              </Link>
            ))}
          </div> : null} */}
        </div>
      ))}
    </Layout>
  )
}

export const getStaticProps = async () => {
  const categoryList: ICategory[] = JSON.parse(getCategoryData())
  // categoryList.forEach(category => category.shrink = false)
  return {
    props: {
      categoryList,
    },
  }
}

export default Index
