import { MouseEventHandler } from 'react';
import styles from './button.module.scss';

export default function Button({
  text,
  isImportant,
  isDisabled,
  clickHandler,
}: {
  text: string,
  isImportant?: boolean,
  isDisabled?: boolean,
  clickHandler: MouseEventHandler,
}) {
  const buttonStyle = isDisabled ? styles.disabled : styles.button;
  const background = isImportant ? styles.important : styles.default;
  return (
    <button disabled={isDisabled} className={`${background} ${buttonStyle}`} onClick={clickHandler}>
      {text}
    </button>
  )
}