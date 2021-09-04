import Image from 'next/image'

import styles from './projectImage.module.scss'

export default function ProjectImage({
  src,
} : {
  src: string,
}) {
  return (
    <div className={styles.outer}>
      <Image
        loader={() => src}
        src={src}
        layout="fill"
        objectFit="contain"
        loading="eager"
        className={styles.image}
      />
    </div>
  )
}