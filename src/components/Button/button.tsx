import styles from './button.module.scss';

export default function Button({
  text,
  isImportant,
  clickHandler,
}: {
  text: string,
  isImportant?: boolean,
  clickHandler: Function,
}) {
  const background = isImportant ? styles.important : styles.default;
  return (
    <button
      className={`${background} ${styles.button} font-medium-label`}
      onClick={() => clickHandler()}
    >
      {text}
    </button>
  )
}