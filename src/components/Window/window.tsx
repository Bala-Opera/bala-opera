import { useState } from 'react';
import { useSpring, animated } from 'react-spring'
import Draggable from 'react-draggable';

import styles from './window.module.scss'
import Header from '../Header/header'
import { Dimension, Position } from '../../common/types/animation'

const positionToStyle = (position: Position) => ({ left: position.x, top: position.y })

// TODO: need to make it so that dimension, source, and destination isn't required or vice versa

export default function Window({
  title,
  dimension,
  source,
  destination,
  isFullscreen = false,
  animationDuration = 400,
  clickHandler,
  children,
}: {
  title: string,
  dimension?: Dimension,
  source?: Position,
  destination?: Position
  isFullscreen?: boolean,
  isMinimized?: boolean,
  animationDuration?: number,
  clickHandler?: Function,
  children?: React.ReactNode,
}) {
  const [isOpen, setIsOpen] = useState(true)
  const toggleWindow = () => {
    setIsOpen(!isOpen);
    clickHandler();
  }

  const windowOpenStyle = useSpring({
    from: {
      transform: `translate3d(${source.x}, ${source.y}, 0) scale(0)`,
      width: 0,
      height: 0,
      ...positionToStyle(source),
    },
    to: {
      transform: 'translate3d(0, 0, 0) scale(1)',
      ...dimension,
      ...positionToStyle(destination),
    },
    reverse: !isOpen,
    reset: !isOpen,
    config: { duration: animationDuration },
  })
  const headerStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1, cursor: 'move' },
    delay: animationDuration + 200,
  })
  const contentStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: animationDuration + 400,
  })

  return (
    <Draggable handle='#header'>
      <animated.div
        className={`${styles.window} ${isFullscreen ? styles.fullscreen : ''}`}
        style={windowOpenStyle}
      >
        <animated.div style={headerStyle} id='header'>
          {isOpen && (
            <Header title={title} minimizeHandler={toggleWindow} />
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