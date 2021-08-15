import Head from 'next/head'

import { useState } from 'react'

import Button from '../components/Button/button'
import Dropdown from '../components/Dropdown/dropdown'
import Window from '../components/Window/window'
import styles from './index.module.scss'
import Copy from '../copy/homepage'
import IconOverlay from '../components/IconOverlay/iconOverlay'

const CONFIG = {
  iconOverlay: {
    totalIconCount: 11, // icon-0 to icon-10
    mechanics: {
      duration: 15000, // 15 seconds
      interval: 20000, // 20 seconds
    }
  }
}

export default function Home() {
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

      <IconOverlay {...CONFIG.iconOverlay} />

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
