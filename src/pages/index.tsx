import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef, ChangeEvent } from 'react'

import Button from '../components/Button/button'
import Dropdown from '../components/Dropdown/dropdown'
import TextInput from '../components/TextInput/textInput'
import Window from '../components/Window/window'
import IconOverlay from '../components/IconOverlay/iconOverlay'

import styles from './index.module.scss'
import Copy from '../copy/homepage'
import useWindowSize from '../common/hooks/useWindowSize'
import useMediaQuery, { MEDIA_SIZES } from '../common/hooks/useMediaQuery'
import { Dimension } from '../common/types/animation'
import { server } from '../config/server'
import { getRandomInt, createIndexArray } from '../common/utils/random'

const CONFIG = {
  background: {
    totalVideos: 33,
    getPath: (videoId: number) => `./videos/homepage/homepage-${videoId}.mp4`
  },
  iconOverlay: {
    totalIconCount: 11, // icon-0 to icon-10
    mechanics: {
      duration: 15000, // 15 seconds
      interval: 20000, // 20 seconds
    },
  },
  issues: {
    getPath: (name: string) => (`/issue/${name}`),
    options: [
      { value: '0', displayText: 'Issue 0', link: '/issue/0' },
    ],
  },
  whatWindow: {
    title: 'What?',
    dimension: { width: 929, height: 584 }, // fixed dimension for lg screens
    getSource: (window: Dimension) => window ? ({
      x: window.width - 64,
      y: window.height - 64,
    }) : null,
    getDestination: (window: Dimension) => window ? ({
      x: (window.width - CONFIG.whatWindow.dimension.width) / 2,
      y: 120,
    }) : null,
  },
  whatSocial: {
    url: 'https://www.instagram.com/balaopera/',
    text: '@bala_opera',
  },
  whatMailingList: {
    id: 'mailingListButton',
    text: 'Join Mailing List',
    placeholder: 'Your email here',
    getDimension: (mediaSize: string) => {
      const dimensions = {
        lg: { width: 458, height: 122 },
        md: { width: 608, height: 163 },
        sm: { width: 346, height: 125 },
      }
      return dimensions[mediaSize]
    },
    getSource: (document: HTMLDocument, mediaSize: string) => {
      const target = document.querySelector(`#${CONFIG.whatMailingList.id}`)
      if (target) {
        const { left, top, width, height } = target.getBoundingClientRect()
        const x = left + width / 2
        const y = top + height / 2
        const mappingFunctions = {
          lg: { x, y: y - 100 },
          md: { x, y: y - 100 },
          sm: { x: x - 20, y: y - 100 },
        }
        return mappingFunctions[mediaSize]
      }
      return { width: document.body.clientWidth, height: document.body.clientHeight }
    },
    getDestination: (document: HTMLDocument, mediaSize: string) => {
      const target = document.querySelector(`#${CONFIG.whatMailingList.id}`)
      if (target) {
        const { left, top } = target.getBoundingClientRect()
        const mappingFunctions = {
          lg: { x: left - 150, y: top - 200 },
          md: { x: left - 450, y: top - 250 },
          sm: { x: left - 220, y: top - 220 },
        }
        return mappingFunctions[mediaSize]
      }
      return { width: document.body.clientWidth, height: document.body.clientHeight }
    }
  },
}

const STATUS = {
  none: 'NONE',
  success: 'SUCCESS',
  error: 'ERROR'
}

export default function Home() {
  const initVideoSources = () => createIndexArray(CONFIG.background.totalVideos)

  const [hasUserOpenedWhat, setHasUserOpenedWhat] = useState(false)
  const [isWhatOpen, setIsWhatOpen] = useState(false)
  const [hasUserOpenedMailingList, setHasUserOpenedMailingList] = useState(false)
  const [isMailingListOpen, setIsMailingListOpen] = useState(false)
  const [isSubmittingMailingList, setIsSubmittingMailingList] = useState(false)
  const [mailingListStatus, setMailingListStatus] = useState(STATUS.none)
  const [videoSources, setVideoSources] = useState(initVideoSources())
  const nextVideo = useRef(null)
  const windowDimension = useWindowSize()
  const mediaSize = useMediaQuery()
  const router = useRouter()

  const whatButtonHandler = () => {
    setIsWhatOpen(!isWhatOpen)
    setHasUserOpenedWhat(true)
  }
  const mailingListWindowButtonHandler = () => {
    setIsMailingListOpen(!isMailingListOpen)
    setHasUserOpenedMailingList(true)
  }
  const socialButtonHandler = () => {
    window.open(CONFIG.whatSocial.url, '_blank').focus();
  }

  const addToMailingList = async (email: string) => {
    const response = await fetch(`${server}/api/mailing-list`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: `{ "email": "${email}" }`,
    })
    setIsSubmittingMailingList(true)

    response.json().then(res => {
      if (res.data) {
        setMailingListStatus(STATUS.success)
      } else {
        setMailingListStatus(STATUS.error)
      }
    }).catch(error => {
      setMailingListStatus(STATUS.error)
    }).finally(() => {
      setIsSubmittingMailingList(false)
      setMailingListStatus(STATUS.none)
    })
  }

  let mailingListSource = { x: 0, y: 0 }
  let mailingListDestination = { x: 0, y: 0 }
  if (hasUserOpenedMailingList) {
    mailingListSource = CONFIG.whatMailingList.getSource(document, mediaSize)
    mailingListDestination = CONFIG.whatMailingList.getDestination(document, mediaSize)
  }

  const handleIssueSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    event.preventDefault()
    router.push(CONFIG.issues.getPath(value))
  }

  const getNextVideo = () => {
    const index = getRandomInt(0, videoSources.length)
    const source = videoSources.splice(index, 1)[0]
    if (videoSources.length) {
      setVideoSources(videoSources)
    } else {
      setVideoSources(initVideoSources())
    }
    return CONFIG.background.getPath(source)
  }
  const playVideo = (videoSource?: string) => {
    if (!videoSource) {
      videoSource = getNextVideo()
    }
    const video = document.querySelector('#backgroundVideo') as HTMLVideoElement
    video.setAttribute('src', videoSource)
    video.play()
  }
  const loadVideo = async () => {
    const video = document.querySelector('#preloadVideo') as HTMLVideoElement
    const source = getNextVideo()
    video.setAttribute('src', source)
    video.load()
    nextVideo.current = source
  }
  const videoEndedHandler = () => {
    playVideo(nextVideo.current)
    loadVideo()
  }
  
  useEffect(() => {
    playVideo()
    loadVideo()
    const backgroundVideo = document.querySelector('#backgroundVideo')
    backgroundVideo.addEventListener('ended', videoEndedHandler, false);
    return () => {
      backgroundVideo.removeEventListener('ended', videoEndedHandler, false);
    }
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
          options={CONFIG.issues.options}
          changeHandler={handleIssueSelection}
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
        <div className={styles.whatFooter}>
          <div>
            <Button
              text={CONFIG.whatSocial.text}
              clickHandler={socialButtonHandler}
            />
          </div>
          <div id={CONFIG.whatMailingList.id}>
            <Button
              text={CONFIG.whatMailingList.text}
              clickHandler={mailingListWindowButtonHandler}
              isImportant={isMailingListOpen}
            />
          </div>
        </div>
      </Window>)}

      {hasUserOpenedMailingList && (
        <Window
          title={CONFIG.whatMailingList.text}
          isOpen={isMailingListOpen}
          dimension={CONFIG.whatMailingList.getDimension(mediaSize)}
          source={mailingListSource}
          destination={mailingListDestination}
          clickHandler={mailingListWindowButtonHandler}
        >
          <TextInput
            name={CONFIG.whatMailingList.text}
            placeholder={CONFIG.whatMailingList.placeholder}
            submitHandler={addToMailingList}
            isSubmitting={isSubmittingMailingList}
            isSuccess={mailingListStatus === STATUS.success}
            isError={mailingListStatus === STATUS.error}
          />
        </Window>
      )}

      <video playsInline muted className={styles.background} id="backgroundVideo" />
      <video muted className={styles.preload} id="preloadVideo" />

      <style global jsx>{`
        html, body {
          overflow: hidden;
        }
      `}</style>
    </>
  )
}
