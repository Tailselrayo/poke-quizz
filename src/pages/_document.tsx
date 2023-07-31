import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{margin: 0, padding: 0, backgroundImage: "url(/pokeball-wallpaper.jpg)", backgroundSize: 500}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
