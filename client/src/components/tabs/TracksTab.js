import React, { useEffect, useState } from "react";
import TrackRow from "../rows/TrackRow";

function TracksTab() {
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/playlists/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, []);
  return (
    <div>
      {tracks.map((track, idx) => (
        <TrackRow
          key={idx}
          track={track}
          showAddToPlaylistButton
          playlists={playlists}
        />
      ))}
    </div>
  );
}

export default TracksTab;
