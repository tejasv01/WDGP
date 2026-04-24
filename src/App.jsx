import React, { useState, useEffect } from 'react';
import { 
  Home, Search, Library, PlusSquare, Heart, 
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Volume2, Maximize2, Mic2, MonitorSpeaker, ListMusic,
  Star, Smartphone, Bell, Settings,
  UserPlus, MoreVertical
} from 'lucide-react';

// --- MOCK DATA ---
const songs = [
  { id: 1, title: "After Hours", artist: "The Weeknd", album: "After Hours", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300", duration: 272 },
  { id: 2, title: "Live from London", artist: "Electronic Collective", album: "Live", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300", duration: 225 },
  { id: 3, title: "Ethereal Nights", artist: "Luna Ray", album: "Dawn", cover: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?auto=format&fit=crop&q=80&w=300", duration: 256 },
  { id: 4, title: "Vintage Soul", artist: "The Classics", album: "Vortex", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=300", duration: 198 },
  { id: 5, title: "Neon Horizon", artist: "Solstice Echo", album: "Fluidity", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=300", duration: 320 },
  { id: 6, title: "Digital Pulse", artist: "Neon Synthetica", album: "Luminescence (2024)", cover: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=300", duration: 214 },
];

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default function App() {
  const [activeView, setActiveView] = useState('login'); // 'login', 'dashboard', 'nowplaying'
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[5]); // Default to "Digital Pulse" to match Now Playing image
  const [currentTime, setCurrentTime] = useState(0);

  // Playback Simulation
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentSong.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong.duration]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const playSong = (song) => {
    setCurrentSong(song);
    setCurrentTime(0);
    setIsPlaying(true);
    // Auto switch to nowplaying if we click a song from dashboard
    if (activeView === 'dashboard') setActiveView('nowplaying');
  };

  // -------------------------
  // LOGIN VIEW
  // -------------------------
  const renderLogin = () => (
    <div className="login-container">
      <div className="login-header">
        <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="2" fill="var(--spotify-green)" strokeLinecap="round" strokeLinejoin="round" style={{color: 'transparent'}}>
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 11.5c2.5-1 5.5-1 8 0" stroke="black"></path>
          <path d="M7 15.5c3-1 6-1 9 0" stroke="black"></path>
          <path d="M9 7.5c2-.5 4-.5 6 0" stroke="black"></path>
        </svg>
        <h1 className="login-title">Welcome back</h1>
      </div>
      
      <div className="login-form">
        <div className="input-group">
          <label className="input-label">Email or username</label>
          <input type="text" placeholder="Email or username" className="login-input" />
        </div>
        <button onClick={() => setActiveView('dashboard')} className="btn-primary">
          Continue
        </button>
      </div>

      <div className="divider-container">
        <div className="divider-line"></div>
        <span className="divider-text">or</span>
        <div className="divider-line"></div>
      </div>

      <div className="social-btns">

        <button className="btn-social">
          <Smartphone size={20} className="icon-left" />
          Continue with phone number
        </button>
        <button className="btn-social">
          <svg viewBox="0 0 24 24" width="20" height="20" className="icon-left" style={{fill: 'currentColor'}}>
            <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/>
          </svg>
          Continue with Google
        </button>
        <button className="btn-social">
          <svg viewBox="0 0 24 24" width="20" height="20" className="icon-left" style={{fill: '#1877F2'}}>
            <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/>
          </svg>
          Continue with Facebook
        </button>
        <button className="btn-social">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="white" className="icon-left">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.88 1.5 0 2.86.59 3.65 1.5-3.12 1.93-2.6 6.31.54 7.66-.65 1.63-1.63 3.01-2.77 3.89zm-5.28-14c-.11-2.17 1.6-3.99 3.7-4.14.33 2.38-1.74 4.34-3.7 4.14z"/>
          </svg>
          Continue with Apple
        </button>
      </div>

      <div className="login-footer">
        <p>Don't have an account?</p>
        <a href="#">Sign up for Spotify</a>
      </div>

      <p className="recaptcha-text text-center">
        This site is protected by reCAPTCHA and the Google <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a> apply.
      </p>
    </div>
  );

  // -------------------------
  // SHARED HEADER
  // -------------------------
  const Header = () => (
    <div className="header">
      <div className="header-search">
        <Search size={18} style={{position: 'absolute', left: '12px', top: '10px', color: 'var(--text-secondary)'}} />
        <input type="text" placeholder="Search artists, songs, or podcasts" />
      </div>
      <div className="header-nav">
        <span className="active">Discover</span>
        <span>Radio</span>
        <span>Live</span>
      </div>
      <div className="header-actions">
        <Bell size={20} color="var(--text-secondary)" />
        <Settings size={20} color="var(--text-secondary)" />
        <button className="upgrade-btn">Upgrade</button>
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" style={{width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover'}} alt="user"/>
      </div>
    </div>
  );

  // -------------------------
  // DASHBOARD VIEW
  // -------------------------
  const renderDashboard = () => (
    <div className="main-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-brand">
          <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="var(--spotify-green)" strokeLinecap="round" strokeLinejoin="round" style={{color: 'transparent'}}>
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 11.5c2.5-1 5.5-1 8 0" stroke="black"></path>
            <path d="M7 15.5c3-1 6-1 9 0" stroke="black"></path>
            <path d="M9 7.5c2-.5 4-.5 6 0" stroke="black"></path>
          </svg>
          <div>
            <h2 style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Spotify</h2>
            <div style={{fontSize: '0.6rem', color: 'var(--text-secondary)', letterSpacing: '1px'}}>PREMIUM AUDIO</div>
          </div>
        </div>

        <div className="nav-menu">
          <div className="nav-link active" onClick={() => setActiveView('dashboard')}>
            <Home size={20} /> <span>Home</span>
          </div>
          <div className="nav-link">
            <Search size={20} /> <span>Search</span>
          </div>
          <div className="nav-link">
            <Library size={20} /> <span>Library</span>
          </div>
          <div className="nav-link">
            <ListMusic size={20} /> <span>Playlists</span>
          </div>
        </div>

        <div className="sidebar-section-title">YOUR COLLECTION</div>
        <div className="nav-menu">
          <div className="nav-link">
            <Heart size={20} /> <span>Liked Songs</span>
          </div>
          <div className="nav-link">
            <PlusSquare size={20} /> <span>Create Playlist</span>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="main-content no-scrollbar">
        <Header />
        
        <div className="content-container">
          {/* Hero Banner */}
          <div className="featured-banner">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200" alt="Solstice Echo" className="banner-img" />
            <div className="banner-overlay"></div>
            <div className="banner-content">
              <span style={{backgroundColor: 'rgba(29, 185, 84, 0.2)', color: 'var(--spotify-green)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem', display: 'inline-block'}}>ARTIST OF THE MONTH</span>
              <h1>Solstice Echo</h1>
              <p style={{fontSize: '1.1rem', color: '#ccc', maxWidth: '500px', marginBottom: '2rem'}}>
                Experience the boundary-pushing audio journey of 'Neon Horizons' in Dolby Atmos immersive spatial audio.
              </p>
              <div style={{display: 'flex', gap: '1rem'}}>
                <button onClick={() => playSong(songs[4])} style={{backgroundColor: 'var(--spotify-green)', color: '#000', padding: '12px 32px', borderRadius: '30px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Play size={20} fill="currentColor" /> Play Now
                </button>
                <button style={{backgroundColor: 'transparent', border: '1px solid #555', color: '#fff', padding: '12px 32px', borderRadius: '30px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <PlusSquare size={20} /> Save to Library
                </button>
              </div>
            </div>
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem'}}>
            <h2 className="section-title" style={{margin: 0}}>Recently Played</h2>
            <span style={{color: 'var(--spotify-green)', fontSize: '0.875rem', fontWeight: 'bold', cursor: 'pointer'}}>View All</span>
          </div>

          <div className="recently-played-grid no-scrollbar">
            {songs.slice(0, 5).map(song => (
              <div key={song.id} className="song-card" onClick={() => playSong(song)}>
                <img src={song.cover} alt={song.title} />
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </div>
            ))}
          </div>

          <div className="dashboard-lower">
            <div>
              <h2 className="section-title">Made For You</h2>
              <div className="made-for-you-cards">
                <div className="made-card made-card-1">
                  <h3>Daily Mix 1</h3>
                  <p>Tame Impala, Glass Animals, and more of what you love.</p>
                  <div style={{marginTop: 'auto', display: 'flex', gap: '-10px'}}>
                     {/* Simulating overlapping avatars */}
                     <img src={songs[0].cover} style={{width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #182820'}} alt="avatar" />
                     <img src={songs[1].cover} style={{width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #182820', marginLeft: '-10px'}} alt="avatar" />
                     <div style={{width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #182820', marginLeft: '-10px', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem'}}>+12</div>
                  </div>
                </div>
                <div className="made-card made-card-2">
                   <div style={{marginBottom: '1rem'}}>
                     <Star fill="white" size={24} />
                   </div>
                   <h3>Discovery Weekly</h3>
                   <p>New music picked just for you every Monday.</p>
                   <div style={{marginTop: 'auto', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                     Listen Now <Play size={16} fill="currentColor"/>
                   </div>
                </div>
              </div>
            </div>

            <div>
               <h2 className="section-title">Top Charts</h2>
               <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                 <div className="chart-row">
                   <span style={{color: 'var(--text-secondary)', fontWeight: 'bold', width: '20px'}}>01</span>
                   <img src={songs[0].cover} alt="Blinding Lights" />
                   <div style={{flex: 1}}>
                     <h4 style={{fontSize: '0.9rem', margin: 0}}>Blinding Lights</h4>
                     <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>The Weeknd</span>
                   </div>
                   <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)', marginRight: '1rem'}}>342M Plays</span>
                   <Heart size={16} color="var(--text-secondary)" style={{marginRight: '1rem'}} />
                   <MoreVertical size={16} color="var(--text-secondary)" />
                 </div>
                 <div className="chart-row">
                   <span style={{color: 'var(--text-secondary)', fontWeight: 'bold', width: '20px'}}>02</span>
                   <img src={songs[1].cover} alt="Heat Waves" />
                   <div style={{flex: 1}}>
                     <h4 style={{fontSize: '0.9rem', margin: 0}}>Heat Waves</h4>
                     <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>Glass Animals</span>
                   </div>
                   <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)', marginRight: '1rem'}}>289M Plays</span>
                   <Heart size={16} color="var(--text-secondary)" style={{marginRight: '1rem'}} />
                   <MoreVertical size={16} color="var(--text-secondary)" />
                 </div>
                 <div className="chart-row">
                   <span style={{color: 'var(--text-secondary)', fontWeight: 'bold', width: '20px'}}>03</span>
                   <img src={songs[2].cover} alt="Save Your Tears" />
                   <div style={{flex: 1}}>
                     <h4 style={{fontSize: '0.9rem', margin: 0}}>Save Your Tears</h4>
                     <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>The Weeknd</span>
                   </div>
                   <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)', marginRight: '1rem'}}>215M Plays</span>
                   <Heart size={16} color="var(--text-secondary)" style={{marginRight: '1rem'}} />
                   <MoreVertical size={16} color="var(--text-secondary)" />
                 </div>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );

  // -------------------------
  // NOW PLAYING VIEW
  // -------------------------
  const renderNowPlaying = () => (
    <div className="now-playing-container">
      {/* Left Sidebar - Info & Lyrics */}
      <div className="np-left no-scrollbar">
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', cursor: 'pointer'}} onClick={() => setActiveView('dashboard')}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="var(--spotify-green)" strokeLinecap="round" strokeLinejoin="round" style={{color: 'transparent'}}>
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 11.5c2.5-1 5.5-1 8 0" stroke="black"></path>
            <path d="M7 15.5c3-1 6-1 9 0" stroke="black"></path>
            <path d="M9 7.5c2-.5 4-.5 6 0" stroke="black"></path>
          </svg>
          <span style={{fontWeight: 'bold', fontSize: '1rem'}}>Spotify</span>
        </div>

        <div className="about-artist-card">
          <div className="panel-title">ABOUT ARTIST</div>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
            <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100" style={{width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover'}} alt="artist" />
            <div>
              <h3 style={{color: 'var(--spotify-green)', fontWeight: 'bold', fontSize: '1rem'}}>{currentSong.artist}</h3>
              <p style={{color: 'var(--text-secondary)', fontSize: '0.75rem'}}>2.4M Monthly Listeners</p>
            </div>
          </div>
          <p style={{fontSize: '0.85rem', color: '#ccc', lineHeight: '1.5', marginBottom: '1.5rem'}}>
            Pioneering the "Spotify" movement, {currentSong.artist} blends analog warmth with futuristic soundscapes.
          </p>
          <button style={{width: '100%', padding: '8px', border: '1px solid #333', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: 'white'}}>Follow Artist</button>
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
          <span onClick={() => setActiveView('dashboard')}>Explore</span>
          <span>Library</span>
        </div>

        <div className="np-art">
          <img src={currentSong.cover} alt="Album Art" />
        </div>

        <div className="np-info">
          <h2>{currentSong.title}</h2>
          <p>{currentSong.artist} • <span style={{fontStyle: 'italic'}}>{currentSong.album}</span></p>
        </div>

        <div className="waveform-container">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="wave-bar" style={{height: isPlaying ? `${Math.max(10, Math.random() * 50)}px` : '4px'}}></div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Queue */}
      <div className="np-right no-scrollbar">
        <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem'}}>
          <div style={{display: 'flex', gap: '1rem'}}>
             <Bell size={20} color="var(--text-secondary)" />
             <Settings size={20} color="var(--text-secondary)" />
             <button style={{backgroundColor: 'var(--spotify-green)', color: 'black', padding: '4px 12px', borderRadius: '16px', fontWeight: 'bold', fontSize: '0.75rem'}}>Upgrade</button>
          </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
          <div className="panel-title" style={{marginBottom: 0}}>SMART QUEUE</div>
          <Star size={16} color="var(--text-secondary)" />
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem'}}>
          {songs.filter(s => s.id !== currentSong.id).map(song => (
            <div key={song.id} className="queue-item" onClick={() => playSong(song)}>
              <img src={song.cover} alt="queue art" />
              <div style={{flex: 1, overflow: 'hidden'}}>
                 <h5 style={{fontSize: '0.9rem', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>{song.title}</h5>
                 <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>{song.artist}</p>
              </div>
              <MoreVertical size={16} color="var(--text-secondary)" />
            </div>
          ))}
        </div>

        <div className="panel-title">RECOMMENDED ARTIST</div>
        <div style={{backgroundColor: '#161616', padding: '1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=100" style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}} alt="rec artist" />
          <div style={{flex: 1}}>
            <h5 style={{fontSize: '0.9rem', fontWeight: 'bold'}}>Cyber Ritual</h5>
            <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>Experimental Dark Techno</p>
          </div>
          <button style={{color: 'var(--spotify-green)'}}><UserPlus size={20} /></button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      {activeView === 'login' && renderLogin()}
      {activeView === 'dashboard' && renderDashboard()}
      {activeView === 'nowplaying' && renderNowPlaying()}

      {/* Persistent Player Bar (Visible on Dashboard and Now Playing) */}
      {activeView !== 'login' && (
        <div className="player-bar">
          <div className="player-left">
            <img src={currentSong.cover} style={{width: '56px', height: '56px', borderRadius: '4px', objectFit: 'cover'}} alt="cover" />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{fontSize: '0.9rem', fontWeight: 'bold'}}>{currentSong.title}</span>
              <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>{currentSong.artist}</span>
            </div>
            <Heart size={20} color="var(--text-secondary)" style={{marginLeft: '1rem', cursor: 'pointer'}} />
          </div>

          <div className="player-center">
            <div className="player-controls">
              <Shuffle size={18} color="var(--text-secondary)" />
              <SkipBack size={20} fill="currentColor" color="var(--text-secondary)" />
              <button className="play-pause-btn" onClick={togglePlay}>
                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" style={{marginLeft: '2px'}} />}
              </button>
              <SkipForward size={20} fill="currentColor" color="var(--text-secondary)" />
              <Repeat size={18} color="var(--text-secondary)" />
            </div>
            <div className="progress-bar-container">
              <span>{formatTime(currentTime)}</span>
              <div className="progress-bg">
                <div className="progress-fill" style={{width: `${(currentTime / currentSong.duration) * 100}%`}}></div>
              </div>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>

          <div className="player-right">
             <ListMusic size={18} />
             <MonitorSpeaker size={18} />
             <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100px'}}>
               <Volume2 size={18} />
               <div className="progress-bg">
                 <div className="progress-fill" style={{width: '80%', backgroundColor: 'white'}}></div>
               </div>
             </div>
             <Maximize2 size={18} />
          </div>
        </div>
      )}
    </div>
  );
}
