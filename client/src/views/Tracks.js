import React from 'react';
import TrackRow from '../components/TrackRow';
import { useDispatch } from 'react-redux';
import { setCurrentTrack } from '../store/actions';
import { ContextMenu } from "../components/ContextMenu/ContextMenu";
import { trackRowContextMenu } from '../components/ContextMenu/contextMenuLists'
import useContextMenu from "../hooks/useContextMenu";

const Tracks = (props) => {
  const { tracks, playlistId } = props;
  const dispatch = useDispatch();
  const { clicked, setClicked, points, setPoints } = useContextMenu();

  const TrackRowContextMenu = () => {
    let menuData = [...trackRowContextMenu];
    if(!playlistId) {
      menuData.filter(item => item.value !== 'remove_from_playlist')
    }

    return clicked && <ContextMenu menuData={menuData} top={points.y} left={points.x} />
  }

  const handlePlay = (track) => dispatch(setCurrentTrack(track));
  
  return (
    <>
      {tracks.map((track, ix) => (
        <div key={ix} onContextMenu={(e) => {
          e.preventDefault();
          setClicked(true);
          setPoints({
            x: e.pageX,
            y: e.pageY,
          });
          console.log("Right Click", e.pageX, e.pageY);
        }}>
          <TrackRow track={track} handlePlay={handlePlay}/>
        </div>
      ))}
      <TrackRowContextMenu />
    </>
  )
}

export default Tracks;
