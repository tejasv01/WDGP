import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import songRoutes from "./routes/song.routes.js";
import historyRoutes from "./routes/history.routes.js";
import likesRoutes from "./routes/likes.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/likes", likesRoutes);

export default app;
