import React, { useEffect, useState } from "react";
import TrackRow from "../rows/TrackRow";

function TracksTab() {
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  return (
    <div>
      {tracks.map((track, idx) => (
        <TrackRow key={idx} track={track} />
      ))}
    </div>
  );
}

export default TracksTab;
