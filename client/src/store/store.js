import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slice';

const store = configureStore({
  reducer: {
    player: playerReducer
  }
});

export default store;
