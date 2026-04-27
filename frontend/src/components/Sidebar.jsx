import API_URL from "../config";
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';

export default function Sidebar() {
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('${API_URL}/api/playlists', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setPlaylists(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to fetch playlists:', e);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async () => {
    const name = prompt('Enter playlist name:', 'My Playlist');
    if (!name) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('${API_URL}/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        fetchPlaylists();
      }
    } catch (e) {
      console.error('Failed to create playlist:', e);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <img src="/logo.svg" alt="Spotify Logo" width="32" height="32" />
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Spotify</h2>
          <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>PREMIUM AUDIO</div>
        </div>
      </div>

      <div className="nav-menu">
        <NavLink to="/" style={{ textDecoration: "none" }} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
          <Home size={20} /> <span>Home</span>
        </NavLink>
        <NavLink to="/search" style={{ textDecoration: "none" }} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Search size={20} /> <span>Search</span>
        </NavLink>
        <NavLink to="/library" style={{ textDecoration: "none" }} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Library size={20} /> <span>Library</span>
        </NavLink>
      </div>

      <div className="sidebar-section-title">YOUR COLLECTION</div>
      <div className="nav-menu">
        <NavLink to="/liked-songs" style={{ textDecoration: "none" }} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Heart size={20} /> <span>Liked Songs</span>
        </NavLink>
        <div className="nav-link" style={{ cursor: 'pointer' }} onClick={handleCreatePlaylist}>
          <PlusSquare size={20} /> <span>Create Playlist</span>
        </div>
      </div>

      <div style={{ padding: '0 1.5rem', marginTop: '1rem', borderTop: '1px solid #282828', paddingTop: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {playlists.map(p => (
            <NavLink 
              key={p._id} 
              to={`/playlist/${p._id}`} 
              style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.85rem' }}
              className={({ isActive }) => isActive ? 'active-playlist' : ''}
            >
              {p.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
