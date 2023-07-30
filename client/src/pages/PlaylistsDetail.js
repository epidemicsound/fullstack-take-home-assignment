import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import styles from "../App.module.css";
import logo from "../assets/logo.svg";
import { Link } from 'react-router-dom'
import TrackRow from "../components/TrackRow";
import AudioPlayer from "../components/AudioPlayer";


function removeFromPlaylist(track, playlist) {
    console.log("Trigger remove for ", track.title, playlist.id)
}

function PlaylistDetail() {
    const [playlist, setPlaylist] = useState({})
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState();
    const { id } = useParams();
    useEffect(() => {

        fetch("http://0.0.0.0:8000/playlists/" + id, { mode: "cors" })
            .then((res) => res.json())
            .then((data) => {
                setPlaylist(data)
                setTracks(data.tracks)
            });
    }, []);

    const handlePlay = (track) => setCurrentTrack(track);
    return (
        <>
            <main className={styles.app}>
                <nav>
                    <img src={logo} className={styles.logo} alt="Logo" />
                    <ul className={styles.menu}>
                        <li>
                            <Link to={"/"}>
                                Tracks
                            </Link>
                        </li>
                        <li>
                            <Link to={"/Playlists/"}>Playlists</Link>
                        </li>
                    </ul>
                </nav>
                <h2>Playlist:{playlist.name}</h2>

                {tracks.map((track, ix) => (
                    <TrackRow key={ix} track={track} handlePlay={handlePlay} addRemove="-" addRemoveFunction={f => removeFromPlaylist(track, playlist)} />
                ))}
            </main>
            {currentTrack && <AudioPlayer track={currentTrack} />}
        </>
    )
}

export default PlaylistDetail