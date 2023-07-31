import theme from '@/styles/theme.style'
import { AppShell } from '@mantine/core'
import { Global, MantineProvider } from '@mantine/styles'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell bg="green">
      <MantineProvider theme={theme}>
        <Global styles={[
          {
            '@font-face': {
              fontFamily: 'Gilroy',
              src: 'url("/Gilroy-Bold.ttf") format("truetype")',
            },
          },
        ]} />
        <Component {...pageProps} />
      </MantineProvider>
    </AppShell>
  )
}
