// Packages
import React, { useContext } from 'react'
import Head from 'next/head';

// Local
import Header from './header'
import Banner from './banner'
import { ThemeContext } from '../config/theme'

export const siteTitle = "Swordword's blog";

/**
 * Layout 全局层
 * @param param0
 * @returns
 */
export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
  const { theme } = useContext(ThemeContext)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
      </Head>

      <Header />
      <Banner />

      <main className="container relative max-w-[1100px] bg-card text-card-foreground rounded-lg shadow-lg mx-auto -mt-40 mb-12 px-8 py-12">
        {children}
      </main>
    </div>
  );
}
