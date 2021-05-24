import { css } from '@emotion/react'

interface IProps { src: string }

const Icon = ({ src }: IProps) => (
  <div css={css`
      width:30px;
      height:30px;
      display: flex;
      align-items: center;
      `}
  >
    <svg
      className="icon"
      aria-hidden="true"
      css={css`
        width:24px;
        height:24px;
        margin-left:6px;
      `}
    >
      <use xlinkHref={src} />
    </svg>
  </div>
)

export default Icon
