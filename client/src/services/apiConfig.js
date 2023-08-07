const baseUrl = process.env?.BASE_URL || "http://0.0.0.0:8000";

const endpoints = {
  playlists: (sort) => `${baseUrl}/playlists/?sort=${sort}`,
  tracks: `${baseUrl}/tracks/`,
  playlistById: (id) => `${baseUrl}/playlists/${id}/`,
  removeTrack: (playlistId, trackId) =>
    `${baseUrl}/playlists/${playlistId}/remove/${trackId}/`,
  addTrack: (playlistId, trackId) =>
    `${baseUrl}/playlists/${playlistId}/add/${trackId}/`,
};

export { baseUrl, endpoints };
