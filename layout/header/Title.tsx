import { css } from '@emotion/react'
import Image from 'next/image'

// Local
import Icon from 'components/Icon'


const Title = () => {
  return (
    <div css={css`
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    `}>
      <Icon src="#icon-sword" />
      <div css={css`
        margin-left:20px;`
      }
      >
        Swordword
      </div>


    </div>
  )
}

export default Title
