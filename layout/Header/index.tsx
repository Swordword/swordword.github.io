// Package
import { css } from '@emotion/react'
// Local
import Title from './Title'
import NavList from './NavList'
import ThemeSwitch from './ThemeSwitch'
// Style
const bgColor = 'rgba(47,65,84,0.7)'
const color = '#fff'

const style = css`
  height:50px;
  color:${color};
  background-color: ${bgColor};
  box-shadow:0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  position: sticky;
  top:0;
  left:0;
  z-index:2;
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
        <Title />
        <NavList />
      </div>
    </div>
  )
}

export default Header
