import { useRouter } from 'next/router'
import React, { useState } from 'react'

import Window from '../Window/window'
import NavigationButton from '../NavigationButton/navigationButton'
import { Data, Link } from '../../common/types/issue'
import styles from './project.module.scss'

export default function Project({
  issueId, data, previousProject, nextProject,
} : {
  issueId: string, data: Data, previousProject?: Link, nextProject?: Link,
}) {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const handleMinimize = () => {
    setIsOpen(false)
    setTimeout(() => router.push(`/issue/${issueId}`), 200)
  }

  return (
    <Window
      key={data.title}
      title={data.title}
      clickHandler={handleMinimize}
      isOpen={isOpen}
      animationDuration={500}
      isFullscreen
      isFade
      isScrollable
      hasContentPadding={false}
    >
      <div className={styles.project}>
        <h3 className={styles.displayTitle}>{data.displayTitle}</h3>
        <h4 className={styles.author}>{data.author}</h4>
        <div className={styles.content}>
          {
            data.content.map(({ Component, props, id }) => (
              <Component key={id} {...props} />
            ))
          }
        </div>
        <div className={styles.links}>
          {
            data.links.map((link, index) => (
              <React.Fragment key={`${link.href}-unit`}>
                {index > 0 && <span key={`/${link.href}`} className={styles.separator}> / </span>}
                <a key={link.href} className={styles.link} href={link.href} target="_blank">{link.displayName}</a>
              </React.Fragment>
            ))
          }
        </div>
      </div>
      <div className={styles.footer}>
        {previousProject &&
          <div className={styles.button}>
            <NavigationButton href={previousProject.href} text={previousProject.displayName} isBackButton />
          </div>}
        {nextProject &&
          <div className={`${styles.button} ${styles.nextButton}`}>
            <NavigationButton href={nextProject.href} text={nextProject.displayName} />
          </div>}
      </div>
    </Window>
  )
}