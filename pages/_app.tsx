import React from 'react';
import { AppProps } from "next/app";
// 用于引入全局样式
import "../styles/global.css";
import "highlight.js/scss/vs2015.scss";
import { ThemeContext, themes } from '../config/theme'


function statistics() {
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?8ad71e08e3dca52439af211aea99eade";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}
statistics()


export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState(themes.light)
  const toggleTheme = () => {
    console.log('fn toggleTheme');
    setTheme((prev) => (prev === themes.light ? themes.dark : themes.light))
  }
  return <ThemeContext.Provider value={{ theme, toggleTheme }}><Component {...pageProps} /></ThemeContext.Provider>
}
