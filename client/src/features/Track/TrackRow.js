import React from "react";
import styles from "./TrackRow.module.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TrackRow({ track, handleDeleteTrackFromPlaylist, showAdd, handlePlay, handleAddButtonClick }) {
  return (
    <div className={styles.trackRow}>
      <button className={styles.trackPlay} onClick={() => handlePlay(track)}>
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
      <div className={styles.trackInfo}>
        <div className={styles.trackTitle}>{track.title}</div>
        <div className={styles.trackArtist}>
          {track.main_artists.join(", ")}
        </div>
      </div>


      {showAdd === true?
      <button onClick={() => handleAddButtonClick(track)} className={styles.addIcon} name="add_button">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C11.4477 2 11 2.44772 11 3V9H5C4.44772 9 4 9.44772 4 10C4 10.5523 4.44772 11 5 11H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V11H19C19.5523 11 20 10.5523 20 10C20 9.44772 19.5523 9 19 9H13V3C13 2.44772 12.5523 2 12 2Z"
            fill="white"
            stroke="white"
            strokeWidth="2"
          />
        </svg>

      </button>: <button className={styles.deleteIcon} >
      <IconButton   onClick={()=> {handleDeleteTrackFromPlaylist(track.id)}} style={{ color: "#fff" }}>
      <DeleteIcon />
    </IconButton></button>}
    </div>
  );
}

export default TrackRow;
