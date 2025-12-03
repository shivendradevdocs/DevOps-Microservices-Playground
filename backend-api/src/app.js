import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.js";
import { httpLogger } from "./middleware/loggerMiddleware.js"; // or httpJsonLogger
import logger from "./utils/logger.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(httpLogger);

// Routes
app.use("/api/health", healthRoutes);

export default app;
