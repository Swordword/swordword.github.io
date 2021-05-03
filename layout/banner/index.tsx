import Image from 'next/image'
import { css } from '@emotion/react'
const Index = () => {
  return (
    <div css={css`
    z-index:1;`}>
      <div css={css`
      width: 100%;
      height: 300px;
      position: relative;`}>
        <Image src="/images/banner.png" layout="fill" objectFit="cover"></Image>
      </div>
    </div>
  )
}

export default Index
