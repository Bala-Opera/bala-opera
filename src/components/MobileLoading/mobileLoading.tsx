import styles from './mobileLoading.module.scss'

export default function MobileLoading() {
  return (
    <div className={styles.mobileLoading}>
      <div className={styles.container}>
        <div className={styles.header}>
          Loading...
        </div>

        <p className={styles.notice}>
          Please rotate your device
        </p>
      </div>
    </div>
  )
}