import React from "react";
import { fireEvent, waitFor, render } from "@testing-library/react";
import PlaylistRow from "./PlaylistRow";
import PlayProvider from "../../context/PlayContext";

jest.mock("../../hooks/usePlaylists", () => ({
  __esModule: true,
  default: () => ({
    deleteTrack: jest.fn(() => Promise.resolve()),
    getPlaylistById: jest.fn((playlistId) =>
      Promise.resolve({
        tracks: [
          { id: 1, title: "Track 1", main_artists: ["Artist 1"] },
          { id: 2, title: "Track 2", main_artists: ["Artist 1"] },
        ],
      }),
    ),
  }),
}));

let getByText, queryByText;

const onDeleteMock = jest.fn();

describe("PlaylistRow", () => {
  beforeEach(() => {
    const rendered = render(
      <PlayProvider>
        <PlaylistRow
          playlist={{ id: 1, title: "My Playlist" }}
          onDelete={onDeleteMock}
        />
      </PlayProvider>,
    );
    getByText = rendered.getByText;
    queryByText = rendered.queryByText;
  });

  it("renders closed playlist row", () => {
    expect(getByText("My Playlist")).toBeInTheDocument();
    expect(queryByText("Loading...")).toBeNull();
    expect(queryByText("No tracks yet")).toBeNull();
  });

  it("toggles open and displays tracks", async () => {
    fireEvent.click(getByText("My Playlist"));

    await waitFor(() => {
      expect(getByText("Track 1")).toBeInTheDocument();
      expect(getByText("Track 2")).toBeInTheDocument();
      expect(queryByText("Loading...")).toBeNull();
      expect(queryByText("No tracks yet")).toBeNull();
    });

    fireEvent.click(getByText("My Playlist"));
    expect(queryByText("Track 1")).toBeNull();
    expect(queryByText("Track 2")).toBeNull();
  });

  it("handles track deletion", async () => {
    fireEvent.click(getByText("My Playlist"));

    await waitFor(() => {
      expect(getByText("Track 1")).toBeInTheDocument();
      expect(getByText("Track 2")).toBeInTheDocument();
    });

    fireEvent.click(getByText("Delete Playlist"));

    expect(onDeleteMock).toHaveBeenCalledWith(1);

    expect(queryByText("Track 1")).toBeNull();
    expect(queryByText("Track 2")).toBeNull();
  });
});
