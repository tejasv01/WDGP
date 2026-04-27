import { Song } from '../models/song.js';

export const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching songs', error: error.message });
    }
};

export const searchSongs = async (req, res) => {
    try {
        const { q = '', genre, language } = req.query;
        const query = {};

        if (q.trim()) {
            const regex = new RegExp(q.trim(), 'i');
            query.$or = [
                { title: regex },
                { artist: regex },
                { album: regex },
            ];
        }

        if (genre) {
            query.genre = new RegExp(genre, 'i');
        }

        if (language) {
            query.language = new RegExp(language, 'i');
        }

        const songs = await Song.find(query).limit(20);
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Server error while searching songs', error: error.message });
    }
};
