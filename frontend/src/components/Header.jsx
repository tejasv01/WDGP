import React, { useState } from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const username = localStorage.getItem('username') || '?';
  const initial = username.charAt(0).toUpperCase();

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    navigate(`/search?q=${encodeURIComponent(val)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="header-search">
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-secondary)' }} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search artists, songs, or podcasts" 
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
        <div 
          style={{ position: 'relative' }}
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
        >
          <div 
            style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              backgroundColor: 'pink', 
              color: 'black', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer'
            }}
            title={username !== '?' ? username : 'User'}
          >
            {initial}
          </div>
          {showLogout && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              paddingTop: '8px',
              zIndex: 1000
            }}>
              <div style={{
                backgroundColor: '#282828',
                borderRadius: '4px',
                padding: '8px 0',
                width: '120px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              }}>
                <button 
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    padding: '8px 16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#3e3e3e'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
