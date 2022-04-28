import React from "react";
import TrackRow from "./TrackRow";

function TrackView({tracks, handlePlay, refreshPlaylists, playlists, active, deleteTrack}) {

  return <>
    {tracks.map((track, ix) => (
      <TrackRow key={ix} track={track} handlePlay={handlePlay} playlists={playlists} active={active}
                deleteTrack={deleteTrack} refreshPlaylists={refreshPlaylists} />))}
  </>
}

export default TrackView
