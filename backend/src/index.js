import mongoose from "mongoose";
import connectDB from "./config/database.js";
import dotenv from 'dotenv';
import app from './app.js'

dotenv.config({
    path: './.env'
});

// For Vercel, we need to export the app and handle DB connection
const connectAndRun = async () => {
    if (mongoose.connection.readyState === 0) {
        await connectDB();
    }
};

if (process.env.NODE_ENV !== 'production') {
    const startServer = async () => {
        try {
            await connectDB();
            app.listen(process.env.PORT || 8000, () => {
                console.log(`Server running on port: ${process.env.PORT || 8000}`);
            });
        } catch (error) {
            console.log(`MongoDB connection failed.`, error);
        }
    };
    startServer();
}

// Ensure DB is connected for every request in serverless
app.use(async (req, res, next) => {
    await connectAndRun();
    next();
});

export default app;