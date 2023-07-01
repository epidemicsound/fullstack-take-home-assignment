import React, { useState } from "react";
import styles from "./Modal.module.css";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { addTrack, fetchPlaylist } from "../lib/playlist";

const Modal = ({ setIsOpen, id }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery("playlistsData", fetchPlaylist);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const AddTrack = useMutation(() => addTrack(selectedPlaylist, id));

  const handleAdd = async () => {
    if (!selectedPlaylist) return;
    await AddTrack.mutateAsync();
    queryClient.invalidateQueries("playlistsData");
    setIsOpen(false);
  };

  if (isLoading) return "Loading...";

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>select Playlist</h5>
          </div>
          <div className={styles.modalContent}>
            <ul style={{ listStyleType: "none" }}>
              {data?.map((playlist, ix) => (
                <li
                  onClick={() => setSelectedPlaylist(playlist.id)}
                  key={ix}
                  style={{
                    backgroundColor:
                      selectedPlaylist === playlist.id ? "#f5f5f5" : "white",
                    cursor: "pointer",
                  }}
                >
                  {playlist.name}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={handleAdd}>
                Add
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
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
