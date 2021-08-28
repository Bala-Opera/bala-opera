import { useRouter } from 'next/router'
import { useState } from 'react'

import Window from '../../components/Window/window'

import styles from './issue.module.scss'
import Copy from '../../copy/issue/0'
import Button from '../../components/Button/button'

export default function Issue0() {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const handleMinimize = () => {
    setIsOpen(false)
    setTimeout(() => router.back(), 200)
  }

  return (
    <Window
      title={Copy.name}
      clickHandler={handleMinimize}
      isOpen={isOpen}
      isFullscreen
    >
      <div className={styles.container}>
        <div className={styles.concept}>
          <h3>[  CONCEPT  ]</h3>
          <p>{Copy.overview.concept}</p>
        </div>
        <div className={styles.participants}>
          <h3>[  PARTICIPANTS  ]</h3>
          <p>
            {Copy.overview.participants.map((participant, index) => (
              <span key={participant} className={styles[`color-${index + 1}`]}>
                {index > 0 ? (<span className={styles.separator}> / </span>) : ''}{participant}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className={styles.button}>
          <Button text="Enter" clickHandler={()=>console.log('enters')} />
        </div>
    </Window>
  )
}