import Image from 'next/image'
import { css } from '@emotion/react'
import backageBanner from '@/images/banner.jpg'

const Index = () => (
  <div
    css={css`
      z-index: 1;
    `}
  >
    <div
      css={css`
        width: 100%;
        height: 350px;
        position: relative;
        background: url(${backageBanner.src}) center;
      `}
    >
    </div>
  </div>
)

export default Index
