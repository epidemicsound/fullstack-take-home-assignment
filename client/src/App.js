
import { Route, Routes } from "react-router-dom"
import Tracks from "./pages/Tracks";
import Playlists from "./pages/Playlists";
import PlaylistDetail from "./pages/PlaylistsDetail";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Tracks />}></Route>
      <Route path="/Playlists/" element={<Playlists />}></Route>
      <Route path="/Playlists/:id" element={<PlaylistDetail />}></Route>
    </Routes>
  );
}

export default App;
