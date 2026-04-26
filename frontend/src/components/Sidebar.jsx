import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, Heart, ListMusic } from 'lucide-react';

export default function Sidebar() {
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
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
          <Home size={20} /> <span>Home</span>
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Search size={20} /> <span>Search</span>
        </NavLink>
        <NavLink to="/library" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Library size={20} /> <span>Library</span>
        </NavLink>
      </div>

      <div className="sidebar-section-title">YOUR COLLECTION</div>
      <div className="nav-menu">
        <NavLink to="/liked-songs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Heart size={20} /> <span>Liked Songs</span>
        </NavLink>
        <div className="nav-link" style={{cursor: 'pointer'}}>
          <PlusSquare size={20} /> <span>Create Playlist</span>
        </div>
      </div>
    </div>
  );
}
