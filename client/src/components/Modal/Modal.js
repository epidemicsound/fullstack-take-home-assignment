import React from 'react';
import styles from './Modal.module.css';

const Modal = props => {
  const { show, children, header } = props;

  return (
    show && (
      <div className={styles.modal}>
        <h2>{header}</h2>
        <div className={styles.content}>{children}</div>
      </div>
    )
  );
};

export default Modal;
