import { Song } from '../models/song.js';

export const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching songs', error: error.message });
    }
};
