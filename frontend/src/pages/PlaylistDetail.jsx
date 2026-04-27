import API_URL from "../config";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause, Heart, Clock, MoreVertical, Trash2 } from 'lucide-react';

export default function PlaylistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playSong, isPlaying, currentSong, togglePlay, formatTime, likedSongIds, toggleLike, deletePlaylist } = usePlayer();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/playlists/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setPlaylist(data);
      } catch (e) {
        console.error('Failed to fetch playlist:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [id]);

  if (loading) return <div style={{ color: 'white', padding: '2rem' }}>Loading playlist...</div>;
  if (!playlist) return <div style={{ color: 'white', padding: '2rem' }}>Playlist not found</div>;

  const isPlaylistPlaying = currentSong && playlist.songs.some(s => s._id === currentSong._id);
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
          {playlist.songs.length > 0 ? (
            <img src={playlist.songs[0].cover} alt={playlist.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Play size={80} fill="white" color="white" />
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Playlist</span>
          <h1 style={{ fontSize: '5rem', fontWeight: '900', margin: 0, letterSpacing: '-2px' }}>{playlist.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <span style={{ fontWeight: 'bold' }}>{username}</span>
            <span>•</span>
            <span>{playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Play button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
        {playlist.songs.length > 0 && (
          <button
            onClick={() => (isPlaylistPlaying && isPlaying) ? togglePlay() : playSong(playlist.songs[0])}
            style={{
              width: '56px', height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--spotify-green)',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {(isPlaylistPlaying && isPlaying)
              ? <Pause size={24} fill="black" />
              : <Play size={24} fill="black" style={{ marginLeft: '4px' }} />}
          </button>
        )}
        
        <button
          onClick={async () => {
            if (window.confirm(`Are you sure you want to delete "${playlist.name}"?`)) {
              const success = await deletePlaylist(playlist._id);
              if (success) navigate('/library');
            }
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => e.target.style.color = 'white'}
          onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
        >
          <Trash2 size={20} /> Delete Playlist
        </button>
      </div>

      {/* Table header */}
      {playlist.songs.length > 0 ? (
        <>
          <div style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            <div style={{ width: '40px', textAlign: 'center' }}>#</div>
            <div style={{ flex: 1 }}>Title</div>
            <div style={{ flex: 1 }}>Album</div>
            <div style={{ width: '50px', textAlign: 'center' }}><Clock size={16} /></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {playlist.songs.map((song, index) => {
              const isLiked = likedSongIds.has(song._id);
              const isCurrent = currentSong && currentSong._id === song._id;
              return (
                <div
                  key={song._id}
                  className="chart-row"
                  onClick={() => playSong(song)}
                  style={{ padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <div style={{ width: '40px', textAlign: 'center', color: isCurrent ? 'var(--spotify-green)' : 'var(--text-secondary)' }}>
                    {isCurrent && isPlaying ? <div style={{ color: 'var(--spotify-green)', fontSize: '0.7rem' }}>▶</div> : index + 1}
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={song.cover} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} alt={song.title} />
                    <div>
                      <div style={{ color: isCurrent ? 'var(--spotify-green)' : 'white', fontSize: '1rem' }}>{song.title}</div>
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
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <Play size={56} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <p style={{ fontSize: '1.1rem' }}>This playlist is currently empty</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Go to Search to add some music!</p>
          <button 
            onClick={() => navigate('/search')}
            style={{ 
              marginTop: '1.5rem', 
              padding: '12px 24px', 
              borderRadius: '20px', 
              backgroundColor: 'white', 
              color: 'black', 
              border: 'none', 
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Find Songs
          </button>
        </div>
      )}
    </div>
  );
}
