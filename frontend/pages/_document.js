import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" xm="">
        <Head />
        <body className="font-sans appearance-none">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
