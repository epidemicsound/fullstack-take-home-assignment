import React from 'react';
import TrackRow from '../components/TrackRow';
import { useDispatch } from 'react-redux';
import { setCurrentTrack } from '../store/actions';

const Tracks = (props) => {
  const { tracks } = props;
  const dispatch = useDispatch();

  const handlePlay = (track) => dispatch(setCurrentTrack(track));
  
  return tracks.map((track, ix) => (
    <TrackRow key={ix} track={track} handlePlay={handlePlay} />
  ))
}

export default Tracks;
