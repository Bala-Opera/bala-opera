import styles from './projectSpace.module.scss'

export default function ProjectSpace({
  customStyles,
} : {
  customStyles: Object,
}) {
  return (
    <div style={customStyles} className={styles.space}>
    </div>
  )
}