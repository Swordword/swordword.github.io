// Image
import Link from "next/link";
import { useContext } from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'
// Local
import Date from "components/Date";
import { IPostData } from 'pages/index'
import { ThemeContext } from 'config/theme'
import Icon from 'components/Icon'

const SingleBlog = (postData: IPostData) => {
  const { id, title, date, tag, description } = postData
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

  return (
    <li css={liStyle}>
      <Link href={`/posts/${id}`} key={id}>
        <div css={css`
        position: relative;
        width:300px;
        height:160px;
        border-radius: 6px;
        overflow: hidden;
        cursor: pointer;
        `}>
          <Image src='/images/banner.png' layout="fill" objectFit="cover" />
        </div>
      </Link>
      <div css={css`
        width: calc(100% - 300px);
        height: 100%;
        padding: 0 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;`}>
        <Link href={`/posts/${id}`} key={id}>
          <h1 css={css`
            color: ${theme.foreground};
            font-size: 24px;
            height: 50px;
            line-height: 50px;
            margin: 0;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;`}>{title}
          </h1>
        </Link>
        <div>{description}</div>
        <div css={css`
        height:40px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;`}>
          <div css={css`
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          `}>
            <small css={css`
          color: #30A9DE`}>
              <Icon src="#icon-time"></Icon>
            </small>
            <small css={css`
            margin-left: 10px;
            margin-right: 20px;`}>
              <Date dateString={date} />
            </small>
          </div>
          <div css={css`
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          `}>
            <small css={css`
          color: #30A9DE`}>
              <Icon src="#icon-leimupinleifenleileibie2"></Icon>
            </small>
            <small css={css`
            margin-left: 10px;
            margin-right: 20px;`}>
              <span>Category</span>
            </small>
          </div>
          <div css={css`
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          `}>
            <small css={css`
          color: #30A9DE`}>
              <Icon src="#icon-tag1"></Icon>
            </small>
            <small css={css`
            margin-left: 10px;
            margin-right: 20px;`}>
              <small>{tag}</small>
            </small>
          </div>
        </div>
      </div>
    </li>

  )
}

export default SingleBlog
