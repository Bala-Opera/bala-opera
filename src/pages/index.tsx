import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring'

import styles from './index.module.scss'

const ICON_DIMENSIONS = {
  lg: { width: 715, height: 402 },
  md: { width: 475, height: 276 },
  sm: { width: 256, height: 144 },
}

export default function Home() {
  const [screenSize, setScreenSize] = useState('sm');
  const [animationConfig, setAnimationConfig] = useState({
    from: {
      left: 0,
      top: 0,
      width: 475,
    },
    to: {
      left: 700,
      top: 500,
      width: 475,
    },
    config: { duration: 4000 },
  })

  const mediaMapping = {
    sm: {
      query: '(max-width: 768px)',
      handler: (e: MediaQueryListEvent) => (e.matches) && setScreenSize('sm'),
    },
    md: {
      query: '(min-width: 768px) and (max-width: 992px)',
      handler: (e: MediaQueryListEvent) => (e.matches) && setScreenSize('md'),
    },
    lg: {
      query:  '(min-width: 992px)',
      handler: (e: MediaQueryListEvent) => (e.matches) && setScreenSize('lg'),
    },
  }

  const updateIconSizing = () => Object.keys(mediaMapping).map((key) => {
    const { query, handler } = mediaMapping[key]
    const media = window.matchMedia(query)
    media.addEventListener('change', handler)
    if (media.matches) {
      setScreenSize(key)
    }
    return { media, handler }
  });

  const imageAnimation = useSpring(animationConfig)

  useEffect(() => {
    const watchMedias = updateIconSizing()

    const interval = setInterval(function() {
      setAnimationConfig({
        from: {
          left: 700,
          top: 500,
          width: 475,
        },
        to: {
          left: 0,
          top: 0,
          width: 475,
        },
        config: { duration: 4000 },
      })
    }, 5000)

    return () => {
      watchMedias.forEach(({ media, handler }) => {
        media.removeEventListener('change', handler)
      })

      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Bala Opera</title>
      </Head>

      <h1 className={styles.sideBar}>
        <span>Bala</span>
        <span>Opera</span>
      </h1>

      <animated.div className={styles.animation} style={imageAnimation}>
        <Image
          id='icon'
          src='/images/test.png'
          alt='test icon'
          {...ICON_DIMENSIONS[screenSize]}
        />
      </animated.div>

      <style global jsx>{`
        html, body {
          overflow: hidden;
        }
      `}</style>
    </>
  )
}
