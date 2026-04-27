import React, { createContext, useState, useEffect, useContext } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [likedSongIds, setLikedSongIds] = useState(new Set());
  
  const [audio] = useState(() => new Audio());

  // Sync volume
  useEffect(() => {
    audio.volume = volume;
  }, [volume, audio]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/songs');
        const data = await response.json();
        setSongs(data);
        if (data.length > 0) {
          const defaultSong = data[5] || data[0];
          setCurrentSong(defaultSong);
          audio.src = defaultSong.audioUrl;
        }

        // Fetch liked songs
        const token = localStorage.getItem('token');
        if (token) {
          const likesRes = await fetch('http://localhost:8080/api/likes', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const likesData = await likesRes.json();
          setLikedSongIds(new Set(likesData.map(s => s._id)));
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
    
    fetchSongs();
  }, [audio]);

  // Audio Event Listeners
  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio]);

  const seek = (time) => {
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.error("Audio playback error:", e);
        setIsPlaying(false);
      });
    }
  };

  const logPlayHistory = async (songId) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await fetch('http://localhost:8080/api/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ songId })
      });
    } catch (e) {
      console.error('Failed to log history:', e);
    }
  };

  const playSong = (song) => {
    if (!currentSong || currentSong._id !== song._id) {
      setCurrentSong(song);
      audio.src = song.audioUrl;
      audio.load();
    }
    
    audio.play().then(() => {
      setIsPlaying(true);
      logPlayHistory(song._id);
    }).catch(e => {
      console.error("Audio playback error:", e);
      setIsPlaying(false);
    });
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleLike = async (song) => {
    const id = song._id;
    // Optimistic update
    setLikedSongIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await fetch(`http://localhost:8080/api/likes/${id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) {
      console.error('Failed to toggle like:', e);
      // Revert on failure
      setLikedSongIds(prev => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    }
  };

  return (
    <PlayerContext.Provider value={{
      songs,
      isPlaying,
      currentSong,
      currentTime,
      duration,
      seek,
      togglePlay,
      playSong,
      formatTime,
      volume,
      setVolume,
      likedSongIds,
      toggleLike,
    }}>
      {children}
    </PlayerContext.Provider>
  );
};
