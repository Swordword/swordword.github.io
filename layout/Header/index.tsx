// Package
import { css } from '@emotion/react'
// Local
import ThemeSwitch from './ThemeSwitch'

// Style
const bgColor = '#2F4154'
const color = '#fff'

const style = css`
  width:100vw;
  height:50px;
  color:${color};
  background-color: ${bgColor};
`
const style2 = css`
  width: 1100px;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items:center;
`

const Header = () => {
  return (
    <div css={style}
    >
      <div css={style2}>
        Header
        <ThemeSwitch />
      </div>
    </div>
  )
}

export default Header
