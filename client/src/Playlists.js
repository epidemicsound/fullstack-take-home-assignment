import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import {useNavigate} from "react-router-dom";

import PlaylistRow from "./components/PlaylistRow";

function Playlists() {
    const [playlists, setPlaylists] = useState([{id: 1, name: "wow a playlist"},{id: 2, name: "another one??"},{id: 3, name: "escheschesche"}]);

    useEffect(() => {
        fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" })
            .then((res) => res.json())
            .then((data) => setPlaylists(data));
    }, []);


    const deleteList = (id) => {
        // Check if the user is sure.
        fetch("http://0.0.0.0:8000/playlists/" + id, {
            method: 'delete',
            mode: "cors"
        })
            .then((res) => console.log("Got following response:", res, " Playlist deleted."));
    }

    return (
        <>
            <main className={styles.app}>
                <p>Hello</p>
                <button> Create new playlist </button>
                {playlists.map((playlist, ix) => (
                    <PlaylistRow key={ix} playlist={playlist} deleteList={deleteList}/>
                ))}
            </main>
        </>
    );
}

export default Playlists;
