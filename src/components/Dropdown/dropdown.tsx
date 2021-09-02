import { ChangeEventHandler, useState } from 'react'
import styles from './dropdown.module.scss'

import DownArrow from '../../public/images/icons/down.svg'
import UpArrow from '../../public/images/icons/up.svg'

type Option = { value: string, displayText: string };

const Option = (option: Option) => (
  <option className={`${styles.option} ${styles.default}`} value={option.value}>
    {option.displayText}
  </option>
)

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
        defaultValue=""
      >
        <option value="" disabled style={{ display: 'none' }}>{`Issue${options.length > 1 ? 's' : ''}`}</option>
        {options.map((option) => <Option key={option.value} {...option} />)}
      </select>
      <div className={`${styles.default} ${styles.arrowContainer}`}>
        {doesArrowPointDown ? <DownArrow /> : <UpArrow />}
      </div>
    </div>
  )
}