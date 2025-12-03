import { Worker } from "bullmq";
import sampleJobProcessor from "./jobs/sampleJob.js";
import dotenv from "dotenv";
import express from "express";
const app = express();

dotenv.config();
app.get("/live", (req, res) => res.json({ status: "alive" }));
app.get("/ready", (req, res) => res.json({ status: "ready" }));

app.listen(6000, () => console.log("Worker health check server on 6000"));

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
};

console.log("Worker service started...");

new Worker("sampleQueue", sampleJobProcessor, { connection });
