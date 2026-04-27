import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Play } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const CATEGORIES = [
  { title: 'Pop',              genre: 'pop',              color: '#148a08' },
  { title: 'Hip-Hop',         genre: 'hip-hop',          color: '#bc5900' },
  { title: 'Rock',            genre: 'rock',             color: '#e91429' },
  { title: 'Electronic',      genre: 'electronic',       color: '#d84000' },
  { title: 'R&B',             genre: 'r&b',              color: '#e8115b' },
  { title: 'Latin',           genre: 'latin',            color: '#e1118c' },
  { title: 'Classical',       genre: 'classical',        color: '#1e3264' },
  { title: 'Jazz',            genre: 'jazz',             color: '#27856a' },
];

const LANGUAGES = [
  { title: 'English', language: 'english', color: '#503750' },
  { title: 'Hindi',   language: 'hindi',   color: '#e8115b' },
  { title: 'Spanish', language: 'spanish', color: '#148a08' },
  { title: 'French',  language: 'french',  color: '#477d95' },
];

export default function Search() {
  const { songs: allSongs, playSong } = usePlayer();
  const [query, setQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim() && !activeGenre && !activeLanguage) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query.trim()) params.set('q', query.trim());
        if (activeGenre) params.set('genre', activeGenre);
        if (activeLanguage) params.set('language', activeLanguage);
        const res = await fetch(`http://localhost:8080/api/songs/search?${params}`);
        const data = await res.json();
        setResults(data);
      } catch (e) {
        console.error('Search failed:', e);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, activeGenre]);

  const handleCategoryClick = (genre) => {
    setActiveGenre(prev => prev === genre ? null : genre);
    setActiveLanguage(null);
    setQuery('');
  };

  const handleLanguageClick = (lang) => {
    setActiveLanguage(prev => prev === lang ? null : lang);
    setActiveGenre(null);
    setQuery('');
  };

  const showResults = query.trim() || activeGenre || activeLanguage;
  const displaySongs = showResults ? results : [];

  return (
    <div style={{ color: 'white' }}>
      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '2rem', maxWidth: '400px' }}>
        <SearchIcon size={20} style={{ position: 'absolute', left: '16px', top: '14px', color: 'black' }} />
        <input
          type="text"
          value={query}
          onChange={(e) => { 
            setQuery(e.target.value); 
            setActiveGenre(null); 
            setActiveLanguage(null);
          }}
          placeholder="What do you want to listen to?"
          style={{
            width: '100%',
            padding: '14px 14px 14px 48px',
            borderRadius: '30px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: 'black',
            outline: 'none',
          }}
        />
      </div>

      {/* Search Results */}
      {showResults && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            {activeGenre ? `${CATEGORIES.find(c => c.genre === activeGenre)?.title}` : 
             activeLanguage ? `${LANGUAGES.find(l => l.language === activeLanguage)?.title}` :
             `Results for "${query}"`}
          </h2>

          {loading && <p style={{ color: 'var(--text-secondary)' }}>Searching…</p>}

          {!loading && displaySongs.length === 0 && (
            <p style={{ color: 'var(--text-secondary)' }}>No songs found. Try a different search.</p>
          )}

          {!loading && displaySongs.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {displaySongs.map((song) => (
                <div
                  key={song._id}
                  className="chart-row"
                  onClick={() => playSong(song)}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer' }}
                >
                  <img
                    src={song.cover}
                    alt={song.title}
                    style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{song.title}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{song.artist} · {song.album}</div>
                  </div>
                  <button
                    style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem' }}
                    onClick={(e) => { e.stopPropagation(); playSong(song); }}
                  >
                    <Play size={20} fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Category Grid */}
      {!query.trim() && (
        <>
          <h2 className="section-title">Browse by genre</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {CATEGORIES.map((cat) => {
              const isActive = activeGenre === cat.genre;
              return (
                <div
                  key={cat.genre}
                  onClick={() => handleCategoryClick(cat.genre)}
                  style={{
                    backgroundColor: cat.color,
                    height: '180px',
                    borderRadius: '8px',
                    padding: '1rem',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    outline: isActive ? '3px solid white' : 'none',
                    transform: isActive ? 'scale(0.97)' : 'scale(1)',
                    transition: 'transform 0.15s ease, outline 0.15s ease',
                  }}
                >
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{cat.title}</h3>
                  <div style={{
                    width: '100px', height: '100px',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    position: 'absolute',
                    bottom: '-10px', right: '-20px',
                    transform: 'rotate(25deg)',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Language Grid */}
      {!query.trim() && (
        <>
          <h2 className="section-title" style={{ marginTop: '2.5rem' }}>Browse by language</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {LANGUAGES.map((lang) => {
              const isActive = activeLanguage === lang.language;
              return (
                <div
                  key={lang.language}
                  onClick={() => handleLanguageClick(lang.language)}
                  style={{
                    backgroundColor: lang.color,
                    height: '120px',
                    borderRadius: '8px',
                    padding: '1rem',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    outline: isActive ? '3px solid white' : 'none',
                    transform: isActive ? 'scale(0.97)' : 'scale(1)',
                    transition: 'transform 0.15s ease, outline 0.15s ease',
                  }}
                >
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{lang.title}</h3>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
