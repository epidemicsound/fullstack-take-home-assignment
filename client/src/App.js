import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import TracksList from "./components/Tracklist";
import PlaylistsList from "./components/Playlist";
import Root from "./components/Root";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="tracks" element={<TracksList />} />
      <Route path="playlists" element= {<PlaylistsList/>}/>
    </Route>
  )
);

export default router;
