import React from "react";
import PlaylistView from "./PlaylistView";
import TrackView from "./TrackView";

function MainView({active, tracks, handlePlay, playlists, refreshPlaylists}) {
  return <>
    {active === "Tracks" && <TrackView tracks={tracks} handlePlay={handlePlay} refreshPlaylists={refreshPlaylists} playlists={playlists} active={active}/>}
    {active === "Playlists" && <PlaylistView playlists={playlists} tracks={tracks} refreshPlaylists={refreshPlaylists} handlePlay={handlePlay} active={active}/>}
  </>;
}

export default MainView
