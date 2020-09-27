import { AppProps } from "next/app";
// 用于引入全局样式
import "../styles/global.css";
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
