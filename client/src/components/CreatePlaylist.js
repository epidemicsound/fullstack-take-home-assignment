import add_icon from "../assets/add.png";
import confirm_icon from "../assets/confirm.png";
import cancel_icon from "../assets/delete.png";
import {useState} from "react";


function CreatePlaylist({setPlaylistName, createPlaylist}) {

  const [show, setShow] = useState(false)

  return <>
    <div style={{paddingTop:10}}>
      <span>Create playlist</span>
      {!show && <img alt={"Create Playlist"} src={add_icon} onClick={() => setShow(true)}/>}
      {show && <div>
        <input type="text" onChange={(e) => setPlaylistName(e.target.value)}/>
        <img alt={"Confirm"} src={confirm_icon} onClick={(e) => {
          setShow(false);
          return createPlaylist(e);
        }}/>
        <img alt={"Cancel"} src={cancel_icon} onClick={() => setShow(false)}/>
      </div>}
    </div>
  </>

}

export default CreatePlaylist
