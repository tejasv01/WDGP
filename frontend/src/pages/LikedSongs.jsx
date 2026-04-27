import React, { useState, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause, Heart, Clock } from 'lucide-react';

export default function LikedSongs() {
  const { playSong, likedSongIds, toggleLike, isPlaying, currentSong, togglePlay } = usePlayer();
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLikedSongs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8080/api/likes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setLikedSongs(data);
    } catch (e) {
      console.error('Failed to fetch liked songs:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLikedSongs(); }, []);

  // Keep local list in sync with context toggle
  useEffect(() => {
    setLikedSongs(prev => prev.filter(s => likedSongIds.has(s._id)));
  }, [likedSongIds]);

  const username = localStorage.getItem('username') || 'User';

  return (
    <div style={{ color: 'white' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{
          width: '232px', height: '232px',
          background: 'linear-gradient(135deg, #450af5, #c4efd9)',
          boxShadow: '0 4px 60px rgba(0,0,0,.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '4px'
        }}>
          <Heart size={80} fill="white" color="white" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Playlist</span>
          <h1 style={{ fontSize: '5rem', fontWeight: '900', margin: 0, letterSpacing: '-2px' }}>Liked Songs</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <span style={{ fontWeight: 'bold' }}>{username}</span>
            <span>•</span>
            <span>{likedSongs.length} song{likedSongs.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Play button */}
      {likedSongs.length > 0 && (() => {
        const isCurrentlyPlayingLiked = currentSong && likedSongs.some(s => s._id === currentSong._id);
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
            <button
              onClick={() => isCurrentlyPlayingLiked ? togglePlay() : playSong(likedSongs[0])}
              style={{
                width: '56px', height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--spotify-green)',
                border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {isCurrentlyPlayingLiked && isPlaying
                ? <Pause size={24} fill="black" />
                : <Play size={24} fill="black" style={{ marginLeft: '4px' }} />}
            </button>
          </div>
        );
      })()}

      {/* Table header */}
      {likedSongs.length > 0 && (
        <div style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
          <div style={{ width: '40px', textAlign: 'center' }}>#</div>
          <div style={{ flex: 1 }}>Title</div>
          <div style={{ flex: 1 }}>Album</div>
          <div style={{ width: '50px', textAlign: 'center' }}><Clock size={16} /></div>
        </div>
      )}

      {/* Song list */}
      {loading && <p style={{ color: 'var(--text-secondary)', padding: '1rem' }}>Loading...</p>}

      {!loading && likedSongs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <Heart size={56} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <p style={{ fontSize: '1.1rem' }}>Songs you like will appear here</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Click the ♥ on any song to save it here.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {likedSongs.map((song, index) => {
          const isLiked = likedSongIds.has(song._id);
          return (
            <div
              key={song._id}
              className="chart-row"
              onClick={() => playSong(song)}
              style={{ padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <div style={{ width: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>{index + 1}</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={song.cover} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} alt={song.title} />
                <div>
                  <div style={{ color: 'white', fontSize: '1rem' }}>{song.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{song.artist}</div>
                </div>
              </div>
              <div style={{ flex: 1, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{song.album}</div>
              <div style={{ width: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Heart
                  size={16}
                  fill={isLiked ? 'var(--spotify-green)' : 'none'}
                  color={isLiked ? 'var(--spotify-green)' : 'var(--text-secondary)'}
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => { e.stopPropagation(); toggleLike(song); }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
