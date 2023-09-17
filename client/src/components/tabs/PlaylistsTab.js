import React, { useEffect, useState } from "react";
import PlaylistRow from "../PlaylistRow";

function PlaylistsTab() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, []);

  return (
    <div>
      {playlists.map((playlist, idx) => (
        <PlaylistRow key={idx} playlist={playlist} />
      ))}
    </div>
  );
}

export default PlaylistsTab;
