import React from "react";
import styles from "./TrackRow.module.css";

function TrackRow({track, handlePlay, addOrDeleteFromPlaylist}) {
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
                        <path d="M20 12L8 5V19L20 12Z" fill="white"/>
                    </svg>
                </button>
                <div className={styles.trackInfo}>
                    <div className={styles.trackTitle}>{track.title}</div>
                    <div className={styles.trackArtist}>
                        {track.main_artists.join(", ")}
                    </div>
                </div>
            <row>
                <div>
                    <button onClick={() => addOrDeleteFromPlaylist(track)}> Add to/delete from playlist</button>
                </div>
            </row>
        </div>
    );
}

export default TrackRow;
