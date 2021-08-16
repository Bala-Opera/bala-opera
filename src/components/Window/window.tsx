import { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import Draggable, { DraggableEvent } from 'react-draggable'

import styles from './window.module.scss'
import Header from '../Header/header'
import { Dimension, Position } from '../../common/types/animation'
import { MouseEventHandler } from 'react'

type DraggableData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
};

const positionToStyle = (position: Position) => ({ left: position.x, top: position.y })

// TODO: need to make it so that dimension, source, and destination isn't required or vice versa

export default function Window({
  title,
  dimension,
  source,
  destination,
  isOpen,
  isFullscreen = false,
  animationDuration = 400,
  clickHandler,
  children,
}: {
  title: string,
  dimension: Dimension,
  source: Position,
  destination: Position,
  isOpen: boolean,
  isFullscreen?: boolean,
  animationDuration?: number,
  clickHandler: MouseEventHandler,
  children?: React.ReactNode,
}) {
  const [delta, setDelta] = useState({ x: 0, y: 0 })

  const windowOpenStyle = useSpring({
    from: {
      width: 0,
      height: 0,
      ...positionToStyle(source),
      translateX: delta.x,
      translateY: delta.y,
    },
    to: {
      ...dimension,
      ...positionToStyle(destination),
    },
    reverse: !isOpen,
    // reset: !isOpen,
    config: { duration: animationDuration },
  })

  const headerStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1, cursor: 'move' },
    delay: animationDuration + 300,
  })
  const contentStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: animationDuration + 400,
  })

  console.log(windowOpenStyle)

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    const { x, y } = data
    setDelta({ x: -1 * x, y: -1 * y })
  }

  return (
    <Draggable handle='#header' onStop={handleStop}>
      <animated.div
        className={`${styles.window} ${isFullscreen ? styles.fullscreen : ''}`}
        style={windowOpenStyle}
      >
        <animated.div style={headerStyle} id='header'>
          {isOpen && (
            <Header title={title} minimizeHandler={clickHandler} />
          )}
        </animated.div>
        <div className={`${styles.content} ${isOpen && styles.contentPadding}`}>
          {isOpen && (
            <animated.div style={contentStyle}>
              {children}
            </animated.div>
          )}
        </div>
      </animated.div>
    </Draggable>
  );
}