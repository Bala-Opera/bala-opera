import styles from './projectSpace.module.scss'
import useMediaQuery from '../../common/hooks/useMediaQuery'

type HeightsByMediaQuery = {
  sm?: number,
  md?: number,
  lg?: number,
}

export default function ProjectSpace({
  heights = {},
} : {
  heights?: HeightsByMediaQuery,
}) {
  const mediaSize = useMediaQuery()
  const height = mediaSize ? heights[mediaSize] : null
  const customStyles = height ? { height: `${height}px`} : {}

  return (
    <div style={customStyles} className={styles.space}>
    </div>
  )
}