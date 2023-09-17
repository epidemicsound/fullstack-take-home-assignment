import React, { useEffect, useState } from "react";
import TrackRow from "../rows/TrackRow";

function TracksTab() {
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/tracks/`, { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/playlists/`, { mode: "cors" })
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
