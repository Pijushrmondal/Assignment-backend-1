import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { errorHandler } from "./src/middlewares/error.middleware";
import authRoutes from "./src/routes/auth.routes";
import screenRoutes from "./src/routes/screen.routes";
import playlistRoutes from "./src/routes/playlist.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/screens", screenRoutes);
app.use("/playlists", playlistRoutes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
