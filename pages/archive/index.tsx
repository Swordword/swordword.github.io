// Package
import React from 'react'
import { css } from '@emotion/react'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
// Local
import Layout from "layout";
import Date from "components/Date";
import { getActiveData, IAchive } from 'lib/posts'

const HeaderStyle = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`
const yearStyle = css`
  font-size: 20px;
  margin: 8px 0;
`
const blogStyle = css`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;
    &:hover{
      color: #30a9de;
      background-color:#f8f9fa;
    }
`

const Index = ({ achiveList, length }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <div css={HeaderStyle}>
        共计{length}篇文章
      </div>
      {achiveList.map(achive => (
        <div key={achive.year}>
          <div css={yearStyle}>
            {achive.year}
          </div>
          {achive.blogList.map((blog => (
            <Link href={`/posts/${blog.id}`} key={blog.id}>
              <div css={blogStyle}>
                <div>{blog.title}</div>
                <div> <Date dateString={blog.date} option="LL-dd" />
                </div>
              </div>
            </Link>
          )
          ))}
        </div>
      ))}
    </Layout>
  )
}

export const getStaticProps = async () => {
  return loadAchiveData()
}

const loadAchiveData = () => {
  const { length, achiveList }: { length: number, achiveList: IAchive[] } = JSON.parse(getActiveData())

  return {
    props: {
      achiveList,
      length
    }
  }
}

export default Index
