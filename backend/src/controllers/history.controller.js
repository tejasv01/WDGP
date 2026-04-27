import { History } from '../models/history.js';

export const logHistory = async (req, res) => {
    try {
        const { songId } = req.body;
        if (!songId) return res.status(400).json({ message: 'songId is required' });

        await History.create({ userId: req.userId, songId });
        res.status(201).json({ message: 'History logged' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getHistory = async (req, res) => {
    try {
        const history = await History.find({ userId: req.userId })
            .sort({ playedAt: -1 })
            .limit(20)
            .populate('songId', 'title artist cover duration');

        // Filter out any entries where the song was deleted
        const valid = history.filter(h => h.songId);

        res.status(200).json(valid);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
