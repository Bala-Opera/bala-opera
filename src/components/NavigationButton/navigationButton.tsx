import Link from 'next/link'

import useMediaQuery, { MEDIA_SIZES } from '../../common/hooks/useMediaQuery'
import styles from './navigationButton.module.scss'

const LeftArrow = (props) => (
  <svg
    className={styles.arrow}
    width={10}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.44 1.985 7.734.28.565 8l7.17 7.72 1.705-1.705L3.926 8 9.44 1.985Z"
      fill="#008"
    />
  </svg>
)

const RightArrow = (props) => (
  <svg
    className={styles.arrow}
    width={10}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.44 8 2.27.28.566 1.985 6.08 8 .565 14.015l1.706 1.706L9.44 8Z"
      fill="#008"
    />
  </svg>
)

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