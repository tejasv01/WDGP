import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, PlusSquare, Star, Heart, MoreVertical } from 'lucide-react';

export default function Dashboard() {
  const { songs, playSong } = usePlayer();

  return (
    <>
      {/* Hero Banner */}
      <div className="featured-banner">
        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200" alt="Solstice Echo" className="banner-img" />
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <span style={{ backgroundColor: 'rgba(29, 185, 84, 0.2)', color: 'var(--spotify-green)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem', display: 'inline-block' }}>ARTIST OF THE MONTH</span>
          <h1>Solstice Echo</h1>
          <p style={{ fontSize: '1.1rem', color: '#ccc', maxWidth: '500px', marginBottom: '2rem' }}>
            Experience the boundary-pushing audio journey of 'Neon Horizons' in Dolby Atmos immersive spatial audio.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => playSong(songs[4])} style={{ backgroundColor: 'var(--spotify-green)', color: '#000', padding: '12px 32px', borderRadius: '30px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Play size={20} fill="currentColor" /> Play Now
            </button>
            <button style={{ backgroundColor: 'transparent', border: '1px solid #555', color: '#fff', padding: '12px 32px', borderRadius: '30px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PlusSquare size={20} /> Save to Library
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>Recently Played</h2>
        <span style={{ color: 'var(--spotify-green)', fontSize: '0.875rem', fontWeight: 'bold', cursor: 'pointer' }}>View All</span>
      </div>

      <div className="recently-played-grid no-scrollbar">
        {songs.slice(0, 5).map(song => (
          <button
            key={song.id}
            type="button"
            className="song-card"
            onClick={() => playSong(song)}
            style={{ background: 'none', border: 'none', padding: 0, textAlign: 'inherit', color: 'inherit', cursor: 'pointer' }}
          >
            <img src={song.cover} alt={song.title} />
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </button>
        ))}
      </div>

      <div className="dashboard-lower">
        <div>
          <h2 className="section-title">Made For You</h2>
          <div className="made-for-you-cards">
            <div className="made-card made-card-1">
              <h3>Daily Mix 1</h3>
              <p>Tame Impala, Glass Animals, and more of what you love.</p>
              <div style={{ marginTop: 'auto', display: 'flex', gap: '-10px' }}>
                <img src={songs[0].cover} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #182820' }} alt="avatar" />
                <img src={songs[1].cover} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #182820', marginLeft: '-10px' }} alt="avatar" />
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #182820', marginLeft: '-10px', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>+12</div>
              </div>
            </div>
            <div className="made-card made-card-2">
              <div style={{ marginBottom: '1rem' }}>
                <Star fill="white" size={24} />
              </div>
              <h3>Discovery Weekly</h3>
              <p>New music picked just for you every Monday.</p>
              <div style={{ marginTop: 'auto', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Listen Now <Play size={16} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="section-title">Recommendations</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {songs.slice(3, 6).map((song, idx) => (
              <div className="chart-row" key={song.id} onClick={() => playSong(song)} style={{ cursor: 'pointer' }}>
                <img src={song.cover} alt={song.title} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.9rem', margin: 0 }}>{song.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{song.artist}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginRight: '1rem' }}>Based on your listening</span>
                <Heart size={16} color="var(--text-secondary)" style={{ marginRight: '1rem' }} />
                <MoreVertical size={16} color="var(--text-secondary)" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
