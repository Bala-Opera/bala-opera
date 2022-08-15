import { useEvents } from "yet-another-react-lightbox/core";
import styles from "./lightboxCloseButton.module.scss";

export const LightboxCloseButton = () => {
  const { publish } = useEvents();
  return (
    <button
      type="button"
      aria-label="Close"
      className={`yarl__button ${styles.button}`}
      aria-disabled="false"
      onClick={() => publish("close")}
    >
      <svg
        className="yarl__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="currentColor">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </g>
      </svg>
    </button>
  );
};
