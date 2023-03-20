import React from 'react'
import { AppProps } from 'next/app'
import { css } from '@emotion/react'
// 主题
import { ThemeContext, themes } from '../config/theme'
// 用于引入全局样式
// import ''
import '@/styles/global.css'
// import 'highlight.js/scss/vs2015.scss'

function statistics() {
  // var _hmt = _hmt || [];
  (function stat() {
    const hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?fd27152ccbcb848d9544f02148e9bddb'
    const s = document.getElementsByTagName('script')[0]
    s.parentNode!.insertBefore(hm, s)
  }())
}

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState(themes.light)
  const toggleTheme = () => {
    setTheme((prev) => (prev === themes.light ? themes.dark : themes.light))
  }
  React.useEffect(() => {
    statistics()
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line global-require
      require('images/iconfonts/iconfont')
    }
  })
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
      <div
        css={css`
          text-align: center;
          height: 30px;
          line-height: 30px;
          color: #333;
        `}
      >
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">京ICP备19054504号-2</a>
      </div>
    </ThemeContext.Provider>
  )
}
