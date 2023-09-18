import React, { useEffect, useState } from "react";
import TrackRow from "../rows/TrackRow";
import usePlaylists from "../../hooks/usePlaylists";
import useTracks from "../../hooks/useTracks";

function TracksTab() {
  const [tracks, setTracks] = useState([]);
  const { getAll: getAllPlaylists } = usePlaylists();
  const { getAll: getAllTracks } = useTracks();

  useEffect(() => {
    getAllTracks().then((data) => setTracks(data));
  }, []);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getAllPlaylists().then((data) => setPlaylists(data));
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
