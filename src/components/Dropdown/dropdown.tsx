import { ChangeEventHandler, useState, useEffect } from 'react'
import styles from './dropdown.module.scss'

import DownArrow from '../../public/images/down.svg'
import UpArrow from '../../public/images/up.svg'

type Option = { value: string, displayText: string };

export default function Dropdown({
  name,
  options,
  changeHandler,
  isInitialArrowUp = false,
}: {
  name: string,
  options: Array<Option>,
  changeHandler: ChangeEventHandler,
  isInitialArrowUp?: boolean,
}) {
  const [doesArrowPointDown, setdoesArrowPointDown] = useState(!isInitialArrowUp);

  const toggleOpen = () => {
    setdoesArrowPointDown(!doesArrowPointDown);
  }

  return (
    <div className={styles.dropdown}>
      <select
        id="dropdown"
        name={name}
        onClick={toggleOpen}
        onChange={changeHandler}
        className={styles.default}
      >
        {options.map((option) => (
          <option
            key={option.value}
            className={`${styles.option} ${styles.default}`}
            value={option.value}
          >
            {option.displayText}
          </option>
        ))}
      </select>
      <div className={`${styles.default} ${styles.arrowContainer}`}>
        {doesArrowPointDown ? <DownArrow /> : <UpArrow />}
      </div>
    </div>
  )
}