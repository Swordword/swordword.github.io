// Image
import Link from 'next/link'
import { useContext } from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'
// Local
import { IPostData } from '@/pages/index'
import { ThemeContext } from '@/config/theme'
import Label from '@/components/Label'

const SingleBlog = (postData: IPostData) => {
  const { id, title, date, tag, description, category, cover } = postData
  const { theme } = useContext(ThemeContext)

  const liStyle = css`
    list-style: none;
    height: 160px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  `
  const defaultImage = `https://placeimg.com/350/160/technics/${id}`

  return (
    <li css={liStyle}>
      <Link href={`/posts/${id}`} key={id}>
        <div
          css={css`
            position: relative;
            width: 350px;
            height: 160px;
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;
          `}
        >
          <Image
            alt=''
            src={cover || defaultImage}
            fill
            sizes='100vw'
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </Link>
      <div
        css={css`
          width: calc(100% - 350px);
          height: 100%;
          padding: 0 50px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        `}
      >
        <Link href={`/posts/${id}`} key={id}>
          <h1
            css={css`
              color: ${theme.foreground};
              font-size: 24px;
              height: 50px;
              line-height: 50px;
              margin: 0;
              cursor: pointer;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}
          >
            {title}
          </h1>
        </Link>
        <div>{description}</div>
        <Label category={category} tag={tag} date={date} />
      </div>
    </li>
  )
}

export default SingleBlog
