import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Bell, Settings, Star, MoreVertical, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NowPlaying() {
  const { currentSong, songs, isPlaying, playSong } = usePlayer();
  const navigate = useNavigate();

  if (!currentSong) return <div style={{ color: 'white', padding: '2rem' }}>No song currently playing.</div>;

  return (
    <div className="now-playing-container" style={{ height: 'calc(100vh - 90px)' }}>
      {/* Left Sidebar - Info & Lyrics */}
      <div className="np-left no-scrollbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src="/logo.svg" alt="Spotify Logo" width="24" height="24" />
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Spotify</span>
        </div>

        <div className="about-artist-card">
          <div className="panel-title">ABOUT ARTIST</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} alt="artist" />
            <div>
              <h3 style={{ color: 'var(--spotify-green)', fontWeight: 'bold', fontSize: '1rem' }}>{currentSong.artist}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>2.4M Monthly Listeners</p>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#ccc', lineHeight: '1.5', marginBottom: '1.5rem' }}>
            Pioneering the movement, {currentSong.artist} blends analog warmth with futuristic soundscapes.
          </p>
          <button style={{ width: '100%', padding: '8px', border: '1px solid #333', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>Follow Artist</button>
        </div>

        <div className="lyrics-container">
          <div className="panel-title">LYRICS</div>
          <div className="lyric-line">Caught in the digital tide</div>
          <div className="lyric-line active">Where the frequencies collide</div>
          <div className="lyric-line">Drifting through a neon dream</div>
          <div className="lyric-line">Everything is as it seems</div>
          <div className="lyric-line">Lost within the binary light</div>
          <div className="lyric-line">Shadows dancing in the night</div>
        </div>
      </div>

      {/* Center - Visualizer */}
      <div className="np-center">
        <div className="np-header">
          <span className="active">Now Playing</span>
          <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>Explore</span>
          <span onClick={() => navigate('/library')} style={{cursor: 'pointer'}}>Library</span>
        </div>

        <div className="np-art">
          <img src={currentSong.cover} alt="Album Art" />
        </div>

        <div className="np-info">
          <h2>{currentSong.title}</h2>
          <p>{currentSong.artist} • <span style={{ fontStyle: 'italic' }}>{currentSong.album}</span></p>
        </div>

        <div className="waveform-container">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="wave-bar" style={{ height: isPlaying ? `${Math.max(10, Math.random() * 50)}px` : '4px' }}></div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Queue */}
      <div className="np-right no-scrollbar">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Bell size={20} color="var(--text-secondary)" />
            <Settings size={20} color="var(--text-secondary)" />
            <button style={{ backgroundColor: 'var(--spotify-green)', color: 'black', padding: '4px 12px', borderRadius: '16px', fontWeight: 'bold', fontSize: '0.75rem' }}>Upgrade</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div className="panel-title" style={{ marginBottom: 0 }}>SMART QUEUE</div>
          <Star size={16} color="var(--text-secondary)" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
          {songs.filter(s => s.id !== currentSong.id).map(song => (
            <div key={song.id} className="queue-item" onClick={() => playSong(song)} style={{ cursor: 'pointer' }}>
              <img src={song.cover} alt="queue art" />
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{song.title}</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{song.artist}</p>
              </div>
              <MoreVertical size={16} color="var(--text-secondary)" />
            </div>
          ))}
        </div>

        <div className="panel-title">RECOMMENDED ARTIST</div>
        <div style={{ backgroundColor: '#161616', padding: '1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=100" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} alt="rec artist" />
          <div style={{ flex: 1 }}>
            <h5 style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Cyber Ritual</h5>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Experimental Dark Techno</p>
          </div>
          <button style={{ color: 'var(--spotify-green)' }}><UserPlus size={20} /></button>
        </div>
      </div>
    </div>
  );
}
