import React from 'react';
import { AppProps } from "next/app";
// 用于引入全局样式
import "../styles/global.css";
import "highlight.js/scss/vs2015.scss";
import { ThemeContext, themes } from '../config/theme'

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState(themes.light)
  const toggleTheme = () => {
    console.log('fn toggleTheme');
    setTheme((prev) => (prev === themes.light ? themes.dark : themes.light))
  }
  return <ThemeContext.Provider value={{ theme, toggleTheme }}><Component {...pageProps} /></ThemeContext.Provider>
}
