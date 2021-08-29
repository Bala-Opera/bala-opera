import styles from './projectText.module.scss'

export default function ProjectText({ text } : { text: string }) {
  return (
    <p className={styles.text}>{text}</p>
  )
}