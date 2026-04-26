import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const categories = [
    { title: "Podcasts", color: "#27856a" },
    { title: "Made For You", color: "#1e3264" },
    { title: "New Releases", color: "#e8115b" },
    { title: "Pop", color: "#148a08" },
    { title: "Hip-Hop", color: "#bc5900" },
    { title: "Rock", color: "#e91429" },
    { title: "Latin", color: "#e1118c" },
    { title: "Dance/Electronic", color: "#d84000" },
  ];

  return (
    <div style={{ color: 'white' }}>
      <div style={{ position: 'relative', marginBottom: '2rem', maxWidth: '400px' }}>
        <SearchIcon size={20} style={{ position: 'absolute', left: '16px', top: '14px', color: 'black' }} />
        <input 
          type="text" 
          placeholder="What do you want to listen to?" 
          style={{
            width: '100%',
            padding: '14px 14px 14px 48px',
            borderRadius: '30px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: 'black'
          }}
        />
      </div>

      <h2 className="section-title">Browse all</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {categories.map((cat, idx) => (
          <div 
            key={idx} 
            style={{ 
              backgroundColor: cat.color, 
              height: '180px', 
              borderRadius: '8px', 
              padding: '1rem',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{cat.title}</h3>
            {/* Fake rotated box to look like a category image */}
            <div style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'rgba(0,0,0,0.2)',
              position: 'absolute',
              bottom: '-10px',
              right: '-20px',
              transform: 'rotate(25deg)',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
