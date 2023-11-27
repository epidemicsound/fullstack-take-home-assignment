// PlaylistRow.js
import React, { useState } from "react";
import styles from "./PlaylistRow.module.css";
import TrackRow from "./TrackRow";

const PlaylistRow = ({ playlist, handleDeletePlaylist }) => {
    const [expanded, setExpanded] = useState(false);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this playlist?")) {
            handleDeletePlaylist(playlist.id);
        }
    };

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={styles.playlistRow} onClick={toggleExpansion}>
            <div className={styles.playlistInfo}>
                <h3 className={styles.playlistTitle}>{playlist.name}</h3>
                <p>{`${playlist.tracks.length} tracks`}</p>
                {/* You can add more details or styles for the playlistInfo */}
            </div>
            <div className={styles.playlistActions}>
                <button onClick={handleDelete} className={styles.deleteButton}>
                    Delete
                </button>
            </div>

            {expanded && (
                <div className={styles.trackList}>
                    {/* Display the list of tracks using the TrackRow component */}
                    {playlist.tracks.map((track, index) => (
                        <TrackRow key={index} track={track} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlaylistRow;
