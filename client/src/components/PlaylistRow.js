import React, { useState } from "react";
import styles from "../css/PlaylistRow.module.css";
import AudioPlayer from "./AudioPlayer";
import PlaylistTrack from "./PlaylistTrack";
import { removeTrackFromPlaylist } from "../api/PlaylistApi";

function PlaylistRow({ playlist, handlePlaylistDelete }) {
  const [isTracksVisible, setIsTracksVisible] = useState(false);
  const [currentTrack, setCurrentTrack] = useState();
  const [tracks, setTracks] = useState(playlist.tracks);

  const handlePlaylistClick = () => {
    setIsTracksVisible(!isTracksVisible);
  };

  const handlePlay = (track) => setCurrentTrack(track);
  const handleTrackDelete = async (trackId) => {
    await removeTrackFromPlaylist(playlist.id, trackId);

    const remainingTracks = tracks.filter((track) => track.id !== trackId);
    setTracks(remainingTracks);
  };

  return (
    <>
      <tr>
        <td className={styles.playlistTitle} onClick={handlePlaylistClick}>
          {playlist.title}
        </td>
        <td
          className={styles.playlistDelete}
          onClick={() => handlePlaylistDelete(playlist.id)}
        >
          <button className={styles.playlistDeleteBtn}>Delete</button>
        </td>
      </tr>
      {isTracksVisible
        ? tracks.map((track) => (
            <tr>
              <td>
                <PlaylistTrack
                  key={track.id}
                  track={track}
                  handlePlay={handlePlay}
                />
              </td>
              <td className={styles.playlistDelete}>
                <button
                  className={styles.playlistDeleteBtn}
                  onClick={() => handleTrackDelete(track.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        : null}

      {currentTrack ? <AudioPlayer track={currentTrack} /> : null}
    </>
  );
}

export default PlaylistRow;
