import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import PlayerBar from './PlayerBar';

export default function Layout() {
  const location = useLocation();
  const isNowPlaying = location.pathname === '/now-playing';

  return (
    <div className="app-container">
      <div className="main-layout">
        {!isNowPlaying && <Sidebar />}
        <div className={`main-content no-scrollbar ${isNowPlaying ? 'w-full' : ''}`}>
          {!isNowPlaying && <Header />}
          <div className="content-container" style={{ 
            padding: isNowPlaying ? '0' : '2rem',
            paddingBottom: isNowPlaying ? '0' : '110px'
          }}>
            <Outlet />
          </div>
        </div>
      </div>
      <PlayerBar />
    </div>
  );
}
