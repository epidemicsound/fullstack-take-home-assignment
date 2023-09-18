import React from "react";
import styles from "./PlayButton.module.css";

function PlayButton({ isPlaying, onClick }) {
  return (
    <button
      className={styles.trackPlay}
      onClick={onClick}
      data-testid="play-button"
    >
      {isPlaying ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-testid="pause-svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 5H7V19H10V5ZM17 5H14V19H17V5Z"
            fill="#000"
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-testid="play-svg"
        >
          <path d="M20 12L8 5V19L20 12Z" fill="#000" />
        </svg>
      )}
    </button>
  );
}

export default PlayButton;
