import React, { useEffect, useState } from 'react';
import TrackRow from '../components/TrackRow';

const Tracks = (props) => {
  const { setCurrentTrack } = props;

  const [tracks, setTracks] = useState([]);
  const handlePlay = (track) => setCurrentTrack(track);

  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

    return tracks.map((track, ix) => (
        <TrackRow key={ix} track={track} handlePlay={handlePlay} />
    ))
}

export default Tracks;
