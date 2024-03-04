import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PlaylistHeader from "./PlaylistHeader";

describe("PlaylistHeader", () => {
  const PLAYLIST = {
    id: 1,
    title: "Great playlist",
    tracks: [],
  };
  const PLAYLIST_TRACKS = [
    {
      order: 0,
      id: 1,
      track: {
        id: "kro43exp2T",
        length: 137,
      },
    },
    {
      order: 1,
      id: 2,
      track: {
        id: "wisy1XipVR",
        length: 168,
      },
    },
  ];

  test("renders playlist info", () => {
    const playlistDuration = "05:05";
    const expectedText = `2 songs • ${playlistDuration}`;

    render(<PlaylistHeader playlist={PLAYLIST} tracks={PLAYLIST_TRACKS} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  test("calls delete playlist when set", () => {
    const deletePlaylistMock = jest.fn();

    render(
      <PlaylistHeader
        playlist={PLAYLIST}
        tracks={PLAYLIST_TRACKS}
        deletePlaylist={deletePlaylistMock}
      />,
    );
    const deleteButton = screen.getByText("Delete");

    // Simulate a click
    fireEvent.click(deleteButton);

    // Verify that the mock function was called
    expect(deletePlaylistMock).toHaveBeenCalled();
  });
});
