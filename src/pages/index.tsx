import Head from 'next/head'
import Image from 'next/image'

import styles from './index.module.scss'
// import test from '../public/images/test.png'

export default function Home() {

  return (
    <>
      <Head>
        <title>Bala Opera</title>
      </Head>

      <h1 className={styles.sideBar}>
        <span>Bala</span>
        <span>Opera</span>
      </h1>

      <Image src='/images/test.png' alt='test icon' width={715} height={402} />
    </>
  )
}