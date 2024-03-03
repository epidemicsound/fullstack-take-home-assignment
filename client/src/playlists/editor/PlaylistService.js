// Read backend host from environment variable,
// but default to localhost
const BACKEND_HOST =
  process.env.REACT_APP_BACKEND_HOST || "http://localhost:8000";

async function savePlaylistChanges(id, title, playlistTracks) {
  const PLAYLIST_UPDATE_ENDPOINT = `${BACKEND_HOST}/playlists/${id}/`;

  const playlistTracksUpdatedOrder = playlistTracks.map((track, index) => ({
    id: track.id,
    track: { id: track.track.id },
    order: index,
  }));

  const requestBody = { title: title, tracks: playlistTracksUpdatedOrder };

  const response = await fetch(PLAYLIST_UPDATE_ENDPOINT, {
    method: "PUT",
    body: JSON.stringify(requestBody),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  }).then((res) => res.json());

  return response.tracks;
}

export { savePlaylistChanges };
