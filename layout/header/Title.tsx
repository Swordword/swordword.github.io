import { css } from '@emotion/react'
import Link from 'next/link'

// Local
import Icon from '@/components/Icon'


const Title = () => {
  return (
    <Link href='/'>
      <div css={css`
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    cursor:pointer;
    `}>
        <Icon src="#icon-sword" />
        <div css={css`
        margin-left:20px;`
        }
        >
          Swordword
        </div>
      </div>
    </Link>

  )
}

export default Title
