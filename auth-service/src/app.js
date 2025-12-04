import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import { httpLogger } from "./middleware/loggerMiddleware.js";
import logger from "./utils/logger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(httpLogger);

// Example log on startup
logger.info("Auth service started");

export default app;
