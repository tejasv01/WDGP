import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import songRoutes from "./routes/song.routes.js";
import historyRoutes from "./routes/history.routes.js";
import likesRoutes from "./routes/likes.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// For Vercel/Serverless: Ensure DB is connected before handling routes
app.use(async (req, res, next) => {
    try {
        if (mongoose.connection.readyState === 0) {
            await connectDB();
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Database connection failed", error: error.message });
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/playlists", playlistRoutes);

export default app;
