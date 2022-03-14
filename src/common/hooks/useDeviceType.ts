import { useEffect, useState } from 'react'

export const DEVICE_TYPES = {
  mobile: 'mobile',
  tablet: 'tablet',
  desktop: 'desktop',
}

export default function useDeviceType() {
  const [deviceType, setDeviceType] = useState(null)

  useEffect(() => {
    const userAgent = navigator.userAgent
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      return setDeviceType(DEVICE_TYPES.tablet);
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
        return setDeviceType(DEVICE_TYPES.mobile);
    }
    return setDeviceType(DEVICE_TYPES.desktop);
  }, [])

  return deviceType
}