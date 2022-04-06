import React from "react";
import delete_icon from "../assets/delete.png"

function PlaylistRow({playlist, selectPlaylist, deletePlaylist}) {

  return (
    <div style={{borderBottom: "1px solid #333", padding: 10}}
         onClick={((e) => selectPlaylist(playlist))}>
      {playlist.name}
      <img alt={"delete playlist"} src={delete_icon} onClick={(e) => deletePlaylist(playlist.id)}/>
    </div>
  );
}

export default PlaylistRow;
