import Head from 'next/head'
import { useState } from 'react'

import Button from '../components/Button/button'
import Dropdown from '../components/Dropdown/dropdown'
import Window from '../components/Window/window'
import styles from './index.module.scss'
import Copy from '../copy/homepage'
import IconOverlay from '../components/IconOverlay/iconOverlay'
import useWindowSize from '../common/hooks/useWindowSize'
import useMediaQuery, { MEDIA_SIZES } from '../common/hooks/useMediaQuery'
import { Dimension } from '../common/types/animation'

const CONFIG = {
  iconOverlay: {
    totalIconCount: 11, // icon-0 to icon-10
    mechanics: {
      duration: 15000, // 15 seconds
      interval: 20000, // 20 seconds
    },
  },
  whatWindow: {
    title: 'What?',
    dimension: { width: 929, height: 566 }, // fixed dimension for lg screens
    getSource: (window: Dimension) => window ? ({
      x: window.width - 64,
      y: window.height - 64,
    }) : null,
    getDestination: (window: Dimension) => window ? ({
      x: (window.width - CONFIG.whatWindow.dimension.width) / 2,
      y: 120,
    }) : null,
  }
}

export default function Home() {
  /* What? */
  const [hasUserOpenedWhat, setHasUserOpenedWhat] = useState(false)
  const [isWhatOpen, setIsWhatOpen] = useState(false)
  const windowDimension = useWindowSize()
  const mediaSize = useMediaQuery()

  const whatButtonHandler = () => {
    setIsWhatOpen(!isWhatOpen)
    setHasUserOpenedWhat(true)
  }

  return (
    <>
      <Head>
        <title>Bala Opera</title>
      </Head>

      <h1 className={styles.sideBar}>
        <span>Bala</span>
        <span>Opera</span>
      </h1>

      <IconOverlay {...CONFIG.iconOverlay} />

      <div className={styles.footer}>
        <div>
        <Button
          text="What?"
          isImportant={isWhatOpen}
          clickHandler={whatButtonHandler}
        /></div><div>
        <Dropdown
          name='Issues'
          options={[{ value: 'Issue 0', displayText: 'Issue 0' }]}
          changeHandler={() => {}}
        /></div>
      </div>

      {hasUserOpenedWhat && (
      <Window
        title={CONFIG.whatWindow.title}
        dimension={CONFIG.whatWindow.dimension}
        source={CONFIG.whatWindow.getSource(windowDimension)}
        destination={CONFIG.whatWindow.getDestination(windowDimension)}
        isOpen={isWhatOpen}
        isFullscreen={mediaSize !== MEDIA_SIZES.lg}
        clickHandler={whatButtonHandler}
      >
        <div className={styles.whatDescription}>
          <div>{Copy.WHAT[0]}</div>
          <div>{Copy.WHAT[1]}</div>
        </div>
      </Window>)}

      <style global jsx>{`
        html, body {
          overflow: hidden;
        }
      `}</style>
    </>
  )
}
