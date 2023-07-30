import React, { useState, useEffect } from "react";
import styles from "../App.module.css";
import logo from "../assets/logo.svg";
import { Link } from 'react-router-dom'
import TrackRow from "../components/TrackRow";
import AudioPlayer from "../components/AudioPlayer";

function addToPlaylist(track) {

}


function Tracks() {

    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState();
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
            .then((res) => res.json())
            .then((data) => setTracks(data));
        fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" })
            .then((res) => res.json())
            .then((data) => setPlaylists(data));
    }, []);

    const handlePlay = (track) => setCurrentTrack(track);
    return (
        <>
            <main className={styles.app}>
                <nav>
                    <img src={logo} className={styles.logo} alt="Logo" />
                    <ul className={styles.menu}>
                        <li>
                            <Link to={"/"} className={styles.active}>
                                Tracks
                            </Link>
                        </li>
                        <li>
                            <Link to={"/Playlists/"}>Playlists</Link>
                        </li>
                    </ul>
                </nav>
                {tracks.map((track, ix) => (
                    <TrackRow key={ix} track={track} handlePlay={handlePlay} addRemove="+" addRemoveFunction={f => addToPlaylist(track)} />
                ))}
            </main>
            {currentTrack && <AudioPlayer track={currentTrack} />}
        </>
    )

}

export default Tracks