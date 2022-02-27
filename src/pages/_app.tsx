import { AppProps } from 'next/app'
import { Router } from 'next/router';
import { useEffect } from 'react'

import '../styles/global.scss'

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 1,
        left: 0,
        behavior: 'smooth'
      })
    })
  }, [])

  return <Component {...pageProps} />
}

export default App