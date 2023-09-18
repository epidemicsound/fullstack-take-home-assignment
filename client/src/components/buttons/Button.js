import React from "react";
import styles from "./Button.module.css";

export const BUTTON_TYPES = {
  delete: "delete",
  submit: "submit",
  button: "button",
};
const classes = {
  [BUTTON_TYPES.delete]: styles.deleteButton,
  [BUTTON_TYPES.submit]: styles.submitButton,
  [BUTTON_TYPES.button]: styles.defaultButton,
};
function Button({ type, children, onClick }) {
  const className = `${styles.baseButton} ${
    classes[type] || classes[BUTTON_TYPES.default]
  }`;
  const innerType = type === BUTTON_TYPES.submit ? type : BUTTON_TYPES.button;

  return (
    <button
      className={className}
      onClick={onClick}
      type={innerType}
      data-testid="button"
    >
      {children}
    </button>
  );
}

export default Button;
