import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import styles from "../App.module.css";
import logo from "../assets/logo.svg";
import { Link } from 'react-router-dom'
import TrackRow from "../components/TrackRow";
import AudioPlayer from "../components/AudioPlayer";
import Select from 'react-select';

function removeFromPlaylist(rtrack, playlist) {
    playlist.tracks.pop(rtrack)
    fetch("http://0.0.0.0:8000/playlists/" + playlist.id + "/", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, mode: "cors", method: "PUT", body: JSON.stringify({ "id": playlist.id, "name": playlist.name, tracks: playlist.tracks })
    })
}

function PlaylistDetail() {
    const [playlist, setPlaylist] = useState({})
    const [playlistTracks, setPlayistTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState();
    const [allTracks, setAllTracks] = useState([])
    const [selectedTrack, setSelectedTrack] = useState({})
    const { id } = useParams();
    useEffect(() => {
        fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
            .then((res) => res.json())
            .then((data) => setAllTracks(data.map((track) => ({ label: track.title, value: track }))))

        fetch("http://0.0.0.0:8000/playlists/" + id, { mode: "cors" })
            .then((res) => res.json())
            .then((data) => {
                setPlaylist(data)
                setPlayistTracks(data.tracks)
            });
    }, []);

    function addToPlaylist() {
        let nTracks = playlist.tracks
        nTracks.push(selectedTrack.value)
        fetch("http://0.0.0.0:8000/playlists/" + playlist.id + "/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, mode: "cors", method: "PUT", body: JSON.stringify({ "id": playlist.id, "name": playlist.name, tracks: nTracks })
        })
    }

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
                <h2>Playlist: {playlist.name}</h2>
                <div>
                    <Select options={allTracks} value={selectedTrack} onChange={e => setSelectedTrack(e)} theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            text: 'black',
                            font: 'black',
                            primary25: 'black',
                            primary: 'black',
                            neutral80: 'black',
                            color: '#000',
                        },
                    })} />
                    <button onClick={addToPlaylist}>Add to Playlist</button>
                </div>

                {playlistTracks.map((track, ix) => (
                    <TrackRow key={ix} track={track} handlePlay={handlePlay} addRemove="-" addRemoveFunction={f => removeFromPlaylist(track, playlist)} />
                ))}
            </main>
            {currentTrack && <AudioPlayer track={currentTrack} />}
        </>
    )
}

export default PlaylistDetail