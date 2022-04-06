import React, {useState} from "react";

import PlaylistRow from "./PlaylistRow";
import SelectedPlaylist from "./SelectedPlaylist";
import CreatePlaylist from "./CreatePlaylist";

function PlaylistView({playlists, tracks, refreshPlaylists, handlePlay}) {
  const [playlistName, setPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)

  const handleSelectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist)
  }

  const createPlaylist = (e) => {
    e.preventDefault()

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"name": playlistName, "tracks": []})
    };
    fetch('http://localhost:8000/playlists/', requestOptions)
      .then(() => refreshPlaylists());
  }

  const deletePlaylist = (id) => {
    if(selectedPlaylist.id === id) {
      setSelectedPlaylist(null);
    }
    fetch('http://localhost:8000/playlists/' + id, {method: 'DELETE'})
      .then(() => refreshPlaylists());
  }

  const deleteTrack = (trackId) => {
    const updatedTracks = selectedPlaylist.tracks.filter(el => el !== trackId)
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"name": selectedPlaylist.name, "tracks": updatedTracks})
    };
    fetch('http://localhost:8000/playlists/' + selectedPlaylist.id + "/",
      requestOptions)
      .then(() => refreshPlaylists());
  }

  return <>
    <div style={{display: "flex"}}>
      <div style={{flex: 1}}>
        <div>Available Playlists:</div>
        {playlists.map((playlist, i) => (
          <PlaylistRow key={i} playlist={playlist} selectPlaylist={handleSelectPlaylist} deletePlaylist={deletePlaylist}/>))}
      </div>
      <div style={{flex: 2}}>
        {selectedPlaylist &&
          <SelectedPlaylist tracks={tracks} playlists={playlists} selectedPlaylist={selectedPlaylist}
                            handlePlay={handlePlay} deleteTrack={deleteTrack}
                            refreshPlaylists={refreshPlaylists}/>}
      </div>
    </div>
    <CreatePlaylist createPlaylist={createPlaylist} setPlaylistName={(val) => setPlaylistName(val)}/>
  </>
}

export default PlaylistView