import { Worker } from "bullmq";
import sampleJobProcessor from "./jobs/sampleJob.js";
import dotenv from "dotenv";
import express from "express";
import logger from "./utils/logger.js";

const app = express();

dotenv.config();

// Logging & worker start
logger.info("Worker Service starting...");

// Health endpoints for Docker & K8s
app.get("/live", (req, res) => res.json({ status: "alive" }));
app.get("/ready", (req, res) => res.json({ status: "ready" }));

app.listen(6000, () => console.log("Worker health check server on 6000"));

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
};

console.log("Worker service started...");

new Worker(
  "sampleQueue",
  async (job) => {
    logger.info({ msg: "Job received", jobId: job.id, data: job.data });
    return await sampleJobProcessor(job);
  },
  { connection }
);
