import Image from 'next/image'

import styles from './projectImage.module.scss'
import { Dimension } from '../../common/types/animation'

export default function ProjectImage({
  src,
  blurDataURL,
  dimensions,
  width = null,
  priority = false,
  onClick
}: {
  src: string,
  blurDataURL: string,
  dimensions: Dimension,
  width?: string, // works best with percentages e.g. "100%"
  priority?: boolean,
  onClick?: () => void // used for first image of project above the fold
}) {
  const customStyle = { width }
  return (
    <div style={customStyle} className={styles.outer} key={src}
      onClick={onClick}>
      <Image
        src={src}
        priority={priority}
        width={dimensions.width}
        height={dimensions.height}
        blurDataURL={blurDataURL}
        placeholder="blur"
      />
    </div>
  )
}