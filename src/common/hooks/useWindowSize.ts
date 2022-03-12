import { useEffect, useState } from 'react'
import { getWindowDimensions } from '../utils/dom'

export default function useBrowserSize() {
  const [windowDimension, setWindowDimension] = useState(null)

  useEffect(() => {
    setWindowDimension(getWindowDimensions(window))
    const handleResize = () => {
      setWindowDimension(getWindowDimensions(window))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimension
}