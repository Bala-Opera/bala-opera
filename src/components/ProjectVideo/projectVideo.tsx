import styles from './projectVideo.module.scss'
import useMediaQuery, { MEDIA_SIZES } from '../../common/hooks/useMediaQuery'

export default function ProjectVideo({
  src, type, poster, customStyles,
} : {
  src: string,
  type?: string,
  poster?: string,
  customStyles?: Object,
}) {
  const mediaSize = useMediaQuery()
  const videoStyle = (mediaSize === MEDIA_SIZES.lg) ? customStyles : {}
  return (
    <div className={styles.projectVideo} key={src}>
      <video key={`${src}-video`} controls style={videoStyle} className={styles.video} poster={poster}>
        <source src={src} type={type} />
        Your browser does not support this video.
      </video>
    </div>
  )
}