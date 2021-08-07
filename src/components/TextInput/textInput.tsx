import { ChangeEvent, useState } from 'react'
import styles from './textInput.module.scss'

export default function TextInput({
  name,
  placeholder,
  submitHandler,
}: {
  name: string,
  placeholder: string,
  submitHandler?: Function,
}) {
  const [value, setValue] = useState('');
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const submitChangeHandler = () => submitHandler(value);

  return (
    <div>
      <input
        className={styles.input}
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={inputChangeHandler}
      />
      <input className={styles.submit} type="submit" onClick={submitChangeHandler} />
    </div>
  );
}