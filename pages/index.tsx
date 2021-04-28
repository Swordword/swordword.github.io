import { useContext } from 'react'
import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "../layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/Date";
import { GetStaticProps } from "next";

import { ThemeContext, themes } from '../config/theme'

export default function Home({
  allPostsData, pageSize
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
    description: string;
    tag: string;
  }[];
  pageSize: number
}) {
  const { theme } = useContext(ThemeContext)

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        {/* <h2 className={utilStyles.headingLg}>分类组件</h2> */}
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, description, tag }) => (
            <Link href={`/posts/${id}`} key={id}>
              <li className={utilStyles.listItem} >
                <h1 style={{
                  background: theme.background,
                  color: theme.foreground,
                  fontSize: '22px',
                  margin: 0,
                  cursor: 'pointer'
                }}>{title}</h1>

                <div className={utilStyles.lightText}>
                  <small>
                    <Date dateString={date} />
                  </small>
                  <small style={{
                    paddingLeft: '6px',
                    paddingRight: '6px',
                  }}>·</small>
                  <small>{tag}</small>
                </div>
                <div className={utilStyles.headingBs}>{description}</div>
              </li>
            </Link>

          ))}
        </ul>
        {/* <button onClick={()=>loadBlogList(pageSize+10)}>下一页</button> */}
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