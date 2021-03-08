import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ThemeContext } from '../config/theme'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    let { theme } = this.context
    return (
      <Html lang='zh-Hans'  >
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
MyDocument.contextType = ThemeContext

export default MyDocument