import { MouseEventHandler } from 'react';
import styles from './button.module.scss';
import useDeviceType, { DEVICE_TYPES } from '../../common/hooks/useDeviceType';

export default function Button({
  text,
  isImportant,
  isDisabled,
  clickHandler,
}: {
  text: string,
  isImportant?: boolean,
  isDisabled?: boolean,
  clickHandler: MouseEventHandler,
}) {
  const deviceType = useDeviceType()
  const buttonStyle = isDisabled ? styles.disabled : styles.button
  const background = isImportant ? styles.important : styles.default
  const isDesktop = deviceType === DEVICE_TYPES.desktop
  return (
    <button
      disabled={isDisabled}
      className={`${background} ${buttonStyle} ${isDesktop ? styles.desktopPadding : styles.nonDesktopPadding}`}
      onClick={clickHandler}>
      {text}
    </button>
  )
}