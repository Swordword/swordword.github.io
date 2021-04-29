import { css } from '@emotion/react'

interface IProps { src: string }

const Icon = ({ src }: IProps) => {
  return (
    <div css={css`
      width:30px;
      height:30px;
      display: flex;
      align-items: center;
      `}>
      <svg className="icon" aria-hidden="true" css={css`
        width:24px;
        height:24px;
      `}>
        <use xlinkHref={src}></use>
      </svg>
    </div>
  )
}

export default Icon
