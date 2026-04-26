import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: String,
        required: true,
        trim: true
    },
    album: {
        type: String,
        required: true,
        trim: true
    },
    cover: {
        type: String,
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export const Song = mongoose.model('Song', songSchema);
