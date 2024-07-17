import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(cors({
  origin: "https://youtube-clone-liard-omega.vercel.app", // Replace with your frontend URL
  credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
import userRouter from './routes/user.routes.js';
import healthcheckRouter from "./routes/healthcheck.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

// Routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);

// Health check endpoint
app.get('/api/healthcheck', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const isConnected = dbState === 1;

    if (!isConnected) {
      throw new Error('MongoDB not connected');
    }

    res.status(200).json({
      message: 'API is running and MongoDB is connected',
      dbInfo: {
        isConnected: isConnected,
        connectionState: dbState,
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        databaseName: mongoose.connection.name,
        options: mongoose.connection.client.s.options,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'MongoDB connection error', error: error.message });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API test route is working!' });
});

// Environment check route
app.get('/api/check-env', (req, res) => {
  res.json({
    MONGODB_URI: process.env.MONGODB_URI,
    DB_NAME: process.env.DB_NAME,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export default app;
