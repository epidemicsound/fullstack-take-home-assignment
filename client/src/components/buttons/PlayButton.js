import React from "react";
import styles from "./PlayButton.module.css";

function PlayButton({ onClick }) {
  return (
    <button className={styles.trackPlay} onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 12L8 5V19L20 12Z" fill="white" />
      </svg>
    </button>
  );
}

export default PlayButton;
