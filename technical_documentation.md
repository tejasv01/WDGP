# WDGP Technical Documentation: Full-Stack Music Streaming App

This document provides a comprehensive technical breakdown of the WDGP Music Streaming platform. It covers the architecture, state management, and advanced features implemented in both the frontend and backend.

---

## 🏗️ Architecture Overview

The application follows a modern **MERN-like** architecture (MongoDB, Express, React, Node.js) designed for scalability and deployment on serverless platforms like Vercel.

- **Frontend**: React (Vite), React Router, Lucide Icons, Vanilla CSS.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT Authentication.
- **Deployment**: Vercel (Serverless Functions for backend, Static Hosting for frontend).

---

## 🖥️ Backend Deep Dive

The backend is built with a focus on high-performance data retrieval and a "self-healing" serverless connection model.

### 1. Server Entry (`src/index.js` & `src/app.js`)
To support **Vercel Serverless Functions**, the app is split. `index.js` handles local server startup, while `app.js` exports the Express instance for Vercel.

**Key Concept: Database Middleware**
In a serverless environment, we must ensure the DB is connected before every request. We use a middleware in `app.js`:
```javascript
app.use(async (req, res, next) => {
    if (mongoose.connection.readyState === 0) {
        await connectDB();
    }
    next();
});
```

### 2. The Recommendation Engine (`song.controller.js`)
The "magic" of the app lies in a **6-stage MongoDB Aggregation Pipeline**. It finds songs you'll love based on what "similar users" are listening to.

```javascript
const recommendations = await History.aggregate([
    // Stage 1: Find Similar Users
    { $match: { songId: { $in: userHistory }, userId: { $ne: userId } } },
    // Stage 2: Rank by Popularity
    { $group: { _id: "$songId", score: { $sum: 1 } } },
    { $sort: { score: -1 } },
    { $limit: 10 },
    // Stage 3: Get Song Details
    { $lookup: { from: 'songs', localField: '_id', foreignField: '_id', as: 'songDetails' }}
]);
```

### 3. History Deduplication (`history.controller.js`)
To prevent the "Recently Played" section from being cluttered, we use an aggregation to group by `songId`:
```javascript
{ $group: {
    _id: "$songId",
    playedAt: { $first: "$playedAt" },
    historyId: { $first: "$_id" }
}}
```

---

## 🎨 Frontend Deep Dive

The frontend is built for a premium, responsive user experience with a "Global Brain" approach to state management.

### 1. The Global Brain (`PlayerContext.jsx`)
This is the heart of the frontend. It manages:
- **Audio State**: Shared across the entire app via a single `new Audio()` instance.
- **Queue Control**: Methods like `playNext()` and `playPrevious()` that calculate song indices based on the current library.
- **Unified Sync**: Ensures that when you "Like" a song on the Search page, it instantly updates the Heart icon in the Player Bar.

### 2. The Player Bar (`PlayerBar.jsx`)
Features a custom-styled volume and progress slider using dynamic CSS gradients to match the Spotify aesthetic:
```javascript
background: `linear-gradient(to right, white ${(currentTime / duration) * 100}%, #555 ${(currentTime / duration) * 100}%)`
```

### 3. Responsive Search (`Search.jsx`)
Implements a debounced search to prevent unnecessary API calls:
```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    // Perform search
  }, 500); // 500ms delay
  return () => clearTimeout(timer);
}, [query]);
```

---

## 🔐 Security & Deployment

- **JWT Authentication**: Secured routes using a `verifyToken` middleware that extracts the `userId`.
- **Environment Variables**: Centralized `API_URL` config in `frontend/src/config.js` to switch between `localhost` and `production` (Vercel).
- **CORS**: Robust configuration in `app.js` to allow credentials and secure cross-origin requests.

---

## 🚀 Key Features
- **Instant Playlist Management**: Delete, create, and add songs in real-time with automatic cross-component syncing.
- **Full-Screen Mode**: A dedicated "Now Playing" view with immersive backgrounds.
- **Smart Queue**: The forward/backward buttons loop through your library intelligently.
