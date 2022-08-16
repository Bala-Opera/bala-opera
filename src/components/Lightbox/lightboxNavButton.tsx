import { useEvents } from "yet-another-react-lightbox/core";
import styles from "./lightboxNavButton.module.scss";
import "yet-another-react-lightbox/styles.css";

interface NavButtonProps {
  direction: "prev" | "next";
}

export const LightboxNavButton = ({ direction }: NavButtonProps) => {
  const { publish } = useEvents();
  return (
    <button
      type="button"
      aria-label={`${direction === "prev" ? "Previous" : "Next"}`}
      className={`yarl__button ${
        direction === "prev"
          ? "yarl__navigation_prev " + styles.posPrev
          : "yarl__navigation_next " + styles.posNext
      }`}
      aria-disabled="false"
      onClick={() => publish(direction)}
    >
      <div className={styles.navigationButton}>
        <div className={`${styles.default} ${styles.arrowContainer}`}>
          <svg
            className={styles.arrow}
            width={10}
            height={16}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {direction === "prev" ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.44 1.985 7.734.28.565 8l7.17 7.72 1.705-1.705L3.926 8 9.44 1.985Z"
                fill="#008"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.44 8 2.27.28.566 1.985 6.08 8 .565 14.015l1.706 1.706L9.44 8Z"
                fill="#008"
              />
            )}
          </svg>
        </div>
      </div>
    </button>
  );
};
