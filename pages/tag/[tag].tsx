import Link from 'next/link'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
// Local
import Layout from 'layout'
import Date from 'components/Date'
import { getAllPostTags, getPostListByTag, IAchive } from 'lib/posts'

import { HeaderStyle, YearStyle, BlogStyle } from 'pages/archive'

const Category = ({
  achiveList,
  tag,
  length,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout>
    <div css={HeaderStyle}>
      {tag}
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

export const getStaticPaths = () => {
  const paths = getAllPostTags()
  return {
    paths,
    fallback: false,
  }
}

type TAchiveList = { length: number; tagList: IAchive[] }

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<any>) => {
  const { length, tagList: achiveList }: TAchiveList = JSON.parse(
    getPostListByTag(params.tag as string),
  )
  return {
    props: {
      tag: params.tag as string,
      achiveList,
      length,
    },
  }
}

export default Category
