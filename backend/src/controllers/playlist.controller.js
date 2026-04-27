import { Playlist } from '../models/playlist.js';

export const createPlaylist = async (req, res) => {
    try {
        const { name } = req.body;
        const playlist = await Playlist.create({
            name: name || 'New Playlist',
            user: req.userId,
            songs: []
        });
        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Error creating playlist', error: error.message });
    }
};

export const getUserPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ user: req.userId }).populate('songs');
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlists', error: error.message });
    }
};

export const addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.params;
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
        
        if (!playlist.songs.includes(songId)) {
            playlist.songs.push(songId);
            await playlist.save();
        }
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Error adding song to playlist', error: error.message });
    }
};

export const getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate('songs');
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlist', error: error.message });
    }
};

export const deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!playlist) return res.status(404).json({ message: 'Playlist not found or unauthorized' });
        res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting playlist', error: error.message });
    }
};


