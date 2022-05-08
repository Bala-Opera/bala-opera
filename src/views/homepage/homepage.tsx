import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import Button from '../../components/Button/button'
// import Dropdown from '../components/Dropdown/dropdown'
import TextInput from '../../components/TextInput/textInput'
import Window from '../../components/Window/window'
import IconOverlay from '../../components/IconOverlay/iconOverlay'

import styles from './homepage.module.scss'
import Copy from '../../copy/homepage'
import useWindowSize from '../../common/hooks/useWindowSize'
import useMediaQuery, { MEDIA_SIZES } from '../../common/hooks/useMediaQuery'
import useDeviceType, { DEVICE_TYPES } from '../../common/hooks/useDeviceType';
import { Dimension } from '../../common/types/animation'
import { server } from '../../config/server'
import {  getRandomInt } from '../../common/utils/random'

const CONFIG = {
  background: {
    getPath: (videoId: number) => `https://player.vimeo.com/video/${videoId}?background=1`,
    videoIds: [706381134, 706381264, 706381557, 706381589, 706381612],
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
    dimension: { width: 929, height: 442 }, // fixed dimension for lg screens
    getSource: (window: Dimension) => window ? ({
      x: window.width / 2,
      y: window.height,
    }) : null,
    getDestination: (window: Dimension) => window ? ({
      x: (window.width - CONFIG.whatWindow.dimension.width) / 2,
      y: (window.height - CONFIG.whatWindow.dimension.height) / 2,
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
    getSource: (window: Dimension) => window ? ({
      x: window.width / 2,
      y: window.height,
    }) : null,
    getDestination: (window: Dimension, mediaSize: string) => window ? ({
      x: (window.width - CONFIG.whatMailingList.getDimension(mediaSize).width) / 2,
      y: (window.height - CONFIG.whatMailingList.getDimension(mediaSize).height) / 2,
    }) : null,
    getErrorDimension: (mediaSize: string) => {
      const dimensions = {
        lg: { width: 458, height: 210 },
        md: { width: 608, height: 210 },
        sm: { width: 346, height: 194 },
      }
      return dimensions[mediaSize]
    },
  },
}

const STATUS = {
  none: 'NONE',
  success: 'SUCCESS',
  error: 'ERROR'
}

export default function Home() {
  /// [hasUserOpenedWhat] is used to keep animation open for closing animation
  const [hasUserOpenedWhat, setHasUserOpenedWhat] = useState(false)
  const [isWhatOpen, setIsWhatOpen] = useState(false)
  const [hasUserOpenedMailingList, setHasUserOpenedMailingList] = useState(false)
  const [isMailingListOpen, setIsMailingListOpen] = useState(false)
  const [isSubmittingMailingList, setIsSubmittingMailingList] = useState(false)
  const [mailingListStatus, setMailingListStatus] = useState(STATUS.none)
  const [showIssueTransition, setShowIssueTransition] = useState(false)
  const windowDimension = useWindowSize()
  const mediaSize = useMediaQuery()
  const navigate = useNavigate()
  const deviceType = useDeviceType()

  // gap css trait isn't working on table or mobile, adjust with margin
  const isGapAdjusted = deviceType === DEVICE_TYPES.tablet || deviceType === DEVICE_TYPES.mobile
  const isWhatFullscreen = mediaSize !== MEDIA_SIZES.lg || windowDimension?.height < CONFIG.whatWindow.dimension.height + 100

  const whatButtonHandler = () => {
    setIsWhatOpen(!isWhatOpen)
    if (isWhatOpen) {
      const delay = !isWhatFullscreen ? 260 : 0
      setTimeout(() => setHasUserOpenedWhat(false), delay)
    } else {
      setHasUserOpenedWhat(true)
    }
  }
  const mailingListWindowButtonHandler = () => {
    setMailingListStatus(STATUS.none)
    setIsMailingListOpen(!isMailingListOpen)
    if (isMailingListOpen) {
      setTimeout(() => setHasUserOpenedMailingList(false), 260)
    } else {
      setHasUserOpenedMailingList(true)
    }
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
    })
  }

  let mailingListSource = { x: 0, y: 0 }
  let mailingListDestination = { x: 0, y: 0 }
  if (hasUserOpenedMailingList) {
    mailingListSource = CONFIG.whatMailingList.getSource(windowDimension)
    mailingListDestination = CONFIG.whatMailingList.getDestination(windowDimension, mediaSize)
  }

  // until there's more issues, just make it a button for Issue 0
  const handleIssue0Button = () => {
    setShowIssueTransition(true)
    setTimeout(() => navigate(CONFIG.issues.getPath('0')), 400)
  }
  // const handleIssueSelection = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target
  //   event.preventDefault()
  //   navigate(CONFIG.issues.getPath(value))
  // }

  const getNextVideo = () => {
    const index = getRandomInt(0, CONFIG.background.videoIds.length) // RANDOM VIDEO
    return CONFIG.background.getPath(CONFIG.background.videoIds[index])
  }

  const playVideo = (videoSource?: string) => {
    if (!videoSource) {
      videoSource = getNextVideo()
    }
    const video = document.querySelector('#backgroundVideo') as HTMLVideoElement
    video.setAttribute('src', videoSource)
  }

  useEffect(() => {
    playVideo()
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
        <div style={{ margin: isGapAdjusted && mediaSize === MEDIA_SIZES.sm ? '16px 0' : 0 }}>
          <Button
            text="What?"
            isImportant={isWhatOpen}
            clickHandler={whatButtonHandler}
          /></div>
        {/* <div>
        <Dropdown
          name='Issues'
          options={CONFIG.issues.options}
          changeHandler={handleIssueSelection}
        /></div> */}
        <Button
          text="Issue 0"
          clickHandler={handleIssue0Button}
        /></div><div>
      </div>

      {hasUserOpenedWhat && (
        <Window
          title={CONFIG.whatWindow.title}
          dimension={CONFIG.whatWindow.dimension}
          source={CONFIG.whatWindow.getSource(windowDimension)}
          destination={CONFIG.whatWindow.getDestination(windowDimension)}
          isOpen={isWhatFullscreen ? true : isWhatOpen}
          isFullscreen={isWhatFullscreen}
          clickHandler={whatButtonHandler}
        >
          <div className={styles.whatContent}>
            <div className={styles.whatDescription}>
              <div>{Copy.WHAT[0]}</div>
              <div>{Copy.WHAT[1]}</div>
            </div>
            <div className={styles.whatFooter}>
              <div style={{ margin: isGapAdjusted ? '16px 0' : 0 }}>
                <Button
                  text={CONFIG.whatSocial.text}
                  clickHandler={socialButtonHandler}
                />
              </div>
              <div id={CONFIG.whatMailingList.id} >
                <Button
                  text={CONFIG.whatMailingList.text}
                  clickHandler={mailingListWindowButtonHandler}
                  isImportant={isMailingListOpen}
                />
              </div>
            </div>
          </div>
        </Window>)}

      {hasUserOpenedMailingList && (
        <Window
          title={CONFIG.whatMailingList.text}
          isOpen={isMailingListOpen}
          dimension={mailingListStatus === STATUS.error
            ? CONFIG.whatMailingList.getErrorDimension(mediaSize)
            : CONFIG.whatMailingList.getDimension(mediaSize)}
          source={mailingListSource}
          destination={mailingListDestination}
          clickHandler={mailingListWindowButtonHandler}
          animationDuration={100}
        >
          {mailingListStatus === STATUS.success
            ? <p className={styles.successMailing}>You've joined our mailing list.</p>
            : <>
              <TextInput
                name={CONFIG.whatMailingList.text}
                placeholder={CONFIG.whatMailingList.placeholder}
                submitHandler={addToMailingList}
                isSubmitting={isSubmittingMailingList}
              />
              {mailingListStatus === STATUS.error &&
                <p className={styles.errorMailing}>Your email could not be added. Please try again.</p>}
            </>
          }
        </Window>
      )}

      <div className={styles.background}>
        <iframe
          id="backgroundVideo"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen>
        </iframe>
      </div>

      {showIssueTransition && <div className={styles.issueTransition}></div>}

      <style global jsx>{`
        html, body {
          overflow: hidden;
          position: absolute;
        }
      `}</style>
    </>
  )
}
