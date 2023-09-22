import { createSlice } from '@reduxjs/toolkit';
import {
  addTrackToPlaylist,
  createPlaylist,
  removeTrackFromPlaylist,
  setCurrentTrack,
  setPlaylists
} from './actions';

const initialState = {
  currentTrack: undefined,
  playlists: []
};

const playerSlice = createSlice({
  initialState,
  name: 'player',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setCurrentTrack, (state, action) => {
        state.currentTrack = action.payload;
      })
      .addCase(setPlaylists.fulfilled, (state, action) => {
        state.playlists = action.payload;
      })
      .addCase(addTrackToPlaylist.fulfilled, (state, action) => {
        const playlistIndex = state.playlists.findIndex(
          playlist => playlist.id === action.payload.id
        );
        state.playlists[playlistIndex] = action.payload;
      })
      // NOTE: Because the API currently conveniently returns the entire playlist, we just replace the entire playlist in the store.
      // Maybe a more complete solution would be to manually remove the track from the playlist in store
      .addCase(removeTrackFromPlaylist.fulfilled, (state, action) => {
        console.log(action);
        const playlistIndex = state.playlists.findIndex(
          playlist => playlist.id === action.payload.id
        );
        state.playlists[playlistIndex] = action.payload;
        state.playlists = [...state.playlists];
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.playlists.push(action.payload);
      });
  }
});

export default playerSlice.reducer;
