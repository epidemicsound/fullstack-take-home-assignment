import React, { useState, useRef, useEffect } from "react";
import styles from "./Modal.module.css";
import { useQueryClient, useMutation } from "react-query";
import { createPlaylist } from "../lib/playlist";

const Modal = ({ onClose }) => {
  const modalRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  // Close the modal when user clicks outside of the modal container
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const queryClient = useQueryClient();
  const playlistData = useMutation(() => createPlaylist(inputValue));

  const handleOkClick = async () => {
    await playlistData.mutateAsync();
    queryClient.invalidateQueries("playlistsData");
    onClose();
  };

  return (
    <>
      <div className={styles.darkBG} />
      <div className={styles.centered}>
        <div className={styles.modal} ref={modalRef}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Create Playlist</h5>
          </div>
          <div className={styles.modalContent}>
            <input
              type="text"
              value={inputValue}
              placeholder="amapiano mix 2023"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={handleOkClick}>
                Add
              </button>
              <button className={styles.cancelBtn} onClick={() => onClose()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
