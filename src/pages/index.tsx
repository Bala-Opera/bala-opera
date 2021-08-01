import Head from 'next/head'
import { ChangeEvent } from 'react';

import Button from '../components/Button/button'
import Dropdown from '../components/Dropdown/dropdown'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bala Opera</title>
      </Head>
      <Button text='@bala_opera' clickHandler={() => console.log('Hello')} />
      <Dropdown
        name="test"
        options={[
          { value: '0', displayText: 'Issue 0' },
          { value: '1', displayText: 'Issue 1' },
          { value: '2', displayText: 'Issue 2' },
        ]}
        changeHandler={(event: ChangeEvent) => {
          const element = event.currentTarget as HTMLInputElement
          console.log(element.value);
        }}
        isInitialArrowUp
      />
    </>
  )
}