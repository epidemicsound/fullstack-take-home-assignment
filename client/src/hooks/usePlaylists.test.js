import usePlaylists from "./usePlaylists";

global.fetch = require("jest-fetch-mock");

const ENDPOINT = `${process.env.REACT_APP_API_HOST}/playlists/`;
const playlistId = 1; // Replace with a valid playlist ID

describe("usePlaylists", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("createPlaylist sends a POST request with correct data", async () => {
    const mockData = { name: "My Playlist" };
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const { createPlaylist } = usePlaylists();
    const response = await createPlaylist(mockData);

    expect(fetch).toHaveBeenCalledWith(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockData),
      mode: "cors",
    });

    expect(response).toEqual(mockData);
  });

  test("getPlaylistById fetches data for a specific playlist", async () => {
    const mockData = { id: playlistId, name: "My Playlist" };
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const { getPlaylistById } = usePlaylists();
    const response = await getPlaylistById(playlistId);

    expect(fetch).toHaveBeenCalledWith(`${ENDPOINT}${playlistId}/`, {
      mode: "cors",
    });

    expect(response).toEqual(mockData);
  });

  test("getAll fetches all playlists", async () => {
    const mockData = [
      { id: 1, name: "Playlist 1" },
      { id: 2, name: "Playlist 2" },
    ];
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const { getAll } = usePlaylists();
    const response = await getAll();

    expect(fetch).toHaveBeenCalledWith(ENDPOINT, {
      mode: "cors",
    });

    expect(response).toEqual(mockData);
  });

  test("deletePlaylist sends a DELETE request for a specific playlist", async () => {
    fetch.mockResponseOnce("");

    const { deletePlaylist } = usePlaylists();
    await deletePlaylist(playlistId);

    expect(fetch).toHaveBeenCalledWith(`${ENDPOINT}${playlistId}/`, {
      method: "DELETE",
      mode: "cors",
    });
  });

  test("addTrack sends a POST request to add a track to a playlist", async () => {
    const trackData = { title: "Track 1" };
    fetch.mockResponseOnce("");

    const { addTrack } = usePlaylists();
    await addTrack({ playlistId, data: trackData });

    expect(fetch).toHaveBeenCalledWith(`${ENDPOINT}${playlistId}/tracks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackData),
      mode: "cors",
    });
  });

  test("deleteTrack sends a DELETE request to delete a track from a playlist", async () => {
    const trackId = "track_id";
    fetch.mockResponseOnce("");

    const { deleteTrack } = usePlaylists();
    await deleteTrack({ playlistId, trackId });

    expect(fetch).toHaveBeenCalledWith(
      `${ENDPOINT}${playlistId}/tracks/${trackId}/`,
      {
        method: "DELETE",
        mode: "cors",
      },
    );
  });
});
