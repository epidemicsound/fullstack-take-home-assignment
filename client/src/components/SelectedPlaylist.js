import TrackView from "./TrackView";

function SelectedPlaylist({selectedPlaylist, tracks, playlists, handlePlay, deleteTrack, refreshPlaylists}) {

  return <>
    <div>
      <div>
        Selected playlist name: {selectedPlaylist.name}
      </div>
      <TrackView
        tracks={playlists.find(pl => pl.id === selectedPlaylist.id).tracks.map(trackId => tracks.find(track => track.id === trackId))}
        active={"Playlists"} handlePlay={handlePlay}
        refreshPlaylists={refreshPlaylists} deleteTrack={deleteTrack}/>
    </div>
  </>
}

export default SelectedPlaylist
