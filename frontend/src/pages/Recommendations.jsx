import API_URL from "../config";
import React, { useState, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause, Heart, Sparkles, Plus } from 'lucide-react';

export default function Recommendations() {
  const { playSong, isPlaying, currentSong, togglePlay, likedSongIds, toggleLike, playlists, addSongToPlaylist } = usePlayer();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('${API_URL}/api/songs/recommendations', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setRecommendations(data);
    } catch (e) {
      console.error('Failed to fetch recommendations:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div style={{ color: 'white' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{
          width: '232px', height: '232px',
          background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
          boxShadow: '0 4px 60px rgba(0,0,0,.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '4px'
        }}>
          <Sparkles size={80} color="white" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>MADE FOR YOU</span>
          <h1 style={{ fontSize: '5rem', fontWeight: '900', margin: 0, letterSpacing: '-2px' }}>Recommendations</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem' }}>
            Personalized songs you'll love, based on similar listeners.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
        {recommendations.length > 0 && (
          <button
            onClick={() => playSong(recommendations[0])}
            style={{
              width: '56px', height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--spotify-green)',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Play size={24} fill="black" style={{ marginLeft: '4px' }} />
          </button>
        )}
        <button 
          onClick={fetchRecommendations}
          style={{ 
            background: 'none', border: '1px solid #555', color: 'white', 
            padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' 
          }}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ padding: '2rem', color: 'var(--text-secondary)' }}>Analyzing your taste...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {recommendations.map((song, index) => {
            const isLiked = likedSongIds.has(song._id);
            const isCurrent = currentSong && currentSong._id === song._id;
            
            return (
              <div
                key={song._id}
                className="chart-row"
                onClick={() => playSong(song)}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer' }}
              >
                <div style={{ width: '30px', textAlign: 'center', color: 'var(--text-secondary)' }}>{index + 1}</div>
                <img
                  src={song.cover}
                  alt={song.title}
                  style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1rem', color: isCurrent ? 'var(--spotify-green)' : 'white' }}>{song.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{song.artist}</div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <Heart
                    size={20}
                    fill={isLiked ? 'var(--spotify-green)' : 'none'}
                    color={isLiked ? 'var(--spotify-green)' : 'var(--text-secondary)'}
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => { e.stopPropagation(); toggleLike(song); }}
                  />
                  
                  <div style={{ position: 'relative' }}>
                    <button
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setActiveMenu(activeMenu === song._id ? null : song._id);
                      }}
                    >
                      <Plus size={20} />
                    </button>
                    
                    {activeMenu === song._id && (
                      <div style={{
                        position: 'absolute',
                        bottom: '100%',
                        right: '0',
                        backgroundColor: '#282828',
                        borderRadius: '4px',
                        padding: '8px 0',
                        width: '160px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                        zIndex: 1000,
                        marginBottom: '8px'
                      }}>
                        <div style={{ padding: '4px 12px', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>ADD TO PLAYLIST</div>
                        {playlists.map(p => (
                          <div
                            key={p._id}
                            onClick={async (e) => {
                              e.stopPropagation();
                              await addSongToPlaylist(p._id, song._id);
                              setActiveMenu(null);
                            }}
                            style={{ padding: '8px 12px', fontSize: '0.85rem', cursor: 'pointer' }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#3e3e3e'}
                            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                          >
                            {p.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
