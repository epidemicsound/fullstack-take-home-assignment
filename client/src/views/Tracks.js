import React, { useState } from 'react';
import TrackRow from '../components/TrackRow';
import { useDispatch } from 'react-redux';
import { setCurrentTrack } from '../store/actions';
import useContextMenu from '../hooks/useContextMenu';
import TrackRowContextMenu from '../components/TrackRowContextMenu';

const Tracks = props => {
  const { tracks, playlistId } = props;
  const dispatch = useDispatch();
  const { clicked, setClicked, points, setPoints } = useContextMenu();
  const [selectedTrackId, setSelectedTrackId] = useState(null);

  const handlePlay = track => dispatch(setCurrentTrack(track));

  return (
    <>
      {tracks.map((track, ix) => (
        <div
          key={ix}
          onContextMenu={e => {
            e.preventDefault();
            setClicked(true);
            setPoints({
              x: e.pageX,
              y: e.pageY
            });
            setSelectedTrackId(track.id);
            console.log('Right Click', e.pageX, e.pageY);
          }}
        >
          <TrackRow track={track} handlePlay={handlePlay} />
        </div>
      ))}
      <TrackRowContextMenu
        playlistId={playlistId}
        trackId={selectedTrackId}
        clicked={clicked}
        points={points}
      />
    </>
  );
};

export default Tracks;
