import express from "express";
import cors from "cors";
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

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/playlists", playlistRoutes);

export default app;
