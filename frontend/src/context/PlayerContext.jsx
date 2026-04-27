import React, { createContext, useState, useEffect, useContext } from 'react';
import API_URL from '../config';

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
  const [playlists, setPlaylists] = useState([]);
  
  const [audio] = useState(() => new Audio());

  // Sync volume
  useEffect(() => {
    audio.volume = volume;
  }, [volume, audio]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/songs`);
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
          const likesRes = await fetch(`${API_URL}/api/likes`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const likesData = await likesRes.json();
          if (Array.isArray(likesData)) {
            setLikedSongIds(new Set(likesData.map(s => s._id)));
          } else {
            console.error('Liked songs data is not an array:', likesData);
          }

          // Fetch user playlists
          const playlistsRes = await fetch(`${API_URL}/api/playlists`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const playlistsData = await playlistsRes.json();
          setPlaylists(Array.isArray(playlistsData) ? playlistsData : []);
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
      await fetch(`${API_URL}/api/history`, {
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
      const res = await fetch(`${API_URL}/api/likes/${id}`, {
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

  const addSongToPlaylist = async (playlistId, songId) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/playlists/${playlistId}/songs/${songId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        // Refresh playlists
        const playlistsRes = await fetch(`${API_URL}/api/playlists`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const playlistsData = await playlistsRes.json();
        setPlaylists(Array.isArray(playlistsData) ? playlistsData : []);
        return true;
      }
    } catch (e) {
      console.error('Failed to add song to playlist:', e);
    }
    return false;
  };

  const createPlaylist = async (name) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/playlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        const playlistsRes = await fetch(`${API_URL}/api/playlists`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const playlistsData = await playlistsRes.json();
        setPlaylists(Array.isArray(playlistsData) ? playlistsData : []);
      }
    } catch (e) {
      console.error('Failed to create playlist:', e);
    }
  };

  const deletePlaylist = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/playlists/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const playlistsRes = await fetch(`${API_URL}/api/playlists`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const playlistsData = await playlistsRes.json();
        setPlaylists(Array.isArray(playlistsData) ? playlistsData : []);
        return true;
      }
    } catch (e) {
      console.error('Failed to delete playlist:', e);
    }
    return false;
  };

  const playNext = () => {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex(s => s._id === currentSong._id);
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(songs[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex(s => s._id === currentSong._id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(songs[prevIndex]);
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
      playlists,
      addSongToPlaylist,
      createPlaylist,
      deletePlaylist,
      playNext,
      playPrevious
    }}>
      {children}
    </PlayerContext.Provider>
  );
};
