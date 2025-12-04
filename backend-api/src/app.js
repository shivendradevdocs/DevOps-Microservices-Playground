import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.js";
import { httpLogger } from "./middleware/loggerMiddleware.js"; // or httpJsonLogger
import logger from "./utils/logger.js";
import itemRoutes from "./routes/items.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(httpLogger);
app.use("/api/items", itemRoutes);

// Routes
app.use("/api/health", healthRoutes);

export default app;
