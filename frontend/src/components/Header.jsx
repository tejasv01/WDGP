import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-search">
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-secondary)' }} />
        <input 
          type="text" 
          placeholder="Search artists, songs, or podcasts" 
          onFocus={() => navigate('/search')}
        />
      </div>
      <div className="header-nav">
        <span className="active">Discover</span>
        <span>Radio</span>
        <span>Live</span>
      </div>
      <div className="header-actions">
        <Bell size={20} color="var(--text-secondary)" />
        <Settings size={20} color="var(--text-secondary)" />
        <button className="upgrade-btn">Upgrade</button>
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} alt="user" />
      </div>
    </div>
  );
}
