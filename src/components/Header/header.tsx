import { MouseEventHandler } from 'react';
import styles from './header.module.scss'

const MinimizeIcon = () => (
<svg width="16" height="3" viewBox="0 0 16 3" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.minimizeIcon}>
  <path d="M0.046875 0.25V2.754H15.9569V0.25H0.046875Z" />
</svg>)

export default function Header({
  title,
  minimizeHandler,
}: {
  title: string,
  minimizeHandler?: MouseEventHandler<HTMLButtonElement>
}) {

  return (
    <div className={styles.header}>
      <p className={styles.text}>{title}</p>
      <button className={styles.minimize} onClick={minimizeHandler}>
        <MinimizeIcon />
      </button>
    </div>
  );
}