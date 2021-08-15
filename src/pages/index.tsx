import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useSpring, animated } from 'react-spring'

import Button from '../components/Button/button'
import Dropdown from '../components/Dropdown/dropdown'
import Window from '../components/Window/window'
import styles from './index.module.scss'
import { generateAnimationConfig } from '../common/animations/floating'
import { AnimationConfig } from '../common/types/animation'
import { getRandomInt } from '../common/utils/random'
import Copy from '../copy/homepage'

const ICON_DIMENSIONS = {
  lg: { width: 715, height: 402 },
  md: { width: 475, height: 276 },
  sm: { width: 256, height: 144 },
  none: { width: 0, height: 0 },
}
const ICON_INDEX_TOTAL = 11; // icon-0 to icon-10

const ANIMATION_MECHANICS = { // 15s, 20s
  duration: 15000,
  interval: 20000,
}

const getWindowDimensions = (window: Window) => {
  const { innerWidth, innerHeight } = window
  return { width: innerWidth, height: innerHeight }
}

const initializePool = () => Array.from(Array(ICON_INDEX_TOTAL).keys())
const getRandomIndexFromPool = (pool: Array<number>) => {
  const copy = [...pool]
  const index = getRandomInt(0, copy.length)
  const value = copy.splice(index, 1);
  return value[0]
}

export default function Home() {
  /* Floating Icon */
  const [screenSize, setScreenSize] = useState('none')
  const [iconIndex, setIconIndex] = useState(null)
  const [iconAnimation, setIconAnimation] = useState(null)
  const previousAnimation = useRef<AnimationConfig>(null)
  const iconIndexPool = useRef<Array<number>>(initializePool())

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

  const updateIconAnimation = (isPreviousIncluded: boolean = false) => {
    const previousConfig = isPreviousIncluded ? previousAnimation.current : null
    const config = generateAnimationConfig(
      ANIMATION_MECHANICS,
      ICON_DIMENSIONS[screenSize],
      getWindowDimensions(window),
      previousConfig,
    )
    setIconAnimation(config)
    previousAnimation.current = config
  }

  const updateIconSource = () => {
    const newIndex = getRandomIndexFromPool(iconIndexPool.current)
    setIconIndex(newIndex)

    const newPool = (iconIndexPool.current.length > 1)
      ? [...iconIndexPool.current]
      : initializePool()
    const indexToRemove = newPool.indexOf(newIndex)
    newPool.splice(indexToRemove, 1)
    iconIndexPool.current = newPool
  }

  useEffect(() => {
    const watchMedias = updateIconSizing()
    return () => {
      watchMedias.forEach(({ media, handler }) => {
        media.removeEventListener('change', handler)
      })
    }
  }, [])

  useEffect(() => {
    if (screenSize === 'none') return
    updateIconAnimation()
    updateIconSource()

    const interval = setInterval(function() {
      updateIconAnimation(true)
      updateIconSource()
    }, ANIMATION_MECHANICS.interval)
    return () => {
      clearInterval(interval)
    }
  }, [screenSize])

  const animation = useSpring(iconAnimation)

  /* What? */
  const [isWhatWindowVisible, setIsWhatWindowVisible] = useState(false)
  const whatButtonHandler = () => setIsWhatWindowVisible(!isWhatWindowVisible)

  return (
    <>
      <Head>
        <title>Bala Opera</title>
      </Head>

      <h1 className={styles.sideBar}>
        <span>Bala</span>
        <span>Opera</span>
      </h1>

      {iconIndex && (
      <animated.div className={styles.animation} style={animation}>
        <Image
          id='icon'
          src={`/images/icon-${iconIndex}.png`}
          alt='test icon'
          priority
          {...ICON_DIMENSIONS[screenSize]}
        />
      </animated.div>
      )}

      <div className={styles.footer}>
        <div>
        <Button
          text="What?"
          isImportant={isWhatWindowVisible}
          clickHandler={whatButtonHandler}
        /></div><div>
        <Dropdown
          name='Issues'
          options={[{ value: 'Issue 0', displayText: 'Issue 0' }]}
          changeHandler={() => {}}
        /></div>
      </div>

      {isWhatWindowVisible && (
        <Window
          title="What?"
          dimension={{ width: 400, height: 600 }}
          source= {{ x: 0, y: 0 }}
          destination={{ x: 500, y: 300 }}
        >
          <div>{Copy.WHAT[0]}</div>
          <div>{Copy.WHAT[1]}</div>
        </Window>
      )}

      <style global jsx>{`
        html, body {
          overflow: hidden;
        }
      `}</style>
    </>
  )
}
