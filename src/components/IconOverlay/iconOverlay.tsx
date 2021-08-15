import { useEffect, useRef, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import Image from 'next/image'

import styles from './iconOverlay.module.scss'
import { generateAnimationConfig } from '../../common/animations/floating'
import { AnimationConfig, Mechanics } from '../../common/types/animation'
import { getRandomInt } from "../../common/utils/random"

const ICON_DIMENSIONS = {
  lg: { width: 715, height: 402 },
  md: { width: 475, height: 276 },
  sm: { width: 256, height: 144 },
  none: { width: 0, height: 0 },
}

const getWindowDimensions = (window: Window) => {
  const { innerWidth, innerHeight } = window
  return { width: innerWidth, height: innerHeight }
}

const getRandomIndexFromPool = (pool: Array<number>) => {
  const copy = [...pool]
  const index = getRandomInt(0, copy.length)
  const value = copy.splice(index, 1);
  return value[0]
}

export default function IconOverlay({
  totalIconCount,
  mechanics,
} : {
  totalIconCount: number,
  mechanics: Mechanics,
}) {
  
const initializePool = () => Array.from(Array(totalIconCount).keys())

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
      mechanics,
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
    }, mechanics.interval)
    return () => {
      clearInterval(interval)
    }
  }, [screenSize])

  const animation = useSpring(iconAnimation)

  return iconIndex ? (
    <animated.div className={styles.animation} style={animation}>
      <Image
        id='icon'
        src={`/images/icon-${iconIndex}.png`}
        priority
        {...ICON_DIMENSIONS[screenSize]}
        // icon is decorative, so no alt provided
      />
    </animated.div>
  ) : null
}