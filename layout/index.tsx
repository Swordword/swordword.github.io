// Packages
import React, { useContext } from 'react'
import Head from "next/head";
import Link from "next/link";

import { css } from '@emotion/react'

// Local
import Header from './Header'

// Style

const layoutStyle = css`
  width:100vw;
`


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
    }}>
      <div css={layoutStyle}>
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
        <main>{children}</main>
        {!home && (
          <div>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>

    </div>

  );
}
