import React, { useEffect, useState } from "react";
import TrackRow from "./TrackRow";
import AudioPlayer from "./AudioPlayer";
import { getTracks } from "../api/TrackApi";

const TracksList = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();

  useEffect(() => {
    async function fetchTracks() {
      const tracks = await getTracks();
      setTracks(tracks);
    }
    fetchTracks();
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);

  return (
    <>
      <div>
        {tracks.map((track, ix) => (
          <TrackRow key={ix} track={track} handlePlay={handlePlay} />
        ))}
      </div>
      {currentTrack ? <AudioPlayer track={currentTrack} /> : null}
    </>
  );
};

export default TracksList;
