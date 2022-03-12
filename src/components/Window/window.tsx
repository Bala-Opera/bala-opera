import { useState, useEffect, useRef, MouseEventHandler } from 'react'
import { useSpring, useTransition, animated } from 'react-spring'

import styles from './window.module.scss'
import Header from '../Header/header'
import DragMove from './DragMove'
import { Dimension, Position } from '../../common/types/animation'

const positionToStyle = (position: Position) => ({ left: position.x, top: position.y })
const MAX_HEADER_SCROLL = 500
const VISIBLE_HEADER_LIMIT = 200

export default function Window({
  title,
  dimension,
  source,
  destination,
  isOpen,
  isFullscreen = false,
  animationDuration = 200,
  isScrollable = false,
  hasContentPadding = true,
  clickHandler,
  children,
}: {
  title: string,
  isOpen: boolean,
  dimension?: Dimension,
  source?: Position,
  destination?: Position,
  isFullscreen?: boolean,
  animationDuration?: number,
  isScrollable?: boolean,
  hasContentPadding?: boolean,
  clickHandler: MouseEventHandler,
  children?: React.ReactNode,
}) {
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [lastY, setLastY] = useState(null)
  const canAnimate = source && destination && dimension
  let windowOpenStyle = useSpring({})
  let contentStyle = useSpring({})
  const headerRef = useRef(null)

  useEffect(() => {
    const handleHeader = () => {
      if (isScrollable) {
      const currentScroll = window.scrollY
      const isSlidingDown = lastY < currentScroll

        if (isSlidingDown && currentScroll > VISIBLE_HEADER_LIMIT) { // slide up
          headerRef?.current?.classList?.remove(styles.slideDownAnimation)
          headerRef?.current?.classList?.add(styles.slideUpAnimation)
        } else if (!isSlidingDown && currentScroll <= VISIBLE_HEADER_LIMIT) { // slide down
          headerRef?.current?.classList?.remove(styles.slideUpAnimation)
          headerRef?.current?.classList?.add(styles.slideDownAnimation)
        }
      }
      setLastY(window.scrollY)
    }
    window.addEventListener("scroll", handleHeader)

    return () => window.removeEventListener("scroll", handleHeader)
  }, [lastY, isScrollable])

  const handleDragMove = (e) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    })
  }

  const applyFadeIn = useTransition(isOpen, {
        from: { opacity: 0, },
        enter: { opacity: 1, },
        leave: { opacity: 1, },
        delay: 200,
        config: { duration: animationDuration },
      })
  const applyFadeOut = useTransition(isOpen, {
        from: { opacity: 1, },
        enter: { opacity: 0, },
        leave: { opacity: 0, },
        delay: 200,
        config: { duration: animationDuration },
      })

  if (canAnimate) {
    windowOpenStyle = useSpring({
      from: {
        width: 0,
        height: 0,
        ...positionToStyle(source),
        translateX: -translate.x,
        translateY: -translate.y,
      },
      to: {
        ...dimension,
        ...positionToStyle(destination),
      },
      reverse: !isOpen,
      config: { duration: animationDuration },
    })
    contentStyle = useSpring({
      from: { opacity: 0 },
      to: { opacity: 1 },
      delay: animationDuration + 50,
      reverse: !isOpen,
    })
  }

  const contentPaddingStyle = hasContentPadding ? styles.contentPadding : ''

  const FullScreen = (style) => (
    <div style={{ position: isScrollable ? 'relative' : 'fixed' }} className={styles.fullscreen}>
      <div className={`${styles.header} ${styles.slideDownAnimation}`} ref={headerRef}>
        {lastY < MAX_HEADER_SCROLL ? <Header title={title} minimizeHandler={clickHandler} /> : <div className={styles.invisibleHeader}></div>}
      </div>
      <div className={`${isOpen && contentPaddingStyle} ${isScrollable ? styles.scrollableContent : styles.content}`}>
        <animated.div style={{ ...style, height: '100%', overflow: 'auto' }}>{children}</animated.div>
      </div>
    </div>
  )

  return isFullscreen || !canAnimate
    ? (isOpen ? applyFadeIn(FullScreen) : applyFadeOut(FullScreen))
    : (<animated.div className={styles.window} style={{ ...windowOpenStyle, transform: `translateX(${translate.x}px) translateY(${translate.y}px)` }}>
          {isOpen && <DragMove onDragMove={handleDragMove}>
            <Header title={title} minimizeHandler={clickHandler} />
          </DragMove>}
          <div className={
            `${isOpen && contentPaddingStyle} ${isScrollable ? styles.scrollableContent : styles.content}`}>
            {isOpen && (
              <animated.div style={contentStyle}>
                {children}
              </animated.div>
            )}
          </div>
        </animated.div>)
}