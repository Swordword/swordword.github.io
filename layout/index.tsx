// Packages
import React, { useContext } from 'react'
import Head from "next/head";
import Link from "next/link";

import { css } from '@emotion/react'

// Local
import Header from './header'
import Banner from './banner'
// Style



const name = "Swordword";
export const siteTitle = "Swordword's blog";

import { ThemeContext } from '../config/theme'


export default function Layout({
  children,
  home
}: {
  children: React.ReactNode,
  home?: boolean,
}) {
  const { theme } = useContext(ThemeContext)

  return (
    <div style={{
      background: theme.background,
      color: theme.foreground,
      paddingBottom: '50px'
    }}>
      <div >
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.now.sh/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <Header />

        <Banner />

        <main css={css`
        position:relative;
        width: 1100px;
        background: #fff;
        padding: 50px 100px;
        margin: -150px auto 50px;
        border-radius: 8px;`}>
          {children}
        </main>
      </div>

    </div>

  );
}
