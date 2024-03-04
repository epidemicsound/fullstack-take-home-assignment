import React from "react";
import TrackRow from "./TrackRow";
import useTracks from "../../hooks/useTracks";

import styles from "./TracksContainer.module.css";

function TracksContainer({ handlePlay }) {
  const { tracks, loading, error } = useTracks();

  if (loading) return <>Loading</>;
  if (error) return <>Could not load tracks {error.message}</>;

  return (
    <div className={styles.tracksContainer}>
      {tracks.map((track) => (
        <TrackRow key={track.id} track={track} handlePlay={handlePlay} />
      ))}
    </div>
  );
}
export default TracksContainer;
