import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Heart, Clock } from 'lucide-react';

export default function LikedSongs() {
  const { songs, playSong } = usePlayer();

  return (
    <div style={{ color: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ 
          width: '232px', height: '232px', 
          background: 'linear-gradient(135deg, #450af5, #c4efd9)', 
          boxShadow: '0 4px 60px rgba(0,0,0,.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Heart size={80} fill="white" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Playlist</span>
          <h1 style={{ fontSize: '5rem', fontWeight: '900', margin: 0, letterSpacing: '-2px' }}>Liked Songs</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <span style={{ fontWeight: 'bold' }}>User</span>
            <span>•</span>
            <span>{songs.length} songs</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => playSong(songs[0])}
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
      </div>

      <div style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
        <div style={{ width: '40px', textAlign: 'center' }}>#</div>
        <div style={{ flex: 1 }}>Title</div>
        <div style={{ flex: 1 }}>Album</div>
        <div style={{ width: '100px' }}>Date added</div>
        <div style={{ width: '50px', textAlign: 'center' }}><Clock size={16} /></div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {songs.map((song, index) => (
          <div 
            key={song.id} 
            className="chart-row"
            onClick={() => playSong(song)}
            style={{ padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <div style={{ width: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>{index + 1}</div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src={song.cover} style={{ width: '40px', height: '40px', borderRadius: '4px' }} alt={song.title} />
              <div>
                <div style={{ color: 'white', fontSize: '1rem' }}>{song.title}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{song.artist}</div>
              </div>
            </div>
            <div style={{ flex: 1, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{song.album}</div>
            <div style={{ width: '100px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>2 days ago</div>
            <div style={{ width: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)' }}>
              <Heart size={16} fill="var(--spotify-green)" color="var(--spotify-green)" />
              <span style={{ fontSize: '0.9rem' }}>4:12</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
