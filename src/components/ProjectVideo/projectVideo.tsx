import styles from './projectVideo.module.scss'

export default function ProjectVideo({
  src, type, poster,
} : {
  src: string,
  type?: string,
  poster?: string,
}) {
  return (
    <div className={styles.projectVideo}>
      <video controls className={styles.video} poster={poster}>
        <source src={src} type={type} />
        Your browser does not support this video.
      </video>
    </div>
  )
}