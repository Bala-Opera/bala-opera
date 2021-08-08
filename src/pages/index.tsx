import Head from 'next/head'
import React, { ChangeEvent } from 'react'

import Button from '../components/Button/button'
import Dropdown from '../components/Dropdown/dropdown'
import TextInput from '../components/TextInput/textInput'
import Window from '../components/Window/window';

export default function Home() {

  return (
    <>
      <Head>
        <title>Bala Opera</title>
      </Head>

      <Window
        title="What?"
        dimension={{
          width: 800,
          height: 500,
        }}
        source={{ x: 800, y: 800 }}
        destination={{ x: 0, y: 0 }}
        clickHandler={() => setTimeout(() => console.log('removed'), 1000)}
      >
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
        <TextInput
          name='mailing-list'
          placeholder='Your email here'
          submitHandler={(e: React.SyntheticEvent) => console.log(e) }
        />
      </Window>
    </>
  )
}