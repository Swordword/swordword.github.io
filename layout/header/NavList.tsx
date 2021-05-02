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
    icon: "#icon-lianhe4",
    text: "关于",
    path: "/about",
  },
  {
    icon: "#icon-rss",
    text: "RSS",
    path: "/rss",
  },
]
const insideNavList: Itype[] = [
  {
    icon: "#icon-guidang",
    text: "归档",
    path: "/archive",
  },
  {
    icon: "#icon-leimupinleifenleileibie2",
    text: "分类",
    path: "/archive",
  },
  {
    icon: "#icon-tag1",
    text: "标签",
    path: "/tag",
  }
]

const gridStyle = css`
  width:100px;
  height:50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color:#30A9DE;
    background-color: rgba(0,0,0,0.1);
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
      {createNav({ icon: '#icon-home', text: '首页', path: '/' })}

      <div css={css`
       width:100px;
  height:50px;
  display: flex;
  align-items: center;
  cursor: pointer;
      position: relative;
      &:hover{
        .nav-list{
          display:block;
        }
      }
     `}>
        <Icon src='#icon-list' />
        <div css={css`
        margin-left:10px;`
        }
        >
          索引
        </div>
        <div className="nav-list" css={css`
         transition: 3s ease-out;
        display:none;
          width: 100px;
          position: absolute;
          top: 50px;
          left: 0;
          background-color: rgba(47,65,84,0.7);
          box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);`}>
          {
            insideNavList.map(nav => createNav(nav))
          }
        </div>
      </div>
      {navList.map(nav => createNav(nav))}
      <Icon src="#icon-OOjs_UI_icon_search-ltr" />
      <div css={css`
      margin-left:10px;`}>
        <Icon src="#icon-sun" />
      </div>
    </div >
  )
}

export default NavList
