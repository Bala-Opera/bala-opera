import Image from 'next/image'

import styles from './projectImage.module.scss'

export default function ProjectImage({
  src,
  width,
  height,
} : {
  src: string,
  width: number,
  height: number,
}) {
  return (
    <div className={styles.image}>
      <Image src={src} width={width} height={height} />
    </div>
  )
}