import React, { useEffect, useState } from 'react';
import PlaylistRow from '../components/PlaylistRow';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, []);

    return playlists.map((playlist, ix) => (
        <PlaylistRow key={`playlist-${ix}`} playlist={playlist}  />
    ))
}

export default Playlists;
