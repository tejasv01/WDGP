import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';
import { Play, PlusSquare, Star, Heart, Plus } from 'lucide-react';
import API_URL from '../config';

export default function Dashboard() {
  const { songs, playSong, playlists, addSongToPlaylist } = usePlayer();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = React.useState(null);
  const [recommendations, setRecommendations] = React.useState([]);
  const [loadingRecs, setLoadingRecs] = React.useState(false);

  React.useEffect(() => {
    const fetchRecommendations = async () => {
      setLoadingRecs(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/songs/recommendations`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setRecommendations(data);
      } catch (e) {
        console.error('Failed to fetch recommendations:', e);
      } finally {
        setLoadingRecs(false);
      }
    };
    fetchRecommendations();
  }, []);


  if (!songs || songs.length === 0) {
    return <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>Loading songs...</div>;
  }

  return (
    <>
      {/* Hero Banner */}
      <div className="featured-banner">
        <img src="https://wallpapers.com/images/hd/the-weeknd-after-hours-3000-x-3000-wallpaper-yocnnl0wdmg9ewo8.jpg" alt="The Weeknd" className="banner-img" />
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <span style={{ backgroundColor: 'rgba(29, 185, 84, 0.2)', color: 'var(--spotify-green)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem', display: 'inline-block' }}>ARTIST OF THE MONTH</span>
          <h1>The Weeknd</h1>
          <p style={{ fontSize: '1.1rem', color: '#ccc', maxWidth: '500px', marginBottom: '2rem' }}>
            Experience the cinematic and haunting soundscape of 'After Hours', a masterpiece of modern pop and R&B.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => {
                const blindingLights = songs.find(s => s.title.toLowerCase().includes('blinding lights'));
                if (blindingLights) playSong(blindingLights);
                else playSong(songs[0]);
              }} 
              style={{ backgroundColor: 'var(--spotify-green)', color: '#000', padding: '12px 32px', borderRadius: '30px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
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
        <span 
          onClick={() => navigate('/library?tab=recently-played')}
          style={{ color: 'var(--spotify-green)', fontSize: '0.875rem', fontWeight: 'bold', cursor: 'pointer' }}
        >
          View All
        </span>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
            <h2 className="section-title" style={{ margin: 0 }}>Recommendations</h2>
            <span 
              onClick={() => navigate('/recommendations')}
              style={{ color: 'var(--spotify-green)', fontSize: '0.875rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              View All
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {loadingRecs && <p style={{ color: 'var(--text-secondary)' }}>Finding songs you'll love...</p>}
            {!loadingRecs && recommendations.map((song) => (
              <div className="chart-row" key={song._id} onClick={() => playSong(song)} style={{ cursor: 'pointer' }}>
                <img src={song.cover} alt={song.title} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.9rem', margin: 0 }}>{song.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{song.artist}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginRight: '1rem' }}>Based on your listening</span>
                <Heart size={16} color="var(--text-secondary)" style={{ marginRight: '1rem' }} />
                
                <div style={{ position: 'relative' }}>
                  <button
                    style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem' }}
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setActiveMenu(activeMenu === song._id ? null : song._id);
                    }}
                  >
                    <Plus size={18} />
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
                      {playlists.length === 0 && <div style={{ padding: '8px 12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>No playlists found</div>}
                      {playlists.map(p => (
                        <div
                          key={p._id}
                          onClick={async (e) => {
                            e.stopPropagation();
                            const success = await addSongToPlaylist(p._id, song._id);
                            if (success) setActiveMenu(null);
                          }}
                          style={{
                            padding: '8px 12px',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            color: 'white'
                          }}
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
