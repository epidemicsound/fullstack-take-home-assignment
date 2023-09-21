import { createSlice } from '@reduxjs/toolkit';
import { setCurrentTrack, setPlaylists } from './actions';

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
      });
  }
});

export default playerSlice.reducer;
