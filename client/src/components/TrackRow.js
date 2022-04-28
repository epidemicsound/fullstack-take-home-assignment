import React, {useState} from "react";
import styles from "./TrackRow.module.css";
import delete_icon from "../assets/delete.png"
import spotify_icon from "../assets/spotify.png"
import AddTrackToPlaylistChooser from "./AddTrack.js";

function TrackRow({track, handlePlay, refreshPlaylists, playlists, active, deleteTrack}) {

  const [playlist, setPlaylist] = useState()

  const saveTrackToPlaylist = (trackId) => {
    if (trackId) {
      const requestOptions = {
        method: 'PUT', headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify({"name": playlist.name, "tracks": [...playlist.tracks, trackId]})
      };
      fetch('http://localhost:8000/playlists/' + playlist.id + "/", requestOptions)
        .then(() => refreshPlaylists());
    }
  }

  const changePlaylist = (playlist) => {
    setPlaylist(playlist)
  }

  return (<div className={styles.trackRow}>
    <img height={50} width={50} alt={"track cover art"} src={track.cover_art} style={{paddingRight: 20}}/>
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
    <div>
      <a style={{paddingLeft: 20}} target={"_blank"} rel={"noreferrer"} href={track.spotify}><img alt={"Spotify link"} src={spotify_icon}/></a>
    </div>
    <div style={{paddingLeft: 20}}>
      {active === "Tracks" && <AddTrackToPlaylistChooser playlists={playlists} track={track}
                                                         changePlaylist={changePlaylist}
                                                         saveTrackToPlaylist={saveTrackToPlaylist}/>}
      {active === "Playlists" &&
        <img alt={"Delete Track"} onClick={() => deleteTrack(track.id)} src={delete_icon}/>}
    </div>
  </div>);
}

export default TrackRow;
