import mongoose from 'mongoose';
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
        const history = await History.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
            { $sort: { playedAt: -1 } },
            { $group: {
                _id: "$songId",
                playedAt: { $first: "$playedAt" },
                historyId: { $first: "$_id" }
            }},
            { $sort: { playedAt: -1 } },
            { $limit: 20 },
            { $lookup: {
                from: 'songs',
                localField: '_id',
                foreignField: '_id',
                as: 'songId'
            }},
            { $unwind: "$songId" }
        ]);

        // Map it to look like the populated version for the frontend
        const formatted = history.map(h => ({
            _id: h.historyId,
            songId: h.songId,
            playedAt: h.playedAt
        }));

        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
