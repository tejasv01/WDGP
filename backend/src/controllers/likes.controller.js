import { User } from '../models/user.js';
import { Song } from '../models/song.js';

export const getLikedSongs = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('likedSongs');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user.likedSongs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const toggleLike = async (req, res) => {
    try {
        const { songId } = req.params;
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isLiked = user.likedSongs.some(id => id.toString() === songId);

        if (isLiked) {
            user.likedSongs = user.likedSongs.filter(id => id.toString() !== songId);
        } else {
            user.likedSongs.push(songId);
        }

        await user.save();
        res.status(200).json({ liked: !isLiked, likedSongs: user.likedSongs });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
