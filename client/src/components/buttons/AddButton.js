import React from "react";
import styles from "./AddButton.module.css";

function AddButton({ onClick }) {
  return (
    <button className={styles.addButton} onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 13V21H13V13H21V11H13V3H11V11H3V13H11Z"
        ></path>
      </svg>
    </button>
  );
}

export default AddButton;
