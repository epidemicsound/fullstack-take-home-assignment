import React, { useState, useEffect } from "react";
import styles from "../App.module.css";
import logo from "../assets/logo.svg";
import { Link } from 'react-router-dom'

function Playlists() {
    const [newPlaylistName, setNewPlaylistName] = useState("")
    const [playlists, setPlaylists] = useState([]);

    function getAvailableId(ids) {
        let found = false
        let possibleId = 0
        while (!found) {
            if (ids.includes(possibleId)) {
                possibleId += 1
            }
            else {
                found = true
            }
        }
        return possibleId
    }


    function createPlaylist() {
        const ids = playlists.map((playlist) => (parseInt(playlist.id)))
        const possibleId = getAvailableId(ids)
        console.log(ids, possibleId)
        fetch("http://0.0.0.0:8000/playlists/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, mode: "cors", method: "POST", body: JSON.stringify({ "id": possibleId, "name": newPlaylistName, tracks: [] })
        }).then((res) => res.json()).then( // this should trigger a refresh of the page to directly load the new playlist but doesnt...
            fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" })
                .then((res) => res.json())
                .then((data) => setPlaylists(data))
        )
    }

    function removePlaylist(id) {
        fetch("http://0.0.0.0:8000/playlists/" + id, { mode: "cors", method: "DELETE" })
            .then((res) => res.json()).then(
                fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" }) // this should trigger a refresh of the page to directly load the deleted playlist but doesnt...
                    .then((res) => res.json())
                    .then((data) => setPlaylists(data)))
    }

    useEffect(() => {
        fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" })
            .then((res) => res.json())
            .then((data) => setPlaylists(data));
    }, []);

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
                            <Link to={"/Playlists/"} className={styles.active}>Playlists</Link>
                        </li>
                    </ul>
                </nav>
                <div>
                    <label>
                        New Playlist Name: <input name="newPLaylist" value={newPlaylistName}
                            onChange={e => setNewPlaylistName(e.target.value)} />
                    </label>
                    <button onClick={createPlaylist}>+</button>
                </div>
                {playlists.map((playlist) => (
                    <div key={playlist.id} >
                        <Link to={"/Playlists/" + playlist.id}>{playlist.id} - Name: {playlist.name}</Link>
                        <button onClick={f => removePlaylist(playlist.id)}>X</button>
                    </div> // TODO add PlaylistRow
                ))}
            </main >
        </>
    )
}

export default Playlists