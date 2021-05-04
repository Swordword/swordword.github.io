import React from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'

const Test = () => {
  return (
    <div>
      <div css={css`
      width:100vw;
      height:350px;
      position: relative;`}>
        <Image src="/images/banner.png" layout="fill" objectFit="cover"></Image>
      </div>
      <div css={css`
      width:100vw;
      height:350px;
      background:red;
      `}>
        test page
      </div>

    </div>
  )
}

export default Test
