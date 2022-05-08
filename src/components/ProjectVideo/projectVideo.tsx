import styles from './projectVideo.module.scss'

export default function ProjectVideo({
  videoId, height,
}: {
  videoId: number,
  height: number,
  customStyles?: Object,
}) {
  return (
    <div className={styles.projectVideo} key={videoId}>
      <iframe
        src={`https://player.vimeo.com/video/${videoId}`}
        width="100%"
        height={height}
        frameBorder="0"
        allow="fullscreen">
      </iframe>
    </div>
  )
}