import { Worker } from "bullmq";
import sampleJobProcessor from "./jobs/sampleJob.js";
import dotenv from "dotenv";

dotenv.config();

const connection = {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
};

console.log("Worker service started...");

new Worker("sampleQueue", sampleJobProcessor, { connection });
