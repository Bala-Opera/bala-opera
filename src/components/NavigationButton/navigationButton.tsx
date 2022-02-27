import Link from 'next/link'

import useMediaQuery, { MEDIA_SIZES } from '../../common/hooks/useMediaQuery'
import LeftArrow from '../../public/images/icons/left.svg'
import RightArrow from '../../public/images/icons/right.svg'
import styles from './navigationButton.module.scss'

export default function NavigationButton({
  text,
  href,
  isBackButton = false,
} : {
  text: string,
  href: string,
  isBackButton?: boolean,
}) {
  const mediaSize = useMediaQuery()
  const isNextTextHidden = mediaSize === MEDIA_SIZES.sm
  const isBackTextHidden = mediaSize === MEDIA_SIZES.md || mediaSize === MEDIA_SIZES.sm

  return (
    <Link href={href} replace>
      <div className={styles.navigationButton}>
          {!isBackButton && !isNextTextHidden && <p className={styles.navigationText}>{text}</p>}

          <div className={`${styles.default} ${styles.arrowContainer}`}>
            {isBackButton ? <LeftArrow /> : <RightArrow />}
          </div>

          {isBackButton && !isBackTextHidden && <p className={styles.navigationText}>{text}</p>}
      </div>
    </Link>
  )
}