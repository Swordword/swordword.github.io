import React from 'react';
import { AppProps } from "next/app";
// 主题
import { ThemeContext, themes } from '../config/theme'
// 用于引入全局样式
import "../styles/global.css";
import "highlight.js/scss/vs2015.scss";


function statistics() {
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?fd27152ccbcb848d9544f02148e9bddb";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}


export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState(themes.light)
  const toggleTheme = () => {
    console.log('fn toggleTheme');
    setTheme((prev) => (prev === themes.light ? themes.dark : themes.light))
  }
  React.useEffect(() => {
    statistics()
  })
  return <ThemeContext.Provider value={{ theme, toggleTheme }}><Component {...pageProps} /></ThemeContext.Provider>
}
