import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

const ACTION_TYPES = {
  SET_PLAYLISTS: 'PLAYER/SET_PLAYLISTS',
  SET_CURRENT_TRACK: 'PLAYER/SET_CURRENT_TRACK'
};

export const setPlaylists = createAsyncThunk(
  ACTION_TYPES.SET_PLAYLISTS,
  async () => {
    const response = await fetch('http://0.0.0.0:8000/playlists/', {
      mode: 'cors'
    }).then(res => res.json());

    return response;
  }
);

export const setCurrentTrack = createAction(
  ACTION_TYPES.SET_CURRENT_TRACK,
  track => ({
    payload: track
  })
);
