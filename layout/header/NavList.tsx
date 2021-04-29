import { css } from '@emotion/react'
import Link from 'next/link'

// Local
import Icon from 'components/Icon'

// Type

type Itype = {
  icon: string
  text: string
  path: string
}
const navList: Itype[] = [
  {
    icon: "#icon-home",
    text: "首页",
    path: "/",
  },
  {
    icon: "#icon-home",
    text: "首页",
    path: "/",
  },
  {
    icon: "#icon-wodedangxuan",
    text: "关于",
    path: "/about",
  },
  {
    icon: "#icon-rss",
    text: "RSS",
    path: "/rss",
  },
]

const gridStyle = css`
  width:100px;
  height:50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color:#30A9DE
  }
`


const createNav = ({ icon, text, path }: Itype) =>
  <Link href={path}>
    <div css={gridStyle}>
      <Icon src={icon} />
      <div css={css`
        margin-left:10px;`
      }
      >
        {text}
      </div>
    </div>
  </Link>

const NavList = () => {
  return (
    <div
      css={css`
      display: flex;
      flex-direction: row;
      align-items: center;
    `}
    >
      {navList.map(nav => createNav(nav))}
    </div>
  )
}

export default NavList
