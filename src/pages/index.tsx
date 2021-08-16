import Head from 'next/head'

import { useEffect, useState } from 'react'

import Button from '../components/Button/button'
import Dropdown from '../components/Dropdown/dropdown'
import Window from '../components/Window/window'
import styles from './index.module.scss'
import Copy from '../copy/homepage'
import IconOverlay from '../components/IconOverlay/iconOverlay'
import { getWindowDimensions } from '../common/utils/dom'

const CONFIG = {
  iconOverlay: {
    totalIconCount: 11, // icon-0 to icon-10
    mechanics: {
      duration: 15000, // 15 seconds
      interval: 20000, // 20 seconds
    },
  },
  whatWindow : {
    sourcePadding: 64,
  }
}

export default function Home() {
  /* What? */
  const [hasUserOpenedWhat, setHasUserOpenedWhat] = useState(false)
  const [windowDimension, setWindowDimension] = useState(null)
  const [isWhatOpen, setIsWhatOpen] = useState(false)
  const whatButtonHandler = () => {
    setIsWhatOpen(!isWhatOpen)
    setHasUserOpenedWhat(true)
  }

  useEffect(() => {
    setWindowDimension(getWindowDimensions(window))
    const handleResize = () => {
      setWindowDimension(getWindowDimensions(window))
    }
    window.addEventListener('resize', handleResize)
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
        title="What?"
        dimension={{ width: 929, height: 566 }}
        source={windowDimension
          ? {
              x: windowDimension.width - CONFIG.whatWindow.sourcePadding,
              y: windowDimension.height - CONFIG.whatWindow.sourcePadding,
            }
          :  { x: 0, y: 0}
        }
        destination={windowDimension
          ? { x: (windowDimension.width / 2) - (929 / 2), y: 120 }
          : { x: 0, y: 0}
        }
        isOpen={isWhatOpen}
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
