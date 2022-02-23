import styles from './projectText.module.scss'

export default function ProjectText({
  text,
  customStyles,
} : {
  text: string,
  customStyles?: Object,
}) {
  return (
    <p style={customStyles} className={styles.text}>{text}</p>
  )
}