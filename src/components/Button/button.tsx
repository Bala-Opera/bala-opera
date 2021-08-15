import { MouseEventHandler } from 'react';
import styles from './button.module.scss';

export default function Button({
  text,
  isImportant,
  clickHandler,
}: {
  text: string,
  isImportant?: boolean,
  clickHandler: MouseEventHandler,
}) {
  const background = isImportant ? styles.important : styles.default;
  return (
    <button className={`${background} ${styles.button}`} onClick={clickHandler}>
      {text}
    </button>
  )
}