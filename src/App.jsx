import React, { useState, useEffect } from 'react';
import { 
  Home, Search, Library, PlusSquare, Heart, 
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Volume2, VolumeX, MoreHorizontal, Maximize2, Mic2, MonitorSpeaker
} from 'lucide-react';

// --- MOCK DATA ---
const playlists = [
  "Late Night Vibes",
  "Focus & Flow",
  "Gym Pump 2026",
  "Cinematic Scapes"
];

const songs = [
  { id: 1, title: "Midnight Horizon", artist: "The Synthetics", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300", duration: 214 },
  { id: 2, title: "Neon Drifter", artist: "Chrome Hearts", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300", duration: 185 },
  { id: 3, title: "Velvet Sky", artist: "Lumina", cover: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?auto=format&fit=crop&q=80&w=300", duration: 256 },
  { id: 4, title: "Electric Rain", artist: "Pulse", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=300", duration: 198 },
  { id: 5, title: "Abyssal Plain", artist: "Deep Divers", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=300", duration: 320 },
  { id: 6, title: "Solar Winds", artist: "Astro", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=300", duration: 275 },
];

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
  const [activeTab, setActiveTab] = useState('home');
  const [isLiked, setIsLiked] = useState(false);

  // Progress Bar Simulation
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
  
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setCurrentTime(percent * currentSong.duration);
  };

  const handleVolume = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setVolume(percent * 100);
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  return (
    <div className="app-container">
      
      {/* Background Effects */}
      <div className="bg-effects noise-overlay"></div>
      <div className="bg-effects ambient-glow"></div>

      <div className="main-layout">
        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-logo">S</div>
            <span className="brand-text font-display">SoundScape</span>
          </div>

          <nav className="nav-menu">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'search', icon: Search, label: 'Search' },
              { id: 'library', icon: Library, label: 'Your Library' },
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
              >
                <item.icon size={22} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-section-title">Playlists</div>
          
          <div className="playlists-container no-scrollbar">
            <button className="action-btn">
              <PlusSquare size={20} className="icon" />
              <span>Create Playlist</span>
            </button>
            <button className="action-btn liked-songs">
              <Heart size={20} className="icon" />
              <span>Liked Songs</span>
            </button>
            
            <div className="divider"></div>

            {playlists.map((playlist, idx) => (
              <button key={idx} className="playlist-item">
                {playlist}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content no-scrollbar">
          
          {/* Header */}
          <header className="header">
            <div className="nav-controls">
              <button className="nav-btn">
                <SkipBack size={18} />
              </button>
              <button className="nav-btn">
                <SkipForward size={18} />
              </button>
            </div>
            
            <button className="user-profile">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Avatar" className="user-avatar" />
              <span className="user-name">Alex</span>
            </button>
          </header>

          <div className="content-container">
            
            {/* Featured Banner */}
            <div className="featured-banner">
              <div className="banner-overlay"></div>
              <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200" alt="Featured" className="banner-img" />
              <div className="banner-content">
                <span className="banner-badge">New Release</span>
                <h1 className="banner-title font-display">Neon Drifter</h1>
                <p className="banner-desc">Dive into the synthwave universe with Chrome Hearts' latest masterpiece. A sonic journey through neon-lit streets.</p>
                <button onClick={() => playSong(songs[1])} className="play-now-btn">
                  Listen Now
                </button>
              </div>
            </div>

            {/* Recently Played */}
            <div>
              <h2 className="section-title font-display">Recently Played</h2>
              <div className="horizontal-scroll-container no-scrollbar">
                {songs.slice(0, 4).map((song) => (
                  <div key={song.id} onClick={() => playSong(song)} className="song-card-hz">
                    <div className="card-img-container">
                      <img src={song.cover} alt={song.title} className="card-img" />
                      <div className="card-play-overlay">
                        <div className="play-icon-btn">
                          <Play size={24} />
                        </div>
                      </div>
                    </div>
                    <h3 className="song-title">{song.title}</h3>
                    <p className="song-artist">{song.artist}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Made For You */}
            <div>
              <h2 className="section-title font-display">Made For You</h2>
              <div className="grid-container">
                {songs.map((song) => (
                  <div key={`made-${song.id}`} onClick={() => playSong(song)} className="song-card-grid">
                    <div className="grid-img-container">
                      <img src={song.cover} alt={song.title} className="card-img" />
                      <div className="grid-play-btn">
                         <Play size={20} />
                      </div>
                    </div>
                    <h3 className="song-title">{song.title}</h3>
                    <p className="song-desc">
                      Featuring {song.artist} and more atmospheric sounds.
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* BOTTOM PLAYER BAR */}
      <footer className="player-bar">
        
        {/* Left: Song Info */}
        <div className="player-left">
          <div className="player-art-container">
            <img 
              src={currentSong.cover} 
              alt="Album Art" 
              className={`player-art ${isPlaying ? 'playing' : ''}`} 
            />
            {isPlaying && <div className="art-glow"></div>}
          </div>
          <div className="player-info">
            <span className="player-song-title">{currentSong.title}</span>
            <span className="player-song-artist">{currentSong.artist}</span>
          </div>
          <button 
            onClick={() => setIsLiked(!isLiked)} 
            className={`control-btn like-btn ${isLiked ? 'liked' : ''}`}
          >
            <Heart size={20} />
          </button>
        </div>

        {/* Center: Controls & Progress */}
        <div className="player-center">
          <div className="player-controls">
            <button 
              onClick={() => setIsShuffle(!isShuffle)}
              className={`control-btn ${isShuffle ? 'active' : ''}`}
            >
              <Shuffle size={18} />
              {isShuffle && <span className="active-dot"></span>}
            </button>
            <button className="control-btn">
              <SkipBack size={20} className="fill-current" />
            </button>
            
            <button onClick={togglePlay} className="play-pause-btn">
              {isPlaying ? (
                <>
                  <Pause size={18} className="fill-current" />
                  <div className="play-pause-ping"></div>
                </>
              ) : (
                <Play size={18} className="play-icon fill-current" />
              )}
            </button>
            
            <button className="control-btn">
              <SkipForward size={20} className="fill-current" />
            </button>
            <button 
              onClick={() => setRepeatMode((prev) => (prev + 1) % 3)}
              className={`control-btn ${repeatMode > 0 ? 'active' : ''}`}
            >
              <Repeat size={18} />
              {repeatMode > 0 && <span className="active-dot"></span>}
              {repeatMode === 2 && <span className="repeat-badge">1</span>}
            </button>
          </div>
          
          <div className="progress-container">
            <span className="time-text">{formatTime(currentTime)}</span>
            <div className="progress-bar-bg" onClick={handleSeek}>
              <div 
                className="progress-bar-fill"
                style={{ width: `${(currentTime / currentSong.duration) * 100}%` }}
              ></div>
            </div>
            <span className="time-text end">{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        {/* Right: Extra Controls & Volume */}
        <div className="player-right">
          
          {/* Animated Waveform */}
          <div className="waveform">
            <div className={`wave-bar ${isPlaying ? 'playing' : ''}`}></div>
            <div className={`wave-bar ${isPlaying ? 'playing' : ''}`}></div>
            <div className={`wave-bar ${isPlaying ? 'playing' : ''}`}></div>
            <div className={`wave-bar ${isPlaying ? 'playing' : ''}`}></div>
          </div>

          <button className="control-btn"><Mic2 size={18} /></button>
          <button className="control-btn"><MonitorSpeaker size={18} /></button>
          
          <div className="volume-container">
            <button className="control-btn">
              {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div className="progress-bar-bg" onClick={handleVolume}>
              <div 
                className="progress-bar-fill"
                style={{ width: `${volume}%` }}
              ></div>
            </div>
          </div>
          
          <button className="control-btn"><Maximize2 size={18} /></button>
        </div>
      </footer>
      
    </div>
  );
}
