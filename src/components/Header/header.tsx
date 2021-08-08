import { MouseEventHandler } from 'react';
import styles from './header.module.scss'

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
      <button className={styles.minimize} onClick={minimizeHandler}>-</button>
    </div>
  );
}