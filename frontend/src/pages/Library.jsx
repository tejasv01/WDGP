import API_URL from "../config";
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { Play, Clock } from 'lucide-react';

const timeAgo = (dateStr) => {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export default function Library() {
  const { songs, playSong } = usePlayer();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'playlists');
  
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const [history, setHistory] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoadingPlaylists(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/playlists`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setPlaylists(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Failed to fetch playlists:', e);
      } finally {
        setLoadingPlaylists(false);
      }
    };
    fetchPlaylists();
  }, []);

  useEffect(() => {
    if (activeTab !== 'recently-played') return;
    const fetchHistory = async () => {
      setLoadingHistory(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/history`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setHistory(data);
      } catch (e) {
        console.error('Failed to fetch history:', e);
      } finally {
        setLoadingHistory(false);
      }
    };
    fetchHistory();
  }, [activeTab]);

  const tabStyle = (tab) => ({
    background: 'none',
    border: 'none',
    color: activeTab === tab ? 'white' : 'var(--text-secondary)',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    paddingBottom: '0.5rem',
    borderBottom: activeTab === tab ? '2px solid var(--spotify-green)' : '2px solid transparent'
  });

  return (
    <div style={{ color: 'white' }}>
      <h1 className="section-title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Your Library</h1>
      
      <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid #333', marginBottom: '2rem', paddingBottom: '0.5rem' }}>
        <button onClick={() => setActiveTab('playlists')} style={tabStyle('playlists')}>
          Playlists
        </button>
        <button onClick={() => setActiveTab('recently-played')} style={tabStyle('recently-played')}>
          Recently Played
        </button>
      </div>

      {activeTab === 'playlists' && (
        <div className="recently-played-grid no-scrollbar">
          <div 
            className="song-card" 
            onClick={() => navigate('/liked-songs')}
            style={{ 
              background: 'linear-gradient(135deg, #450af5, #c4efd9)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', color: 'white' }}>Liked Songs</h3>
          </div>
          
          {loadingPlaylists && <p style={{ color: 'var(--text-secondary)' }}>Loading playlists...</p>}
          
          {!loadingPlaylists && playlists.map(p => (
            <div 
              key={p._id} 
              className="song-card" 
              onClick={() => navigate(`/playlist/${p._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={p.cover} alt={p.name} />
              <h3>{p.name}</h3>
              <p>By You</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'recently-played' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {loadingHistory && (
            <p style={{ color: 'var(--text-secondary)', padding: '1rem' }}>Loading history...</p>
          )}
          {!loadingHistory && history.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <Clock size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
              <p>No listening history yet.</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Start playing songs to build your history!</p>
            </div>
          )}
          {!loadingHistory && history.map((entry) => {
            const song = entry.songId;
            return (
              <div
                key={entry._id}
                className="chart-row"
                onClick={() => playSong(song)}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer' }}
              >
                <img src={song.cover} alt={song.title} style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{song.title}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{song.artist}</span>
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginRight: '1rem', whiteSpace: 'nowrap' }}>
                  {timeAgo(entry.playedAt)}
                </span>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <Play size={18} fill="currentColor" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
