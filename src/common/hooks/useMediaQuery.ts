import { useEffect, useState } from 'react'

export const MEDIA_SIZES = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  default: 'none',
}

export default function useMediaQuery() {
  const [mediaSize, setMediaSize] = useState(MEDIA_SIZES.default)

  const mediaMapping = {
    sm: {
      query: '(max-width: 768px)',
      handler: (e: MediaQueryListEvent) => (e.matches) && setMediaSize(MEDIA_SIZES.sm),
    },
    md: {
      query: '(min-width: 768px) and (max-width: 992px)',
      handler: (e: MediaQueryListEvent) => (e.matches) && setMediaSize(MEDIA_SIZES.md),
    },
    lg: {
      query:  '(min-width: 992px)',
      handler: (e: MediaQueryListEvent) => (e.matches) && setMediaSize(MEDIA_SIZES.lg),
    },
  }

  const updateIconSizing = () => Object.keys(mediaMapping).map((key) => {
    const { query, handler } = mediaMapping[key]
    const media = window.matchMedia(query)
    media.addEventListener('change', handler)
    if (media.matches) {
      setMediaSize(key)
    }
    return { media, handler }
  })

  useEffect(() => {
    const watchMedias = updateIconSizing()
    return () => {
      watchMedias.forEach(({ media, handler }) => {
        media.removeEventListener('change', handler)
      })
    }
  }, [])

  return mediaSize
}