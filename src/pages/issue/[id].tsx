import { useRouter } from 'next/router'
import { useState } from 'react'

import Window from '../../components/Window/window'
import Button from '../../components/Button/button'

import styles from './issue.module.scss'
import Issue_0 from '../../copy/issue/0'

const ISSUES = [Issue_0]

type Overview = {
  concept: string,
  participants: Array<string>,
}

export default function Issue({ name, overview } : {
  name: string,
  overview: Overview,
}) {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const handleMinimize = () => {
    setIsOpen(false)
    setTimeout(() => router.back(), 200)
  }

  return (
    <Window
      title={name}
      clickHandler={handleMinimize}
      isOpen={isOpen}
      isFullscreen
    >
      <div className={styles.container}>
        <div className={styles.concept}>
          <h3>[  CONCEPT  ]</h3>
          <p>{overview.concept}</p>
        </div>
        <div className={styles.participants}>
          <h3>[  PARTICIPANTS  ]</h3>
          <p>
            {overview.participants.map((participant, index) => (
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

export async function getStaticPaths() {
  const paths = ISSUES.map((issue, index) => ({
    params: { id: index.toString() },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const issue = ISSUES[params.id]
  return { props: { name: issue.name, overview: issue.overview } }
}