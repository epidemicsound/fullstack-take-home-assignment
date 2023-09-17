import React, { useRef, useState, useEffect } from "react";
import styles from "./AudioPlayer.module.css";
import { usePlay } from "../context/PlayContext";
import PlayButton from "./buttons/PlayButton";

function AudioPlayer({ track }) {
  const { isPlaying, setIsPlaying } = usePlay();
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = (e) => {
    setProgress(e.target.currentTime / e.target.duration || 0);
  };

  const handleSliderChange = (e) => {
    audioRef.current.currentTime =
      (e.target.value / 1000) * audioRef.current.duration;
  };

  const handleTogglePlaybackClick = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    audioRef.current.addEventListener("play", handlePlay);
    audioRef.current.addEventListener("pause", handlePause);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
  }, []);

  useEffect(() => {
    audioRef.current.play();
    audioRef.current.currentTime = 0;
  }, [track]);

  useEffect(() => {
    if (isPlaying !== audioRef.current.paused) {
      return;
    }
    if (!isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [isPlaying]);

  return (
    <>
      <audio src={track.audio} ref={audioRef} />
      <div className={styles.audioPlayer}>
        <PlayButton isPlaying={isPlaying} onClick={handleTogglePlaybackClick} />
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{track.title}</div>
          <div className={styles.trackArtist}>
            {track.main_artists.join(", ")}
          </div>
        </div>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="1"
            max="1000"
            value={progress * 1000}
            className={styles.slider}
            onChange={handleSliderChange}
          />
        </div>
      </div>
    </>
  );
}

export default AudioPlayer;
