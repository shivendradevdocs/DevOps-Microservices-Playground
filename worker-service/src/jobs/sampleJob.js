import logger from "../utils/logger.js";

export default async function sampleJobProcessor(job) {
  logger.info({ msg: "Processing job", jobId: job.id });

  await new Promise((res) => setTimeout(res, 2000));

  logger.info({ msg: "Job completed", jobId: job.id });

  return { status: "done", time: Date.now() };
}
