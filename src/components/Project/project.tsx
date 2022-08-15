import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Window from '../Window/window'
import NavigationButton from '../NavigationButton/navigationButton'
import { Data, Link } from '../../common/types/issue'
import styles from './project.module.scss'
import Lightbox from '../Lightbox/lightbox'

export default function Project({
  issueId, data, previousProject, nextProject,
} : {
  issueId: string, data: Data, previousProject?: Link, nextProject?: Link,
}) {
  const navigate = useNavigate()
  const handleMinimize = () => {
    navigate(`/issue/${issueId}`, { state: { enter: 'rotate' }})
  }

  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false)
  const [lightboxIndex, setlightboxIndex] = useState<number>(0)
  const [images, setImages] = useState<any[]>([])
  
  useEffect(() => {
    const images = data.content.filter(el => {
      if (el.id.includes('image'))
        return true
    }).map((el, index) => ({
      ...el.props, 
      ...el.props.dimensions,
      id: el.id,
      index
    }))

    setImages(images)
  }, [data])
  
  return (
    <Window
      key={data.title}
      title={data.title}
      clickHandler={handleMinimize}
      isOpen
      animationDuration={500}
      isFullscreen
      hasContentPadding={false}
    >
      <div className={styles.project}>
        <h3 className={styles.displayTitle}>{data.displayTitle}</h3>
        <h4 className={styles.author}>{data.author}</h4>
        <div className={styles.content}>
          {
            data.content.map(({ Component, props, id }) => {
              if (id.includes('image'))
                return <Component key={id} {...props} 
                  onClick={() => {
                    setlightboxIndex(images.find((el) => el.id === id).index || 0)
                    setIsLightboxOpen(true)
                  }}/>

              return <Component key={id} {...props} />
            }) 
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
      <Lightbox open={isLightboxOpen} index={lightboxIndex} setIsOpen={setIsLightboxOpen} images={images} />
    </Window>
  )
}