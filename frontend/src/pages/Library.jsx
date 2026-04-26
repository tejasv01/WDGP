import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play } from 'lucide-react';

export default function Library() {
  const { songs, playSong } = usePlayer();
  const [activeTab, setActiveTab] = useState('playlists');

  return (
    <div style={{ color: 'white' }}>
      <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Your Library</h1>
      
      <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid #333', marginBottom: '2rem', paddingBottom: '0.5rem' }}>
        <button 
          onClick={() => setActiveTab('playlists')}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: activeTab === 'playlists' ? 'white' : 'var(--text-secondary)', 
            fontWeight: 'bold', 
            fontSize: '1rem', 
            cursor: 'pointer',
            paddingBottom: '0.5rem',
            borderBottom: activeTab === 'playlists' ? '2px solid var(--spotify-green)' : '2px solid transparent'
          }}
        >
          Playlists
        </button>
        <button 
          onClick={() => setActiveTab('recently-played')}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: activeTab === 'recently-played' ? 'white' : 'var(--text-secondary)', 
            fontWeight: 'bold', 
            fontSize: '1rem', 
            cursor: 'pointer',
            paddingBottom: '0.5rem',
            borderBottom: activeTab === 'recently-played' ? '2px solid var(--spotify-green)' : '2px solid transparent'
          }}
        >
          Recently Played
        </button>
      </div>

      {activeTab === 'playlists' && (
        <div className="recently-played-grid no-scrollbar">
          <div className="song-card" style={{ background: 'linear-gradient(135deg, #450af5, #c4efd9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'white' }}>Liked Songs</h3>
          </div>
          <div className="song-card">
            <img src={songs[1].cover} alt="Playlist" />
            <h3>Chill Vibes</h3>
            <p>By Spotify</p>
          </div>
          <div className="song-card">
            <img src={songs[3].cover} alt="Playlist" />
            <h3>Late Night Drive</h3>
            <p>By You</p>
          </div>
        </div>
      )}

      {activeTab === 'recently-played' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {songs.slice(0, 4).map((song, index) => (
            <div 
              key={song.id} 
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem', borderRadius: '8px', backgroundColor: '#181818', cursor: 'pointer' }}
              onClick={() => playSong(song)}
              className="chart-row"
            >
              <img src={song.cover} alt={song.title} style={{ width: '50px', height: '50px', borderRadius: '4px' }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0 }}>{song.title}</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{song.artist}</span>
              </div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginRight: '1rem' }}>2 hours ago</span>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)' }}><Play size={20} fill="currentColor" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
