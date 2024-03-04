import React from "react";
import { render, screen } from "@testing-library/react";
import PlaylistEditorAddSongs from "./PlaylistEditorAddSongs";

describe("PlaylistEditorAddSongs", () => {
  const EXPECTATIONS_TRACK = {
    id: "kro43exp2T",
    title: "Expectations",
    length: 137,
    bpm: 120,
    genres: ["Beats"],
    moods: ["Happy", "Restless"],
    main_artists: ["Dylan Sitts", "Megan Wofford"],
    featured_artists: [],
  };

  const ARCADE_ROMANCE_TRACK = {
    id: "uBOnwqZNMR",
    title: "Arcade Romance",
    length: 183,
    bpm: 108,
    genres: ["Synth Pop"],
    moods: ["Happy", "Eccentric"],
    main_artists: ["ELFL"],
    featured_artists: [],
  };

  const SPRINGBREAK_TRACK = {
    id: "tpjO3VkNTl",
    title: "Springbreak",
    length: 193,
    bpm: 102,
    genres: ["2020s Pop"],
    moods: ["Romantic", "Hopeful"],
    main_artists: ["Ooyy"],
    featured_artists: ["Le June"],
  };

  const PLAYLIST_TRACKS = [
    { id: 0, order: 0, track: SPRINGBREAK_TRACK },
    { id: 1, order: 1, track: ARCADE_ROMANCE_TRACK },
  ];
  const ALL_TRACKS = [
    EXPECTATIONS_TRACK,
    ARCADE_ROMANCE_TRACK,
    SPRINGBREAK_TRACK,
  ];

  test("displays tracks not yet on playlist", () => {
    render(
      <PlaylistEditorAddSongs
        playlistTracks={PLAYLIST_TRACKS}
        allTracks={ALL_TRACKS}
      />,
    );

    expect(screen.getByText("Expectations")).toBeInTheDocument();
  });

  test("does not display tracks already on playlist", () => {
    render(
      <PlaylistEditorAddSongs
        playlistTracks={PLAYLIST_TRACKS}
        allTracks={ALL_TRACKS}
      />,
    );

    expect(screen.queryByText("Springbreak")).toBeNull();
    expect(screen.queryByText("Arcade Romance")).toBeNull();
  });
});
