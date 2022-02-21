import Image from 'next/image'

import styles from './projectImage.module.scss'

export default function ProjectImage({
  src, customStyles,
} : {
  src: string,
  customStyles: Object,
}) {
  return (
    <div className={styles.outer} style={customStyles} key={src}>
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