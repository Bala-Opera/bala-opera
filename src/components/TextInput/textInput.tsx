import { ChangeEvent, useState, useEffect } from 'react'
import styles from './textInput.module.scss'

export default function TextInput({
  name,
  placeholder,
  submitHandler,
  isSubmitting,
  isSuccess,
  isError,
}: {
  name: string,
  placeholder: string,
  submitHandler?: (value: string) => any,
  isSubmitting?: boolean,
  isSuccess?: boolean,
  isError?: boolean,
}) {
  const [value, setValue] = useState('')
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  const submitChangeHandler = () => {
    submitHandler(value)
  }

  const updateInputValue = (text: string) => {
    const input = (document.querySelector(`input[name="${name}"]`) as HTMLInputElement)
    if (input)
      input.value = text
  }

  useEffect(() => {
    if (isSuccess) {
      updateInputValue('Thank you!')
      setTimeout(() => updateInputValue(''), 2000)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      updateInputValue('Error, sorry!')
      setTimeout(() => updateInputValue(''), 2000)
    }
  }, [isError])

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={inputChangeHandler}
        disabled={isSubmitting}
      />
      <input
        className={styles.submit}
        type="submit"
        value="Submit"
        onClick={submitChangeHandler}
        disabled={isSubmitting}
      />
    </div>
  );
}