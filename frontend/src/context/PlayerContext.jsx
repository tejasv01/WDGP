import React, { createContext, useState, useEffect, useContext } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  
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

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio]);

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

  const playSong = (song) => {
    if (!currentSong || currentSong._id !== song._id) {
      setCurrentSong(song);
      audio.src = song.audioUrl;
      audio.load();
    }
    
    audio.play().then(() => {
      setIsPlaying(true);
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

  return (
    <PlayerContext.Provider value={{
      songs,
      isPlaying,
      currentSong,
      currentTime,
      togglePlay,
      playSong,
      formatTime,
      volume,
      setVolume,
    }}>
      {children}
    </PlayerContext.Provider>
  );
};
