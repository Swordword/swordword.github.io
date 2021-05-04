// Package
import Head from "next/head";
import { GetStaticProps } from "next";
import { css } from "@emotion/react"
// Local
import Layout, { siteTitle } from "../layout";
import { getSortedPostsData } from "../lib/posts";
import SingleBlog from 'components/SingleBlog'



export type IPostData = {
  id: string;
  date: string;
  title: string;
  description: string;
  tag: string;
  category: string
  cover: string
}

export default function Home({
  allPostsData, pageSize
}: {
  allPostsData: IPostData[];
  pageSize: number
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <ul css={css`
        padding:0;
        `}>
          {allPostsData.map((postData) => (
            <SingleBlog id={postData.id} title={postData.title} tag={postData.tag} description={postData.description}
              date={postData.date} category={postData.category} cover={postData.cover} key={postData.id} />
          ))}
        </ul>
      </section>
    </Layout >

  );
}

export const getStaticProps: GetStaticProps = async () => {
  return loadBlogList();
};

const loadBlogList = (pageSize = 10) => {
  const allPostsData = getSortedPostsData(pageSize);
  return {
    props: {
      allPostsData,
      pageSize
    },
  };

}