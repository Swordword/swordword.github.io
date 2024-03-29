import { css } from '@emotion/react'
import Link from 'next/link'

// Local
import Icon from '@/components/Icon'
import Date from '@/components/Date'

// Type
interface IProps {
  category: string
  tag: string
  date: string
}

function Label(props: IProps) {
  const { tag, date, category } = props
  return (
    <div
      css={css`
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        `}
      >
        <small
          css={css`
            color: #30a9de;
          `}
        >
          <Icon src="#icon-time" />
        </small>
        <small
          css={css`
            margin-left: 10px;
            margin-right: 20px;
            cursor: pointer;
          `}
        >
          <Link href="/archive">
            <span>
              <Date dateString={date} />
            </span>
          </Link>
        </small>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        `}
      >
        <small
          css={css`
            color: #30a9de;
          `}
        >
          <Icon src="#icon-leimupinleifenleileibie2" />
        </small>
        <small
          css={css`
            margin-left: 10px;
            margin-right: 20px;
            cursor: pointer;
          `}
        >
          <Link href={`/category/${category || ''}`}>
            <span>{category || '前往分类'}</span>
          </Link>
        </small>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        `}
      >
        <small
          css={css`
            color: #30a9de;
          `}
        >
          <Icon src="#icon-tag1" />
        </small>
        <small
          css={css`
            margin-left: 10px;
            margin-right: 20px;
            cursor: pointer;
          `}
        >
          {tag ? (
            tag.split(/[,|，|、]/).map((t) => (
              <Link key={t} href={`/tag/${t.toLowerCase()}`}>
                <span>
                  {t}
                  &nbsp;
                </span>
              </Link>
            ))
          ) : (
            <Link href="/tag">
              <span>前往标签</span>
            </Link>
          )}
        </small>
      </div>
    </div>
  )
}

export default Label
