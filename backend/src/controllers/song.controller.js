import mongoose from 'mongoose';
import { Song } from '../models/song.js';
import { History } from '../models/history.js';

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

export const getRecommendations = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId);

        // Step 0: Get the current user's listening history IDs to exclude them later
        const userHistory = await History.find({ userId }).distinct('songId');

        const recommendations = await History.aggregate([
            // Stage 1: Find Similar Users (Users who listened to at least one song that you have)
            { $match: { songId: { $in: userHistory }, userId: { $ne: userId } } },
            
            // Stage 2: Collect Their Music (Group by user to find unique similar users)
            { $group: { _id: "$userId" } },
            
            // Re-join history to get all songs from these similar users
            { $lookup: { 
                from: 'histories', 
                localField: '_id', 
                foreignField: 'userId', 
                as: 'similarUserSongs' 
            }},
            { $unwind: "$similarUserSongs" },
            { $replaceRoot: { newRoot: "$similarUserSongs" } },

            // Stage 3: Remove What You Already Know (Exclude songs already in your history)
            { $match: { songId: { $nin: userHistory } } },

            // Stage 4: Rank by Popularity (Every listen from a similar user counts as 1 point)
            { $group: { _id: "$songId", score: { $sum: 1 } } },

            // Stage 5: Sort & Limit
            { $sort: { score: -1 } },
            { $limit: 10 },

            // Stage 6: Get Song Details
            { $lookup: { 
                from: 'songs', 
                localField: '_id', 
                foreignField: '_id', 
                as: 'songDetails' 
            }},
            { $unwind: "$songDetails" },
            { $replaceRoot: { newRoot: "$songDetails" } }
        ]);

        // Fallback: If no recommendations found, return some random songs or top songs
        if (recommendations.length === 0) {
            const fallback = await Song.find({ _id: { $nin: userHistory } }).limit(10);
            return res.status(200).json(fallback);
        }

        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ message: 'Error getting recommendations', error: error.message });
    }
};

