import theme from '@/styles/theme.style'
import { AppShell } from '@mantine/core'
import { useInterval } from '@mantine/hooks'
import { Global, MantineProvider } from '@mantine/styles'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [timer, setTimer] = useState(0);
  const interval = useInterval(() => setTimer((s) => s + 1), 1000);

  useEffect(() => interval.start(), [interval]);

  return (
    <AppShell style={{ backdropFilter: `blur(2px) brightness(50%) hue-rotate(${timer}deg)` }}>
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
