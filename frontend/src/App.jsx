import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Library from './pages/Library';
import LikedSongs from './pages/LikedSongs';
import NowPlaying from './pages/NowPlaying';

export default function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/liked-songs" element={<LikedSongs />} />
            <Route path="/now-playing" element={<NowPlaying />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
}
