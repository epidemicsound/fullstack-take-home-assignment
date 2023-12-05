import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

import TrackRow from "./components/TrackRow";

function Playlist({listId, name}) {
    const [tracks, setTracks] = useState([{id: 1, title: "song 1", main_artists:[":)", ":("]},
        {id: 2, title: "song 2", main_artists:["Yeayea"]},
        {id: 3, title: "wohooo!", main_artists:["Mmm"]}]);

    useEffect(() => {
        fetch("http://0.0.0.0:8000/playlists/" + listId, { mode: "cors" })
            .then((res) => res.json())
            .then((data) => setTracks(data));
    }, []);


    const deleteTrack = (trackId) => {
        // This is not how the tracks are stored, find out how they are
        fetch("http://0.0.0.0:8000/playlists/" + listId + "/" + trackId, {
            method: 'delete',
            mode: "cors"
        })
            .then((res) => console.log("Got following response:", res, " Playlist deleted."));
    }


    return (
        <>
            <main className={styles.app}>
                {name}
                {tracks.map((track, ix) => (
                    <TrackRow key={ix} track={track} handlePlay={{}} addOrDeleteFromPlaylist={deleteTrack()}/>
                ))}
            </main>
        </>
    );
}

export default Playlist;
