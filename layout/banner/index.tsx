import Image from 'next/image'
import { css } from '@emotion/react'

const Index = () => (
  <div css={css`
    z-index:1;`}
  >
    <div css={css`
      width: 100%;
      height: 350px;
      position: relative;`}
    >
      <Image src="/images/banner.png" layout="fill" objectFit="cover" />
    </div>
  </div>
)

export default Index
