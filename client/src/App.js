import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import Playlist from "./components/Playlist";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  const handlePlay = track => setCurrentTrack(track);

  const [playlists, setPlaylists] = useState([]);

  const [lookup, setLookup] = useState({});

  const trackLookup = id => lookup[id];
  const trackCandidates = ids => tracks.filter(t => !(new Set(ids)).has(t.id))

  const [playlistTitle, setPlaylistTitle] = React.useState('');
  const handlePlaylistTitleChange =
    event => setPlaylistTitle(event.target.value);

  const localFetch =
    (method, path, options = {}) =>
      fetch(
        `http://0.0.0.0:8000${path}`,
        Object.assign({ method: method, mode: "cors" }, options)
      );

  useEffect(() => {
    localFetch('GET', '/tracks/')
      .then(res => res.json())
      .then(data => {
        setTracks(data);
        setLookup(Object.fromEntries(data.map(t => [ t.id, t ])));
        localFetch('GET', '/playlists/')
          .then(res => res.json())
          .then(data => setPlaylists(data));
      });
  }, []);

  const addToPlaylist =
    (playlist, track_id) =>
      localFetch('PUT', `/listings/${playlist.id}-${track_id}/`);

  const removeFromPlaylist =
    (playlist, track_id) =>
      localFetch('DELETE', `/listings/${playlist.id}-${track_id}/`);

  const deletePlaylist = (playlist) =>
    localFetch('DELETE', `/playlists/${playlist.id}/`)
      .then(res =>
        setPlaylists(playlists.filter((item) => item.id !== playlist.id)));

  const playlistId = () =>
    Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

  const handleSubmit = event => {
    if (playlistTitle) {
      const playlist = {title: playlistTitle, id: playlistId(), tracks: []}

      localFetch(
        'POST',
        '/playlists/',
        {headers: {'Content-Type': 'application/json'}, body: JSON.stringify(playlist)}
      )
        .then(res => res.json())
        .then(data => { setPlaylists(playlists.concat(data)); });
    }

    setPlaylistTitle('');

    event.preventDefault();
  };

  return (
    <>
      <main className={styles.app}>
        <img src={logo} className={styles.logo} alt="Logo" />

        <div className="playlists">
          <h2>Playlists</h2>

          {playlists.map((playlist, ix) => (
            <Playlist key={ix}
              playlist={playlist}
              handlePlay={handlePlay}
              deletePlaylist={deletePlaylist}
              removeFromPlaylist={removeFromPlaylist}
              addToPlaylist={addToPlaylist}
              trackLookup={trackLookup}
              trackCandidates={trackCandidates}
            />
          ))}

          <div>
            <h3>Create playlist</h3>

            <form className="playlist" onSubmit={handleSubmit}>
              <input type="text" value={playlistTitle} onChange={handlePlaylistTitleChange} />
              <button type="submit">+</button>
            </form>
          </div>
        </div>
      </main>

      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
}

export default App;
