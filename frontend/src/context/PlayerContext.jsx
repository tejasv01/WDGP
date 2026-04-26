import React, { createContext, useState, useEffect, useContext } from 'react';

const PlayerContext = createContext();

export const songs = [
  { id: 1, title: "After Hours", artist: "The Weeknd", album: "After Hours", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300", duration: 272 },
  { id: 2, title: "Live from London", artist: "Electronic Collective", album: "Live", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300", duration: 225 },
  { id: 3, title: "Ethereal Nights", artist: "Luna Ray", album: "Dawn", cover: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?auto=format&fit=crop&q=80&w=300", duration: 256 },
  { id: 4, title: "Vintage Soul", artist: "The Classics", album: "Vortex", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=300", duration: 198 },
  { id: 5, title: "Neon Horizon", artist: "Solstice Echo", album: "Fluidity", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=300", duration: 320 },
  { id: 6, title: "Digital Pulse", artist: "Neon Synthetica", album: "Luminescence (2024)", cover: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=300", duration: 214 },
];

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[5]); // Default to "Digital Pulse"
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
  };

  const formatTime = (seconds) => {
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
    }}>
      {children}
    </PlayerContext.Provider>
  );
};
