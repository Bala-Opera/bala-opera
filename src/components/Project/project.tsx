import { useRouter } from 'next/router'
import { useState } from 'react'

import Window from '../Window/window'
import { Data } from '../../common/types/issue'
import styles from './project.module.scss'

export default function Project({ data } : { data: Data }) {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const handleMinimize = () => {
    setIsOpen(false)
    setTimeout(() => router.back(), 200)
  }

  return (
    <Window
      title={data.title}
      clickHandler={handleMinimize}
      isOpen={isOpen}
      isFullscreen
      isFade
      isScrollable
    >
      <div className={styles.project}>
        <h3 className={styles.displayTitle}>{data.displayTitle}</h3>
        <h4 className={styles.author}>{data.author}</h4>
        {
          data.content.map(({ Component, props, id }) => (
            <Component key={id} {...props} />
          ))
        }
      </div>
    </Window>
  )
}