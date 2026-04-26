import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { 
  Heart, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Volume2, Maximize2, MonitorSpeaker, ListMusic 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PlayerBar() {
  const { currentSong, isPlaying, currentTime, togglePlay, formatTime } = usePlayer();
  const navigate = useNavigate();

  if (!currentSong) return null;

  return (
    <div className="player-bar">
      <div className="player-left" onClick={() => navigate('/now-playing')} style={{ cursor: 'pointer' }}>
        <img src={currentSong.cover} style={{ width: '56px', height: '56px', borderRadius: '4px', objectFit: 'cover' }} alt="cover" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{currentSong.title}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{currentSong.artist}</span>
        </div>
        <Heart size={20} color="var(--text-secondary)" style={{ marginLeft: '1rem', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); }} />
      </div>

      <div className="player-center">
        <div className="player-controls">
          <Shuffle size={18} color="var(--text-secondary)" />
          <SkipBack size={20} fill="currentColor" color="var(--text-secondary)" />
          <button className="play-pause-btn" onClick={togglePlay}>
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" style={{ marginLeft: '2px' }} />}
          </button>
          <SkipForward size={20} fill="currentColor" color="var(--text-secondary)" />
          <Repeat size={18} color="var(--text-secondary)" />
        </div>
        <div className="progress-bar-container">
          <span>{formatTime(currentTime)}</span>
          <div className="progress-bg">
            <div className="progress-fill" style={{ width: `${(currentTime / currentSong.duration) * 100}%` }}></div>
          </div>
          <span>{formatTime(currentSong.duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <ListMusic size={18} />
        <MonitorSpeaker size={18} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100px' }}>
          <Volume2 size={18} />
          <div className="progress-bg">
            <div className="progress-fill" style={{ width: '80%', backgroundColor: 'white' }}></div>
          </div>
        </div>
        <Maximize2 size={18} />
      </div>
    </div>
  );
}
