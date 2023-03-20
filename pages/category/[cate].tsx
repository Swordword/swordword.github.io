import Link from 'next/link'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
// Local
import Layout from '@/layout'
import Date from '@/components/Date'
import { getAllPostCates, getPostListByCate, IAchive } from '@/lib/posts'

import { HeaderStyle, YearStyle, BlogStyle } from '@/pages/archive'

function Category({
  achiveList,
  cate,
  length,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div css={HeaderStyle}>
        {cate}
        :共计
        {length}
        篇文章
      </div>
      {achiveList.map((achive) => (
        <div key={achive.year}>
          <div css={YearStyle}>{achive.year}</div>
          {achive.blogList.map((blog) => (
            <Link href={`/posts/${blog.id}`} key={blog.id}>
              <div css={BlogStyle}>
                <div>{blog.title}</div>
                <div>
                  {' '}
                  <Date dateString={blog.date} option="LL-dd" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </Layout>
  )
}

export const getStaticPaths = () => {
  const paths = getAllPostCates()
  return {
    paths,
    fallback: false,
  }
}

type TAchiveList = { length: number; cateList: IAchive[] }

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<any>) => {
  const { length, cateList: achiveList }: TAchiveList = JSON.parse(
    getPostListByCate(params.cate as string),
  )
  return {
    props: {
      cate: params.cate as string,
      achiveList,
      length,
    },
  }
}

export default Category
