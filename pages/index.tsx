// Package
import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
// Local
import Layout, { siteTitle } from '@/layout';
import { getSortedPostsData } from '@/lib/posts';
import SingleBlog from '@/components/SingleBlog'

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
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="space-y-6">
        {allPostsData.map((postData) => (
          <SingleBlog
            id={postData.id}
            title={postData.title}
            tag={postData.tag}
            description={postData.description}
            date={postData.date}
            category={postData.category}
            cover={postData.cover}
            key={postData.id}
          />
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => loadBlogList();

const loadBlogList = (pageSize = 10) => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
      pageSize,
    },
  };
}
