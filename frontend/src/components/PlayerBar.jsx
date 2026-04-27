import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { 
  Heart, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Volume2, Maximize2, MonitorSpeaker, ListMusic 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PlayerBar() {
  const { currentSong, isPlaying, currentTime, duration, seek, togglePlay, formatTime, volume, setVolume, likedSongIds, toggleLike, playNext, playPrevious } = usePlayer();
  const navigate = useNavigate();

  if (!currentSong) return null;

  const isLiked = likedSongIds.has(currentSong._id);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="player-bar">
      <div className="player-left" onClick={() => navigate('/now-playing')} style={{ cursor: 'pointer' }}>
        <img src={currentSong.cover} style={{ width: '56px', height: '56px', borderRadius: '4px', objectFit: 'cover' }} alt="cover" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{currentSong.title}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{currentSong.artist}</span>
        </div>
        <Heart 
          size={20} 
          color={isLiked ? 'var(--spotify-green)' : 'var(--text-secondary)'}
          fill={isLiked ? 'var(--spotify-green)' : 'none'}
          style={{ marginLeft: '1rem', cursor: 'pointer' }} 
          onClick={(e) => { e.stopPropagation(); toggleLike(currentSong); }} 
        />
      </div>

      <div className="player-center">
        <div className="player-controls">
          <Shuffle size={18} color="var(--text-secondary)" />
          <SkipBack 
            size={20} 
            fill="currentColor" 
            color="var(--text-secondary)" 
            onClick={playPrevious}
            style={{ cursor: 'pointer' }}
          />
          <button className="play-pause-btn" onClick={togglePlay}>
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" style={{ marginLeft: '2px' }} />}
          </button>
          <SkipForward 
            size={20} 
            fill="currentColor" 
            color="var(--text-secondary)" 
            onClick={playNext}
            style={{ cursor: 'pointer' }}
          />
          <Repeat size={18} color="var(--text-secondary)" />
        </div>
        <div className="progress-bar-container">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.5"
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="volume-slider"
            style={{
              flex: 1,
              cursor: 'pointer',
              background: duration
                ? `linear-gradient(to right, white ${(currentTime / duration) * 100}%, #555 ${(currentTime / duration) * 100}%)`
                : '#555'
            }}
          />
          <span>{formatTime(duration || 0)}</span>
        </div>
      </div>

      <div className="player-right">
        <ListMusic size={18} />
        <MonitorSpeaker size={18} />
        <div className="volume-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '120px' }}>
          <Volume2 size={18} />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
            style={{ 
              width: '80px', 
              cursor: 'pointer',
              background: `linear-gradient(to right, white ${volume * 100}%, #555 ${volume * 100}%)`
            }}
          />
        </div>
        <Maximize2 
          size={18} 
          style={{ cursor: 'pointer' }} 
          onClick={toggleFullscreen} 
        />
      </div>
    </div>
  );
}
