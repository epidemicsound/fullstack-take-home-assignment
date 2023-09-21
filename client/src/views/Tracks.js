import React from 'react';
import TrackRow from '../components/TrackRow';

const Tracks = (props) => {
  const { tracks, setCurrentTrack } = props;

  const handlePlay = (track) => setCurrentTrack(track);
  
  return tracks.map((track, ix) => (
    <TrackRow key={ix} track={track} handlePlay={handlePlay} />
  ))
}

export default Tracks;
