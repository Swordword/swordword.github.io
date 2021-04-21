import { useContext } from 'react'
import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/Date";
import { GetStaticProps } from "next";

import { ThemeContext, themes } from '../config/theme'

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
    description: string;
    tag: string;
  }[];
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
            <li className={utilStyles.listItem} key={id}>
              <div className={utilStyles.lightText}>
                <small>
                  <Date dateString={date} />
                </small>
              </div>

              <Link href={`/posts/${id}`}>
                <a style={{
                  background: theme.background,
                  color: theme.foreground,
                }}>{title}</a>
              </Link>
              {/* <div className={utilStyles.lightText}>
                <small>{tag}</small>
              </div> */}

              <div className={utilStyles.headingBs}>{description}</div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>

  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
