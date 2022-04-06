import React, {useState} from "react";
import add_icon from "../assets/add.png";
import confirm_icon from "../assets/confirm.png";
import cancel_icon from "../assets/delete.png";

function AddTrack({track, playlists, changePlaylist, saveTrackToPlaylist}) {
  const [show, setShow] = useState(false);
  return <>
    {!show && <img onClick={() => setShow(true)} alt={""} src={add_icon}/>}
    {show &&
      <div style={{display: "flex"}}>
        <div>
          {playlists.map((playlist, id) => <div key={id}>
            <input name="playlist" type="radio" value={playlist.id}
                   onChange={() => changePlaylist(playlist)}/>
            <label>{playlist.name}</label>
          </div>)}
        </div>
        <img src={confirm_icon} alt={"Save track"} onClick={() => {
          setShow(false);
          return saveTrackToPlaylist(track.id);
        }}/>
        <img src={cancel_icon} alt={"Cancel"} onClick={() => setShow(false)}/>
      </div>}
  </>
}

export default AddTrack;
