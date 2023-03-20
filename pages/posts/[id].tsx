// Package
import { useContext } from 'react'
import Head from 'next/head'
import {
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from 'next'
import { css } from '@emotion/react'

// Local
import Layout from '@/layout'
import { getAllPostIds, getPostData } from '@/lib/posts'

import { ThemeContext } from '@/config/theme'
import Label from '@/components/Label'

function Post({ postData }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { theme } = useContext(ThemeContext)
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article
        style={{
          color: theme.foreground,
        }}
      >
        <h1
          css={css`
            height: 70px;
            margin: 0;
            line-height: 70px;
            text-align: center;
            font-size: 40px;
          `}
        >
          {postData.title}
        </h1>
        <div
          css={css`
            margin-left: 250px;
          `}
        >
          {/* Label Component */}
          <Label
            category={postData.category}
            tag={postData.tag}
            date={postData.date}
          />
        </div>
        <div
          css={css`
            border-bottom: 1px solid #30a9de;
            margin-top: 20px;
            margin-bottom: 20px;
          `}
        >
          {/* line */}
        </div>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<any>) => {
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData,
    },
  }
}

export default Post
