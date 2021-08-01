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
  const handleClick = () => clickHandler();
  return (
    <button className={`${background} ${styles.button}`} onClick={handleClick}>
      {text}
    </button>
  )
}