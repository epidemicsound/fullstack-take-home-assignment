import React from "react";
import styles from "./TrackRow.module.css";

function PlaylistRow({playlist, goToList, deleteList}) {
    return (
        <div className={styles.trackRow}>
            <div className={playlist}>
                <div className={styles.trackTitle}>{playlist.name}</div>
            </div>
            <row>
                <div>
                    <button onClick={() => goToList(playlist.id)}> Go to playlist</button>
                </div>
            </row>
            <row>
                <div>
                    <button onClick={() => deleteList(playlist.id)}> Delete playlist</button>
                </div>
            </row>
        </div>
    );
}

export default PlaylistRow;
